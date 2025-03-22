using AutoMapper;
using DMCheckSheetAPI.Models;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckSheet;
using DMCheckSheetAPI.Models.DTO.Device;

namespace Ecommerce.API.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() 
        {
            CreateMap<DeviceMST, CreateDeviceDTO>().ReverseMap();
            CreateMap<DeviceMST, UpdateDeviceDTO>().ReverseMap(); 
            
            CreateMap<CheckSheetMST, CreateSheetDTO>().ReverseMap();     
            CreateMap<CheckSheetMST, UpdateSheetDTO>().ReverseMap();
        }
    }
}
