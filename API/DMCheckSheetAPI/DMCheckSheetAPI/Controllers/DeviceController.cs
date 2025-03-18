using DMCheckSheetAPI.Models;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.Device;
using DMCheckSheetAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DMCheckSheetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private readonly DeviceSevices deviceSevices;

        public DeviceController(DeviceSevices deviceSevices)
        {
            this.deviceSevices = deviceSevices;
        }

        [HttpGet]
        public async Task<IActionResult> GetListDevice()
        {
            var devices = await deviceSevices.GetListDevice();
            return Ok(new ApiResponse<List<DeviceDTO>>(200, "Success", devices));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDeviceById(int id)
        {
            var device = await deviceSevices.GetDeviceById(id);
            return device != null ? Ok(new ApiResponse<DeviceDTO>(200, "Success", device))
                                  : NotFound(new ApiResponse<string>(404, "Device not found"));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDevice([FromBody] CreateDeviceDTO deviceDto)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            var newDevice = await deviceSevices.CreateDevice(deviceDto);

            return CreatedAtAction(nameof(GetDeviceById), new { id = newDevice.DeviceId }, new ApiResponse<DeviceMST>(201, "Device created", newDevice));        
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDevice(int id)
        {
            var device = await deviceSevices.DeleteDevice(id);
            return device != null ? Ok(new ApiResponse<DeviceMST>(200, "Device deleted"))
                                  : NotFound(new ApiResponse<string>(404, "Device not found"));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDevice(int id, UpdateDeviceDTO updateDeviceDTO)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            var updateDevice = await deviceSevices.UpdateDevice(id, updateDeviceDTO);
            return updateDevice != null ? Ok(new ApiResponse<DeviceMST>(200, "Device updated", updateDevice))
                                        : NotFound(new ApiResponse<string>(200, "Device not found"));
        }
    }
}
