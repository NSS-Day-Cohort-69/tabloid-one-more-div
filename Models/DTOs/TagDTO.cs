using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class TagDTO
{
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; }

    public List<PostTagDTO> PostTags { get; set; }
}