using Databased.Shared.Models;
using MassTransit;
using Microsoft.AspNetCore.Mvc;

namespace Requests.Service.Controllers;

[ApiController]
[Route("api/requests")]
public class RequestsController : ControllerBase
{
    private readonly ILogger<RequestsController> _logger;
    private readonly IBus _bus;
    private readonly IRequestService _requestService;

    public RequestsController(ILogger<RequestsController> logger, IBus bus, IRequestService requestService)
    {
        _logger = logger;
        _bus = bus;
        _requestService = requestService;
    }


    [HttpPost]
    public async Task<IActionResult> Create(Request request)
    {
        await _requestService.CreateAsync(request);

        if (request.Assets.Count > 0)
        {
            Uri uri = new Uri("rabbitmq://localhost/requestsQueue");

            var endpoint = await _bus.GetSendEndpoint(uri);

            foreach (var a in request.Assets)
            {
                if (a.Id != null && request.Id != null)
                    await endpoint.Send(new AssetAddedToRequestEvent(a.Id, request.Id));
            }

        }

        return CreatedAtAction(nameof
        (GetAll), new { id = request.Id }, request);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var requests = await _requestService.GetAsync();
        if (requests.Any())
        {
            return Ok(requests);
        }
        return NotFound();
    }

    [HttpGet("{id:length(24)}")]
    public async Task<IActionResult> GetById(string id)
    {
        var request = await _requestService.GetByIdAsync(id);
        if (request == null)
        {
            return NotFound();
        }
        return Ok(request);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Request newRequest)
    {
        var request = await _requestService.GetByIdAsync(id);
        if (request == null)
        {
            return BadRequest();
        }
        newRequest.Id = request.Id;
        newRequest.CreatedAt = request.CreatedAt;
        await _requestService.UpdateAsync(newRequest);
        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var request = await _requestService.GetByIdAsync(id);
        if (request == null)
        {
            return BadRequest();
        }
        await _requestService.DeleteAsync(id);
        return NotFound();
    }
}