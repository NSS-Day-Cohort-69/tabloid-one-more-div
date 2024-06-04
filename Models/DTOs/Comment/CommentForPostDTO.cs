using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class CommentForPostDTO
{
    public int Id { get; set; }
    
    [Required]
    public int UserProfileId { get; set; }
    
    [Required]
    public int PostId { get; set; }
    
    [Required]
    public string Content { get; set; }

    public DateTime DateCreated { get; set; }

    public UserProfileForCommentDTO UserProfile { get; set; }
}