using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMCheckSheetAPI.Models.Domain
{
    public class CheckResult
    {
        [Key]
        public int ResultId { get; set; }
        [StringLength(255)]
        public string? FormNO { get; set; }
        public string? SheetCode { get; set; }
        [StringLength(1000)]
        public string? SheetName { get; set; }
        [StringLength(255)]
        public string? DeviceCode { get; set; }
        [StringLength(1000)]
        public string? DeviceName { get; set; }        
        public int Frequency { get; set; }
        [StringLength(1000)]
        public string? Location { get; set; }
        [StringLength(1000)]
        //public string? ItemTitle { get; set; }
        //[StringLength(1000)]
        //public string? ItemName { get; set; }
        public int ItemId { get; set; }
        //public bool IsRequire { get; set; }
        //[StringLength(255)]
        //public string? DataType { get; set; }
        [StringLength(255)]
        public string? Value { get; set; }
        public DateTime CheckedDate { get; set; } = DateTime.Now;
        [StringLength(255)]
        public string? CheckedBy { get; set; }
        public DateTime UpdateAt { get; set; } = DateTime.Now;
        public string? UpdateBy { get; set; }
        [StringLength(255)]
        public string? ConfirmedBy { get; set; }
        [StringLength(255)]
        public string? ApprovedBy { get; set; }
        [StringLength(255)]
        public string? ConfirmedMonthBy { get; set; }
        public Boolean IsConfirmNG { get; set; } = false;
        [StringLength(1000)]
        public string? Note { get; set; }

        //Navigation Properties
        [ForeignKey("ItemId")]
        public CheckSheetItemMST? CheckSheetItemMST { get; set; }
        public ResultAction? ResultActions { get; set; }
    }
}
