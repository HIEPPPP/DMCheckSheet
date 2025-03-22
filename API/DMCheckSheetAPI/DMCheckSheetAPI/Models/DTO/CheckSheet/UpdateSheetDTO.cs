namespace DMCheckSheetAPI.Models.DTO.CheckSheet
{
    public class UpdateSheetDTO
    {
        public string FormNO { get; set; } = null!;
        public string SheetName { get; set; } = null!;
        public string? UpdateBy { get; set; }
    }
}
