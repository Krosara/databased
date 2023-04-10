using MassTransit;
using Assets.Service;
using Assets.Service.Consumers;
using Databased.Shared.Configurations;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<AssetConsumer>();
    x.AddBus(provider =>
        Bus.Factory.CreateUsingRabbitMq(config =>
        {
            config.Host(new Uri("rabbitmq://localhost"), h =>
            {
                h.Username("guest");
                h.Password("guest");
            });
            config.ReceiveEndpoint("requestsQueue", ep =>
            {
                ep.PrefetchCount = 16;
                ep.UseMessageRetry(r => r.Interval(2, 200));
                ep.ConfigureConsumer<AssetConsumer>(provider);
            });
        })

    );

});

builder.Services.Configure<DatabaseConfiguration>(builder.Configuration.GetSection("DatabaseConfiguration"));

builder.Services.AddScoped<IAssetService, AssetService>();
builder.Services.AddScoped<IAssetConsumerService, AssetConsumerService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
