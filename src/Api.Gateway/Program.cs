using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.IdentityModel.Tokens.Jwt;
using Ocelot.Cache.CacheManager;

var builder = WebApplication.CreateBuilder(args);

string authenticationProviderKey = builder.Configuration.GetValue<string>("Auth0:AuthenticationProviderKey")!;
string authority = builder.Configuration.GetValue<string>("Auth0:Authority")!;
string audience = builder.Configuration.GetValue<string>("Auth0:Audience")!;

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//API Gateway
builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);
builder.Services.AddOcelot().AddCacheManager(x => x.WithDictionaryHandle());

//Auth
System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
builder.Services.AddAuthentication().AddJwtBearer("Bearer", options =>
{
    options.Authority = authority;
    options.Audience = audience;
    options.RequireHttpsMetadata = false;
});


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("https://localhost:5173", "https://127.0.0.1:5173").AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Logging.AddConsole();

builder.Services.AddHealthChecks();

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

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.UseOcelot().Wait();

app.Run();
