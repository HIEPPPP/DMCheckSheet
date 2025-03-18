using DMCheckSheetAPI.Constants;
using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckListItem;
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

        public async Task<List<CheckListItemDTO>> GetAllAsync()
        {
            return await context.CheckListItems.Include(i => i.DeviceTypeMST)
                                               .Select(i => new CheckListItemDTO
                                               {
                                                   ItemId = i.ItemId,
                                                   TypeId = i.TypeId,
                                                   TypeCode = i.DeviceTypeMST.TypeCode,
                                                   TypeName = i.DeviceTypeMST.TypeName,
                                                   CheckTitle = i.CheckTitle,
                                                   CheckContext = i.CheckContext,
                                                   IsRequire = i.IsRequire,
                                                   DataType = i.DataType,
                                               }).AsNoTracking().ToListAsync();
        }

        public async Task<CheckListItemDTO?> GetAsync(int id)
        {
            return await context.CheckListItems.Include(i => i.DeviceTypeMST)
                                              .Select(i => new CheckListItemDTO
                                              {
                                                  ItemId = i.ItemId,
                                                  TypeId = i.TypeId,
                                                  TypeCode = i.DeviceTypeMST.TypeCode,
                                                  TypeName = i.DeviceTypeMST.TypeName,
                                                  CheckTitle = i.CheckTitle,
                                                  CheckContext = i.CheckContext,
                                                  IsRequire = i.IsRequire,
                                                  DataType = i.DataType,
                                              }).AsNoTracking().FirstOrDefaultAsync(i => i.ItemId == id);

        }

        public async Task<CheckListItemMST?> UpdateAsync(int id, CheckListItemMST item)
        {
            var existItem = await context.CheckListItems.FindAsync(id);
            if (existItem == null) return null;
            existItem.TypeId = item.TypeId;
            existItem.IsRequire = item.IsRequire;
            existItem.DataType = item.DataType;
            existItem.UpdateAt = item.UpdateAt;
            existItem.UpdateAt = DateTime.Now;
            existItem.UpdateBy = item.UpdateBy;
            await context.SaveChangesAsync();
            return existItem;
        }
    }
}
