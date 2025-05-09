using DMCheckSheetAPI.Models;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO;
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

        [HttpGet("bySheetAndDate")]
        public async Task<IActionResult> GetResultsBySheetAndDateAsync([FromQuery] string sheetCode, [FromQuery] string deviceCode, [FromQuery] DateTime today)
        {
            var results = await checkResultServices.GetResultsBySheetAndDateAsync(sheetCode, deviceCode, today);
            return Ok(new ApiResponse<List<ResultBySheetCodeAndDateDTO>>(200, "Success", results));
        }

        [HttpGet("today")]
        public async Task<IActionResult> GetListResultToday([FromQuery] DateTime today)
        {
            var result = await checkResultServices.GetListResultToday(today);
            return Ok(new ApiResponse<List<ResultTodayDTO>>(200, "Success", result));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetResult(int id)
        {
            var result = await checkResultServices.GetById(id);
            return result != null ? Ok(new ApiResponse<CheckResult>(200, "Succsess", result)) 
                                  : NotFound(new ApiResponse<string>(404, "Result not found"));
        }

        [HttpPost]
        public async Task<IActionResult> CreateResult([FromBody] List<CreateResultDTO> createResultDTOs)
        {
            var results = await checkResultServices.CreateResults(createResultDTOs);
            return Ok(new ApiResponse<List<CheckResult>>(201, "Created results", results));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateResult(int id, [FromBody] UpdateResultDTO updateResultDTO)
        {
            var result = await checkResultServices.UpdateResult(id, updateResultDTO);
            return result != null ? Ok(new ApiResponse<CheckResult>(200, "Updated result", result))
                                  : NotFound(new ApiResponse<string>(404, "Result not found"));
        }

        [HttpPut("confirm")]
        public async Task<IActionResult> ResultConfirm([FromBody] List<ResultConfirmByDTO> resultConfirmByDTOs)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var results = await checkResultServices.EditConfirmBy(resultConfirmByDTOs);
            return results != null ? Ok(new ApiResponse<List<CheckResult>>(200, "Confirmed", results))
                                   : NotFound(new ApiResponse<string>(404, "Result not found"));
        }

        [HttpPut("approve")]
        public async Task<IActionResult> ResultApprove([FromQuery] string sheetCode, [FromQuery] string deviceCode, [FromQuery] DateTime month, [FromQuery] string username)
        {
            var results = await checkResultServices.EditApproveBy(sheetCode, deviceCode, month, username);
            return results != null ? Ok(new ApiResponse<CheckResult>(200, "Approved", results))
                                   : NotFound(new ApiResponse<string>(404, "Result not found"));
        }

        [HttpPut("confirmedMonth")]
        public async Task<IActionResult> ResultConfirmedMonth([FromQuery] string sheetCode, [FromQuery] string deviceCode, [FromQuery] DateTime month, [FromQuery] string username)
        {
            var results = await checkResultServices.EditConfirmedMonth(sheetCode, deviceCode, month, username);
            return results != null ? Ok(new ApiResponse<CheckResult>(200, "Confirmed month", results))
                                   : NotFound(new ApiResponse<string>(404, "Result not found"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResult(int id)
        {
            var result = await checkResultServices.DeleteResult(id);
            return result != null ? Ok(new ApiResponse<CheckResult>(200, "Deleted result", result))
                                  : NotFound(new ApiResponse<string>(404, "Result not found"));
        }

        [HttpPut("{id}/updateIsConfirmNG")]
        public async Task<IActionResult> UpdateIsConfirmNG(int id, UpdateResultIsConfirmNGDTO updateResultIsConfirm)
        {
            var result = await checkResultServices.UpdateIsConfirmNG(id, updateResultIsConfirm);
            return result != null ? Ok(new ApiResponse<CheckResult>(200, "Updated isConfirmNG", result))
                                  : NotFound(new ApiResponse<string>(404, "Result not found"));
        }

        [HttpGet("bySheetDeviceToday")]
        public async Task<IActionResult> GetResultBySheetDeviceToday([FromQuery] string sheetCode, [FromQuery] string deviceCode, [FromQuery] DateTime today)
        {
            var results = await checkResultServices.GetResultBySheetDeviceToday(sheetCode, deviceCode, today);
            return Ok(new ApiResponse<CheckResult>(200, "Success", results));
        }

        [HttpGet("checkSheetRow")]
        public async Task<IActionResult> GetCheckSheetRows([FromQuery] string sheetCode, [FromQuery] string deviceCode, [FromQuery] DateTime monthref)
        {
            var result = await checkResultServices.GetCheckSheetRows(sheetCode, deviceCode, monthref);
            return Ok(new ApiResponse<List<CheckSheetRowDTO>>(200, "Success", result));
        }

        [HttpGet("approvedByMonth")]
        public async Task<IActionResult> GetApprovedByMonth([FromQuery] string sheetCode, [FromQuery] string deviceCode, [FromQuery] DateTime month)
        {
            var result = await checkResultServices.GetApprovedByMonth(sheetCode, deviceCode, month);
            return Ok(new ApiResponse<CheckResult>(200, "Success", result));
        }

        [HttpGet("confirmedByMonth")]
        public async Task<IActionResult> GetConfirmedByMonth([FromQuery] string sheetCode, [FromQuery] string deviceCode, [FromQuery] DateTime month)
        {
            var result = await checkResultServices.GetConfirmedByMonth(sheetCode, deviceCode, month);
            return Ok(new ApiResponse<CheckResult>(200, "Success", result));
        }

        [HttpGet("approvedConfirmedMonth")]
        public async Task<IActionResult> GetResultsApproveConfirmeMonths([FromQuery] DateTime month)
        {
            var results = await checkResultServices.GetResultsApproveConfirmeMonths(month);
            return Ok(new ApiResponse<List<ResultsApproveConfirmeMonthDTO>>(200, "Success", results));
        }
    }
}
