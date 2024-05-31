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
public class PostController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public PostController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    public IActionResult GetApprovedAndPublished()
    {
        List<PostForListDTO> postDTOs = _dbContext.Posts
            .Where(p => p.IsApproved == true && p.PublicationDate <= DateTime.Now)
            .OrderByDescending(p => p.PublicationDate)
            .Include(p => p.UserProfile)
            .Include(p => p.Category)
            .Include(p => p.PostTags)
            .ThenInclude(pt => pt.Tag)
            .Select(p => new PostForListDTO()
            {
                Id = p.Id,
                UserProfileId = p.UserProfileId,
                CategoryId = p.CategoryId,
                IsApproved = p.IsApproved,
                Title = p.Title,
                PublicationDate = p.PublicationDate,
                UserProfile = new UserProfileForPostDTO()
                {
                    Id = p.UserProfile.Id,
                    FirstName = p.UserProfile.FirstName,
                    LastName = p.UserProfile.LastName,
                    ImageLocation = p.UserProfile.ImageLocation,
                    IsActive = p.UserProfile.IsActive
                }, 
                Category = p.Category == null ? null : new CategoryNoNavDTO()
                {
                    Id = p.Category.Id,
                    Name = p.Category.Name
                },
                Tags = p.PostTags.Select(pt => new TagNoNavDTO()
                {
                    Id = pt.Tag.Id,
                    Name = pt.Tag.Name
                }).ToList()
            })
            .ToList();

        return Ok(postDTOs);
    }
}