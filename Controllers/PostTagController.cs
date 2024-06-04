using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Tabloid.Models.DTOs;

namespace Tabloid.Controllers;

public class PostTagController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public PostTagController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost]
    [Authorize]
    public IActionResult Update(int postId, int[] tagIds)
    {
        List<PostTag> postTagToRemove = _dbContext.PostTags.Where(pt => pt.PostId == postId).ToList();
        _dbContext.Remove(postTagToRemove);
        _dbContext.SaveChanges();

        tagIds.Select(t => _dbContext.PostTags.Add(
            new PostTag()
            {
                PostId = postId,
                TagId = t
            }
        ));

        _dbContext.SaveChanges();

        return NoContent();
    }
}