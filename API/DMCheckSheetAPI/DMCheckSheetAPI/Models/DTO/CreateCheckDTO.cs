
namespace DMCheckSheetAPI.Models.DTO
{
    public class CreateCheckDTO
    {
        public int DeviceId { get; set; }       
        public string CheckBy { get; set; } = null!;
        public DateTime CheckDate { get; set; } = DateTime.Now;
    }
}
