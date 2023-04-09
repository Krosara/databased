namespace Databased.Shared.Models;

public class User : Document
{

    public string? Name { get; set; }

    public bool Disabled { get; set; }

}