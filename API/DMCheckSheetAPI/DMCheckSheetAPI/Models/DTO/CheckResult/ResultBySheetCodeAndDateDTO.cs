namespace DMCheckSheetAPI.Models.DTO.CheckResult
{
    public class ResultBySheetCodeAndDateDTO
    {
        public int ItemId { get; set; }
        public int ResultId { get; set; }
        public string? Value { get; set; }
        public bool IsConfirmNG { get; set; }
    }
}
