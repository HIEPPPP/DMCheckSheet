using DMCheckSheetAPI.Constants;
using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace DMCheckSheetAPI.Repositories.Implementation
{
    public class CheckListItemRepository : ICheckListItemRepository
    {
        private readonly CheckSheetDbContext context;

        public CheckListItemRepository(CheckSheetDbContext context)
        {
            this.context = context;
        }
        public async Task<CheckListItemMST> CreateAsync(CheckListItemMST item)
        {
            await context.CheckListItems.AddAsync(item);
            await context.SaveChangesAsync();
            return item;
        }

        public async Task<CheckListItemMST?> DeleteAsync(int id)
        {
            var existItem = await context.CheckListItems.FindAsync(id);
            if (existItem == null) return null;
            context.CheckListItems.Remove(existItem);
            await context.SaveChangesAsync();
            return existItem;
        }

        public async Task<List<CheckListItemMST>> GetAllAsync()
        {
            return await context.CheckListItems.AsNoTracking().ToListAsync();
        }

        public async Task<CheckListItemMST?> GetAsync(int id)
        {
            var existItem = await context.CheckListItems.FindAsync(id);
            if (existItem == null) return null;
            return existItem;

        }

        public async Task<CheckListItemMST?> UpdateAsync(int id, CheckListItemMST item)
        {
            var existItem = await context.CheckListItems.FindAsync(id);
            if (existItem == null) return null;
            existItem.DeciveId = item.DeciveId;
            existItem.CheckName = item.CheckName;
            existItem.IsRequire = item.IsRequire;
            existItem.DataType = item.DataType;
            existItem.UpdateAt = item.UpdateAt;
            existItem.UpdateBy = item.UpdateBy;
            existItem.UpdateAt = DateTime.Now;
            existItem.UpdateBy = CheckSheet_Constants.userCode;
            await context.SaveChangesAsync();
            return existItem;
        }
    }
}
