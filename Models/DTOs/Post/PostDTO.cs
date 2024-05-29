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

    public UserProfileForPostDTO UserProfile { get; set; }
    public CategoryNoNavDTO Category { get; set; }
    public List<PostTagForPostDTO> PostTags { get; set; }
    public List<PostReactionForPostDTO> PostReactions { get; set; }
    public List<CommentForPostDTO> Comments { get; set; }
}