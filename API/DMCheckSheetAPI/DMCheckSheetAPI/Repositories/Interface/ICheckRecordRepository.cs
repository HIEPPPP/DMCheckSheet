using DMCheckSheetAPI.Models.Domain;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface ICheckRecordRepository
    {
        Task<List<CheckRecord>> GetAllAsync();
        Task<CheckRecord?> GetAsync(int id);
        Task<CheckRecord?> UpdateAsync(int id, CheckRecord record);
        Task<CheckRecord?> DeleteAsync(int id);
        Task<CheckRecord> CreateAsync(CheckRecord record);
    }
}
