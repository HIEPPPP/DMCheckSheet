namespace DMCheckSheetAPI.Models.DTO.DeviceType
{
    public class CreateDeviceTypeDTO
    {
        public string TypeCode { get; set; } = null!;
        public string TypeName { get; set; } = null!;
        public string? TypeDesc { get; set; }
        public string? CreateBy { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
    }
}
