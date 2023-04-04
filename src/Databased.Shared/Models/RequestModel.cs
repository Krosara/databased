using Databased.Shared.Enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Databased.Shared.Models;

public class Request {
    
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    [BsonRequired]
    public string Subject {get; set;}
    [BsonRequired]
    public Category Category { get; set; }
    [BsonRequired]
    public Person CreatedBy { get; set; }
    [BsonRequired]
    public Person RequestedBy { get; set; } //Person who submitted request
    [BsonRequired]
    public Person RequestedFor { get; set; }  //Person for whom request was submitted, Default: Person RequestedBy
    [BsonRequired]
    public Team Team { get; set; }
    [BsonRequired]
    public List<Comment> Comments { get; set; } = new List<Comment>();
    public List<Asset> Assets { get; set; } = new List<Asset>();
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CompletedAt { get; set; }

    public Request(string subject, Category category, Person createdBy, Person requestedBy, Person requestedFor, Team team, List<Comment> comments)
    {
        Id = ObjectId.GenerateNewId().ToString();
        Subject = subject;
        Category = category;
        CreatedBy = createdBy;
        RequestedBy = requestedBy;
        RequestedFor = requestedFor;
        Team = team;    //list team.members.where(m.id == id)
        Comments = comments;    //list comments.where(m.id == id)
        CreatedAt = DateTime.Now;
        UpdatedAt = DateTime.Now;
    }
    public Request(string subject, Category category, Person createdBy, Person requestedBy, Person requestedFor, Team team, List<Comment> comments, List<Asset> assets)
    {
        Id = ObjectId.GenerateNewId().ToString();
        Subject = subject;
        Category = category;
        CreatedBy = createdBy;
        RequestedBy = requestedBy;
        RequestedFor = requestedFor;
        Team = team;    //list team.members.where(m.id == id)
        Comments = comments;    //list comments.where(m.id == id)
        Assets = assets;    //list assets.where(m.id == id)
        CreatedAt = DateTime.Now;
        UpdatedAt = DateTime.Now;
    }


}