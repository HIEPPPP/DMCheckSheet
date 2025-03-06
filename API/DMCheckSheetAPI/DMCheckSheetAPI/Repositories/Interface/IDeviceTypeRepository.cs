using DMCheckSheetAPI.Models.Domain;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface IDeviceTypeRepository
    {
        Task<List<DeviceType>> GetAllAsync();
        Task<DeviceType?> GetByIdAsync(int id);
        Task<DeviceType> CreateAsync(DeviceType deviceType);
        Task<DeviceType?> UpdateAsync(int id, DeviceType deviceType);
        Task<DeviceType?> DeleteAsync(int id);
    }
}
