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
        public async Task<CheckListItem> CreateAsync(CheckListItem item)
        {
            await context.CheckListItems.AddAsync(item);
            await context.SaveChangesAsync();
            return item;
        }

        public async Task<CheckListItem?> DeleteAsync(int id)
        {
            var existItem = await context.CheckListItems.FindAsync(id);
            if (existItem == null) return null;
            context.CheckListItems.Remove(existItem);
            await context.SaveChangesAsync();
            return existItem;
        }

        public async Task<List<CheckListItem>> GetAllAsync()
        {
            return await context.CheckListItems.AsNoTracking().ToListAsync();
        }

        public async Task<CheckListItem?> GetAsync(int id)
        {
            var existItem = await context.CheckListItems.FindAsync(id);
            if (existItem == null) return null;
            return existItem;

        }

        public async Task<CheckListItem?> UpdateAsync(int id, CheckListItem item)
        {
            var existItem = await context.CheckListItems.FindAsync(id);
            if (existItem == null) return null;
            existItem.DeciveId = item.DeciveId;
            existItem.CheckName = item.CheckName;
            existItem.IsRequire = item.IsRequire;
            existItem.DataType = item.DataType;
            await context.SaveChangesAsync();
            return existItem;
        }
    }
}
