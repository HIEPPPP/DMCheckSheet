using DMCheckSheetAPI.Constants;
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
        public async Task<DeviceTypeMST> CreateAsync(DeviceTypeMST deviceType)
        {
            await context.AddAsync(deviceType);
            await context.SaveChangesAsync();
            return deviceType;
        }

        public async Task<DeviceTypeMST?> DeleteAsync(int id)
        {
            var existType = await context.DeviceTypes.FindAsync(id);
            if (existType == null) return null;
            context.DeviceTypes.Remove(existType);
            await context.SaveChangesAsync();
            return existType;
        }

        public async Task<List<DeviceTypeMST>> GetAllAsync()
        {
            return await context.DeviceTypes.AsNoTracking().ToListAsync();
        }

        public async Task<DeviceTypeMST?> GetByIdAsync(int id)
        {
            return await context.DeviceTypes.FindAsync(id);
           
        }

        public async Task<DeviceTypeMST?> UpdateAsync(int id, DeviceTypeMST deviceType)
        {
            var existType = await context.DeviceTypes.FindAsync(id);
            if (existType == null) return null;
            existType.TypeCode = deviceType.TypeCode;
            existType.TypeDesc = deviceType.TypeDesc;
            existType.TypeName = deviceType.TypeName;
            existType.CheckSheetName = deviceType.CheckSheetName;
            existType.UpdateBy = CheckSheet_Constants.userCode;
            existType.UpdateAt = DateTime.Now;
            await context.SaveChangesAsync();
            return existType;
        }
    }
}
