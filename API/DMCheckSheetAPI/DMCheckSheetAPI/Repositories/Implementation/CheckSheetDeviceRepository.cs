using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckSheetDevice;
using DMCheckSheetAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace DMCheckSheetAPI.Repositories.Implementation
{
    public class CheckSheetDeviceRepository : ICheckSheetDeviceRepository
    {
        private readonly CheckSheetDbContext context;

        public CheckSheetDeviceRepository(CheckSheetDbContext context)
        {
            this.context = context;
        }
        public async Task<CheckSheetDevice> Create(CheckSheetDevice checkSheetDevice)
        {
            await context.CheckSheetDevices.AddAsync(checkSheetDevice);
            await context.SaveChangesAsync();
            return checkSheetDevice;

        }

        public async Task<CheckSheetDevice?> Delete(int id)
        {
            var existSheetDevice = await context.CheckSheetDevices.FindAsync(id);
            if (existSheetDevice == null) return null;
            context.CheckSheetDevices.Remove(existSheetDevice);
            await context.SaveChangesAsync();
            return existSheetDevice;
        }

        public async Task<List<CheckSheetDeviceDTO>> GetAll()
        {
            var result = await context.CheckSheetDevices
                                      .Include(x => x.CheckSheetMST)
                                      .Include(x => x.DeviceMST)
                                      .Select(x => new CheckSheetDeviceDTO
                                      {
                                          Id = x.Id,
                                          DeviceId = x.DeviceId,
                                          CheckSheetId = x.CheckSheetId,
                                          SheetCode = x.CheckSheetMST.SheetCode,
                                          SheetName = x.CheckSheetMST.SheetName,
                                          DeviceCode = x.DeviceMST.DeviceCode,
                                          DeviceName = x.DeviceMST.DeviceName
                                      })
                                      .AsNoTracking()
                                      .ToListAsync();
            return result;
        }

        public async Task<CheckSheetDeviceDTO?> GetById(int id)
        {
            return await context.CheckSheetDevices.Include(x => x.CheckSheetMST)
                                                  .Include(x => x.DeviceMST)
                                                  .Select(x => new CheckSheetDeviceDTO
                                                  {
                                                      Id = x.Id,
                                                      DeviceId = x.DeviceId,
                                                      CheckSheetId = x.CheckSheetId,
                                                      SheetCode = x.CheckSheetMST.SheetCode,
                                                      SheetName = x.CheckSheetMST.SheetName,
                                                      FormNO = x.CheckSheetMST.FormNO,
                                                      DeviceCode = x.DeviceMST.DeviceCode,
                                                      DeviceName = x.DeviceMST.DeviceName,
                                                      Frequency = x.DeviceMST.Frequency,
                                                      Location = x.DeviceMST.Location,
                                                  })
                                                  .FirstOrDefaultAsync(x => x.Id == id);                                                  
        }

        public async Task<CheckSheetDeviceDTO?> GetByDeviceAndCheckSheetCode(string deviceCode, string checkSheetCode)
        {
            return await context.CheckSheetDevices.Include(x => x.CheckSheetMST)
                                                  .Include(x => x.DeviceMST)
                                                  .Select(x => new CheckSheetDeviceDTO
                                                  {
                                                      Id = x.Id,
                                                      DeviceId = x.DeviceId,
                                                      CheckSheetId = x.CheckSheetId,
                                                      SheetCode = x.CheckSheetMST.SheetCode,
                                                      SheetName = x.CheckSheetMST.SheetName,
                                                      FormNO = x.CheckSheetMST.FormNO,
                                                      DeviceCode = x.DeviceMST.DeviceCode,
                                                      DeviceName = x.DeviceMST.DeviceName,
                                                      Frequency = x.DeviceMST.Frequency,
                                                      Location = x.DeviceMST.Location,
                                                  })
                                                  .FirstOrDefaultAsync(x => x.DeviceCode == deviceCode && x.SheetCode == checkSheetCode);
        }

        public async Task<CheckSheetDevice?> Update(int id, CheckSheetDevice checkSheetDevice)
        {
            var existSheetDevice = await context.CheckSheetDevices.FindAsync(id);
            if (existSheetDevice == null) return null;
            existSheetDevice.CheckSheetId = checkSheetDevice.CheckSheetId;
            existSheetDevice.DeviceId = checkSheetDevice.DeviceId;
            await context.SaveChangesAsync();
            return existSheetDevice;
        }
    }
}
