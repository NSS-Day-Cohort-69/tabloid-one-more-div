using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class CategoryCreateDTO
{
    [Required]
    public string Name { get; set; }

}