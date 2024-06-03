using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class ReactionForPostDTO
{
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; }
    
    [Required]
    public string ReactionImage { get; set; }

    public List<PostReactionForPostDTO> PostReactions { get; set; }

    public int PostReactionsCount => PostReactions.Count();
}