using DMCheckSheetAPI.Models.Domain;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface ICheckDetailRepository
    {
        Task<List<CheckDetail>> GetAllAsync();
        Task<CheckDetail?> GetAsync(int id);
        Task<CheckDetail> CreateAsync(CheckDetail checkDetail);
        Task<CheckDetail?> UpdateAsync(int id, CheckDetail checkDetail);
        Task<CheckDetail?> DeleteAsync(int id);
    }
}
