using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class SubscriptionCreateDTO
{
    [Required]
    public int CreatorId { get; set; }

    [Required]
    public int FollowerId { get; set; }
}