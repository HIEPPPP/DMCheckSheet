namespace DMCheckSheetAPI.Models.DTO
{
    public class UpdateDeviceTypeDTO
    {
        public string TypeName { get; set; } = null!;
        public string? TypeDesc { get; set; } = null!;
        public string UpdateBy { get; set; } = null!;
        public DateTime UpdateAt { get; set; } = DateTime.Now;
    }
}
