using AutoMapper;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO;
using DMCheckSheetAPI.Repositories.Interface;

namespace DMCheckSheetAPI.Services
{
    public class DeviceSevices
    {
        private readonly IDeviceRepository deviceRepository;
        private readonly IMapper mapper;

        public DeviceSevices(IDeviceRepository deviceRepository, IMapper mapper)
        {
            this.deviceRepository = deviceRepository;
            this.mapper = mapper;
        }

        public async Task<List<DeviceMST>> GetListDevice()
        {
            return await deviceRepository.GetAllAsync();
        }

        public async Task<DeviceMST?> GetDeviceById(int id)
        {
            var existDevice = await deviceRepository.GetAsync(id);
            if (existDevice == null) return null;
            return existDevice;
        }

        public async Task<CreateDeviceDTO> CreateDevice(CreateDeviceDTO deviceDto)
        {
            var deviceDomail = mapper.Map<DeviceMST>(deviceDto);
            await deviceRepository.CreateAsync(deviceDomail);
            mapper.Map<CreateDeviceDTO>(deviceDomail);
            return deviceDto;
        }

        public async Task<DeviceMST?> DeleteDevice(int id)
        {
            var existDevice = await deviceRepository.DeleteAsync(id);
            if (existDevice == null) return null;
            return existDevice;
        }

        public async Task<UpdateDeviceDTO?> UpdateDevice(int id, UpdateDeviceDTO deviceDTO)
        {
            var deviceDomail = mapper.Map<DeviceMST>(deviceDTO);
            var existDevice = await deviceRepository.UpdateAsync(id, deviceDomail);
            if (existDevice == null) return null;
            return mapper.Map<UpdateDeviceDTO>(existDevice);           
        }
    }
}
