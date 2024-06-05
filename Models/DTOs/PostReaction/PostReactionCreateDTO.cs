using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class PostReactionCreateDTO
{
    [Required]
    public int UserProfileId { get; set; }
    
    [Required]
    public int PostId { get; set; }
    
    [Required]
    public int ReactionId { get; set; }
}