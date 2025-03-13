using AutoMapper;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO;
using DMCheckSheetAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DMCheckSheetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeviceTypeController : ControllerBase
    {
        private readonly DeviceTypeServices deviceTypeServices;
        private readonly IMapper mapper;

        public DeviceTypeController(DeviceTypeServices deviceTypeServices, IMapper mapper)
        {
            this.deviceTypeServices = deviceTypeServices;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetListType()
        {
            return Ok(await deviceTypeServices.GetListDeviceType());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetListTypeById(int id)
        {
            var device = await deviceTypeServices.GetTypeById(id);
            if (device == null) return NotFound();
            return Ok(device);  
        }

        [HttpPost]
        public async Task<IActionResult> CreateType(CreateDeviceTypeDTO createDeviceTypeDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdtype = await deviceTypeServices.CreateType(createDeviceTypeDTO);

            return Ok(createdtype);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateType(int id, UpdateDeviceTypeDTO updateDeviceTypeDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await deviceTypeServices.UpdateType(id, updateDeviceTypeDTO);
            if(result == null) return NotFound($"Device type with ID {id} not found.");
            return Ok(result);
        }
    }
}
