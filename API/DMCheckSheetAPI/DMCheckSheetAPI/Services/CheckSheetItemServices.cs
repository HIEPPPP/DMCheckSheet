using AutoMapper;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckSheetItem;
using DMCheckSheetAPI.Repositories.Implementation;
using DMCheckSheetAPI.Repositories.Interface;

namespace DMCheckSheetAPI.Services
{
    public class CheckSheetItemServices
    {
        private readonly ICheckSheetItemRepository checkSheetItemRepository;
        private readonly IMapper mapper;

        public CheckSheetItemServices(ICheckSheetItemRepository checkSheetItemRepository, IMapper mapper)
        {
            this.checkSheetItemRepository = checkSheetItemRepository;
            this.mapper = mapper;
        }
        public async Task<List<ItemDTO>> GetListItem()
        {

            return await checkSheetItemRepository.GetAllAsync();
        }

        public async Task<List<ItemDTO>?> GetListItemByCode(string sheetCode)
        {
            return await checkSheetItemRepository.GetAllAsyncByCode(sheetCode);
        }

        public async Task<CheckSheetItemMST?> GetItemById(int id)
        {
            return await checkSheetItemRepository.GetAsync(id);
        }

        public async Task<CheckSheetItemMST> CreateItem(CreateItemDTO createItemDTO)
        {
            var itemDomain = mapper.Map<CheckSheetItemMST>(createItemDTO);
            return await checkSheetItemRepository.CreateAsync(itemDomain);
        }        

        public async Task<CheckSheetItemMST?> UpdateItem(int id, UpdateItemDTO updateItemDTO)
        {
            var itemDomain = mapper.Map<CheckSheetItemMST>(updateItemDTO);
            return await checkSheetItemRepository.UpdateAsync(id, itemDomain);
        }

        public async Task<CheckSheetItemMST?> DeleteItem(int id)
        {
            return await checkSheetItemRepository.DeleteAsync(id);
        }

        public async Task<CheckSheetItemMST?> UpdateCancelFlag(int id)
        {
            return await checkSheetItemRepository.UpdateCancelFlag(id);
        }

    }
}
