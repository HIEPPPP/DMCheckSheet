using AutoMapper;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO;
using DMCheckSheetAPI.Repositories.Interface;

namespace DMCheckSheetAPI.Services
{
    public class DeviceTypeServices
    {
        private readonly IDeviceTypeRepository deviceTypeRepository;
        private readonly IMapper mapper;

        public DeviceTypeServices(IDeviceTypeRepository deviceTypeRepository, IMapper mapper)
        {
            this.deviceTypeRepository = deviceTypeRepository;
            this.mapper = mapper;
        }
        public async Task<List<DeviceTypeMST>> GetListDeviceType()
        {
            return await deviceTypeRepository.GetAllAsync();
        }

        public async Task<DeviceTypeMST?> GetTypeById(int id)
        {
            return await deviceTypeRepository.GetByIdAsync(id);
            
        }

        public async Task<DeviceTypeMST?> DeleteDeviceType(int id)
        {
            var existType = await deviceTypeRepository.DeleteAsync(id);
            if (existType == null) return null;
            return existType;
        }

        public async Task<DeviceTypeMST> CreateType(CreateDeviceTypeDTO typeDto)
        {
            var typeDomail = mapper.Map<DeviceTypeMST>(typeDto);
            return await deviceTypeRepository.CreateAsync(typeDomail);            
        }

        public async Task<DeviceTypeMST?> UpdateType(int id, UpdateDeviceTypeDTO typeDto)
        {
            var typeDomail = mapper.Map<DeviceTypeMST>(typeDto);
            return await deviceTypeRepository.UpdateAsync(id, typeDomail);                       
        }
    }
}
