using DMCheckSheetAPI.Models;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckSheetItem;
using DMCheckSheetAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DMCheckSheetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckSheetItemController : ControllerBase
    {
        private readonly CheckSheetItemServices checkSheetItemServices;

        public CheckSheetItemController(CheckSheetItemServices checkSheetItemServices)
        {
            this.checkSheetItemServices = checkSheetItemServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetListItem()
        {
            var items = await checkSheetItemServices.GetListItem();
            return Ok(new ApiResponse<List<ItemDTO>>(200, "Success", items));
        }

        [HttpGet("{sheetCode}/sheetCode")]
        public async Task<IActionResult> GetListItemBySheetCode(string sheetCode)
        {
            var items = await checkSheetItemServices.GetListItemByCode(sheetCode);
            return Ok(new ApiResponse<List<ItemDTO>>(200, "Success", items));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem(int id)
        {
            var item = await checkSheetItemServices.GetItemById(id);
            return item != null ? Ok(new ApiResponse<CheckSheetItemMST>(200, "Success", item))
                                : NotFound(new ApiResponse<string>(404, "Item not found"));
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem([FromBody] CreateItemDTO createItemDTO)
        {
            var newItem = await checkSheetItemServices.CreateItem(createItemDTO);
            return CreatedAtAction(nameof(GetItem), new {id = newItem.ItemId}, new ApiResponse<CheckSheetItemMST>(201, "Created item", newItem));
        }       

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, UpdateItemDTO updateItemDTO)
        {
            var updateItem = await checkSheetItemServices.UpdateItem(id, updateItemDTO);
            return updateItem != null ? Ok(new ApiResponse<CheckSheetItemMST>(200, "Success", updateItem))
                                      : NotFound(new ApiResponse<string>(404, "Item not found"));
        }

        [HttpPut("{id}/cancel")]
        public async Task<IActionResult> UpdateCancelFlag(int id)
        {
            var updateItem = await checkSheetItemServices.UpdateCancelFlag(id);
            return updateItem != null ? Ok(new ApiResponse<CheckSheetItemMST>(200, "Success", updateItem))
                                      : NotFound(new ApiResponse<string>(404, "Item not found"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            throw new Exception();
            //var updateItem = await checkSheetItemServices.DeleteItem(id);
            //return updateItem != null ? Ok(new ApiResponse<CheckSheetItemMST>(200, "Success", updateItem))
            //                          : NotFound(new ApiResponse<string>(401, "Item not found"));
        }
    }
}
    