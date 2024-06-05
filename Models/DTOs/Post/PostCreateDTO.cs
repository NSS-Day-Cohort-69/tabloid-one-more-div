using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class PostCreateDTO
{
    [Required]
    public int UserProfileId { get; set; }
    
    public int? CategoryId { get; set; }
    
    [Required]
    public string Title { get; set; }
    
    [Required]
    public string Content { get; set; }
    
    public string HeaderImageURL { get; set; }

    public DateTime? PublicationDate { get; set; }
}