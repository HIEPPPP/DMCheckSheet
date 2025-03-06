using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace DMCheckSheetAPI.Repositories.Implementation
{
    public class DeviceRepository : IDeviceRepository
    {
        private readonly CheckSheetDbContext context;

        public DeviceRepository(CheckSheetDbContext context)
        {
            this.context = context;
        }

        public async Task<Device> CreateAsync(Device device)
        {
            await context.AddAsync(device);
            await context.SaveChangesAsync();
            return device;
        }

        public async Task<Device?> DeleteAsync(int id)
        {
            var existDevice = await context.Devices.FindAsync(id);
            if(existDevice == null) return null;
            context.Remove(existDevice);
            await context.SaveChangesAsync();
            return existDevice;
        }

        public async Task<List<Device>> GetAllAsync()
        {
            return await context.Devices.AsNoTracking().ToListAsync();
        }

        public async Task<Device?> GetAsync(int id)
        {
            var existDevice = await context.Devices.FindAsync(id);
            if (existDevice == null) return null;
            return existDevice;
        }

        public async Task<Device?> UpdateAsync(int id, Device device)
        {
            var existDevice = await context.Devices.FindAsync(id);
            if (existDevice == null) return null;
            existDevice.Location = device.Location;
            existDevice.Frequency = device.Frequency;
            existDevice.DeviceName = device.DeviceName;
            existDevice.DeviceCode = device.DeviceCode;
            existDevice.FormNO = device.FormNO;
            await context.SaveChangesAsync();
            return existDevice;
        }
    }
}
