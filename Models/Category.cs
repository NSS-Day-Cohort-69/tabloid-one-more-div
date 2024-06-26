using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;

public class Category
{
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; }

    public List<Post> Posts { get; set; }
}