using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckSheetItem;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface ICheckSheetItemRepository
    {
        Task<List<ItemDTO>> GetAllAsync();
        Task<List<ItemDTO>?> GetAllAsyncByCode(string sheetCode);
        Task<CheckSheetItemMST?> GetAsync(int id);
        Task<CheckSheetItemMST> CreateAsync(CheckSheetItemMST checkSheetItemMST);
        Task<CheckSheetItemMST?> UpdateAsync(int id, CheckSheetItemMST checkSheetItemMST);
        Task<CheckSheetItemMST?> DeleteAsync(int id);
        Task<CheckSheetItemMST?> UpdateCancelFlag(int id);
    }
}
