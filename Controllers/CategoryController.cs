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
public class CategoryController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public CategoryController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public IActionResult GetAllCategories()
    {
        return Ok(_dbContext.Categories
        .OrderBy(c => c.Name)
        .Select(c => new CategoryNoNavDTO
        {
            Id = c.Id,
            Name = c.Name,
            
        }));
    }

    [HttpPost("create")]
    [Authorize]
    public IActionResult CategoryCreate(CategoryCreateDTO newCategory)
    {
        Category categoryToCreate = new Category()
        {
            Name = newCategory.Name
        };
        _dbContext.Categories.Add(categoryToCreate);
        _dbContext.SaveChanges();
        return Created($"/api/category/{categoryToCreate.Id}", categoryToCreate);
    }

    [HttpPut("edit")]
    [Authorize()]

}