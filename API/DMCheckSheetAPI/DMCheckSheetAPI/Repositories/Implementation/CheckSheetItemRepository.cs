using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace DMCheckSheetAPI.Repositories.Implementation
{
    public class CheckSheetItemRepository : ICheckSheetItemRepository
    {
        private readonly CheckSheetDbContext context;

        public CheckSheetItemRepository(CheckSheetDbContext context)
        {
            this.context = context;
        }

        public async Task<CheckSheetItemMST> CreateAsync(CheckSheetItemMST checkSheetItemMST)
        {
            await context.CheckSheetItems.AddAsync(checkSheetItemMST);
            await context.SaveChangesAsync();
            return checkSheetItemMST;
        }       

        public async Task<List<CheckSheetItemMST>> GetAllAsync()
        {
            return await context.CheckSheetItems.Where(x => x.CancelFlag == false).AsNoTracking().ToListAsync();
        }

        public async Task<CheckSheetItemMST?> GetAsync(int id)
        {
            return await context.CheckSheetItems.FirstOrDefaultAsync(x => x.ItemId == id && x.CancelFlag == false);
        }

        public async Task<CheckSheetItemMST?> UpdateAsync(int id, CheckSheetItemMST checkSheetItemMST)
        {
            var existItem = await context.CheckSheetItems.FirstOrDefaultAsync(x => x.ItemId == id && x.CancelFlag == false);
            if (existItem == null) return null;
            existItem.SheetId = checkSheetItemMST.SheetId;
            existItem.ItemTitle = checkSheetItemMST.ItemTitle;
            existItem.ItemName = checkSheetItemMST.ItemName;
            existItem.IsRequire = checkSheetItemMST.IsRequire;
            existItem.DataType = checkSheetItemMST.DataType;
            existItem.UpdateAt = DateTime.Now;
            existItem.UpdateBy = checkSheetItemMST.UpdateBy;
            await context.SaveChangesAsync();
            return existItem;
        }

        public async Task<CheckSheetItemMST> UpdateCancelFlagAsync(int id)
        {
            var existItem = await context.CheckSheetItems.FirstOrDefaultAsync(x => x.ItemId == id && x.CancelFlag == false);
            if (existItem == null) return null;
            existItem.CancelFlag = true;
            await context.SaveChangesAsync();
            return existItem;
        }
    }
}
