using AutoMapper;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckListItem;
using DMCheckSheetAPI.Repositories.Interface;

namespace DMCheckSheetAPI.Services
{
    public class CheckListItemServices
    {
        private readonly ICheckListItemRepository checkListItemRepository;
        private readonly IMapper mapper;

        public CheckListItemServices(ICheckListItemRepository checkListItemRepository, IMapper mapper)
        {
            this.checkListItemRepository = checkListItemRepository;
            this.mapper = mapper;
        }

        public async Task<List<CheckListItemDTO>> GetListItem()
        {
            return await checkListItemRepository.GetAllAsync();
        }

        public async Task<CheckListItemDTO?> GetItem(int id)
        {
            return await checkListItemRepository.GetAsync(id);
        }

        public async Task<CheckListItemMST?> DeleteItem(int id)
        {
            var existItem = await checkListItemRepository.DeleteAsync(id);
            if (existItem == null) return null;
            return existItem;
        }

        public async Task<CheckListItemMST> CreateItem(CreateItemDTO itemDto)
        {
            var itemDomail = mapper.Map<CheckListItemMST>(itemDto);
            return await checkListItemRepository.CreateAsync(itemDomail);

        }

        public async Task<CheckListItemMST?> UpdateItem(int id, UpdateItemDTO itemDto)
        {
            var itemDomail = mapper.Map<CheckListItemMST>(itemDto);
            return await checkListItemRepository.UpdateAsync(id, itemDomail);
        }
    }
}
