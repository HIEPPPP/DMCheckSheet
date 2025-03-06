
namespace DMCheckSheetAPI.Models.DTO
{
    public class CreateUpdateDetailDTO
    {
        public int ItemId { get; set; }
        public int CheckId { get; set; }
        public bool Status { get; set; } // BoolData
        public int IntData { get; set; }
        public string StringData { get; set; } = null!;
        public string Note { get; set; } = null!;
    }
}
