using DMCheckSheetAPI.Models;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.UserDTO;
using DMCheckSheetAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DMCheckSheetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UsersServices usersServices;

        public UsersController(UsersServices usersServices)
        {
            this.usersServices = usersServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetListUsers()
        {
            var users = await usersServices.GetListUser();
            return Ok(new ApiResponse<List<UserDTO>>(200, "Success", users));
        }

        [HttpGet("{username}/username")]
        public async Task<IActionResult> GetUserByUsername(string username)
        {
            var user = await usersServices.GetUser(username);
            return user != null ? Ok(new ApiResponse<UserDTO>(200, "Success", user))
                                : NotFound(new ApiResponse<string>(200, "User not found"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsers(string id)
        {
            var user = await usersServices.DeleteUser(id);
            return user != null ? Ok(new ApiResponse<User>(200, "Success", user))
                                : NotFound(new ApiResponse<string>(404, "User not found"));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUsers(string id, [FromBody] UpdateUserDTO updateUserDTO)
        {
            var user = await usersServices.UpdateUser(id, updateUserDTO);
            return user != null ? Ok(new ApiResponse<User>(200, "Updated user", user))
                                : NotFound(new ApiResponse<string>(404, "User not found"));
        }
    }
}
