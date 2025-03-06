using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace DMCheckSheetAPI.Repositories.Implementation
{
    public class DeviceTypeRepository : IDeviceTypeRepository
    {
        private readonly CheckSheetDbContext context;

        public DeviceTypeRepository(CheckSheetDbContext context)
        {
            this.context = context;
        }
        public async Task<DeviceType> CreateAsync(DeviceType deviceType)
        {
            await context.AddAsync(deviceType);
            await context.SaveChangesAsync();
            return deviceType;
        }

        public async Task<DeviceType?> DeleteAsync(int id)
        {
            var existType = await context.DeviceTypes.FindAsync(id);
            if (existType == null) return null;
            context.DeviceTypes.Remove(existType);
            await context.SaveChangesAsync();
            return existType;
        }

        public async Task<List<DeviceType>> GetAllAsync()
        {
            return await context.DeviceTypes.AsNoTracking().ToListAsync();
        }

        public async Task<DeviceType?> GetByIdAsync(int id)
        {
            var existType = await context.DeviceTypes.FindAsync(id);
            if (existType == null) return null;
            return existType;
        }

        public async Task<DeviceType?> UpdateAsync(int id, DeviceType deviceType)
        {
            var existType = await context.DeviceTypes.FindAsync(id);
            if (existType == null) return null;
            existType.TypeDesc = deviceType.TypeDesc;
            existType.TypeName = deviceType.TypeName;
            await context.SaveChangesAsync();
            return existType;
        }
    }
}
