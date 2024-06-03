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
    [Authorize(Roles = "Admin")]
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

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult CategoryDelete(int id)
    {
        Category category = _dbContext.Categories.SingleOrDefault(c => c.Id == id);
        _dbContext.Categories.Remove(category);
        _dbContext.SaveChanges();

        if(category == null)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetCategoryById(int id)
    {
        return Ok(_dbContext.Categories
        .Where(c => c.Id == id)
        .Select(c => new CategoryNoNavDTO
        {
            Id = c.Id,
            Name = c.Name
        }).SingleOrDefault());
    }

    [HttpPut("edit/{id}")]
    [Authorize()]
    public IActionResult CategoryEdit(int id, CategoryUpdateDTO  updatedCategory)
    {
        Category category = _dbContext.Categories.SingleOrDefault(c => c.Id == id);
        
        if(category == null)
        {
            return NotFound();
        }

        category.Name = updatedCategory.Name;
        _dbContext.SaveChanges();
        return NoContent();
    }

}