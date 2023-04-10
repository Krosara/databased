namespace Databased.Shared.Models;

public class AssetAddedToRequestEvent
{
    public string? AssetId { get; set; }
    public string? RequestId { get; set; }

    public AssetAddedToRequestEvent(string assetId, string requestId)
    {
        RequestId = requestId;
        AssetId = assetId;
    }
}