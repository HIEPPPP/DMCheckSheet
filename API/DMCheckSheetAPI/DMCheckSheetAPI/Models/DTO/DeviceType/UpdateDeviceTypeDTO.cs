namespace DMCheckSheetAPI.Models.DTO.DeviceType
{
    public class UpdateDeviceTypeDTO
    {
        public string TypeCode { get; set; } = null!;
        public string TypeName { get; set; } = null!;
        public string? TypeDesc { get; set; } = null!;
        public string? UpdateBy { get; set; }
        public DateTime UpdateAt { get; set; } = DateTime.Now;
    }
}
