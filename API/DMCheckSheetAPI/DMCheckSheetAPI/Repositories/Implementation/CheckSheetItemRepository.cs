using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckSheetItem;
using DMCheckSheetAPI.Repositories.Interface;
using Microsoft.Data.SqlClient;
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

        public async Task<CheckSheetItemMST?> DeleteAsync(int id)
        {
            var existParent = await context.CheckSheetItems.FindAsync(id);
            if (existParent == null) return null;

            await DeleteChildrenAsync(id);

            context.CheckSheetItems.Remove(existParent);
            await context.SaveChangesAsync();

            return existParent;
        }

        // Hàm đệ quy để xóa tất cả cấp con
        private async Task DeleteChildrenAsync(int parentId)
        {
            var childItems = await context.CheckSheetItems.Where(x => x.ParentId == parentId).ToListAsync();

            foreach (var child in childItems)
            {
                await DeleteChildrenAsync(child.ItemId); // Gọi lại chính nó để xóa tiếp cấp con
                context.CheckSheetItems.Remove(child);
            }
        }

        public async Task<List<ItemDTO>> GetAllAsync()
        {
            string query = @"
                            WITH RecursiveCheckSheet AS (
                            -- Lấy danh sách cha (ParentId IS NULL)
                            SELECT 
                                c.SheetId,
                                c.ItemId, 
                                c.ParentId, 
                                c.Content, 
		                        c.OrderNumber,
                                c.DataType,
                                0 AS Level,
                                CAST(c.ItemId AS VARCHAR(MAX)) AS Path,
                                CAST(RIGHT('000' + CAST(ROW_NUMBER() OVER (PARTITION BY c.SheetId ORDER BY c.OrderNumber) AS VARCHAR(MAX)), 3) AS VARCHAR(MAX)) AS OrderPath
                            FROM CheckSheetItemMST c
                            WHERE c.ParentId IS NULL

                            UNION ALL

                            -- Lấy danh sách con và tiếp tục tạo thứ tự OrderPath
                            SELECT 
                                c.SheetId,
                                c.ItemId, 
                                c.ParentId, 
                                c.Content, 
		                        c.OrderNumber,
                                c.DataType,
                                rc.Level + 1, 
                                CAST(rc.Path + '.' + CAST(c.ItemId AS VARCHAR(MAX)) AS VARCHAR(MAX)) AS Path,
                                CAST(rc.OrderPath + '.' + RIGHT('000' + CAST(ROW_NUMBER() OVER (PARTITION BY c.SheetId, c.ParentId ORDER BY c.OrderNumber) AS VARCHAR(MAX)), 3) AS VARCHAR(MAX)) AS OrderPath
                            FROM CheckSheetItemMST c
                            INNER JOIN RecursiveCheckSheet rc ON c.ParentId = rc.ItemId
                        )
                        SELECT cs.SheetId, cs.FormNO, cs.SheetCode, cs.SheetName, r.ItemId, r.ParentId, r.Content, r.OrderNumber, r.DataType, r.Level, r.OrderPath
                        FROM RecursiveCheckSheet as r
                        LEFT JOIN CheckSheetMST as cs ON r.SheetId = cs.SheetId
                        ORDER BY r.SheetId, r.OrderPath;
                        ";

            var result = await context.Database.SqlQueryRaw<ItemDTO>(query).ToListAsync();
            return result;
        }
        public async Task<List<ItemDTO>?> GetAllAsyncByCode(string sheetCode)
        {
            var query = @"
                            WITH RecursiveCheckSheet AS (
                            -- Lấy danh sách cha (ParentId IS NULL)
                            SELECT 
                                c.SheetId,
                                c.ItemId, 
                                c.ParentId, 
                                c.Content, 
		                        c.OrderNumber,
                                c.DataType,
                                0 AS Level,
                                CAST(c.ItemId AS VARCHAR(MAX)) AS Path,
                                CAST(RIGHT('000' + CAST(ROW_NUMBER() OVER (PARTITION BY c.SheetId ORDER BY c.OrderNumber) AS VARCHAR(MAX)), 3) AS VARCHAR(MAX)) AS OrderPath
                            FROM CheckSheetItemMST c
                            INNER JOIN CheckSheetMST cs ON c.SheetId = cs.SheetId
                            WHERE c.ParentId IS NULL AND cs.SheetCode = @SheetCode

                            UNION ALL

                            -- Lấy danh sách con và tiếp tục tạo thứ tự OrderPath
                            SELECT 
                                c.SheetId,
                                c.ItemId, 
                                c.ParentId, 
                                c.Content, 
		                        c.OrderNumber,
                                c.DataType,
                                rc.Level + 1, 
                                CAST(rc.Path + '.' + CAST(c.ItemId AS VARCHAR(MAX)) AS VARCHAR(MAX)) AS Path,
                                CAST(rc.OrderPath + '.' + RIGHT('000' + CAST(ROW_NUMBER() OVER (PARTITION BY c.SheetId, c.ParentId ORDER BY c.OrderNumber) AS VARCHAR(MAX)), 3) AS VARCHAR(MAX)) AS OrderPath
                            FROM CheckSheetItemMST c
                            INNER JOIN RecursiveCheckSheet rc ON c.ParentId = rc.ItemId
                        )
                        SELECT 
                            cs.SheetId, cs.FormNO, cs.SheetCode, cs.SheetName, r.ItemId, r.ParentId, r.Content, r.OrderNumber, r.DataType, r.Level, r.OrderPath
                        FROM RecursiveCheckSheet as r
                        LEFT JOIN CheckSheetMST as cs ON r.SheetId = cs.SheetId
                        ORDER BY r.SheetId, r.OrderPath;";
            return await context.Database.SqlQueryRaw<ItemDTO>(
                                query,
                                new SqlParameter("@SheetCode", sheetCode)
                            ).ToListAsync();
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
            existItem.Content = checkSheetItemMST.Content;
            existItem.ParentId = checkSheetItemMST.ParentId;
            existItem.IsRequire = checkSheetItemMST.IsRequire;
            existItem.DataType = checkSheetItemMST.DataType;
            existItem.OrderNumber = checkSheetItemMST.OrderNumber;
            existItem.UpdateAt = DateTime.Now;
            existItem.UpdateBy = checkSheetItemMST.UpdateBy;
            await context.SaveChangesAsync();
            return existItem;
        }

        public async Task<CheckSheetItemMST?> UpdateCancelFlag(int id)
        {
            var existParent = await context.CheckSheetItems.FirstOrDefaultAsync(x => x.ItemId == id && x.CancelFlag == false);
            if (existParent == null) return null;

            var allItems = await GetAllChildren(id); 
            allItems.ForEach(item => item.CancelFlag = true);

            existParent.CancelFlag = true; 
            await context.SaveChangesAsync();

            return existParent;
        }

        // Lấy tất cả cấp con của một Item theo cách đệ quy
        private async Task<List<CheckSheetItemMST>> GetAllChildren(int parentId)
        {
            var childItems = await context.CheckSheetItems.Where(x => x.ParentId == parentId && x.CancelFlag == false).ToListAsync();
            foreach (var child in childItems)
            {
                childItems.AddRange(await GetAllChildren(child.ItemId));
            }
            return childItems;
        }
    }
}
