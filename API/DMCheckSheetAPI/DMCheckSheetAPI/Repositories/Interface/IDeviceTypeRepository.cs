using DMCheckSheetAPI.Models.Domain;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface IDeviceTypeRepository
    {
        Task<List<DeviceTypeMST>> GetAllAsync();
        Task<DeviceTypeMST?> GetByIdAsync(int id);
        Task<DeviceTypeMST> CreateAsync(DeviceTypeMST deviceType);
        Task<DeviceTypeMST?> UpdateAsync(int id, DeviceTypeMST deviceType);
        Task<DeviceTypeMST?> DeleteAsync(int id);
    }
}
