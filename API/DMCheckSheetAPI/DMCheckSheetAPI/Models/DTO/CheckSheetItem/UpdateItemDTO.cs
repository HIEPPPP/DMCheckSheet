namespace DMCheckSheetAPI.Models.DTO.CheckSheetItem
{
    public class UpdateItemDTO
    {
        public int SheetId { get; set; }
        public string? ItemTitle { get; set; }
        public string? ItemName { get; set; }
        public bool IsRequire { get; set; } = true;
        public string DataType { get; set; } = null!;
        public string? UpdateBy { get; set; }
    }
}
