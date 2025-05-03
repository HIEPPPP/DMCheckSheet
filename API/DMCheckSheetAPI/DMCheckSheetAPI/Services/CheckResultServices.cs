using AutoMapper;
using DMCheckSheetAPI.Models.Domain;
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

        public async Task<List<CheckResult>> EditApproveBy(List<ResultApproveByDTO> resultApproveByDTOs)
        {
            var resultDomain = mapper.Map<List<CheckResult>>(resultApproveByDTOs);
            return await checkResultRepository.EditApproveBy(resultDomain);
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
    }
}
