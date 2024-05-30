using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class TagCreateDTO
{
    [Required]
    public string Name { get; set; }
}