using Databased.Shared.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace Databased.Shared.Models;
public class Document : IDocument
{
    
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;

}