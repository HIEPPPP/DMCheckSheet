using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMCheckSheetAPI.Models.Domain
{
    [Table("CheckDetail")]
    public class CheckDetail
    {
        [Key]
        public int DetailId { get; set; }
        [Required]
        public int ItemId { get; set; }
        [Required]
        public int CheckId { get; set; }
        public bool Status { get; set; } // BoolData
        public int IntData { get; set; }
        public string StringData { get; set; } = null!;
        public string Note { get; set; } = null!;
    }
}
