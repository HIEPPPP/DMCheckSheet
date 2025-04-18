using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckResult;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface ICheckResultRepository
    {
        Task<List<CheckResult>> GetAllAsync();
        Task<List<ResultBySheetCodeAndDateDTO>> GetResultsBySheetAndDateAsync(string sheetCode, DateTime today);
        Task<CheckResult?> GetAsync(int id);
        Task<CheckResult> CreateAsync(CheckResult result);
        Task<List<CheckResult>> CreateAsyncs(List<CheckResult> results);
        Task<CheckResult?> UpdateAsync(int id, CheckResult result);
        Task<CheckResult?> DeleteAsync(int id);
        Task<CheckResult?> EditConfirmBy(int id, CheckResult result);
        Task<CheckResult?> EditApproveBy(int id, CheckResult result);
    }
}
