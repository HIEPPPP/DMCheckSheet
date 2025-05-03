using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckSheetItem;
using DMCheckSheetAPI.Models.DTO.UserDTO;
using DMCheckSheetAPI.Repositories.Interface;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace DMCheckSheetAPI.Repositories.Implementation
{
    public class UserReposiory : IUserReposiory
    {
        private readonly CheckSheetDbContext context;

        public UserReposiory(CheckSheetDbContext context)
        {
            this.context = context;
        }
        public async Task<User> CreateAsync(User user)
        {
            await context.AddAsync(user);
            await context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> DeleteAsync(string id)
        {
            var existUser = await context.Users.FindAsync(id);
            if (existUser == null) return null;
            context.Users.Remove(existUser);
            await context.SaveChangesAsync();
            return existUser;
        }

        public async Task<List<UserDTO>> GetAllAsync()
        {
            string query = @"SELECT u.Id, u.UserName, u.FullName, u.PasswordHash, r.Id as RoleId, r.Name FROM AspNetUsers as u
                            LEFT JOIN AspNetUserRoles as ur ON u.Id = ur.UserId 
                            LEFT JOIN AspNetRoles as r ON ur.RoleId = r.Id";


            return await context.Database.SqlQueryRaw<UserDTO>(
                                query).ToListAsync();
        }

        public async Task<UserDTO?> GetAsync(string username)
        {
            string query = @"SELECT u.Id, u.UserName, u.FullName, u.PasswordHash, r.Id as RoleId, r.Name FROM AspNetUsers as u
                            LEFT JOIN AspNetUserRoles as ur ON u.Id = ur.UserId 
                            LEFT JOIN AspNetRoles as r ON ur.RoleId = r.Id
                            WHERE u.UserName = @username";
            return await context.Database.SqlQueryRaw<UserDTO>(
                    query,
                    new SqlParameter("@username", username)
                ).FirstOrDefaultAsync();
        }

        public async Task<User?> UpdateAsync(string id, User user)
        {
            var existUser = await context.Users.FindAsync(id);
            if (existUser == null) return null;
            existUser.FullName = user.FullName;
            existUser.UserName = user.UserName;
            await context.SaveChangesAsync();
            return existUser;
        }
    }
}
