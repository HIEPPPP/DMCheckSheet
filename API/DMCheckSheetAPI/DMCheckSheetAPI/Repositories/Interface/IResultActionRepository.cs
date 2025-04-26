using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.ResultAction;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface IResultActionRepository
    {
        Task<List<ResultActionDTO>> GetAllAsync();
        Task<ResultActionDTO?> GetAsync(int id);
        Task<ResultActionDTO?> GetByResultIdAsync(int resultId);
        Task<List<ResultActionNGDTO>> GetAllActionNG();
        Task<ResultAction> CreateAsync(ResultAction action);
        Task<ResultAction?> UpdateAsync(int id, ResultAction action);
        Task<ResultAction?> UpdateByResultIdAsync(int resultId, ResultAction action);
        Task<ResultAction?> DeleteAsync(int id);
    }
}
