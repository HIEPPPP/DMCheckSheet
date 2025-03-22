using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.Device;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface IDeviceRepository
    {
        Task<List<DeviceMST>> GetAllAsync();
        Task<DeviceMST?> GetAsync(int id);
        Task<DeviceMST> CreateAsync(DeviceMST device);
        Task<DeviceMST?> UpdateAsync(int id, DeviceMST device);
        Task<DeviceMST?> UpdateCancelFlagAsync(int id);
    }
}
