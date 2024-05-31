using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class CategoryEditDTO
{
    [Required]
    public string Name { get; set; }

}