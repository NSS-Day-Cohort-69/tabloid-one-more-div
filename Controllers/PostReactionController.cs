using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Tabloid.Models;
using Tabloid.Models.DTOs;

namespace Tabloid.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PostReactionController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public PostReactionController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost]
    public IActionResult Create(PostReactionCreateDTO newPostReaction)
    {
        PostReaction existingPostReaction = _dbContext.PostReactions.SingleOrDefault(
            pr => pr.UserProfileId == newPostReaction.UserProfileId
            && (pr.PostId == newPostReaction.PostId)
            && pr.ReactionId == newPostReaction.ReactionId);
        if (existingPostReaction != null)
        {
            return Conflict("You have already Reacted to this Post like that!");
        }
        
        PostReaction postReaction = new PostReaction()
        {
            UserProfileId = newPostReaction.UserProfileId,
            PostId = newPostReaction.PostId,
            ReactionId = newPostReaction.ReactionId
        };
        _dbContext.PostReactions.Add(postReaction);
        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpDelete]
    public IActionResult Delete(int? reactionId, int? userProfileId, int? postId)
    {
        if (reactionId == null)
        {
            return BadRequest("You didn't specify which Reaction is being used!");
        }
        if (userProfileId == null)
        {
            return BadRequest("You didn't specify who is Reacting!");
        }
        if (postId == null)
        {
            return BadRequest("You didn't specify which Post is being Reacted to!");
        }
        
        PostReaction postReactionToDelete = _dbContext.PostReactions.SingleOrDefault(
            pr => pr.UserProfileId == userProfileId
            && pr.PostId == postId
            && pr.ReactionId == reactionId);

        if (postReactionToDelete == null)
        {
            return BadRequest("No Reaction for this Post exists for you!");
        }

        _dbContext.PostReactions.Remove(postReactionToDelete);
        _dbContext.SaveChanges();

        return NoContent();
    }

}