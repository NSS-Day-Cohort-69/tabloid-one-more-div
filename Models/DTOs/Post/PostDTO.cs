using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class PostDTO
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
    
    public string HeaderImageURL { get; set; }
    public DateTime? PublicationDate { get; set; }

    public UserProfileDTO UserProfile { get; set; }
    public CategoryDTO Category { get; set; }
    public List<PostTagDTO> PostTags { get; set; }
    public List<PostReactionDTO> PostReactions { get; set; }
    public List<CommentDTO> Comments { get; set; }
}