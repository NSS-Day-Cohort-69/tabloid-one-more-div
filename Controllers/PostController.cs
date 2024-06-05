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
            .Where(p => p.IsApproved == true && (p.PublicationDate.Value <= DateTime.Now | p.PublicationDate == null))
            .OrderByDescending(p => p.PublicationDate == null ? p.DateCreated : p.PublicationDate)
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
                DateCreated = p.DateCreated,
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

    [HttpGet("{id}")]
    public IActionResult GetSingleApprovedAndPublished(int id)
    {

        List<Reaction> reactions = _dbContext.Reactions.ToList();

        Post foundPost = _dbContext.Posts
            .Where(p => p.IsApproved == true && (p.PublicationDate.Value <= DateTime.Now | p.PublicationDate == null))
            .Include(p => p.UserProfile)
            .Include(p => p.Category)
            .Include(p => p.PostTags)
            .ThenInclude(pt => pt.Tag)
            .Include(p => p.PostReactions)
            .ThenInclude(pr => pr.Reaction)
            .Include(p => p.PostReactions)
            .ThenInclude(pr => pr.UserProfile)
            .Include(p => p.Comments)
            .SingleOrDefault(p => p.Id == id);

        if (foundPost == null)
        {
            return NotFound();
        }

        PostForDetailsDTO postDTO = new PostForDetailsDTO()
        {
            Id = foundPost.Id,
            UserProfileId = foundPost.UserProfileId,
            CategoryId = foundPost.CategoryId,
            IsApproved = foundPost.IsApproved,
            Title = foundPost.Title,
            Content = foundPost.Content,
            HeaderImageURL = foundPost.HeaderImageURL,
            DateCreated = foundPost.DateCreated,
            PublicationDate = foundPost.PublicationDate,
            UserProfile = new UserProfileForPostDTO()
            {
                Id = foundPost.UserProfile.Id,
                FirstName = foundPost.UserProfile.FirstName,
                LastName = foundPost.UserProfile.LastName,
                ImageLocation = foundPost.UserProfile.ImageLocation,
                IsActive = foundPost.UserProfile.IsActive
            },
            Category = foundPost.Category == null ? null : new CategoryNoNavDTO()
            {
                Id = foundPost.Category.Id,
                Name = foundPost.Category.Name
            },
            Tags = foundPost.PostTags.Select(pt => new TagNoNavDTO()
            {
                Id = pt.Tag.Id,
                Name = pt.Tag.Name
            }).ToList(),
            Reactions = reactions.Select(r => new ReactionForPostDTO()
            {
                Id = r.Id,
                Name = r.Name,
                ReactionImage = r.ReactionImage,
                PostReactions = foundPost.PostReactions.Where(pr => pr.ReactionId == r.Id).Select(pr => new PostReactionForPostDTO()
                {
                    UserProfileId = pr.UserProfileId,
                    PostId = pr.PostId,
                    ReactionId = pr.ReactionId,
                    UserProfile = new UserProfileForPostReactionDTO()
                    {
                        Id = pr.UserProfile.Id,
                        FirstName = pr.UserProfile.FirstName,
                        LastName = pr.UserProfile.LastName,
                        ImageLocation = pr.UserProfile.ImageLocation,
                        IsActive = pr.UserProfile.IsActive
                    }
                }).ToList()
            }).ToList(),
            CommentsCount = foundPost.Comments.Count()
        };

        return Ok(postDTO);
    }

    [HttpPost]
    public IActionResult Create(PostCreateDTO post)
    {
        UserProfile foundUserProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == post.UserProfileId);
        if (foundUserProfile == null)
        {
            return NotFound("No User with that Id found!");
        }
        Category foundCategory = _dbContext.Categories.SingleOrDefault(c => c.Id == post.CategoryId);
        if (foundCategory == null)
        {
            return NotFound("No Category with that Id found!");
        }

        Post newPost = new Post()
        {
            UserProfileId = post.UserProfileId,
            CategoryId = post.CategoryId,
            Title = post.Title,
            Content = post.Content,
            HeaderImageURL = post.HeaderImageURL,
            IsApproved = false,
            DateCreated = DateTime.Now,
            PublicationDate = post.PublicationDate
        };

        _dbContext.Posts.Add(newPost);
        _dbContext.SaveChanges();

        PostDTO createdPost = _dbContext.Posts
            .Include(p => p.UserProfile)
            .Include(p => p.Category)
            .Select(p => new PostDTO()
            {
                Id = p.Id,
                Title = p.Title,
                Content = p.Content,
                CategoryId = p.CategoryId,
                UserProfileId = p.UserProfileId,
                DateCreated = p.DateCreated,
                PublicationDate = p.PublicationDate,
                UserProfile = new UserProfileForPostDTO()
                {
                    Id = p.UserProfile.Id,
                    FirstName = p.UserProfile.FirstName,
                    LastName = p.UserProfile.LastName,
                    ImageLocation = p.UserProfile.ImageLocation,
                    IsActive = p.UserProfile.IsActive
                },
                Category = p.CategoryId == null ? null : new CategoryNoNavDTO()
                {
                    Id = p.Category.Id,
                    Name = p.Category.Name
                }
            })
            .SingleOrDefault(p => p.Id == newPost.Id);

        return Created($"posts/{createdPost.Id}", createdPost);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, PostUpdateDTO update)
    {
        Post postToUpdate = _dbContext.Posts.SingleOrDefault(p => p.Id == id);
        if (postToUpdate == null)
        {
            return NotFound();
        }

        postToUpdate.Title = update.Title;
        postToUpdate.Content = update.Content;
        postToUpdate.CategoryId = update.CategoryId;
        postToUpdate.HeaderImageURL = update.HeaderImageURL;

        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpGet("unapproved")]
    public IActionResult GetUnapproved()
    {

        List<Post> postList = _dbContext.Posts
            .Where(p => p.IsApproved == false)
            .Include(p => p.UserProfile)
            .Include(p => p.Category)
            .ToList();

        List<PostsForUnapprovedDTO> postDTOs = postList.Select(p => new PostsForUnapprovedDTO
        {
            Id = p.Id,
            UserProfileId = p.UserProfileId,
            CategoryId = p.CategoryId,
            IsApproved = p.IsApproved,
            Title = p.Title,
            Content = p.Content,
            HeaderImageURL = p.HeaderImageURL,
            DateCreated = p.DateCreated,
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
        }).ToList();

        return Ok(postDTOs);
    }

    [HttpGet("unapprovedCount")]
    public IActionResult GetUnapprovedCount()
    {
        int UnapprovedCount = _dbContext.Posts
            .Where(p => p.IsApproved == false)
            .Count();

        return Ok(UnapprovedCount);
    }

    [HttpPut("{id}/approve")]
    public IActionResult Approve(int id)
    {
        Post postToApprove = _dbContext.Posts.FirstOrDefault(p => p.Id == id);
        if (postToApprove == null)
        {
            return NotFound();
        }

        postToApprove.IsApproved = true;
        _dbContext.SaveChanges();
        return NoContent();

    }

}