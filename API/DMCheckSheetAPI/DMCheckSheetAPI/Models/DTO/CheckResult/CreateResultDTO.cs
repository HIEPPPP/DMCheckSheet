using System.ComponentModel.DataAnnotations;

namespace DMCheckSheetAPI.Models.DTO.CheckResult
{
    public class CreateResultDTO
    {
        public string? FormNO { get; set; }
        public string? SheetName { get; set; }
        public string? DeviceCode { get; set; }
        public string? DeviceName { get; set; }
        public int Frequency { get; set; }
        public string? Location { get; set; }
        public string? ItemTitle { get; set; }
        public string? ItemName { get; set; }
        public bool IsRequire { get; set; }
        public string? DataType { get; set; }
        public string? Value { get; set; }
        public string? CheckedBy { get; set; }
        public string? Note { get; set; }
    }
}
