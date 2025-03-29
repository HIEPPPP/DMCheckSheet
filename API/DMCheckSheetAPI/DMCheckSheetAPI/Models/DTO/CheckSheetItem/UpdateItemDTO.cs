namespace DMCheckSheetAPI.Models.DTO.CheckSheetItem
{
    public class UpdateItemDTO
    {
        public int SheetId { get; set; }
        public string Content { get; set; } = null!;
        public int? ParentId { get; set; }
        public bool IsRequire { get; set; } = true; 
        public string? DataType { get; set; }
        public int? OrderNumber { get; set; }
        public string? UpdateBy { get; set; }
    }
}
