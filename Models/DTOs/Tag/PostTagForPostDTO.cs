using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class PostTagForPostDTO
{
    [Required]
    public int PostId { get; set; }
    
    [Required]
    public int TagId { get; set; }

    public TagNoNavDTO Tag { get; set; }
}