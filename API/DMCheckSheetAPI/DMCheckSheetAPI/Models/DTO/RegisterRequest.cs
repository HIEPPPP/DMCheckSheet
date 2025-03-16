namespace DMCheckSheetAPI.Models.DTO
{
    public class RegisterRequest
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Role { get; set; } = null!;  // "Admin" hoặc "User"
    }
}
