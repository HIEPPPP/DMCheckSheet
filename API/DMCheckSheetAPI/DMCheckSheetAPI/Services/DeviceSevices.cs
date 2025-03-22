using AutoMapper;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.Device;
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

        public async Task<List<DeviceMST>> GetListDevice()
        {
            return await deviceRepository.GetAllAsync();
        }

        public async Task<DeviceMST?> GetDeviceById(int id)
        {
            return await deviceRepository.GetAsync(id);
            
        }

        public async Task<DeviceMST> CreateDevice(CreateDeviceDTO deviceDto)
        {
            var deviceDomail = mapper.Map<DeviceMST>(deviceDto);
            var deviceNew = await deviceRepository.CreateAsync(deviceDomail);     
            return deviceNew;
        }

        public async Task<DeviceMST?> UpdateCancelFlag(int id)
        {
            var existDevice = await deviceRepository.UpdateCancelFlagAsync(id);
            if (existDevice == null) return null;
            return existDevice;
        }

        public async Task<DeviceMST?> UpdateDevice(int id, UpdateDeviceDTO deviceDTO)
        {
            var deviceDomail = mapper.Map<DeviceMST>(deviceDTO);
            return await deviceRepository.UpdateAsync(id, deviceDomail);                       
        }
    }
}
