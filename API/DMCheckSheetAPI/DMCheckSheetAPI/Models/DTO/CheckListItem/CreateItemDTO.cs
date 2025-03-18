using System.ComponentModel.DataAnnotations;

namespace DMCheckSheetAPI.Models.DTO.CheckListItem
{
    public class CreateItemDTO
    {    
        public int TypeId { get; set; }
        public string? CheckTitle { get; set; }
        public string? CheckContext { get; set; }
        public bool IsRequire { get; set; } = true;
        public string DataType { get; set; } = null!;
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public string? CreateBy { get; set; }
    }
}
