using Databased.Shared.Models;

namespace Assets.Service;


public interface IAssetService {
    public Task<List<Asset>> GetAsync();

    public Task<Asset> GetByIdAsync(string id);

    public Task CreateAsync(Asset asset);

    public Task UpdateAsync(Asset asset);

    public Task DeleteAsync(string id);

}