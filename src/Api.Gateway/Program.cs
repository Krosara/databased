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

builder.Services.AddHealthChecks();

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
        policy.SetIsOriginAllowedToAllowWildcardSubdomains().WithOrigins("https://localhost:5173", "https://127.0.0.1:5173", "https://*.vercel.app", "https://databased-pi.vercel.app").AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Logging.AddConsole();

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

var conf = new OcelotPipelineConfiguration()
{
    PreErrorResponderMiddleware = async (ctx, next) =>
    {
        if (ctx.Request.Path.Equals(new PathString("/health")))
        {
            await ctx.Response.WriteAsync("ok");
        }
        else
        {
            await next.Invoke();
        }
    }
};

app.UseOcelot(conf).Wait();

app.Run();
