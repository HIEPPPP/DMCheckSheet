using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.Device;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface IDeviceRepository
    {
        Task<List<DeviceDTO>> GetAllAsync();
        Task<DeviceDTO?> GetAsync(int id);
        Task<DeviceMST> CreateAsync(DeviceMST device);
        Task<DeviceMST?> UpdateAsync(int id, DeviceMST device);
        Task<DeviceMST?> DeleteAsync(int id);
    }
}
