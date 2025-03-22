using System.ComponentModel.DataAnnotations;

namespace DMCheckSheetAPI.Models.DTO.Device
{
    public class CreateDeviceDTO
    {
        public string DeviceCode { get; set; } = null!;
        public string DeviceName { get; set; } = null!;
        public string Location { get; set; } = null!;
        public int Frequency { get; set; } = 1;
        public string? CreateBy { get; set; }
    }
}
