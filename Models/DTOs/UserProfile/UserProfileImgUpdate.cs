using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Tabloid.Models.DTOs;

public class UserProfileImgUpdateDTO
{
    public string FileName { get; set; }
    public IFormFile FormFile { get; set; }
}