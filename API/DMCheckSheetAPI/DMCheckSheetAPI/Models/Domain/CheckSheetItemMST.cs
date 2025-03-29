using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMCheckSheetAPI.Models.Domain
{
    [Table("CheckSheetItemMST")]
    public class CheckSheetItemMST : ClassBase
    {
        [Key]
        public int ItemId { get; set; }
        // Foreign Key
        [Required]
        public int SheetId { get; set; }
        public string Content { get; set; } = null!;
        public int? ParentId { get; set; }
        [StringLength(100)]
        public string? DataType { get; set; }
        public bool IsRequire { get; set; } = true;
        public int? OrderNumber { get; set; }
        public bool CancelFlag { get; set; } = false;

        //Navigation Properties
        [ForeignKey("SheetId")]
        public CheckSheetMST? CheckSheetMST { get; set; }
    }
}
