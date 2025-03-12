using DMCheckSheetAPI.Models.Domain;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface ICheckListItemRepository
    {
        Task<List<CheckListItemMST>> GetAllAsync();
        Task<CheckListItemMST?> GetAsync(int id);
        Task<CheckListItemMST> CreateAsync(CheckListItemMST item);
        Task<CheckListItemMST?> UpdateAsync(int id, CheckListItemMST item);
        Task<CheckListItemMST?> DeleteAsync(int id);
    }
}
