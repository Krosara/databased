using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Databased.Shared.Models;

public class User : Document
{

    public string? Name { get; set; }

    public bool Disabled { get; set; }

}

public class UserRef
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string? Name { get; set; }
}