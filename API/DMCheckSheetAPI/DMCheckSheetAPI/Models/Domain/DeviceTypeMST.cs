using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMCheckSheetAPI.Models.Domain
{
    [Table("DeviceTypeMST")]
    public class DeviceTypeMST : ClassBase
    {
        [Key]
        public int TypeId { get; set; }
        [Required]
        [StringLength(50)]
        public string TypeCode { get; set; } = null!;
        [Required]
        [StringLength(500)]
        public string TypeName { get; set; } = null!;
        public string? TypeDesc { get; set; }          
    }
}
