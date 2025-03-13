using DMCheckSheetAPI.Models.DTO;
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
            return Ok(await deviceSevices.GetListDevice());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDeviceById(int id)
        {
            var device = await deviceSevices.GetDeviceById(id);
            if (device == null) return NotFound();
            return Ok(device);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDevice([FromBody] CreateDeviceDTO deviceDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdDevice = await deviceSevices.CreateDevice(deviceDto);

            return Ok(createdDevice);         
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDevice(int id)
        {
            try
            {
                var deletedDevice = await deviceSevices.DeleteDevice(id);
                if (deletedDevice == null)
                {
                    return NotFound(new { message = "Device not found" });
                }

                return NoContent(); // Trả về 204 khi xóa thành công
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDevice(int id, UpdateDeviceDTO updateDeviceDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await deviceSevices.UpdateDevice(id, updateDeviceDTO);
            if (result == null) return NotFound();
            return Ok(result);
        }
    }
}
