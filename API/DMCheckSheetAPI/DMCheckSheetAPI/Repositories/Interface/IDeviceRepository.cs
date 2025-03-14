using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface IDeviceRepository
    {
        Task<List<DeviceDTO>> GetAllAsync();
        Task<DeviceMST?> GetAsync(int id);
        Task<DeviceDTO> CreateAsync(DeviceMST device);
        Task<DeviceMST?> UpdateAsync(int id, DeviceMST device);
        Task<DeviceMST?> DeleteAsync(int id);
    }
}
