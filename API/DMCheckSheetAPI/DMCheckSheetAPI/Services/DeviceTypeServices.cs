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
            var existType = await deviceTypeRepository.GetByIdAsync(id);
            if (existType == null) return null;
            return existType;
        }

        public async Task<DeviceTypeMST?> DeleteDeviceType(int id)
        {
            var existType = await deviceTypeRepository.DeleteAsync(id);
            if (existType == null) return null;
            return existType;
        }

        public async Task<CreateDeviceTypeDTO> CreateType(CreateDeviceTypeDTO typeDto)
        {
            var typeDomail = mapper.Map<DeviceTypeMST>(typeDto);
            await deviceTypeRepository.CreateAsync(typeDomail);
            mapper.Map<CreateDeviceTypeDTO>(typeDomail);
            return typeDto;
        }

        public async Task<UpdateDeviceTypeDTO?> UpdateType(int id, UpdateDeviceTypeDTO typeDto)
        {
            var typeDomail = mapper.Map<DeviceTypeMST>(typeDto);
            var existType = await deviceTypeRepository.UpdateAsync(id, typeDomail);
            if (existType == null) return null;
            mapper.Map<UpdateDeviceTypeDTO?>(typeDomail);
            return typeDto;
        }
    }
}
