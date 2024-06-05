using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;

public class Comment
{
    public int Id { get; set; }
    
    [Required]
    public int UserProfileId { get; set; }
    
    [Required]
    public int PostId { get; set; }
    
    [Required]
    public string Content { get; set; }

    public UserProfile UserProfile { get; set; }
    public Post Post { get; set; }
    // public string Subject { get; set; }
}