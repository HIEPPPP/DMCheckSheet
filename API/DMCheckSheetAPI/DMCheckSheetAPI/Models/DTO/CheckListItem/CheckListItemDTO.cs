using DMCheckSheetAPI.Models.Domain;

namespace DMCheckSheetAPI.Models.DTO.CheckListItem
{
    public class CheckListItemDTO
    {
        public int ItemId { get; set; }
        public int TypeId { get; set; }
        public string? TypeCode { get; set; }    
        public string? TypeName { get; set; }
        public string? CheckTitle { get; set; }
        public string? CheckContext { get; set; }
        public bool IsRequire { get; set; } = true;
        public string DataType { get; set; } = null!;
    }

}
