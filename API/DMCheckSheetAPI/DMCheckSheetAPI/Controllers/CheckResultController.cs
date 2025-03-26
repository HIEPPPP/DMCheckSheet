using DMCheckSheetAPI.Models;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckResult;
using DMCheckSheetAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DMCheckSheetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckResultController : ControllerBase
    {
        private readonly CheckResultServices checkResultServices;

        public CheckResultController(CheckResultServices checkResultServices)
        {
            this.checkResultServices = checkResultServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetListResult()
        {
            var results = await checkResultServices.GetListResult();
            return Ok(new ApiResponse<List<CheckResult>>(200, "Success", results));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetResult(int id)
        {
            var result = await checkResultServices.GetById(id);
            return result != null ? Ok(new ApiResponse<CheckResult>(200, "Succsess", result)) 
                                  : NotFound(new ApiResponse<string>(401, "Result not found"));
        }

        [HttpPost]
        public async Task<IActionResult> CreateResult([FromBody] CreateResultDTO createResultDTO)
        {
            var result = await checkResultServices.CreateResult(createResultDTO);
            return CreatedAtAction(nameof(GetResult), new {id = result.ResultId}, new ApiResponse<CheckResult>(201, "Created result", result));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateResult(int id, [FromBody] UpdateResultDTO updateResultDTO)
        {
            var result = await checkResultServices.UpdateResult(id, updateResultDTO);
            return result != null ? Ok(new ApiResponse<CheckResult>(200, "Updated result", result))
                                  : NotFound(new ApiResponse<string>(401, "Result not found"));
        }

        [HttpPut("{id}/confirm")]
        public async Task<IActionResult> ResultConfirm(int id, [FromBody] ResultConfirmByDTO confirmByDTO)
        {
            var result = await checkResultServices.EditConfirmBy(id, confirmByDTO);
            return result != null ? Ok(new ApiResponse<CheckResult>(200, "Confirmed", result))
                                  : NotFound(new ApiResponse<string>(401, "Result not found"));
        }

        [HttpPut("{id}/approve")]
        public async Task<IActionResult> ResultApprove(int id, [FromBody] ResultApproveByDTO resultApproveByDTO)
        {
            var result = await checkResultServices.EditApproveBy(id, resultApproveByDTO);
            return result != null ? Ok(new ApiResponse<CheckResult>(200, "Approved", result))
                                  : NotFound(new ApiResponse<string>(401, "Result not found"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResult(int id)
        {
            var result = await checkResultServices.DeleteResult(id);
            return result != null ? Ok(new ApiResponse<CheckResult>(200, "Deleted result", result))
                                  : NotFound(new ApiResponse<string>(401, "Result not found"));
        }

    }
}
