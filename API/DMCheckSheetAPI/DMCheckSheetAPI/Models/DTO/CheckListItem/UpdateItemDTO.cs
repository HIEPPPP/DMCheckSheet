namespace DMCheckSheetAPI.Models.DTO.CheckListItem
{
    public class UpdateItemDTO
    {
        public int TypeId { get; set; }
        public string? CheckTitle { get; set; }
        public string? CheckContext { get; set; }
        public bool IsRequire { get; set; } = true;
        public string DataType { get; set; } = null!;       
        public DateTime UpdateAt { get; set; } = DateTime.Now;
        public string? UpdateBy { get; set; }
    }
}
