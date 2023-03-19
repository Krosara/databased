using Assets.Service.Enums;
namespace Assets.Service.Models;

public class Asset {
    public Guid Id {get; set;}
    public string Label {get; set;}
    public string Name {get; set;}
    public Status Status {get; set;}
    public bool IsSoftware {get; set;} = false;
    public DateTime CreatedAt {get; set;} = DateTime.Now;
    public DateTime UpdatedAt {get; set;} = DateTime.Now;

    public Asset(Guid id, string label, string name, Status status, bool isSoftware, DateTime createdAt, DateTime updatedAt){
        Id = id;
        Label = label;
        Name = name;
        Status = status;
        IsSoftware = isSoftware;
        CreatedAt = createdAt;
        UpdatedAt = updatedAt;
    }
}