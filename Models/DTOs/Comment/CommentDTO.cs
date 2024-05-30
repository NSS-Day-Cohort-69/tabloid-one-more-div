using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class CommentDTO
{
    public int Id { get; set; }
    
    [Required]
    public int UserProfileId { get; set; }
    
    [Required]
    public int PostId { get; set; }
    
    [Required]
    public string Content { get; set; }

    public UserProfileDTO UserProfile { get; set; }
    public PostDTO Post { get; set; }
}