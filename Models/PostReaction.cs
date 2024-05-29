using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;

public class PostReaction
{
    [Required]
    public int UserProfileId { get; set; }
    
    [Required]
    public int PostId { get; set; }
    
    [Required]
    public int ReactionId { get; set; }

    public UserProfile UserProfile { get; set; }
    public Post Post { get; set; }
    public Reaction Reaction { get; set; }
}