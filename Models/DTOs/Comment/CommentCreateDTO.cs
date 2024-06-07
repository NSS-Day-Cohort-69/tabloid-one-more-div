using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class CommentCreateDTO
{
    [Required]
    public int PostId { get; set; }
    public int UserProfileId { get; set; }
    [Required]
    public string Content { get; set; }
    public string Subject { get; set; }
}