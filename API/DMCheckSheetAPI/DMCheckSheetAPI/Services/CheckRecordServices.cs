using AutoMapper;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO;
using DMCheckSheetAPI.Repositories.Interface;

namespace DMCheckSheetAPI.Services
{
    public class CheckRecordServices
    {
        private readonly ICheckRecordRepository checkRecordRepository;
        private readonly IMapper mapper;

        public CheckRecordServices(ICheckRecordRepository checkRecordRepository, IMapper mapper)
        {
            this.checkRecordRepository = checkRecordRepository;
            this.mapper = mapper;
        }

        public async Task<List<CheckRecord>> GetListCheck()
        {
            return await checkRecordRepository.GetAllAsync();
        }

        public async Task<CheckRecord?> DeleteCheck(int id)
        {
            var existCheck = await checkRecordRepository.DeleteAsync(id);
            if (existCheck == null) return null;
            return existCheck;
        }

        public async Task<CreateUpdateCheckDTO?> CreateCheck(CreateDeviceDTO checkDto)
        {
            var checkDomain = mapper.Map<CheckRecord>(checkDto);
            checkDomain = await checkRecordRepository.CreateAsync(checkDomain);
            return mapper.Map<CreateUpdateCheckDTO>(checkDomain);
        }

        public async Task<CreateUpdateCheckDTO?> UpdateCheck(int id, CreateUpdateCheckDTO checkDto)
        {
            var checkDomain = mapper.Map<CheckRecord>(checkDto);
            var existCheck = await checkRecordRepository.UpdateAsync(id, checkDomain);
            if (existCheck == null) return null;
            return mapper.Map<CreateUpdateCheckDTO?>(existCheck);   
        }
    }
}
