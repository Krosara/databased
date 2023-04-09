using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Databased.Shared.Models;

public class Comment {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    [BsonRequired]
    public string Content { get; set; }
    public User CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; }

    public Comment(string content, User createdBy)
    {
        Id = ObjectId.GenerateNewId().ToString();
        Content = content;
        CreatedBy = createdBy;
        CreatedAt = DateTime.Now;
    }
}