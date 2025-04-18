namespace DMCheckSheetAPI.Models.DTO.CheckResult
{
    public class UpdateResultDTO
    {
        //public string? FormNO { get; set; }
        //public string? SheetName { get; set; }
        //public string? DeviceCode { get; set; }
        //public string? DeviceName { get; set; }
        //public int Frequency { get; set; }
        //public string? Location { get; set; }
        //public string? ItemTitle { get; set; }
        //public string? ItemName { get; set; }
        //public bool IsRequire { get; set; }
        //public string? DataType { get; set; }
        public string? Value { get; set; }
        public string? UpdateBy { get; set; }
        public DateTime? UpdateAt { get; set; } = DateTime.Now;
        //public string? Note { get; set; }
        //public string? ComfirmBy { get; set; }
        //public string? ApproveBy { get; set; }
    }
}
