using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class PostForListDTO
{
    public int Id { get; set; }
    
    [Required]
    public int UserProfileId { get; set; }
    
    public int? CategoryId { get; set; }
    
    [Required]
    public bool IsApproved { get; set; }
    
    [Required]
    public string Title { get; set; }
    
    [Required]
    public string Content { get; set; }
    
    public DateTime DateCreated { get; set; }

    public DateTime? PublicationDate { get; set; }

    public int EstimatedReadTime { get; set; }

    public UserProfileForPostDTO UserProfile { get; set; }
    public CategoryNoNavDTO Category { get; set; }
    public List<TagNoNavDTO> Tags { get; set; }
}