namespace DMCheckSheetAPI.Models.DTO.CheckRecord
{
    public class UpdateCheckDTO
    {
        public int DeviceId { get; set; }
        public string? UpdateBy { get; set; }
        public DateTime UpdateAt { get; set; } = DateTime.Now;
    }
}
