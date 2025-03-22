using AutoMapper;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckSheet;
using DMCheckSheetAPI.Repositories.Interface;

namespace DMCheckSheetAPI.Services
{
    public class CheckSheetServices
    {
        private readonly ICheckSheetRepository checkSheetRepository;
        private readonly IMapper mapper;

        public CheckSheetServices(ICheckSheetRepository checkSheetRepository, IMapper mapper)
        {
            this.checkSheetRepository = checkSheetRepository;
            this.mapper = mapper;
        }

        public Task<List<CheckSheetMST>> GetListSheet()
        {
            return checkSheetRepository.GetAllAsync();
        }

        public Task<CheckSheetMST?> GetSheet(int id)
        {
            return checkSheetRepository.GetAsync(id);
        }

        public async Task<CheckSheetMST> CreateSheet(CreateSheetDTO createSheetDTO)
        {
            var sheetDomain = mapper.Map<CheckSheetMST>(createSheetDTO);
            return await checkSheetRepository.CreateAsync(sheetDomain);
        } 

        public async Task<CheckSheetMST?> UpdateSheet(int id, UpdateSheetDTO updateSheetDTO)
        {
            var sheetDomain = mapper.Map<CheckSheetMST>(updateSheetDTO);
            return await checkSheetRepository.UpdateAsync(id, sheetDomain);
        }

        public async Task<CheckSheetMST?> UpdateCancelFlag(int id)
        {
            return await checkSheetRepository.UpdateCancelFlagAsync(id);
        }
    }
}
