using DMCheckSheetAPI.Models.Domain;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface IDeviceRepository
    {
        Task<List<DeviceMST>> GetAllAsync();
        Task<DeviceMST?> GetAsync(int id);
        Task<DeviceMST> CreateAsync(DeviceMST device);
        Task<DeviceMST?> UpdateAsync(int id, DeviceMST device);
        Task<DeviceMST?> DeleteAsync(int id);
    }
}
