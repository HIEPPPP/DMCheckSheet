using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.UserDTO;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface IUserReposiory
    {
        Task<List<UserDTO>> GetAllAsync();
        Task<UserDTO?> GetAsync(string username);
        Task<User> CreateAsync(User user);
        Task<User?> UpdateAsync(string id, User user);
        Task<User?> DeleteAsync(string id);
    }
}
