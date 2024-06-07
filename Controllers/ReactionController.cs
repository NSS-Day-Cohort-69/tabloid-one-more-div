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
public class ReactionController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public ReactionController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetAllReactions()
    {
        return Ok(_dbContext.Reactions
        .Select(r => new ReactionNoNavDTO
        {
            Id = r.Id,
            Name = r.Name,
            ReactionImage = r.ReactionImage  
        }));
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public IActionResult ReactionCreate(ReactionCreateDTO newReaction)
    {
        Reaction reactionToCreate = new Reaction()
        {
            Name = newReaction.Name,
            ReactionImage = newReaction.ReactionImage
        };
        
        _dbContext.Reactions.Add(reactionToCreate);
        _dbContext.SaveChanges();
        
        return Created($"/api/reaction/{reactionToCreate.Id}", reactionToCreate);
    }

}