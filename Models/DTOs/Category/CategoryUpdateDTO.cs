using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class CategoryUpdateDTO
{
    [Required]
    public string Name { get; set; }

}