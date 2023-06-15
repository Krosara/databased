using MassTransit;
using Requests.Service;
using Databased.Shared.Configurations;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddMassTransit(x =>
{
    x.UsingAmazonSqs((context, cfg) =>
    {
        cfg.Host("eu-north-1", h =>
        {
            h.AccessKey(builder.Configuration.GetValue<string>("AmazonSQS:AccessKey"));
            h.SecretKey(builder.Configuration.GetValue<string>("AmazonSQS:SecretKey"));
        });
    }
    );
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.SetIsOriginAllowedToAllowWildcardSubdomains().WithOrigins("https://localhost:5173", "https://127.0.0.1:5173", "https://*.vercel.app", "https://databased-pi.vercel.app").AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddHealthChecks();

builder.Services.AddScoped<IRequestService, RequestService>();
builder.Services.AddHostedService<HeartBeatSender>();

builder.Services.Configure<DatabaseConfiguration>(builder.Configuration.GetSection("DatabaseConfiguration"));

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

app.UseHealthChecks("/health");

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
