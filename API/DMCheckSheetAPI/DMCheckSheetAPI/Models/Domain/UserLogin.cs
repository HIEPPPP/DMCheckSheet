using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMCheckSheetAPI.Models.Domain
{
    [Table("UserLogin")]
    public class UserLogin : ClassBase
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
