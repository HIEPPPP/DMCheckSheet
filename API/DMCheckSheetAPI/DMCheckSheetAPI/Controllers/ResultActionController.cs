using DMCheckSheetAPI.Models;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.ResultAction;
using DMCheckSheetAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DMCheckSheetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultActionController : ControllerBase
    {
        private readonly ResultActionServices resultActionServices;

        public ResultActionController(ResultActionServices resultActionServices)
        {
            this.resultActionServices = resultActionServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetListAction()
        {
            var actions = await resultActionServices.GetListAction();
            return Ok(new ApiResponse<List<ResultActionDTO>>(200, "Success", actions));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActionById(int id)
        {
            var action = await resultActionServices.GetActionById(id);
            return action != null ? Ok(new ApiResponse<ResultActionDTO>(200, "Success", action))
                                  : NotFound(new ApiResponse<string>(404, "Action not found"));   
        }

        [HttpGet("{resultId}/resultId")]
        public async Task<IActionResult> GetActionByResultId(int resultId)
        {
            var action = await resultActionServices.GetActionByResultId(resultId);
            return action != null ? Ok(new ApiResponse<ResultActionDTO>(200, "Success", action))
                                  : NotFound(new ApiResponse<string>(404, "Action not found"));
        }

        [HttpGet("resultNG")]
        public async Task<IActionResult> GetListActionNG()
        {
            var actions = await resultActionServices.GetListActionNG();
            return Ok(new ApiResponse<List<ResultActionNGDTO>>(200, "Success", actions));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAction(CreateActionDTO createActionDTO)
        {
            var newAction = await resultActionServices.CreateAction(createActionDTO);
            return CreatedAtAction(nameof(GetActionById), new { id = newAction.ActionId }, new ApiResponse<ResultAction>(200, "Created action", newAction));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAction(int id, UpdateActionDTO updateActionDTO)
        {
            var updateAction = await resultActionServices.UpdateAction(id, updateActionDTO);
            return updateAction != null ? Ok(new ApiResponse<ResultAction>(200, "Updated action", updateAction))
                                        : NotFound(new ApiResponse<string>(404, "Action not found"));
        }

        [HttpPut("{resultId}/resultId")]
        public async Task<IActionResult> UpdateActionByResultId(int resultId, UpdateActionDTO updateActionDTO)
        {
            var updateAction = await resultActionServices.UpdateActionByResultId(resultId, updateActionDTO);
            return updateAction != null ? Ok(new ApiResponse<ResultAction>(200, "Updated action", updateAction))
                                        : NotFound(new ApiResponse<string>(404, "Action not found"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAction(int id)
        {
            var deletedAction = await resultActionServices.DeleteAction(id);
            return deletedAction != null ? Ok(new ApiResponse<ResultAction>(200, "Deleted action", deletedAction))
                                         : NotFound(new ApiResponse<string>(404, "Action not found"));
        }
    }
}
