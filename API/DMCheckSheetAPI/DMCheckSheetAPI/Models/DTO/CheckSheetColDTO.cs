namespace DMCheckSheetAPI.Models.DTO
{
    public class CheckSheetColDTO
    {
        public DateTime? FileTime { get; set; }
        public string? QtyEnter { get; set; }
        public string? TotalEnter { get; set; }
        public string? ConfirmedBy { get; set; }
        public string? QtyOut { get; set; }
        public string? TotalRemaining { get; set; }
        public string? CheckedBy { get; set; }
        public string? Department { get; set; }
    }
}
