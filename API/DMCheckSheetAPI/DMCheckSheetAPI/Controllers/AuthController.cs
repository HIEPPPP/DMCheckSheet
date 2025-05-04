using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DMCheckSheetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AuthController(UserManager<User> userManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _configuration = configuration;
            _roleManager = roleManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Models.DTO.RegisterRequest model)
        {
            if (await _userManager.FindByNameAsync(model.Username) != null)
                return BadRequest(new { message = "Username already exists!" });

            var user = new User
            {
                UserName = model.Username,
                FullName = model.FullName,
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            if (!string.IsNullOrEmpty(model.Role))
            {
                if (!await _roleManager.RoleExistsAsync(model.Role))
                    await _roleManager.CreateAsync(new IdentityRole(model.Role));

                await _userManager.AddToRoleAsync(user, model.Role);
            }

            return Ok(new { message = "User registered successfully!" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Models.DTO.LoginRequest request)
        {
            var user = await _userManager.FindByNameAsync(request.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
            {
                return Unauthorized(new { message = "Sai tài khoản hoặc mật khẩu!" });
            }

            var roles = await _userManager.GetRolesAsync(user);
            var token = GenerateJwtToken(user, roles);

            return Ok(new
            {
                token,
                username = user.UserName,
                fullName = user.FullName,
                roles
            });
        }

        [HttpPost("change-password")]
        [Authorize] // đảm bảo chỉ người dùng đã đăng nhập mới được đổi mật khẩu
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest model)
        {
            // Lấy user từ token đã đăng nhập
            var username = User.Identity?.Name;
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized(new { message = "Không xác thực được người dùng." });
            }

            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                return Unauthorized(new { message = "Người dùng không tồn tại." });
            }

            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest(new { errors = result.Errors.Select(e => e.Description) });
            }

            return Ok(new { message = "Đổi mật khẩu thành công!" });
        }

        private string GenerateJwtToken(User user, IList<string> roles)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
            };

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
