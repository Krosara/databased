using Microsoft.AspNetCore.Mvc;
using Assets.Service.Models;

namespace Assets.Service.Controllers;

[ApiController]
[Route("[controller]")]
public class AssetsController : ControllerBase
{
    private readonly ILogger<AssetsController> _logger;

    public AssetsController(ILogger<AssetsController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetAllAssets")]
    public List<Asset> GetAllAssets()
    {
        return null;
    }
}
