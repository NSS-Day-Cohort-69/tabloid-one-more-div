using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class TagNoNavDTO
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }


}