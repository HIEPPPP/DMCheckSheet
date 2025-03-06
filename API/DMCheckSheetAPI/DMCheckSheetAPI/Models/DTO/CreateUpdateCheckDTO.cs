
namespace DMCheckSheetAPI.Models.DTO
{
    public class CreateUpdateCheckDTO
    {
        public int DeviceId { get; set; }       
        public string CheckBy { get; set; } = null!;
        public DateTime CheckDate { get; set; }
    }
}
