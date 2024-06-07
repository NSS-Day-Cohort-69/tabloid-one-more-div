using System.Net;
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

    [HttpPost]
    [Authorize]
    public IActionResult CommentCreate(CommentCreateDTO newComment)
    {

        Post post = _dbContext.Posts.SingleOrDefault(p => p.Id == newComment.PostId);
        if (post == null)
        {
            return NotFound($"Post with ID {newComment.PostId} not found");
        }

        UserProfile userProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == newComment.UserProfileId);
        if (userProfile == null)
        {
            return NotFound($"User with ID {newComment.UserProfileId} not found");
        }

        Comment commentToCreate = new Comment()
        {
            Content = newComment.Content,
            Subject = newComment.Subject,
            PostId = newComment.PostId,
            UserProfileId = newComment.UserProfileId,
            DateCreated = DateTime.Now
        };

        _dbContext.Comments.Add(commentToCreate);
        _dbContext.SaveChanges();

        return Created($"/api/comment/{commentToCreate.Id}", commentToCreate);

    }

    [HttpDelete("{id}")]
    [Authorize]
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

    [HttpPut("{id}")]
    [Authorize]
    public IActionResult CommentEdit(int id, CommentUpdateDTO updatedComment)
    {
        Comment comment = _dbContext.Comments.SingleOrDefault(c => c.Id == id);

        if(comment == null)
        {
            return NotFound();
        }

        comment.Content = updatedComment.Content;
        comment.Subject = updatedComment.Subject;

        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetCommentById(int id)
    {
        return Ok(_dbContext.Comments
        .Where(c => c.Id == id)
        .Include(c => c.UserProfile)
            .ThenInclude(up => up.IdentityUser)
        .Select(c => new CommentForPostDTO
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
            
        }).SingleOrDefault());
    }

}