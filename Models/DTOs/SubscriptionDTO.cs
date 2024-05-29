using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class SubscriptionDTO
{
    [Required]
    public int CreatorId { get; set; }
    
    [Required]
    public int FollowerId { get; set; }

    public UserProfileDTO Creator { get; set; }
    public UserProfileDTO Follower { get; set; }
}