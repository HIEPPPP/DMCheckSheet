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
        public async Task<List<DeviceType>> GetListDeviceType()
        {
            return await deviceTypeRepository.GetAllAsync();
        }

        public async Task<DeviceType?> DeleteDeviceType(int id)
        {
            var existType = await deviceTypeRepository.DeleteAsync(id);
            if (existType == null) return null;
            return existType;
        }

        public async Task<CreateUpdateTypeDTO> CreateType(CreateUpdateTypeDTO typeDto)
        {
            var typeDomail = mapper.Map<DeviceType>(typeDto);
            await deviceTypeRepository.CreateAsync(typeDomail);
            mapper.Map<CreateUpdateTypeDTO>(typeDomail);
            return typeDto;
        }

        public async Task<CreateUpdateTypeDTO?> UpdateType(int id, CreateUpdateTypeDTO typeDto)
        {
            var typeDomail = mapper.Map<DeviceType>(typeDto);
            var existType = await deviceTypeRepository.UpdateAsync(id, typeDomail);
            if (existType == null) return null;
            mapper.Map<CreateUpdateTypeDTO?>(typeDomail);
            return typeDto;
        }
    }
}
