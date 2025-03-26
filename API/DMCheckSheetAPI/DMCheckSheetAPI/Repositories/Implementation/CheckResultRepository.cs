using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace DMCheckSheetAPI.Repositories.Implementation
{
    public class CheckResultRepository : ICheckResultRepository
    {
        private readonly CheckSheetDbContext context;

        public CheckResultRepository(CheckSheetDbContext context)
        {
            this.context = context;
        }

        public async Task<CheckResult> CreateAsync(CheckResult result)
        {
            await context.AddRangeAsync(result);
            await context.SaveChangesAsync();
            return result;
        }

        public async Task<List<CheckResult>> GetAllAsync()
        {
            return await context.CheckResults.AsNoTracking().ToListAsync();
        }

        public async Task<CheckResult?> GetAsync(int id)
        {
            return await context.CheckResults.FindAsync(id);
        }

        public async Task<CheckResult?> UpdateAsync(int id, CheckResult result)
        {
            var existResult = await context.CheckResults.FindAsync(id);
            if (existResult == null) return null;
            existResult.FormNO = result.FormNO;
            existResult.SheetName = result.SheetName;
            existResult.DeviceCode = result.DeviceCode; 
            existResult.DeviceName = result.DeviceName;
            existResult.Frequency = result.Frequency;
            existResult.Location = result.Location;
            existResult.ItemTitle = result.ItemTitle;
            existResult.ItemName = result.ItemName;
            existResult.IsRequire = result.IsRequire;
            existResult.DataType = result.DataType;
            existResult.Value = result.Value;   
            existResult.ConfirmedBy = result.ConfirmedBy;   
            existResult.ApprovedBy = result.ApprovedBy;
            existResult.Note = result.Note;
            existResult.UpdateBy = result.UpdateBy;
            existResult.UpdateAt = DateTime.Now;
            await context.SaveChangesAsync();
            return existResult;
        }

        public async Task<CheckResult?> DeleteAsync(int id)
        {
            var existResult = await context.CheckResults.FindAsync(id);
            if (existResult == null) return null;
            context.CheckResults.Remove(existResult);
            await context.SaveChangesAsync();
            return existResult;
        }

        public async Task<CheckResult?> EditConfirmBy(int id, CheckResult result)
        {
            var existResult = await context.CheckResults.FindAsync(id);
            if (existResult == null) return null;
            existResult.ConfirmedBy = result.ConfirmedBy;
            await context.SaveChangesAsync();
            return existResult;
        }

        public async Task<CheckResult?> EditApproveBy(int id, CheckResult result)
        {
            var existResult = await context.CheckResults.FindAsync(id);
            if (existResult == null) return null;
            existResult.ApprovedBy = result.ApprovedBy;
            await context.SaveChangesAsync();
            return existResult;
        }
    }
}
