using Databased.Shared.Models;
using Databased.Shared.Configurations;
using MongoDB.Driver;
using Microsoft.Extensions.Options;

namespace Requests.Service;

public class RequestService : IRequestService
{
    private readonly IMongoCollection<Request> _collection;
    private readonly DatabaseConfiguration _settings;

    public RequestService(IOptions<DatabaseConfiguration> settings)
    {
        _settings = settings.Value;
        var mongoClient = new MongoClient(_settings.ConnectionString);
        var database = mongoClient.GetDatabase(_settings.DatabaseName);
        _collection = database.GetCollection<Request>(_settings.CollectionName);
    }
    public async Task CreateAsync(Request request)
    {
        await _collection.InsertOneAsync(request);
    }

    public async Task DeleteAsync(string id)
    {
        await _collection.DeleteOneAsync(r => r.Id == id);
    }

    public async Task<List<Request>> GetAsync()
    {
        return await _collection.Find(r => true).ToListAsync();
    }

    public async Task<Request> GetByIdAsync(string id)
    {
        return await _collection.Find(r => r.Id == id).FirstOrDefaultAsync();
    }

    public async Task UpdateAsync(Request request)
    {
        await _collection.ReplaceOneAsync(r => r.Id == request.Id, request);
    }
}