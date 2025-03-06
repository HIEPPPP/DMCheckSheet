using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace DMCheckSheetAPI.Repositories.Implementation
{
    public class CheckRecordRepository : ICheckRecordRepository
    {
        private readonly CheckSheetDbContext context;

        public CheckRecordRepository(CheckSheetDbContext context)
        {
            this.context = context;
        }
        public async Task<CheckRecord> CreateAsync(CheckRecord record)
        {
            await context.CheckRecords.AddAsync(record);
            await context.SaveChangesAsync();
            return record;
        }

        public async Task<CheckRecord?> DeleteAsync(int id)
        {
            var existRecord = await context.CheckRecords.FindAsync(id);
            if (existRecord == null) return null;
            context.CheckRecords.Remove(existRecord);
            await context.SaveChangesAsync();
            return existRecord;
        }

        public async Task<List<CheckRecord>> GetAllAsync()
        {
            return await context.CheckRecords.AsNoTracking().ToListAsync(); 
        }

        public async Task<CheckRecord?> GetAsync(int id)
        {
            var existRecord = await context.CheckRecords.FindAsync(id);
            if (existRecord == null) return null;
            return existRecord;
        }

        public async Task<CheckRecord?> UpdateAsync(int id, CheckRecord record)
        {
            var existRecord = await context.CheckRecords.FindAsync(id);
            if (existRecord == null) return null;
            existRecord.CheckDate = record.CheckDate;
            existRecord.CheckBy = record.CheckBy;
            existRecord.DeviceId = record.DeviceId;
            await context.SaveChangesAsync();
            return existRecord;
        }
    }
}
