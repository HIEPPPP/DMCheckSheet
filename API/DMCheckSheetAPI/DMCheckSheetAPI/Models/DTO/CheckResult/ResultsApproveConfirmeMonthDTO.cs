namespace DMCheckSheetAPI.Models.DTO.CheckResult
{
    public class ResultsApproveConfirmeMonthDTO
    {
        public string? SheetName { get; set; }
        public string? DeviceName { get; set; }
        public string? SheetCode { get; set; }
        public string? DeviceCode { get; set; }
        public int Frequency { get; set; }
        public int IsApproved { get; set; }
        public int IsConfirmedMonth { get; set; }
    }
}
