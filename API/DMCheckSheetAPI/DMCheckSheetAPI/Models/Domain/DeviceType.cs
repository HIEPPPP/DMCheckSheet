using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMCheckSheetAPI.Models.Domain
{
    [Table("DeviceType")]
    public class DeviceType
    {
        [Key]
        public int TypeId { get; set; }
        [Required]
        [StringLength(500)]
        public string TypeName { get; set; } = null!;
        public string TypeDesc { get; set; } = null!;
    }
}
