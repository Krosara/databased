using Microsoft.AspNetCore.Mvc;
using Databased.Shared.Models;
using MassTransit;

namespace Assets.Service.Controllers;

[ApiController]
[Route("api/assets")]
public class AssetController : ControllerBase
{
    private readonly ILogger<AssetController> _logger;
    private readonly IBus _bus;
    private readonly IAssetService _assetService;

    public AssetController(ILogger<AssetController> logger, IBus bus, IAssetService assetService)
    {
        _logger = logger;
        _bus = bus;
        _assetService = assetService;
    }

    // sending message to rabbitmq
    // [HttpPost]
    // public async Task<IActionResult> CreateAsset(Asset asset) {
    //     if (asset != null) {
    //         Uri uri = new Uri("rabbitmq://localhost/assetQueue");
    //         var endpoint = await _bus.GetSendEndpoint(uri);
    //         await endpoint.Send(asset);
    //         return Ok();
    //     }
        
    //     return BadRequest();
    // }

    [HttpPost]
    public async Task<IActionResult> Create(Asset asset){
        // if (!ModelState.IsValid){
        //     return BadRequest();
        // }
        await _assetService.CreateAsync(asset);
        // return Ok(asset.Id);
        return CreatedAtAction(nameof(GetAll), new { id = asset.Id }, asset);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(){
        var assets = await _assetService.GetAsync();
        if (assets.Any()){
            return Ok(assets);
        }
        return NotFound();

    }

    [HttpGet("{id:length(24)}")]
    public async Task<IActionResult> GetById(string id) {
        var asset = await _assetService.GetByIdAsync(id);
        if (asset == null) {
            return NotFound();
        }
        return Ok(asset);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Asset newAsset){
        var asset = await _assetService.GetByIdAsync(id);
        if (asset == null) {
            return BadRequest();
        }
        newAsset.Id = asset.Id;
        newAsset.CreatedAt = asset.CreatedAt;
        await _assetService.UpdateAsync(newAsset);
        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id) {
        var asset = await _assetService.GetByIdAsync(id);
        if (asset == null) {
            return BadRequest();
        }
        await _assetService.DeleteAsync(id);
        return NotFound();
    }


}
