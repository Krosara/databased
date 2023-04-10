using MongoDB.Bson;
using Databased.Shared.Interfaces;
using MongoDB.Bson.Serialization.Attributes;
namespace Databased.Shared.Models;

public class Comment : Document
{
    // [BsonRequired]
    public string? Content { get; set; }
    public UserRef? CreatedBy { get; set; }

    // public Comment(string content, User createdBy)
    // {
    //     Id = ObjectId.GenerateNewId().ToString();
    //     Content = content;
    //     CreatedBy = createdBy;
    //     CreatedAt = DateTime.Now;
    // }
}