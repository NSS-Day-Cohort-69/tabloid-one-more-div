using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Models.DTOs;
namespace Tabloid.Controllers;
[ApiController]
[Route("/api/[controller]")]

public class CommentController : ControllerBase  
{
    private TabloidDbContext _dbContext;

    public CommentController(TabloidDbContext context) 
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetAllComments(int postId)
    {
        List<Comment> foundComments = _dbContext.Comments
            .Where(c => c.PostId == postId)
            .Include(c => c.UserProfile)
                .ThenInclude(up => up.IdentityUser)
            .ToList();
        if (foundComments == null) 
        {
            return NotFound();
        }
        List<CommentForPostDTO> commentDTOs = foundComments.Select(c => new CommentForPostDTO
        {
            Id = c.Id, 
            Content = c.Content, 
            PostId = c.PostId, 
            UserProfile = new UserProfileForCommentDTO 
            {
                Id = c.UserProfile.Id, 
                FirstName = c.UserProfile.FirstName, 
                LastName = c.UserProfile.LastName,
                UserName = c.UserProfile.IdentityUser.UserName
            },
            UserProfileId = c.UserProfileId,
            Subject = c.Subject,
            DateCreated = c.DateCreated
        })
        .OrderByDescending(c => c.DateCreated)
        .ToList();

        return Ok(commentDTOs);
    }

    [HttpDelete("{id}")]
    // [Authorize]
    public IActionResult CommentDelete(int id)
    {
        Comment foundComment = _dbContext.Comments.SingleOrDefault(c => c.Id == id);
        if (foundComment == null) 
        {
            return NotFound();
        }
        _dbContext.Comments.Remove(foundComment);
        _dbContext.SaveChanges();

        return NoContent();
    }
}