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
        public int TypeId { get; set; }
        public string? CheckTitle { get; set; }
        public string? CheckContext { get; set; }        
        public bool IsRequire { get; set; } = true;
        [Required]
        [StringLength(50)]
        public string DataType { get; set; } = null!;

        //Navigation Properties
        [ForeignKey("TypeId")]
        public virtual DeviceTypeMST? DeviceTypeMST { get; set; }
    }
}
