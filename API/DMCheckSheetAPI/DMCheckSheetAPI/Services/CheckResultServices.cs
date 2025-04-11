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

        public async Task<CheckResult?> EditConfirmBy(int id, ResultConfirmByDTO resultConfirmByDTO) 
        {
            var resultDomain = mapper.Map<CheckResult>(resultConfirmByDTO);
            return await checkResultRepository.EditConfirmBy(id, resultDomain);
        }

        public async Task<CheckResult?> EditApproveBy(int id, ResultApproveByDTO resultApproveByDTO)
        {
            var resultDomain = mapper.Map<CheckResult>(resultApproveByDTO);
            return await checkResultRepository.EditConfirmBy(id, resultDomain);
        }

    }
}
