using DMCheckSheetAPI.Constants;
using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO;
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

        public async Task<DeviceDTO> CreateAsync(DeviceMST device)
        {
            await context.AddAsync(device);
            await context.SaveChangesAsync();
            var fullDevice = await (from d in context.Devices
                                    join t in context.DeviceTypes
                                    on d.TypeId equals t.TypeId
                                    select new DeviceDTO
                                    {
                                        DeviceId = d.DeviceId,
                                        TypeName = t.TypeName,
                                        FormNO = d.FormNO,
                                        DeviceCode = d.DeviceCode,
                                        DeviceName = d.DeviceName,
                                        Location = d.Location,
                                        Frequency = d.Frequency,
                                        CreateAt = d.CreateAt,
                                        CreateBy = d.CreateBy,
                                    }).FirstOrDefaultAsync();
            return fullDevice ?? new DeviceDTO
            {
                DeviceId = device.DeviceId,
                TypeName = "",
                FormNO = device.FormNO,
                DeviceCode = device.DeviceCode,
                DeviceName = device.DeviceName,
                Location = device.Location,
                Frequency = device.Frequency,
                CreateAt = device.CreateAt,
                CreateBy = device.CreateBy,
            };
        }

        public async Task<DeviceMST?> DeleteAsync(int id)
        {
            var existDevice = await context.Devices.FindAsync(id);
            if(existDevice == null) return null;
            context.Remove(existDevice);
            await context.SaveChangesAsync();
            return existDevice;
        }

        public async Task<List<DeviceDTO>> GetAllAsync()
        {
            return await (from d in context.Devices
                          join dt in context.DeviceTypes
                          on d.TypeId equals dt.TypeId 
                          select new DeviceDTO
                          {
                              DeviceId = d.DeviceId,
                              DeviceCode = d.DeviceCode,
                              DeviceName = d.DeviceName,
                              FormNO = d.FormNO,
                              TypeName = dt.TypeName,
                              Frequency = d.Frequency,
                              Location = d.Location
                          }).AsNoTracking().ToListAsync();                          
        }

        public async Task<DeviceMST?> GetAsync(int id)
        {
            var existDevice = await context.Devices.FindAsync(id);
            if (existDevice == null) return null;
            return existDevice;
        }

        public async Task<DeviceMST?> UpdateAsync(int id, DeviceMST device)
        {
            var existDevice = await context.Devices.FindAsync(id);
            if (existDevice == null) return null;
            existDevice.Location = device.Location;
            existDevice.Frequency = device.Frequency;
            existDevice.DeviceName = device.DeviceName;
            existDevice.DeviceCode = device.DeviceCode;
            existDevice.FormNO = device.FormNO;
            existDevice.UpdateAt = DateTime.Now;
            existDevice.UpdateBy = CheckSheet_Constants.userCode;
            await context.SaveChangesAsync();
            return existDevice;
        }
    }
}
