using AutoMapper;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO;
using DMCheckSheetAPI.Models.DTO.CheckResult;
using DMCheckSheetAPI.Repositories.Interface;

namespace DMCheckSheetAPI.Services
{
    public class CheckResultServices
    {
        private readonly ICheckResultRepository checkResultRepository;
        private readonly IMapper mapper;

        public CheckResultServices(ICheckResultRepository checkResultRepository, IMapper mapper)
        {
            this.checkResultRepository = checkResultRepository;
            this.mapper = mapper;
        }

        public async Task<List<CheckResult>> GetListResult()
        {
            return await checkResultRepository.GetAllAsync();
        }

        public async Task<List<ResultBySheetCodeAndDateDTO>> GetResultsBySheetAndDateAsync(string sheetCode, string deviceCode, DateTime today)
        {
            return await checkResultRepository.GetResultsBySheetAndDateAsync(sheetCode, deviceCode, today);
        }

        public async Task<CheckResult?> GetById(int id)
        {
            return await checkResultRepository.GetAsync(id);
        }

        public async Task<CheckResult> CreateResult(CreateResultDTO createResultDTO)
        {
            var resultDomain = mapper.Map<CheckResult>(createResultDTO);
            return await checkResultRepository.CreateAsync(resultDomain);
        }

        public async Task<List<CheckResult>> CreateResults(List<CreateResultDTO> createResultDTOs)
        {
            var resultDomains = mapper.Map<List<CheckResult>>(createResultDTOs);
            return await checkResultRepository.CreateAsyncs(resultDomains);
        }

        public async Task<CheckResult?> UpdateResult(int id, UpdateResultDTO updateResultDTO)
        {
            var resultDomain = mapper.Map<CheckResult>(updateResultDTO);
            return await checkResultRepository.UpdateAsync(id, resultDomain);
        }

        public async Task<CheckResult?> DeleteResult(int id)
        {
            return await checkResultRepository.DeleteAsync(id);
        }

        public async Task<List<CheckResult>> EditConfirmBy(List<ResultConfirmByDTO> resultConfirmByDTOs)
        {
            var resultDomain = mapper.Map<List<CheckResult>>(resultConfirmByDTOs);
            return await checkResultRepository.EditConfirmBy(resultDomain);
        }

        public async Task<CheckResult?> EditApproveBy(string sheetCode, string deviceCode, DateTime today, string username)
        {
            return await checkResultRepository.EditApproveBy(sheetCode, deviceCode, today, username);
        }

        public async Task<CheckResult?> EditConfirmedMonth(string sheetCode, string deviceCode, DateTime month, string username)
        {
            return await checkResultRepository.EditConfirmMonth(sheetCode, deviceCode, month, username);
        }

        public async Task<List<ResultTodayDTO>> GetListResultToday(DateTime today)
        {
            return await checkResultRepository.GetResultTodays(today);
        }

        public async Task<CheckResult?> UpdateIsConfirmNG(int id, UpdateResultIsConfirmNGDTO updateResultIsConfirm)
        {
            var resultDomain = mapper.Map<CheckResult>(updateResultIsConfirm);
            return await checkResultRepository.UpdateIsConfirmNG(id, resultDomain);
        }

        public async Task<CheckResult?> GetResultBySheetDeviceToday(string sheetCode, string deviceCode, DateTime today)
        {
            return await checkResultRepository.GetResultBySheetDeviceToday(sheetCode, deviceCode, today);
        }

        public async Task<List<CheckSheetRowDTO>> GetCheckSheetRows(string sheetCode, string deviceCode, DateTime monthref)
        {
            return await checkResultRepository.GetCheckSheetRows(sheetCode, deviceCode, monthref);
        }

        public async Task<CheckResult?> GetApprovedByMonth(string sheetCode, string deviceCode, DateTime month)
        {
            return await checkResultRepository.GetApprovedByMonth(sheetCode, deviceCode, month);
        }

        public async Task<CheckResult?> GetConfirmedByMonth(string sheetCode, string deviceCode, DateTime month)
        {
            return await checkResultRepository.GetApprovedByMonth(sheetCode, deviceCode, month);
        }

        public async Task<List<ResultsApproveConfirmeMonthDTO>> GetResultsApproveConfirmeMonths(DateTime month)
        {
            return await checkResultRepository.GetResultsApproveConfirmeMonths(month);
        }

        public async Task<List<CheckSheetColDTO>> GetCheckSheetCols(string sheetCode, string deviceCode, DateTime month)
        {
            return await checkResultRepository.GetCheckSheetCols(sheetCode, deviceCode, month);
        }

        public async Task<List<CheckSheetColDTO>> GetCheckSheetColsTop10(string sheetCode, string deviceCode)
        {
            return await checkResultRepository.GetCheckSheetColsTop10(sheetCode, deviceCode);
        }
    }
}
