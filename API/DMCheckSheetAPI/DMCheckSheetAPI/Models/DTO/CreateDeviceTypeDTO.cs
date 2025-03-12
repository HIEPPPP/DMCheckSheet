namespace DMCheckSheetAPI.Models.DTO
{
    public class CreateDeviceTypeDTO
    {
        public string TypeName { get; set; } = null!;
        public string? TypeDesc { get; set; } = null!;
        public string CreateBy { get; set; } = null!;
        public DateTime CreateAt { get; set; } = DateTime.Now;
    }
}
