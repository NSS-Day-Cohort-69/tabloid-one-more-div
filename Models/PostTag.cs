using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;

public class PostTag
{
    [Required]
    public int PostId { get; set; }
    
    [Required]
    public int TagId { get; set; }

    public Post Post { get; set; }
    public Tag Tag { get; set; }
}