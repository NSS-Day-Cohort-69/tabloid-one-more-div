using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class ReactionCreateDTO
{
    [Required]
    public string Name { get; set; }
    
    [Required]
    public string ReactionImage { get; set; }
}