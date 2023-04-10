using Databased.Shared.Models;
using MassTransit;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using Databased.Shared.Configurations;

namespace Assets.Service.Consumers;

public class AssetConsumer : IConsumer<AssetAddedToRequestEvent>
{
    private readonly IAssetConsumerService _assetConsumerService;

    public AssetConsumer(IAssetConsumerService assetConsumerService)
    {
        _assetConsumerService = assetConsumerService;
    }

    public async Task Consume(ConsumeContext<AssetAddedToRequestEvent> context)
    {
        var data = context.Message;
        Console.WriteLine(data);
        await _assetConsumerService.CreateAsync(data);
    }
}

public interface IAssetConsumerService
{
    Task CreateAsync(AssetAddedToRequestEvent ae);
}

public class AssetConsumerService : IAssetConsumerService
{
    private readonly IMongoCollection<AssetAddedToRequestEvent> _collection;
    private readonly DatabaseConfiguration _settings;

    public AssetConsumerService(IOptions<DatabaseConfiguration> settings)
    {
        _settings = settings.Value;
        var mongoClient = new MongoClient(_settings.ConnectionString);
        var database = mongoClient.GetDatabase(_settings.DatabaseName);
        _collection = database.GetCollection<AssetAddedToRequestEvent>("assetToRequest");
    }


    public async Task CreateAsync(AssetAddedToRequestEvent ae)
    {
        await _collection.InsertOneAsync(ae);
    }
}