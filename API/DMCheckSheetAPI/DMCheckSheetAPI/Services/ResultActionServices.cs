using AutoMapper;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.ResultAction;
using DMCheckSheetAPI.Repositories.Interface;

namespace DMCheckSheetAPI.Services
{
    public class ResultActionServices
    {
        private readonly IResultActionRepository resultActionRepository;
        private readonly IMapper mapper;

        public ResultActionServices(IResultActionRepository resultActionRepository, IMapper mapper)
        {
            this.resultActionRepository = resultActionRepository;
            this.mapper = mapper;
        }

        public async Task<List<ResultActionDTO>> GetListAction()
        {
            return await resultActionRepository.GetAllAsync();
        }

        public async Task<ResultActionDTO?> GetActionById(int id)
        {
            return await resultActionRepository.GetAsync(id);
        }

        public async Task<ResultActionDTO?> GetActionByResultId(int resultId)
        {
            return await resultActionRepository.GetByResultIdAsync(resultId);
        }

        public async Task<List<ResultActionNGDTO>> GetListActionNG()
        {
            return await resultActionRepository.GetAllActionNG();
        }

        public async Task<ResultAction> CreateAction(CreateActionDTO createActionDTO)
        {
            var actionDomain = mapper.Map<ResultAction>(createActionDTO);
            return await resultActionRepository.CreateAsync(actionDomain);
        }

        public async Task<ResultAction?> UpdateAction(int id, UpdateActionDTO updateActionDTO)
        {
            var actionDomain = mapper.Map<ResultAction>(updateActionDTO);
            return await resultActionRepository.UpdateAsync(id, actionDomain);  
        }

        public async Task<ResultAction?> UpdateActionByResultId(int resultId, UpdateActionDTO updateActionDTO)
        {
            var actionDomain = mapper.Map<ResultAction>(updateActionDTO);
            return await resultActionRepository.UpdateByResultIdAsync(resultId, actionDomain);
        }

        public async Task<ResultAction?> DeleteAction(int id)
        {
            return await resultActionRepository.DeleteAsync(id);
        }

        public async Task<ResultAction?> DeleteActionByResultId(int id)
        {
            return await resultActionRepository.DeleteByResultId(id);
        }

        public async Task<List<ResultActionMonthDTO>> GetlistActionMonth(string sheetCode, string deviceCode, DateTime month)
        {
            return await resultActionRepository.GetListActionByMonth(sheetCode, deviceCode, month);
        }
       
    }
}
