namespace DMCheckSheetAPI.Models.DTO
{
    public class UpdateCheckDTO
    {
        public int DeviceId { get; set; }
        public string UpdateBy { get; set; } = null!;
        public DateTime UpdateAt { get; set; } = DateTime.Now;
    }
}
