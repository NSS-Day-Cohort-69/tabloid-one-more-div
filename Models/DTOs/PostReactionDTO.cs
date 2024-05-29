using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class PostReactionDTO
{
    [Required]
    public int UserProfileId { get; set; }
    
    [Required]
    public int PostId { get; set; }
    
    [Required]
    public int ReactionId { get; set; }

    public UserProfileDTO UserProfile { get; set; }
    public PostDTO Post { get; set; }
    public ReactionDTO Reaction { get; set; }
}