using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class PostTagDTO
{
    [Required]
    public int PostId { get; set; }
    
    [Required]
    public int TagId { get; set; }

    public PostDTO Post { get; set; }
    public TagDTO Tag { get; set; }
}