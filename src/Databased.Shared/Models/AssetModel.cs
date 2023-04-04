using Databased.Shared.Enums;
using Databased.Shared.Configurations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Databased.Shared.Models;

public class Asset : Document  {

    public string? Label { get; set; }
    // [BsonRequired]
    public string? Name { get; set; }
    public Status Status { get; set; } = Status.InProduction;
    public bool IsSoftware { get; set; } = false;

}