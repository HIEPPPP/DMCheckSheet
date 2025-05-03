namespace DMCheckSheetAPI.Models.DTO.UserDTO
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string? UserName { get; set; }
        public string? FullName { get; set; }
        public string? Name { get; set; } // Role Name
        public string? RoleId { get; set; }
    }
}
