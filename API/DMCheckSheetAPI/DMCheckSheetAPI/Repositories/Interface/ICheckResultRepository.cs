using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckResult;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface ICheckResultRepository
    {
        Task<List<CheckResult>> GetAllAsync();
        Task<List<ResultBySheetCodeAndDateDTO>> GetResultsBySheetAndDateAsync(string sheetCode, string deviceCode, DateTime today);
        Task<List<ResultTodayDTO>> GetResultTodays(DateTime today);
        Task<CheckResult?> GetAsync(int id);
        Task<CheckResult> CreateAsync(CheckResult result);
        Task<List<CheckResult>> CreateAsyncs(List<CheckResult> results);
        Task<CheckResult?> UpdateAsync(int id, CheckResult result);
        Task<CheckResult?> DeleteAsync(int id);
        Task<List<CheckResult>> EditConfirmBy(List<CheckResult> checkResults);
        Task<List<CheckResult>> EditApproveBy(List<CheckResult> checkResults);
        Task<CheckResult?> UpdateIsConfirmNG(int id, CheckResult checkResult);
    }
}
