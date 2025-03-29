using DMCheckSheetAPI.Models.Domain;


namespace DMCheckSheetAPI.Models.DTO.CheckSheetItem
{
    public class CreateItemDTO
    {       
        public int SheetId { get; set; }
        public string Content { get; set; } = null!;
        public int? ParentId { get; set; }
        public bool IsRequire { get; set; } = true;
        public string? DataType { get; set; }
        public int? OrderNumber { get; set; }
        public string? CreateBy { get; set; }
    }
}
