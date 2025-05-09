using DMCheckSheetAPI.Constants;
using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.Device;
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

        public async Task<DeviceMST> CreateAsync(DeviceMST device)
        {
            await context.AddAsync(device);
            await context.SaveChangesAsync();
            return device;
        }

        public async Task<DeviceMST?> UpdateCancelFlagAsync(int id)
        {
            var existDevice = await context.Devices.FindAsync(id);
            if (existDevice == null) return null;
            existDevice.CancelFlag = true;
            await context.SaveChangesAsync();
            return existDevice;
        }

        public async Task<List<DeviceMST>> GetAllAsync()
        {
            return await context.Devices.Where(x => x.CancelFlag == false).AsNoTracking().ToListAsync();
        } 

        public async Task<DeviceMST?> GetAsync(int id)
        {
            return await context.Devices.FirstOrDefaultAsync(x => x.DeviceId == id && x.CancelFlag == false);
        }

        public async Task<DeviceMST?> UpdateAsync(int id, DeviceMST device)
        {
            var existDevice = await context.Devices.FindAsync(id);
            if (existDevice == null) return null;
            existDevice.Location = device.Location;
            existDevice.Frequency = device.Frequency;
            existDevice.DeviceName = device.DeviceName;
            existDevice.DeviceCode = device.DeviceCode;
            existDevice.UpdateAt = device.UpdateAt;            
            existDevice.UpdateBy = device.UpdateBy;
            existDevice.IsConfirm = device.IsConfirm;
            await context.SaveChangesAsync();
            return existDevice;
        }

        public async Task<List<int>> GetCheckSheetIdsByDevicesAsync(int deviceId)
        {
            return await context.CheckSheetDevices
                            .Where(cs => cs.DeviceId == deviceId)
                            .Select(cs => cs.CheckSheetId)
                            .ToListAsync();
        }

        public async Task AddCheckSheetsToDevicesAsync(List<CheckSheetDevice> checkSheetDevices)
        {
            await context.CheckSheetDevices.AddRangeAsync(checkSheetDevices);
            await context.SaveChangesAsync();
        }

        public async Task RemoveCheckSheetsToDevicesAsync(List<CheckSheetDevice> checkSheetDevices)
        {
            context.CheckSheetDevices.RemoveRange(checkSheetDevices);
            await context.SaveChangesAsync();
        }
    }
}
