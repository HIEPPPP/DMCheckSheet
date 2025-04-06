using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Repositories.Interface;

namespace DMCheckSheetAPI.Services
{
    public class CheckSheetDeviceServices
    {
        private readonly ICheckSheetDeviceRepository checkSheetDeviceRepository;

        public CheckSheetDeviceServices(ICheckSheetDeviceRepository checkSheetDeviceRepository)
        {
            this.checkSheetDeviceRepository = checkSheetDeviceRepository;
        }
        public async Task<List<CheckSheetDevice>> GetListSheetDevice()
        {
            return await checkSheetDeviceRepository.GetAll();
        }

        public async Task<CheckSheetDevice?> GetSheetDevice(int id)
        {
            var existSheetDevice = await checkSheetDeviceRepository.GetById(id);
            if (existSheetDevice == null) return null;
            return existSheetDevice;
        }

        public async Task<CheckSheetDevice> CreateSheetDevice(CheckSheetDevice checkSheetDevice)
        {
            return await checkSheetDeviceRepository.Create(checkSheetDevice);
        }

        public async Task<CheckSheetDevice?> UpdateSheetDevice(int id, CheckSheetDevice checkSheetDevice)
        {
            var existSheetDevice = await checkSheetDeviceRepository.Update(id, checkSheetDevice);
            if (existSheetDevice == null) return null;
            return existSheetDevice;
        }

        public async Task<CheckSheetDevice?> DeleteSheetDevice(int id)
        {
            var existSheetDevice = await checkSheetDeviceRepository.Delete(id);
            if (existSheetDevice == null) return null;
            return existSheetDevice;
        }
    }
}
