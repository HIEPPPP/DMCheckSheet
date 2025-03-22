using System.ComponentModel.DataAnnotations;

namespace DMCheckSheetAPI.Models.Domain
{
    public class CheckSheetMST : ClassBase
    {
        [Key]
        public int SheetId { get; set; }

        [Required]
        [StringLength(255)]
        public string FormNO { get; set; } = null!;

        [Required]
        [StringLength(1000)]
        public string SheetName { get; set; } = null!;
        public bool CancelFlag { get; set; } = false;

        //Navigation Properties
        public ICollection<CheckSheetItemMST>? CheckSheetItemMSTs { get; set; }
        public ICollection<CheckSheetDevice>? CheckSheetDevices { get; set; }
    }
}
