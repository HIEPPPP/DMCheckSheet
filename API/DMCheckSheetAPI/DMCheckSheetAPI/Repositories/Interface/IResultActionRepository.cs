using DMCheckSheetAPI.Models.Domain;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface IResultActionRepository
    {
        Task<List<ResultAction>> GetAllAsync();
        Task<ResultAction?> GetAsync(int id);
        Task<ResultAction> CreateAsync(ResultAction action);
        Task<ResultAction?> UpdateAsync(int id, ResultAction action);
        Task<ResultAction?> DeleteAsync(int id);
    }
}
