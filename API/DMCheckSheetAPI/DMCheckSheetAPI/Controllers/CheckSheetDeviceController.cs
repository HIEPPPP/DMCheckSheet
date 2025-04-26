using DMCheckSheetAPI.Models;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckSheetDevice;
using DMCheckSheetAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DMCheckSheetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckSheetDeviceController : ControllerBase
    {
        private readonly CheckSheetDeviceServices checkSheetDeviceServices;

        public CheckSheetDeviceController(CheckSheetDeviceServices checkSheetDeviceServices)
        {
            this.checkSheetDeviceServices = checkSheetDeviceServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetListCheckSheetDevice()
        {
            var checkSheetDevices = await checkSheetDeviceServices.GetListSheetDevice();
            return Ok(new ApiResponse<List<CheckSheetDeviceDTO>>(200, "Success", checkSheetDevices));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCheckSheetDeviceById(int id)
        {
            var checkSheetDevice = await checkSheetDeviceServices.GetSheetDevice(id);
            return checkSheetDevice != null ? Ok(new ApiResponse<CheckSheetDeviceDTO>(200, "Success", checkSheetDevice))
                                            : NotFound(new ApiResponse<string>(404, "Check Sheet - Device not found"));     
        }

        [HttpGet("checkSheetItemList")]
        public async Task<IActionResult> GetByDeviceAndCheckSheetCode(string deviceCode, string checkSheetCode)
        {
            var checkSheetDevice = await checkSheetDeviceServices.GetByDeviceAndCheckSheetCode(deviceCode, checkSheetCode);
            return checkSheetDevice != null ? Ok(new ApiResponse<CheckSheetDeviceDTO>(200, "Success", checkSheetDevice))
                                            : NotFound(new ApiResponse<string>(404, "Check Sheet - Device not found"));
        }

        [HttpPost]
        public async Task<IActionResult> CreateCheckSheetDevice(CheckSheetDevice checkSheetDevice)
        {
            var newSheetDevice = await checkSheetDeviceServices.CreateSheetDevice(checkSheetDevice);
            return Ok(new ApiResponse<CheckSheetDevice>(200, "Created Check Sheet - Device", checkSheetDevice));
        } 

        [HttpPut("{id}")]
        public async Task<IActionResult> CreateCheckSheetDevice(int id, [FromBody] CheckSheetDevice checkSheetDevice)
        {
            var updateCheckSheetDevice = await checkSheetDeviceServices.UpdateSheetDevice(id, checkSheetDevice);
            return updateCheckSheetDevice != null ? Ok(new ApiResponse<CheckSheetDevice>(200, "Updated Check Sheet - Device", updateCheckSheetDevice))
                                                  : NotFound(new ApiResponse<string>(404, "CheckSheetDevice not found"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCheckSheetDevice(int id)
        {
            var deleteCheckSheetDevice = await checkSheetDeviceServices.DeleteSheetDevice(id);
            return deleteCheckSheetDevice != null ? Ok(new ApiResponse<CheckSheetDevice>(200, "Deleted Check Sheet - Device", deleteCheckSheetDevice))
                                                  : NotFound(new ApiResponse<string>(404, "CheckSheetDevice not found"));
        }
    }
}
