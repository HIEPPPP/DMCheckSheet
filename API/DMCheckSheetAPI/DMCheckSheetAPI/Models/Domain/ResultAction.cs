using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DMCheckSheetAPI.Models.Domain
{
    public class ResultAction
    {
        [Key]
        public int ActionId { get; set; }

        [Required]
        public int ResultId { get; set; }         

        [MaxLength(500)]
        public string? ActionTaken { get; set; } // Nội dung khắc phục

        public DateTime? ActionDate { get; set; }

        [MaxLength(255)]
        public string? ConfirmedBy { get; set; }

        public DateTime? ConfirmedDate { get; set; }

        [MaxLength(500)]
        public string? Note { get; set; }

        //Navigation
        [ForeignKey("ResultId")]
        public CheckResult? CheckResult { get; set; }
    }
}
