using System.ComponentModel.DataAnnotations;

namespace DMCheckSheetAPI.Models.DTO
{
    public class UserLoginDTO
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
