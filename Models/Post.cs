using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;

public class Post
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
    public DateTime DateCreated { get; set; }
    public DateTime? PublicationDate { get; set; }

    public int EstimatedReadTime
    {
        get
        {
            int wordCount = Content == null ? 0 : Content.Split().Count();
            if (wordCount == 0)
            {
                return 0;
            }

            int timeToRead = (int)Math.Ceiling((decimal) wordCount / 265);
            
            return timeToRead;
        }
    }

    public UserProfile UserProfile { get; set; }
    public Category Category { get; set; }
    public List<PostTag> PostTags { get; set; }
    public List<PostReaction> PostReactions { get; set; }
    public List<Comment> Comments { get; set; }
}