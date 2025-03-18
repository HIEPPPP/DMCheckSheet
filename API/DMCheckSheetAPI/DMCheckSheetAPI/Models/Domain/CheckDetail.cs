using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMCheckSheetAPI.Models.Domain
{
    [Table("CheckDetail")]
    public class CheckDetail : ClassBase
    {
        [Key]
        public int DetailId { get; set; }
        //Foreign Key
        [Required]
        public int ItemId { get; set; }
        //Foreign Key
        [Required]
        public int CheckId { get; set; }
        public bool? BoolData { get; set; }
        public float? NumData { get; set; }
        public string? StringData { get; set; }
        public string? Reason { get; set; }
        public string? Policy { get; set; }
        public string? Note { get; set; }

        //Navigation Properties
        [ForeignKey("ItemId")]               
        public virtual CheckListItemMST? CheckListItemMST { get; set; }
        [ForeignKey("CheckId")]
        public virtual CheckRecord? CheckRecord { get; set; }
    }
}
