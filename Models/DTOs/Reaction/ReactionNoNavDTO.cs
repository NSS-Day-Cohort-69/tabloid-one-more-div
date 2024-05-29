using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class ReactionNoNavDTO
{
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; }
    
    [Required]
    public string ReactionImage { get; set; }

}