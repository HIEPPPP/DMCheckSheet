
namespace DMCheckSheetAPI.Models.DTO.CheckSheet
{
    public class CreateSheetDTO
    {
        public string FormNO { get; set; } = null!;        
        public string SheetCode { get; set; } = null!;
        public string SheetName { get; set; } = null!;
        public string? CreateBy { get; set; }
    }
}
