using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;

public class Reaction
{
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; }
    
    [Required]
    public string ReactionImage { get; set; }

    public List<Post> Posts { get; set; }
}