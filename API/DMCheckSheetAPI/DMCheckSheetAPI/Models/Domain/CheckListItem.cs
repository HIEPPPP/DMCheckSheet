using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMCheckSheetAPI.Models.Domain
{
    [Table("CheckListItem")]
    public class CheckListItem
    {
        [Key]
        public int ItemId { get; set; }
        public int DeciveId { get; set; }
        public string CheckName { get; set; } = null!;
        public bool IsRequire { get; set; } = true;
        [Required]
        [StringLength(50)]
        public string DataType { get; set; } = null!;

    }
}
