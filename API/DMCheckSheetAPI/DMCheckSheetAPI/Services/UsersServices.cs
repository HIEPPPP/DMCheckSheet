using AutoMapper;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.UserDTO;
using DMCheckSheetAPI.Repositories.Interface;

namespace DMCheckSheetAPI.Services
{
    public class UsersServices
    {
        private readonly IUserReposiory userReposiory;
        private readonly IMapper mapper;

        public UsersServices(IUserReposiory userReposiory, IMapper mapper)
        {
            this.userReposiory = userReposiory;
            this.mapper = mapper;
        }

        public async Task<List<UserDTO>> GetListUser()
        {
            return await userReposiory.GetAllAsync();
        }

        public async Task<UserDTO?> GetUser(string username)
        {
            return await userReposiory.GetAsync(username);
        }

        public async Task<User?> UpdateUser(string id, UpdateUserDTO updateUserDTO)
        {
            var userDomain = mapper.Map<User>(updateUserDTO);
            return await userReposiory.UpdateAsync(id, userDomain);
        }

        public async Task<User?> DeleteUser(string id)
        {
            return await userReposiory.DeleteAsync(id);
        }
    }
}
