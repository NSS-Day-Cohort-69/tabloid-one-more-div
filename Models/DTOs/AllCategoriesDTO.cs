using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class AllCategoryDTO
{
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; }

}