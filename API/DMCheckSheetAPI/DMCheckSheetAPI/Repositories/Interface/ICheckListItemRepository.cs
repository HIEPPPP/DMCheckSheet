using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckListItem;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface ICheckListItemRepository
    {
        Task<List<CheckListItemDTO>> GetAllAsync();
        Task<CheckListItemDTO?> GetAsync(int id);
        Task<CheckListItemMST> CreateAsync(CheckListItemMST item);
        Task<CheckListItemMST?> UpdateAsync(int id, CheckListItemMST item);
        Task<CheckListItemMST?> DeleteAsync(int id);
    }
}
