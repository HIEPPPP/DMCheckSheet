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

        // Foreign Key
        [Required]
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

        // Navigation Property (Liên kết với DeviceTypeMST)
        [ForeignKey("TypeId")]
        [JsonIgnore]
        public virtual DeviceTypeMST? DeviceType { get; set; }
        public virtual CheckListItemMST? CheckListItem { get; set; }
    }
}
