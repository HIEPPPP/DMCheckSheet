using System.ComponentModel.DataAnnotations;

namespace DMCheckSheetAPI.Models.Domain
{
    public class UserLogin
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(200)]
        public string Username { get; set; } = null!;
        [Required]
        [StringLength(50)]
        public string Password { get; set; } = null!;
    }
}
