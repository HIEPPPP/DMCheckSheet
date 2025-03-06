using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace DMCheckSheetAPI.Repositories.Implementation
{
    public class CheckDetailRepository : ICheckDetailRepository
    {
        private readonly CheckSheetDbContext context;

        public CheckDetailRepository(CheckSheetDbContext context)
        {
            this.context = context;
        }
        public async Task<CheckDetail> CreateAsync(CheckDetail checkDetail)
        {
            await context.CheckDetails.AddAsync(checkDetail);
            await context.SaveChangesAsync();
            return checkDetail;
        }

        public async Task<CheckDetail?> DeleteAsync(int id)
        {
            var existDetail = await context.CheckDetails.FindAsync(id);
            if (existDetail == null) return null;
            context.CheckDetails.Remove(existDetail);
            await context.SaveChangesAsync();
            return existDetail;
        }

        public async Task<List<CheckDetail>> GetAllAsync()
        {
            return await context.CheckDetails.AsNoTracking().ToListAsync(); 
        }

        public async Task<CheckDetail?> GetAsync(int id)
        {
            var existDetail = await context.CheckDetails.FindAsync(id);
            if (existDetail == null) return null;
            return existDetail;
        }

        public async Task<CheckDetail?> UpdateAsync(int id, CheckDetail checkDetail)
        {
            var existDetail = await context.CheckDetails.FindAsync(id);
            if (existDetail == null) return null;
            existDetail.ItemId = checkDetail.ItemId;
            existDetail.CheckId = checkDetail.CheckId;
            existDetail.IntData = checkDetail.IntData;
            existDetail.StringData  = checkDetail.StringData;
            existDetail.Status = checkDetail.Status;
            existDetail.Note = checkDetail.Note;
            await context.SaveChangesAsync();
            return existDetail;
        }
    }
}
