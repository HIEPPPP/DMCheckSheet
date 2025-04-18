using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckResult;
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
            await context.AddAsync(result);
            await context.SaveChangesAsync();
            return result;
        }
        public async Task<List<CheckResult>> CreateAsyncs(List<CheckResult> results)
        {
            await context.AddRangeAsync(results);
            await context.SaveChangesAsync();
            return results;
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
            existResult.Value = result.Value;   
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

        public async Task<List<ResultBySheetCodeAndDateDTO>> GetResultsBySheetAndDateAsync(string sheetCode, DateTime today)
        {
            var results = await context.CheckResults
                                       .Where(x => x.SheetCode == sheetCode && x.CheckedDate.Date == today.Date)
                                       .Select(x => new ResultBySheetCodeAndDateDTO {
                                           ItemId = x.ItemId,
                                           ResultId = x.ResultId,
                                           Value = x.Value,
                                       })
                                       .ToListAsync();
            return results;
        }
    }
}
