using AutoMapper;
using DMCheckSheetAPI.Models;
using DMCheckSheetAPI.Models.Domain;
using DMCheckSheetAPI.Models.DTO;

namespace Ecommerce.API.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() 
        {
            CreateMap<DeviceMST, CreateDeviceDTO>().ReverseMap();
            CreateMap<DeviceMST, UpdateDeviceDTO>().ReverseMap();

            CreateMap<DeviceTypeMST, CreateDeviceTypeDTO>().ReverseMap();
            CreateMap<DeviceTypeMST, UpdateDeviceTypeDTO>().ReverseMap();

            CreateMap<CheckDetail, CreateDetailDTO>().ReverseMap();
            CreateMap<CheckDetail, UpdateDetailDTO>().ReverseMap();

            CreateMap<CheckListItemMST, CreateItemDTO>().ReverseMap();
            CreateMap<CheckListItemMST, UpdateItemDTO>().ReverseMap();

            CreateMap<CheckRecord, CreateCheckDTO>().ReverseMap();
            CreateMap<CheckRecord, UpdateCheckDTO>().ReverseMap();


            //CreateMap<Product, ProductDto>().ReverseMap();  
            //CreateMap<Product, UpdateProductRequestDto>().ReverseMap();

            //CreateMap<ProductInventory, CreateProductInventoryRequestDto>().ReverseMap();
            //CreateMap<ProductInventory, UpdateProductRequestDto>().ForMember(x => x.Quantity, otp => otp.MapFrom(x => x.Quantity)).ReverseMap();


        }
    }
}
