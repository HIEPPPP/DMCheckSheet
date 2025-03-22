using DMCheckSheetAPI.Models.Domain;

namespace DMCheckSheetAPI.Repositories.Interface
{
    public interface ICheckSheetRepository
    {
        Task<List<CheckSheetMST>> GetAllAsync();
        Task<CheckSheetMST?> GetAsync(int id);
        Task<CheckSheetMST> CreateAsync(CheckSheetMST checkSheetMST);
        Task<CheckSheetMST?> UpdateAsync(int id, CheckSheetMST checkSheetMST);
        Task<CheckSheetMST?> UpdateCancelFlagAsync(int id);
    }
}
