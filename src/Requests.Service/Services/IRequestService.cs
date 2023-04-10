using Databased.Shared.Models;

namespace Requests.Service;

public interface IRequestService
{
    public Task<List<Request>> GetAsync();

    public Task<Request> GetByIdAsync(string id);

    public Task CreateAsync(Request request);

    public Task UpdateAsync(Request request);

    public Task DeleteAsync(string id);
}