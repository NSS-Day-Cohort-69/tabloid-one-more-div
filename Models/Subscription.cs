using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;

public class Subscription
{
    [Required]
    public int CreatorId { get; set; }
    
    [Required]
    public int FollowerId { get; set; }

    public UserProfile Creator { get; set; }
    public UserProfile Follower { get; set; }
}