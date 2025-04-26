using DMCheckSheetAPI.Models;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckSheet;
using DMCheckSheetAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DMCheckSheetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckSheetController : ControllerBase
    {
        private readonly CheckSheetServices checkSheetServices;

        public CheckSheetController(CheckSheetServices checkSheetServices) 
        {
            this.checkSheetServices = checkSheetServices;
        }

        [HttpGet]   
        public async Task<IActionResult> GetListCheckSheet()
        {
            var checksheet = await checkSheetServices.GetListSheet();
            return Ok(new ApiResponse<List<CheckSheetMST>>(200, "Success", checksheet));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCheckSheet(int id)
        {
            var checksheet = await checkSheetServices.GetSheet(id);
            return checksheet != null ? Ok(new ApiResponse<CheckSheetMST>(200, "Success", checksheet))
                                      : NotFound(new ApiResponse<string>(404, "Check Sheet not found"));   
        }

        [HttpPost]
        public async Task<IActionResult> CreateSheet([FromBody] CreateSheetDTO createSheetDTO)
        {
            var newCheckSheet = await checkSheetServices.CreateSheet(createSheetDTO);
            return CreatedAtAction(nameof(GetCheckSheet), new {id = newCheckSheet.SheetId}, new ApiResponse<CheckSheetMST>(201, "Created Check Sheet", newCheckSheet));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSheet(int id, UpdateSheetDTO updateSheetDTO)
        {
            var updateCheckSheet = await checkSheetServices.UpdateSheet(id, updateSheetDTO);
            return updateCheckSheet != null ? Ok(new ApiResponse<CheckSheetMST>(200, "Updated Check Sheet", updateCheckSheet))
                                            : NotFound(new ApiResponse<string>(404, "Check Sheet not found"));
        }

        [HttpPut("{id}/cancel")]
        public async Task<IActionResult> UpdateCancelFlag(int id)
        {
            var checksheet = await checkSheetServices.UpdateCancelFlag(id);
            return checksheet != null ? Ok(new ApiResponse<CheckSheetMST>(200, "Updated cancel flag", checksheet))
                                      : NotFound(new ApiResponse<string>(404, "Check Sheet not found"));
        }

        [HttpPut("{checkSheetId}/devices")]
        public async Task<IActionResult> UpdateDevices(int checkSheetId, [FromBody] List<int> deviceIds)
        {
            var result = await checkSheetServices.UpdateDevicesInCheckSheetAsync(checkSheetId, deviceIds);

            if (!result)
            {
                return NotFound(new ApiResponse<string>(401, "CheckSheet not found"));
            }

            return Ok(new ApiResponse<string>(200, "Success"));
        }
    }
}
