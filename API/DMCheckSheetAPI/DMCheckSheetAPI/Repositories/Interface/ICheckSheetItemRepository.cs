using DMCheckSheetAPI.Models.Domain;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface ICheckSheetItemRepository
    {
        Task<List<CheckSheetItemMST>> GetAllAsync();
        Task<CheckSheetItemMST> GetAsync(int id);
        Task<CheckSheetItemMST> CreateAsync(CheckSheetItemMST checkSheetItemMST);
        Task<CheckSheetItemMST> UpdateAsync(int id, CheckSheetItemMST checkSheetItemMST);
        Task<CheckSheetItemMST> UpdateCancelFlagAsync(int id);
    }
}
