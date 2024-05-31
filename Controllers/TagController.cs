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
public class TagController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public TagController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Tags
        .OrderBy(t => t.Name)
        .Select(t => new TagNoNavDTO
        {
            Id = t.Id,
            Name = t.Name
        }));
    }


    [HttpPost]
    [Authorize]
    public IActionResult CreateTag(TagCreateDTO newTag)
    {
        Tag createdTag = new Tag()
        {
            Name = newTag.Name
        };
        _dbContext.Tags.Add(createdTag);
        _dbContext.SaveChanges();
        return Created($"/api/tag/{createdTag.Id}", createdTag);
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetTagById(int id)
    {
        return Ok(_dbContext.Tags
        .Where(t => t.Id == id)
        .Select(t => new TagNoNavDTO
        {
            Id = t.Id,
            Name = t.Name
        }).SingleOrDefault());
    }

    [HttpPut("{id}")]
    [Authorize]
    public IActionResult UpdateATag(TagUpdateDTO newTag, int id)
    {
        Tag tagToUpdate = _dbContext.Tags.FirstOrDefault(t => t.Id == id);

        tagToUpdate.Name = newTag.Name;
        _dbContext.SaveChanges();
        return NoContent();
    }
}