using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class CategoryDTO
{
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; }

    public List<PostDTO> Posts { get; set; }
}