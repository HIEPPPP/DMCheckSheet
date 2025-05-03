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

        public async Task<List<CheckResult>> EditConfirmBy(List<CheckResult> checkResults)
        {
            var ids = checkResults.Select(r => r.ResultId).ToList();

            var existResults = await context.CheckResults
                                            .Where(r => ids.Contains(r.ResultId))
                                            .ToListAsync();

            foreach (var item in existResults)
            {
                var updateItem = checkResults.FirstOrDefault(u => u.ResultId == item.ResultId);
                if (updateItem != null)
                {
                    item.ConfirmedBy = updateItem.ConfirmedBy;
                }
            }

            await context.SaveChangesAsync();
            return existResults;
        }

        public async Task<List<CheckResult>> EditApproveBy(List<CheckResult> checkResults)
        {
            var ids = checkResults.Select(r => r.ResultId).ToList();
            var existResults = await context.CheckResults
                                            .Where(r => ids.Contains(r.ResultId))
                                            .ToListAsync();
            foreach (var item in existResults)
            {
                var updateItem = checkResults.FirstOrDefault(u => u.ResultId == item.ResultId);
                if (updateItem != null)
                {
                    item.ApprovedBy = updateItem.ApprovedBy;
                }
            }
            await context.SaveChangesAsync();
            return existResults;
        }

        public async Task<List<ResultBySheetCodeAndDateDTO>> GetResultsBySheetAndDateAsync(string sheetCode, string deviceCode, DateTime today)
        {
            var results = await context.CheckResults
                                       .Where(x => x.SheetCode == sheetCode && x.DeviceCode == deviceCode && x.CheckedDate.Date == today.Date)
                                       .Select(x => new ResultBySheetCodeAndDateDTO {
                                           ItemId = x.ItemId,
                                           ResultId = x.ResultId,
                                           Value = x.Value,
                                           IsConfirmNG = x.IsConfirmNG,
                                       })
                                       .ToListAsync();
            return results;
        }

        public async Task<List<ResultTodayDTO>> GetResultTodays(DateTime today)
        {
            return await context.CheckResults.Where(x => x.CheckedDate.Date == today.Date)
                                             .Select(x => new ResultTodayDTO
                                             {
                                                 ResultId = x.ResultId,
                                                 FormNO = x.FormNO,
                                                 SheetCode = x.SheetCode,
                                                 SheetName = x.SheetName,
                                                 DeviceCode = x.DeviceCode,
                                                 DeviceName = x.DeviceName,
                                                 Frequency = x.Frequency,
                                                 Location = x.Location,
                                                 Value = x.Value,
                                                 CheckedDate = x.CheckedDate,
                                                 CheckedBy = x.CheckedBy,
                                                 ItemId = x.ItemId,
                                                 ItemContent = x.CheckSheetItemMST.Content,
                                                 DataType = x.CheckSheetItemMST.DataType,
                                                 Note = x.Note
                                             })
                                             .Where(x => x.DataType != null).AsNoTracking().ToListAsync();

        }

        public async Task<CheckResult?> UpdateIsConfirmNG(int id, CheckResult checkResult)
        {
            var existResult = context.CheckResults.FirstOrDefault(x => x.ResultId == id);
            if (existResult == null) return null;
            existResult.IsConfirmNG = checkResult.IsConfirmNG;
            await context.SaveChangesAsync();
            return existResult;
        }

        public async Task<CheckResult?> GetResultBySheetDeviceToday(string sheetCode, string deviceCode, DateTime today)
        {
            return await context.CheckResults.FirstOrDefaultAsync(x => x.SheetCode == sheetCode && x.DeviceCode == deviceCode && x.CheckedDate == today);
        }
    }
}
