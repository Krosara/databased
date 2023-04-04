using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Databased.Shared.Interfaces;

public interface IDocument {

    string? Id { get; set; }
    DateTime CreatedAt { get; set; }
    DateTime UpdatedAt { get; set; }
}