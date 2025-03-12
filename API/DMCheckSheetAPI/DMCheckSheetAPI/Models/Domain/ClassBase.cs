using System.ComponentModel.DataAnnotations;

namespace DMCheckSheetAPI.Models.Domain
{
    public class ClassBase
    {
        public DateTime CreateAt { get; set; } = DateTime.Now;
        [StringLength(200)]
        public string CreateBy { get; set; } = null!;
        public DateTime UpdateAt { get; set; }
        [StringLength(200)]
        public string UpdateBy { get; set; } = null!;
    }
}
