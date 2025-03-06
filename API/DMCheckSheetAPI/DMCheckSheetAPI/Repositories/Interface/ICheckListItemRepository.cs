using DMCheckSheetAPI.Models.Domain;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface ICheckListItemRepository
    {
        Task<List<CheckListItem>> GetAllAsync();
        Task<CheckListItem?> GetAsync(int id);
        Task<CheckListItem> CreateAsync(CheckListItem item);
        Task<CheckListItem?> UpdateAsync(int id, CheckListItem item);
        Task<CheckListItem?> DeleteAsync(int id);
    }
}
