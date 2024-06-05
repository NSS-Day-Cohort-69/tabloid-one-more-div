using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Tabloid.Models.DTOs;

namespace Tabloid.Controllers;

[ApiController]
[Route("api/[controller]")]
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
        foreach (PostTag postTag in postTagToRemove)
        {
            _dbContext.Remove(postTag);
        }
        _dbContext.SaveChanges();

        foreach (int newTagId in tagIds)
        {
            _dbContext.Add(new PostTag()
            {
                PostId = postId,
                TagId = newTagId

            }
            );
        }

        _dbContext.SaveChanges();

        return NoContent();
    }
}