using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DMCheckSheetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly CheckSheetDbContext context;

        public AuthController(CheckSheetDbContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserLogin request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "Vui lòng nhập đầy đủ thông tin đăng nhập." });
            }

            var user = await context.UserLogins.FirstOrDefaultAsync(x => x.Username == request.Username && x.Password == request.Password);
            if (user == null)
            {
                return Unauthorized(new { message = "Sai tài khoản hoặc mật khẩu." });
            }

            return Ok(new { message = "Đăng nhập thành công!", username = request.Username });
        }
    }
}
