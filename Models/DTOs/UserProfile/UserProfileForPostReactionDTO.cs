using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Tabloid.Models.DTOs;
public class UserProfileForPostReactionDTO
{
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string FirstName { get; set; }

    [Required]
    [MaxLength(50)]
    public string LastName { get; set; }
    
    [DataType(DataType.Url)]
    [MaxLength(255)]
    public string ImageLocation { get; set; }

    public string FullName
    {
        get
        {
            return $"{FirstName} {LastName}";
        }
    }
    
    public bool IsActive { get; set; }
}