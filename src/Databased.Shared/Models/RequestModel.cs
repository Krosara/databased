using Databased.Shared.Enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Databased.Shared.Models;

public class Request : Document
{

    public string? Subject { get; set; }
    public Category Category { get; set; }
    public UserRef? Author { get; set; }
    public UserRef? RequestedBy { get; set; } //Person who submitted request
    public UserRef? RequestedFor { get; set; }  //Person for whom request was submitted, Default: Person RequestedBy
    public Team? Team { get; set; }
    public List<Comment> Comments { get; set; } = new List<Comment>();
    public List<AssetRef> Assets { get; set; } = new List<AssetRef>();
    public DateTimeOffset CompletedAt { get; set; }

}