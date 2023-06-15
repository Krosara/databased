using MassTransit;
using Assets.Service;
using Assets.Service.Consumers;
using Databased.Shared.Configurations;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<HeartBeatConsumer>();
    x.AddConsumer<AssetConsumer>();

    x.UsingAmazonSqs((context, cfg) =>
    {


        cfg.Host("eu-north-1", h =>
        {
            h.AccessKey(builder.Configuration.GetValue<string>("AmazonSQS:AccessKey"));
            h.SecretKey(builder.Configuration.GetValue<string>("AmazonSQS:SecretKey"));
        });

        cfg.ConfigureEndpoints(context);

    }
    );
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.SetIsOriginAllowedToAllowWildcardSubdomains().WithOrigins("https://localhost:5173", "https://127.0.0.1:5173", "https://*.vercel.app").AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Logging.AddConsole();

builder.Services.AddHealthChecks();

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

// app.UseHttpsRedirection();

app.MapHealthChecks("/health");

app.UseCors();

// app.UseAuthentication();

// app.UseAuthorization();

app.MapControllers();

app.Run();
