using DMCheckSheetAPI.Models.Domain;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface ICheckSheetDeviceRepository
    {
        Task<List<CheckSheetDevice>> GetAll();
        Task<CheckSheetDevice?> GetById(int id);
        Task<CheckSheetDevice> Create(CheckSheetDevice checkSheetDevice);
        Task<CheckSheetDevice?> Update(int id, CheckSheetDevice checkSheetDevice);
        Task<CheckSheetDevice?> Delete(int id);
    }
}
