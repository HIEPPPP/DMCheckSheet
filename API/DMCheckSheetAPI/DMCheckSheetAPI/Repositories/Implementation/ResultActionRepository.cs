using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO;
using DMCheckSheetAPI.Models.DTO.CheckSheetItem;
using DMCheckSheetAPI.Models.DTO.ResultAction;
using DMCheckSheetAPI.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace DMCheckSheetAPI.Repositories.Implementation
{
    public class ResultActionRepository : IResultActionRepository
    {
        private readonly CheckSheetDbContext context;

        public ResultActionRepository(CheckSheetDbContext context)
        {
            this.context = context;
        }

        public async Task<ResultAction> CreateAsync(ResultAction action)
        {
            await context.AddAsync(action);
            await context.SaveChangesAsync();   
            return action;
        }

        public async Task<ResultAction?> DeleteAsync(int id)
        {
            var existAction = await context.ResultActions.FindAsync(id);
            if (existAction == null) return null;
            context.ResultActions.Remove(existAction);
            await context.SaveChangesAsync();
            return existAction;
        }

        public async Task<ResultAction?> DeleteByResultId(int id)
        {
            var existAction = await context.ResultActions.FirstOrDefaultAsync(x => x.ResultId == id);
            if (existAction == null) return null;
            context.ResultActions.Remove(existAction);
            await context.SaveChangesAsync();
            return existAction;
        }

        public async Task<List<ResultActionNGDTO>> GetAllActionNG()
        {
            string query = @"SELECT ra.ActionId, cr.ResultId,  cr.SheetCode, cr.SheetName, cr.DeviceCode, cr.DeviceName, cr.CheckedDate, ct.Content, cr.CheckedBy, ra.ActionTaken, ra.ActionDate, ra.ConfirmedBy, ra.ConfirmedDate, ra.Note, cr.[Value]  from ResultActions as ra
                              LEFT JOIN CheckResults AS cr ON ra.ResultId = cr.ResultId
                              LEFT JOIN CheckSheetItemMST AS ct ON cr.ItemId = ct.ItemId
                              WHERE cr.[Value] = 'NG'
                              ORDER BY cr.CheckedDate";
            return await context.Database.SqlQueryRaw<ResultActionNGDTO>(query).ToListAsync();
        }

        public async Task<List<ResultActionDTO>> GetAllAsync()
        {
            return await context.ResultActions.Include(x => x.CheckResult)
                                              .Select(x => new ResultActionDTO
                                              {
                                                  ActionId = x.ActionId,
                                                  ResultId = x.ResultId,
                                                  CheckedDate = x.CheckResult.CheckedDate,
                                                  CheckedBy = x.CheckResult.CheckedBy,
                                                  ActionDate = x.ActionDate,
                                                  ActionTaken = x.ActionTaken,
                                                  ConfirmedBy = x.ConfirmedBy,
                                                  ConfirmedDate = x.ConfirmedDate,
                                                  Note = x.Note,
                                              }).AsNoTracking().ToListAsync();  
        }

        public async Task<ResultActionDTO?> GetAsync(int id)
        {
            return await context.ResultActions.Include(x => x.CheckResult)
                                              .Select(x => new ResultActionDTO
                                              {
                                                  ActionId = x.ActionId,
                                                  ResultId = x.ResultId,
                                                  CheckedDate = x.CheckResult.CheckedDate,
                                                  CheckedBy = x.CheckResult.CheckedBy,
                                                  ActionDate = x.ActionDate,
                                                  ActionTaken = x.ActionTaken,
                                                  ConfirmedBy = x.ConfirmedBy,
                                                  ConfirmedDate = x.ConfirmedDate,
                                                  Note = x.Note,
                                              })
                                              .FirstOrDefaultAsync(x => x.ActionId == id);
        }

        public async Task<ResultActionDTO?> GetByResultIdAsync(int resultId)
        {
            return await context.ResultActions.Include(x => x.CheckResult)
                                              .Select(x => new ResultActionDTO
                                              {
                                                  ActionId = x.ActionId,
                                                  ResultId = x.ResultId,
                                                  CheckedDate = x.CheckResult.CheckedDate,
                                                  CheckedBy = x.CheckResult.CheckedBy,
                                                  ActionDate = x.ActionDate,
                                                  ActionTaken = x.ActionTaken,
                                                  ConfirmedBy = x.ConfirmedBy,
                                                  ConfirmedDate = x.ConfirmedDate,
                                                  Note = x.Note,
                                              })
                                              .FirstOrDefaultAsync(x => x.ResultId == resultId);
        }

        public async Task<List<ResultActionMonthDTO>> GetListActionByMonth(string sheetCode, string deviceCode, DateTime month)
        {
            string query = @"SELECT ra.ActionId, ra.ResultId, cr.CheckedDate, cr.CheckedBy, i.Content, ra.ActionTaken, ra.ActionDate, ra.ConfirmedBy, ra.ConfirmedDate, ra.Note FROM ResultActions AS ra
                            LEFT JOIN CheckResults AS cr ON ra.ResultId = cr.ResultId
                            LEFT JOIN CheckSheetItemMST AS i ON cr.ItemId = i.ItemId
                            WHERE cr.DeviceCode = @DeviceCode
                                AND cr.SheetCode = @SheetCode
                                AND cr.CheckedDate >= @MonthRef
                                AND cr.CheckedDate <  DATEADD(MONTH, 1, @MonthRef)";
            return await context.Database.SqlQueryRaw<ResultActionMonthDTO>(
                               query,
                               new SqlParameter("@SheetCode", sheetCode),
                               new SqlParameter("@DeviceCode", deviceCode),
                               new SqlParameter("@MonthRef", month)
                           ).ToListAsync();
        }

        public async Task<ResultAction?> UpdateAsync(int id, ResultAction action)
        {
            var existAction = await context.ResultActions.FindAsync(id);
            if (existAction == null) return null;
            existAction.ResultId = action.ResultId;
            existAction.ActionTaken = action.ActionTaken;
            existAction.ActionDate = action.ActionDate;
            existAction.ConfirmedBy = action.ConfirmedBy;
            existAction.ConfirmedDate = action.ConfirmedDate;
            existAction.Note = action.Note;
            await context.SaveChangesAsync();
            return existAction;
        }

        public async Task<ResultAction?> UpdateByResultIdAsync(int resultId, ResultAction action)
        {
            var existAction = await context.ResultActions.FirstOrDefaultAsync(x => x.ResultId == resultId);
            if (existAction == null) return null;
            existAction.ResultId = action.ResultId;
            existAction.ActionTaken = action.ActionTaken;
            existAction.ActionDate = action.ActionDate;
            existAction.ConfirmedBy = action.ConfirmedBy;
            existAction.ConfirmedDate = action.ConfirmedDate;
            existAction.Note = action.Note;
            await context.SaveChangesAsync();
            return existAction;
        }
    }
}
