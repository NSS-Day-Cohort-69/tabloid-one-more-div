using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class ReactionDTO
{
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; }
    
    [Required]
    public string ReactionImage { get; set; }

    public List<PostReactionDTO> PostReactions { get; set; }
}