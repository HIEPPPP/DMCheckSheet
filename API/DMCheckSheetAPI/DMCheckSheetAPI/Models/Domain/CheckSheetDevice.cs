using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DMCheckSheetAPI.Models.Domain
{
    public class CheckSheetDevice
    {
        [Key]
        public int Id { get; set; }
        public int CheckSheetId { get; set; }
        public int DeviceId { get; set; }

        //Navigation Properties
        [ForeignKey("CheckSheetId")]
        [JsonIgnore]
        public CheckSheetMST? CheckSheetMST { get; set; }
        [ForeignKey("DeviceId")]
        [JsonIgnore]
        public DeviceMST? DeviceMST { get; set; }
    }
}
