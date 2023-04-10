using Databased.Shared.Models;
using Databased.Shared.Configurations;
using MongoDB.Driver;
using MongoDB.Bson.Serialization.Conventions;
using Microsoft.Extensions.Options;

namespace Assets.Service;

public class AssetService : IAssetService
{
    private readonly IMongoCollection<Asset> _collection;
    private readonly DatabaseConfiguration _settings;

    public AssetService(IOptions<DatabaseConfiguration> settings)
    {
        _settings = settings.Value;
        var mongoClient = new MongoClient(_settings.ConnectionString);
        var database = mongoClient.GetDatabase(_settings.DatabaseName);
        _collection = database.GetCollection<Asset>(_settings.CollectionName);
    }

    public async Task CreateAsync(Asset asset)
    {
        await _collection.InsertOneAsync(asset);
    }

    public async Task<List<Asset>> GetAsync()
    {
        return await _collection.Find(a => true).ToListAsync();
    }

    public async Task<Asset> GetByIdAsync(string id)
    {
        return await _collection.Find(a => a.Id == id).FirstOrDefaultAsync();
    }

    public async Task UpdateAsync(Asset asset)
    {
        await _collection.ReplaceOneAsync(a => a.Id == asset.Id, asset);
    }

    public async Task DeleteAsync(string id)
    {
        await _collection.DeleteOneAsync(a => a.Id == id);
    }


}