using AutoMapper;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckRecord;
using DMCheckSheetAPI.Models.DTO.Device;
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

        public async Task<CreateCheckDTO?> CreateCheck(CreateDeviceDTO checkDto)
        {
            var checkDomain = mapper.Map<CheckRecord>(checkDto);
            checkDomain = await checkRecordRepository.CreateAsync(checkDomain);
            return mapper.Map<CreateCheckDTO>(checkDomain);
        }

        public async Task<CreateCheckDTO?> UpdateCheck(int id, CreateCheckDTO checkDto)
        {
            var checkDomain = mapper.Map<CheckRecord>(checkDto);
            var existCheck = await checkRecordRepository.UpdateAsync(id, checkDomain);
            if (existCheck == null) return null;
            return mapper.Map<CreateCheckDTO?>(existCheck);   
        }
    }
}
