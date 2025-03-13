
namespace DMCheckSheetAPI.Models.DTO
{
    public class CreateDetailDTO
    {
        public int ItemId { get; set; }
        public int CheckId { get; set; }
        public bool Status { get; set; } // BoolData
        public int IntData { get; set; }
        public string StringData { get; set; } = null!;
        public string Note { get; set; } = null!;
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public string? CreateBy { get; set; }
    }
}
