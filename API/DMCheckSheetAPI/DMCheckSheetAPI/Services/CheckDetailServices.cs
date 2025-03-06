using AutoMapper;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO;
using DMCheckSheetAPI.Repositories.Interface;

namespace DMCheckSheetAPI.Services
{
    public class CheckDetailServices
    {
        private readonly ICheckDetailRepository checkDetailRepository;
        private readonly IMapper mapper;

        public CheckDetailServices(ICheckDetailRepository checkDetailRepository, IMapper mapper)
        {
            this.checkDetailRepository = checkDetailRepository;
            this.mapper = mapper;
        }

        public async Task<List<CheckDetail>> GetListDetail()
        {
            return await checkDetailRepository.GetAllAsync(); 
        }

        public async Task<CheckDetail?> DeleteDetail(int id)
        {
            var existDetail = await checkDetailRepository.DeleteAsync(id);
            if (existDetail == null) return null;
            return existDetail;
        }

        public async Task<CreateUpdateDetailDTO> CreateDetail(CreateUpdateDetailDTO detailDto)
        {
            var detailDomain = mapper.Map<CheckDetail>(detailDto);
            detailDomain = await checkDetailRepository.CreateAsync(detailDomain);
            return mapper.Map<CreateUpdateDetailDTO>(detailDomain);
        }

        public async Task<CreateUpdateDetailDTO> UpdateDetail(int id, CreateUpdateDetailDTO detailDto)
        {
            var detailDomamin = mapper.Map<CheckDetail>(detailDto);
            var existDetail = await checkDetailRepository.UpdateAsync(id, detailDomamin);
            if (existDetail == null) return null;
            return mapper.Map<CreateUpdateDetailDTO>(existDetail);  
        }
    }
}
