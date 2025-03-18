using DMCheckSheetAPI.Models;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckListItem;
using DMCheckSheetAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace DMCheckSheetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckListItemController : ControllerBase
    {
        private readonly CheckListItemServices checkListItemServices;

        public CheckListItemController(CheckListItemServices checkListItemServices)
        {
            this.checkListItemServices = checkListItemServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetListItem()
        {
            var listItem = await checkListItemServices.GetListItem();
            return Ok(new ApiResponse<List<CheckListItemDTO>>(200, "Success", listItem));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem(int id)
        {
            var item = await checkListItemServices.GetItem(id);
            return item != null ? Ok(new ApiResponse<CheckListItemDTO>(200, "Success", item))
                                : NotFound(new ApiResponse<string>(404, "Item not found"));
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem([FromBody] CreateItemDTO createItemDTO)
        {
            var newItem = await checkListItemServices.CreateItem(createItemDTO);
            return CreatedAtAction(nameof(GetItem), new { id = newItem.ItemId }, new ApiResponse<CheckListItemMST>(200, "Item created", newItem));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, [FromBody] UpdateItemDTO updateItemDTO)
        {
            var updateItem = await checkListItemServices.UpdateItem(id, updateItemDTO);
            return updateItem != null ? Ok(new ApiResponse<CheckListItemMST>(200, "Item updated", updateItem))
                                      : NotFound(new ApiResponse<string>(404, "Item not found"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var deleteItem = await checkListItemServices.DeleteItem(id);
            return deleteItem != null ? Ok(new ApiResponse<CheckListItemMST>(200, "Item deleted", deleteItem))
                                      : NotFound(new ApiResponse<string>(404, "Item not found"));
        }
    }
}
