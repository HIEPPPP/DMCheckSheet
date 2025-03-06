using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMCheckSheetAPI.Models.Domain
{
    [Table("Device")]
    public class Device
    {
        [Key]
        public int DeviceId { get; set; }
        public int TypeId { get; set; }
        [Required]
        [StringLength(300)]
        public string FormNO { get; set; } = null!;
        [Required]
        [StringLength(100)]
        public string DeviceCode { get; set; } = null!;
        [Required]
        [StringLength(500)]
        public string DeviceName { get; set; } = null!;
        [StringLength(500)]
        public string Location { get; set; } = null!;
        public int Frequency { get; set; } = 1;
    }
}
