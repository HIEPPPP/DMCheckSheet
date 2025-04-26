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
            return Ok(new ApiResponse<List<DeviceMST>>(200, "Success", devices));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDeviceById(int id)
        {
            var device = await deviceSevices.GetDeviceById(id);
            return device != null ? Ok(new ApiResponse<DeviceMST>(200, "Success", device))
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

        [HttpPut("{id}/cancel")]
        public async Task<IActionResult> UpdateCancelFlag(int id)
        {
            var device = await deviceSevices.UpdateCancelFlag(id);
            return device != null
                ? Ok(new ApiResponse<DeviceMST>(200, "Updated cancel flag", device))
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
                                        : NotFound(new ApiResponse<string>(404, "Device not found"));
        }

        [HttpPut("{deviceId}/checksheets")]
        public async Task<IActionResult> UpdateDevices(int deviceId, [FromBody] List<int> checkSheetsId)
        {
            var result = await deviceSevices.UpdateCheckSheetInDevicesAsync(deviceId, checkSheetsId);

            if (!result)
            {
                return NotFound(new ApiResponse<string>(404, "Device not found"));
            }

            return Ok(new ApiResponse<string>(200, "Success"));
        }
    }
}
