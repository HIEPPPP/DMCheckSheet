﻿
namespace DMCheckSheetAPI.Models.DTO
{
    public class CreateCheckDTO
    {
        public int DeviceId { get; set; }       
        public string? CheckBy { get; set; }
        public DateTime CheckDate { get; set; } = DateTime.Now;
    }
}
