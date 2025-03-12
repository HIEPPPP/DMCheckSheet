namespace DMCheckSheetAPI.Models.DTO
{
    public class UpdateDetailDTO
    {
        public int ItemId { get; set; }
        public int CheckId { get; set; }
        public bool Status { get; set; } // BoolData
        public int IntData { get; set; }
        public string StringData { get; set; } = null!;
        public string Note { get; set; } = null!;
        public DateTime UpdateAt { get; set; } = DateTime.Now;
        public string UpdateBy { get; set; } = null!;
    }
}
