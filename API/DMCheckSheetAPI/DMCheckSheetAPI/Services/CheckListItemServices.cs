using AutoMapper;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO;
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

        public async Task<List<CheckListItemMST>> GetListItem()
        {
            return await checkListItemRepository.GetAllAsync();
        }

        public async Task<CheckListItemMST?> DeleteItem(int id)
        {
            var existItem = await checkListItemRepository.DeleteAsync(id);
            if (existItem == null) return null;
            return existItem;
        }

        public async Task<CreateItemDTO> CreateItem(CreateItemDTO itemDto)
        {
            var itemDomail = mapper.Map<CheckListItemMST>(itemDto);
            itemDomail = await checkListItemRepository.CreateAsync(itemDomail);
            return mapper.Map<CreateItemDTO>(itemDomail);

        }

        public async Task<CreateItemDTO?> UpdateItem(int id, CreateItemDTO itemDto)
        {
            var itemDomail = mapper.Map<CheckListItemMST>(itemDto);
            var existItem = await checkListItemRepository.UpdateAsync(id, itemDomail);
            if (existItem == null) return null;
            return mapper.Map<CreateItemDTO?>(existItem);            
        }
    }
}
