using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class PostReactionForPostDTO
{
    [Required]
    public int UserProfileId { get; set; }
    
    [Required]
    public int PostId { get; set; }
    
    [Required]
    public int ReactionId { get; set; }

    public UserProfileForPostReactionDTO UserProfile { get; set; }
    public ReactionNoNavDTO Reaction { get; set; }
}