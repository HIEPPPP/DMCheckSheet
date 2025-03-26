namespace DMCheckSheetAPI.Models.DTO.ResultAction
{
    public class UpdateActionDTO
    {
        public int ResultId { get; set; }
        public string? ActionTaken { get; set; } // Nội dung khắc phục        
        public DateTime? ActionDate { get; set; }
        public string? ConfirmedBy { get; set; }
        public DateTime? ConfirmedDate { get; set; }
        public string? Note { get; set; }
    }
}
