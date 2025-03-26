using AutoMapper;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.Device;
using DMCheckSheetAPI.Repositories.Implementation;
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

        public async Task<bool> UpdateCheckSheetInDevicesAsync(int deviceId, List<int> checkSheetIds)
        {
            var checkSheet = await deviceRepository.GetAsync(deviceId);
            if (checkSheet == null) return false;

            // Lấy danh sách checksheet hiện tại của device
            var existChecksheetIds = await deviceRepository.GetCheckSheetIdsByDevicesAsync(deviceId);

            // Xóa các thiết bị không còn trong danh sách mới
            var devicesToRemove = checkSheetIds
                .Where(id => !checkSheetIds.Contains(id))
                .Select(id => new CheckSheetDevice { DeviceId = deviceId, CheckSheetId = id })
                .ToList();

            if (devicesToRemove.Any())
            {
                await deviceRepository.RemoveCheckSheetsToDevicesAsync(devicesToRemove);
            }

            // Thêm các thiết bị mới chưa có
            var newCheckSheet = checkSheetIds
                .Where(id => !existChecksheetIds.Contains(id))
                .Select(id => new CheckSheetDevice { DeviceId = deviceId, CheckSheetId = id })
                .ToList();

            if (newCheckSheet.Any())
            {
                await deviceRepository.AddCheckSheetsToDevicesAsync(newCheckSheet);
            }

            return true;
        }
    }
}
