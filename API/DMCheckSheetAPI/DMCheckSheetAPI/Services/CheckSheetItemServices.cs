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
        public async Task<List<CheckSheetItemMST>> GetListItem()
        {
            return await checkSheetItemRepository.GetAllAsync();
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

        public async Task<CheckSheetItemMST?> UpdateCancelFlag(int id)
        {
            return await checkSheetItemRepository.UpdateCancelFlagAsync(id);
        }

    }
}
