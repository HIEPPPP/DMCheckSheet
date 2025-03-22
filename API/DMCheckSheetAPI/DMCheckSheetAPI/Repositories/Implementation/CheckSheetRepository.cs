using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace DMCheckSheetAPI.Repositories.Implementation
{
    public class CheckSheetRepository : ICheckSheetRepository
    {
        private readonly CheckSheetDbContext context;

        public CheckSheetRepository(CheckSheetDbContext context)
        {
            this.context = context;
        }
        public async Task<CheckSheetMST> CreateAsync(CheckSheetMST checkSheetMST)
        {
            await context.CheckSheets.AddAsync(checkSheetMST);
            await context.SaveChangesAsync();
            return checkSheetMST;
        }

        public async Task<List<CheckSheetMST>> GetAllAsync()
        {
            return await context.CheckSheets.Where(x => x.CancelFlag == false).AsNoTracking().ToListAsync();
        }

        public async Task<CheckSheetMST?> GetAsync(int id)
        {
            return await context.CheckSheets.FirstOrDefaultAsync(x => x.SheetId == id && x.CancelFlag == false);
        } 

        public async Task<CheckSheetMST?> UpdateAsync(int id, CheckSheetMST checkSheetMST)
        {
            var existCheckSheet = await context.CheckSheets.FirstOrDefaultAsync(x => x.SheetId == id && x.CancelFlag == false);
            if (existCheckSheet == null) return null;
            existCheckSheet.FormNO = checkSheetMST.FormNO;
            existCheckSheet.SheetName = checkSheetMST.SheetName;
            existCheckSheet.UpdateAt = DateTime.Now;
            existCheckSheet.UpdateBy = checkSheetMST.UpdateBy;
            await context.SaveChangesAsync();
            return existCheckSheet;
        }

        public async Task<CheckSheetMST?> UpdateCancelFlagAsync(int id)
        {
            var existCheckSheet = await context.CheckSheets.FirstOrDefaultAsync(x => x.SheetId == id && x.CancelFlag == false);
            if (existCheckSheet == null) return null;
            existCheckSheet.CancelFlag = true;
            await context.SaveChangesAsync();
            return existCheckSheet;
        }
    }
}
