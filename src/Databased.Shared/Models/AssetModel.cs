using Databased.Shared.Enums;
using Databased.Shared.Configurations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Databased.Shared.Models;

public class Asset : Document
{

    public string? Label { get; set; } = $"DB{100001}";
    // [BsonRequired]
    public string? Name { get; set; } = "Default asset";
    public StatusAsset Status { get; set; } = StatusAsset.InProduction;
    public bool IsSoftware { get; set; } = false;

}

public class AssetRef
{

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string? Label { get; set; }

    public string? Name { get; set; }
}

public interface IUpdatedAsset
{
    Asset UpdatedAsset { get; }

}