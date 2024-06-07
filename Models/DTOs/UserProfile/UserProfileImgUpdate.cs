using Microsoft.VisualBasic;

namespace Tabloid.Models.DTOs;

public class UserProfileImgUpdateDTO
{
    public string FileName { get; set; }
    public IFormFile FormFile { get; set; }
}