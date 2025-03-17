namespace DMCheckSheetAPI.Models.DTO.CheckListItem
{
    public class UpdateItemDTO
    {
        public int DeciveId { get; set; }
        public string CheckName { get; set; } = null!;
        public bool IsRequire { get; set; } = true;
        public string DataType { get; set; } = null!;
        public DateTime UpdateAt { get; set; } = DateTime.Now;
        public string? UpdateBy { get; set; }
    }
}
