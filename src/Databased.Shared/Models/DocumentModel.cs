using Databased.Shared.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace Databased.Shared.Models;
public class Document : IDocument
{
    
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;
    public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.Now;

}