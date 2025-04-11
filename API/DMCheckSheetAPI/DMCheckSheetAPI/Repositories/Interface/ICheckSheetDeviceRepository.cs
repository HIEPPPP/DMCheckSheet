using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckSheetDevice;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface ICheckSheetDeviceRepository
    {
        Task<List<CheckSheetDeviceDTO>> GetAll();
        Task<CheckSheetDeviceDTO?> GetById(int id);
        Task<CheckSheetDeviceDTO?> GetByDeviceAndCheckSheetCode(string deviceCode, string checkSheetCode);
        Task<CheckSheetDevice> Create(CheckSheetDevice checkSheetDevice);
        Task<CheckSheetDevice?> Update(int id, CheckSheetDevice checkSheetDevice);
        Task<CheckSheetDevice?> Delete(int id);
    }
}
