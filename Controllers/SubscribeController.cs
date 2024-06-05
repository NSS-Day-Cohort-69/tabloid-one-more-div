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
public class SubscribeController : ControllerBase
{
    private TabloidDbContext _dbContext;
    public SubscribeController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost]
    public IActionResult Subscribe(SubscriptionCreateDTO newSubscription)
    {
        Subscription Subsciption = new Subscription()
        {
            CreatorId = newSubscription.CreatorId,
            FollowerId = newSubscription.FollowerId
        };
        _dbContext.Subscriptions.Add(Subsciption);
        _dbContext.SaveChanges();

        return NoContent();
    }
}