using DMCheckSheetAPI.Models.Domain;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface IDeviceRepository
    {
        Task<List<Device>> GetAllAsync();
        Task<Device?> GetAsync(int id);
        Task<Device> CreateAsync(Device device);
        Task<Device?> UpdateAsync(int id, Device device);
        Task<Device?> DeleteAsync(int id);
    }
}
