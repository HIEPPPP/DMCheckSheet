using System.ComponentModel.DataAnnotations;

namespace DMCheckSheetAPI.Models.DTO
{
    public class CreateUpdateItemDTO
    {
        public int DeciveId { get; set; }
        public string CheckName { get; set; } = null!;
        public bool IsRequire { get; set; } = true;
        public string DataType { get; set; } = null!;
    }
}
