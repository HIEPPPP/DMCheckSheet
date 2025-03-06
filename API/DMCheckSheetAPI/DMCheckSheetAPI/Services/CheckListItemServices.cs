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

        public async Task<List<CheckListItem>> GetListItem()
        {
            return await checkListItemRepository.GetAllAsync();
        }

        public async Task<CheckListItem?> DeleteItem(int id)
        {
            var existItem = await checkListItemRepository.DeleteAsync(id);
            if (existItem == null) return null;
            return existItem;
        }

        public async Task<CreateUpdateItemDTO> CreateItem(CreateUpdateItemDTO itemDto)
        {
            var itemDomail = mapper.Map<CheckListItem>(itemDto);
            itemDomail = await checkListItemRepository.CreateAsync(itemDomail);
            return mapper.Map<CreateUpdateItemDTO>(itemDomail);

        }

        public async Task<CreateUpdateItemDTO?> UpdateItem(int id, CreateUpdateItemDTO itemDto)
        {
            var itemDomail = mapper.Map<CheckListItem>(itemDto);
            var existItem = await checkListItemRepository.UpdateAsync(id, itemDomail);
            if (existItem == null) return null;
            return mapper.Map<CreateUpdateItemDTO?>(existItem);            
        }
    }
}
