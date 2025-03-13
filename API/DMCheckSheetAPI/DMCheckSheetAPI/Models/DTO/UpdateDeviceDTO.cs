namespace DMCheckSheetAPI.Models.DTO
{
    public class UpdateDeviceDTO
    {
        public int TypeId { get; set; }
        public string FormNO { get; set; } = null!;
        public string DeviceCode { get; set; } = null!;
        public string DeviceName { get; set; } = null!;
        public string Location { get; set; } = null!;
        public int Frequency { get; set; } = 1;
        public string? UpdateBy { get; set; }
        public DateTime UpdateAt { get; set; } = DateTime.Now;
    }
}
