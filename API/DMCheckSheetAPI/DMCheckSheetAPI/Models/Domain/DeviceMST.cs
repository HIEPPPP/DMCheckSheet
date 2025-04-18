using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DMCheckSheetAPI.Models.Domain
{
    [Table("DeviceMST")]
    public class DeviceMST : ClassBase
    {
        [Key]
        public int DeviceId { get; set; }                  

        [Required]
        [StringLength(255)]
        public string DeviceCode { get; set; } = null!;

        [Required]
        [StringLength(500)]
        public string DeviceName { get; set; } = null!;

        [StringLength(500)]
        public string Location { get; set; } = null!;

        public int Frequency { get; set; } = 1;
        public bool CancelFlag { get; set; } = false;

        //Navigation Properties
        public ICollection<CheckSheetDevice>? CheckSheetDevices { get; set; }
    }
}
