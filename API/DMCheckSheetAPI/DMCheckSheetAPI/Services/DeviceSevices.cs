using AutoMapper;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO;
using DMCheckSheetAPI.Repositories.Interface;
using Microsoft.AspNetCore.Http.HttpResults;

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

        public async Task<List<DeviceDTO>> GetListDevice()
        {
            return await deviceRepository.GetAllAsync();
        }

        public async Task<DeviceDTO?> GetDeviceById(int id)
        {
            return await deviceRepository.GetAsync(id);
            
        }

        public async Task<DeviceMST> CreateDevice(CreateDeviceDTO deviceDto)
        {
            var deviceDomail = mapper.Map<DeviceMST>(deviceDto);
            var deviceNew = await deviceRepository.CreateAsync(deviceDomail);     
            return deviceNew;
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
