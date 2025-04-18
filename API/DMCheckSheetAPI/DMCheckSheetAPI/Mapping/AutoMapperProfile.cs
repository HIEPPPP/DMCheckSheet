using AutoMapper;
using DMCheckSheetAPI.Models;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO.CheckResult;
using DMCheckSheetAPI.Models.DTO.CheckSheet;
using DMCheckSheetAPI.Models.DTO.CheckSheetItem;
using DMCheckSheetAPI.Models.DTO.Device;
using DMCheckSheetAPI.Models.DTO.ResultAction;

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

            CreateMap<CheckSheetItemMST, CreateItemDTO>().ReverseMap();
            CreateMap<CheckSheetItemMST, UpdateItemDTO>().ReverseMap();
            CreateMap<CheckSheetItemMST, ItemDTO>().ReverseMap();

            CreateMap<CheckResult, CreateResultDTO>().ReverseMap();
            CreateMap<CheckResult, UpdateResultDTO>().ReverseMap();
            CreateMap<CheckResult, ResultConfirmByDTO>().ReverseMap();
            CreateMap<CheckResult, ResultApproveByDTO>().ReverseMap();
            CreateMap<CheckResult, ResultBySheetCodeAndDateDTO>().ReverseMap();

            CreateMap<ResultAction, CreateActionDTO>().ReverseMap();
            CreateMap<ResultAction, UpdateActionDTO>().ReverseMap();
        }
    }
}
