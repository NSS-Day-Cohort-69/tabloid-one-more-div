using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class CategoryNoNavDTO
{
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; }

}