namespace DMCheckSheetAPI.Models.DTO.CheckSheetDevice
{
    public class CheckSheetDeviceDTO
    {
        public int Id { get; set; }
        public int DeviceId { get; set; }
        public int CheckSheetId { get; set; }

        public string? SheetName { get; set; }
        public string? SheetCode { get; set; }
        public string? FormNO { get; set; }
        public int? Frequency { get; set; }
        public string? Location { get; set; }

        public string? DeviceName { get; set; }
        public string? DeviceCode { get; set; }
    }
}
