using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public CheckSheetMST? CheckSheetMST { get; set; }
        [ForeignKey("DeviceId")]
        public DeviceMST? DeviceMST { get; set; }
    }
}
