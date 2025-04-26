namespace DMCheckSheetAPI.Models.DTO.ResultAction
{
    public class ResultActionNGDTO
    {
        public int ActionId { get; set; }
        public int ResultId { get; set; }
        public string? SheetCode { get; set; }
        public string? SheetName { get; set; }
        public string? DeviceCode { get; set; }
        public string? DeviceName { get; set; }
        public DateTime? CheckedDate { get; set; }
        public string? CheckedBy { get; set; }
        public string? Content { get; set; }
        public string? ActionTaken { get; set; } // Nội dung khắc phục

        public DateTime? ActionDate { get; set; }

        public string? ConfirmedBy { get; set; }

        public DateTime? ConfirmedDate { get; set; }

        public string? Note { get; set; }
        public string? Value { get; set; }
    }
}
