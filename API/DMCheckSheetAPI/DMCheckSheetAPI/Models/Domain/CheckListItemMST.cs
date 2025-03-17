using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMCheckSheetAPI.Models.Domain
{
    [Table("CheckListItemMST")]
    public class CheckListItemMST : ClassBase
    {
        [Key]
        public int ItemId { get; set; }
        // Foreign Key
        [Required]
        public int DeviceId { get; set; }    
        public string? CheckTitle { get; set; }
        public string? CheckContext { get; set; }
        [Required]
        [StringLength(1000)]
        public string CheckName { get; set; } = null!;
        public bool IsRequire { get; set; } = true;
        [Required]
        [StringLength(50)]
        public string DataType { get; set; } = null!;

        //Navigation Properties
        [ForeignKey("DeviceId")]
        public virtual DeviceMST? DeviceMST { get; set; }
    }
}
