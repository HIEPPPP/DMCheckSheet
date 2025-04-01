namespace DMCheckSheetAPI.Models.DTO.CheckSheetItem
{
    public class ItemDTO
    {
        public int? SheetId { get; set; }
        public string? FormNO { get; set; }
        public string? SheetCode { get; set; }
        public string? SheetName { get; set; }
        public int? ItemId { get; set; }
        public int? ParentId { get; set; }
        public string? Content { get; set; }
        public int? OrderNumber { get; set; }
        public string? DataType { get; set; }
        public int? Level { get; set; }
        public string? OrderPath { get; set; }
    }
}
