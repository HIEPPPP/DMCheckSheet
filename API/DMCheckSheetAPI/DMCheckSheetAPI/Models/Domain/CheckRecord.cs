using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMCheckSheetAPI.Models.Domain
{
    [Table("CheckRecord")]
    public class CheckRecord
    {       
        [Key]
        public int CheckId { get; set; }
        public int DeviceId { get; set; }
        [Required]
        [StringLength(200)]
        public string CheckBy { get; set; } = null!;
        public DateTime CheckDate { get; set; }
        public string UpdateBy { get; set; } = null!;
        public DateTime UpdateAt { get; set; }
    }
}
