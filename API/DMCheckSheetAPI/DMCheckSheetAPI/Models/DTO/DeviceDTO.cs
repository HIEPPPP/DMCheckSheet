namespace DMCheckSheetAPI.Models.DTO
{
    public class DeviceDTO
    {
        public int DeviceId { get; set; }
        public string TypeName { get; set; } = null!;
        public string FormNO { get; set; } = null!;
        public string DeviceCode { get; set; } = null!;
        public string DeviceName { get; set; } = null!;
        public string Location { get; set; } = null!;
        public int Frequency { get; set; } = 1;
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public string? CreateBy { get; set; }
    }
}
