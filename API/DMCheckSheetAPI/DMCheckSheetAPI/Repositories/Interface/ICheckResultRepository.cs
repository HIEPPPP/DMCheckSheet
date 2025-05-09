using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO;
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
        Task<CheckResult?> EditApproveBy(string sheetCode, string deviceCode, DateTime today, string username);
        Task<CheckResult?> EditConfirmMonth(string sheetCode, string deviceCode, DateTime today, string username);
        Task<CheckResult?> UpdateIsConfirmNG(int id, CheckResult checkResult);
        Task<CheckResult?> GetResultBySheetDeviceToday(string sheetCode, string deviceCode, DateTime today);
        Task<List<CheckSheetRowDTO>> GetCheckSheetRows(string sheetCode, string deviceCode, DateTime month);
        Task<List<ResultsApproveConfirmeMonthDTO>> GetResultsApproveConfirmeMonths(DateTime month);
        Task<CheckResult?> GetApprovedByMonth(string sheetCode, string deviceCode, DateTime month);
        Task<CheckResult?> GetConfirmedByMonth(string sheetCode, string deviceCode, DateTime month);
    }
}
