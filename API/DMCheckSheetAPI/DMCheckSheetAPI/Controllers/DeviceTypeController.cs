using AutoMapper;
using DMCheckSheetAPI.Models;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.DeviceType;
using DMCheckSheetAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DMCheckSheetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize("Admin")]
    public class DeviceTypeController : ControllerBase
    {
        private readonly DeviceTypeServices deviceTypeServices;        

        public DeviceTypeController(DeviceTypeServices deviceTypeServices)
        {
            this.deviceTypeServices = deviceTypeServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetListType()
        {
            var deviceTypes = await deviceTypeServices.GetListDeviceType();
            return Ok(new ApiResponse<List<DeviceTypeMST>>(200, "Success", deviceTypes));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTypeById(int id)
        {
            var devicetype = await deviceTypeServices.GetTypeById(id);
            return devicetype != null ? Ok(new ApiResponse<DeviceTypeMST>(200, "Success", devicetype))
                                  : NotFound(new ApiResponse<string>(404, "User not found"));
             
        }

        [HttpPost]
        public async Task<IActionResult> CreateType(CreateDeviceTypeDTO createDeviceTypeDTO)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            var newType = await deviceTypeServices.CreateType(createDeviceTypeDTO);
            return CreatedAtAction(nameof(GetTypeById), new { id = newType.TypeId }, new ApiResponse<DeviceTypeMST>(201, "Device type created", newType));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateType(int id, UpdateDeviceTypeDTO updateDeviceTypeDTO)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            var updateDeviceType = await deviceTypeServices.UpdateType(id, updateDeviceTypeDTO);
            return updateDeviceType != null ? Ok(new ApiResponse<DeviceTypeMST>(200, "Device type updated", updateDeviceType))
                                            : NotFound(new ApiResponse<string>(404, "Device type not found"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteType(int id)
        {
            var deletedType = await deviceTypeServices.DeleteDeviceType(id);
            return deletedType != null ? Ok(new ApiResponse<DeviceTypeMST>(200, "Device type deleted"))
                                       : NotFound(new ApiResponse<DeviceTypeMST>(404, "Device type not found"));                        
            
        }

        
    }
}
