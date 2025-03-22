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
        public string? ItemTitle { get; set; }
        public string? ItemName { get; set; }        
        public bool IsRequire { get; set; } = true;
        [Required]
        [StringLength(50)]
        public string DataType { get; set; } = null!;
        public bool CancelFlag { get; set; } = false;

        //Navigation Properties
        [ForeignKey("SheetId")]
        public CheckSheetMST? CheckSheetMST { get; set; }
    }
}
