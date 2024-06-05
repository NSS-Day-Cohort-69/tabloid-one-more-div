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
public class SubscriptionController : ControllerBase
{
    private TabloidDbContext _dbContext;
    public SubscriptionController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost]
    public IActionResult Subscribe(SubscriptionCreateDTO newSubscription)
    {
        Subscription Subscription = new Subscription()
        {
            CreatorId = newSubscription.CreatorId,
            FollowerId = newSubscription.FollowerId
        };
        _dbContext.Subscriptions.Add(Subscription);
        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpGet("{id}")]
    public IActionResult GetSubByFollowerId(int id)
    {
        List<Subscription> foundSub = _dbContext.Subscriptions.Where(s => s.FollowerId == id).ToList();
        if (foundSub == null)
        {
            return NotFound();
        }

        List<SubscriptionCreateDTO> subDTO = foundSub.Select(fs => new SubscriptionCreateDTO
        {
            CreatorId = fs.CreatorId,
            FollowerId = fs.FollowerId
        }).ToList();

        return Ok(subDTO);
    }

    [HttpDelete]
    public IActionResult Unsubscribe(int creatorId, int followerId)
    {
        Subscription foundSub = _dbContext.Subscriptions.FirstOrDefault(s => s.CreatorId == creatorId && s.FollowerId == followerId);
        if (foundSub == null)
        {
            return NotFound();
        }
        _dbContext.Subscriptions.Remove(foundSub);
        _dbContext.SaveChanges();
        return NoContent();
    }
}