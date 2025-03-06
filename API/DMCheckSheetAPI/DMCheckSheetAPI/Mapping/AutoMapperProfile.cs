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
            CreateMap<Device, CreateDeviceDTO>().ReverseMap();
            CreateMap<Device, UpdateDeviceDTO>().ReverseMap();
            CreateMap<DeviceType, CreateUpdateTypeDTO>().ReverseMap();
            CreateMap<CheckDetail, CreateUpdateDetailDTO>().ReverseMap();
            CreateMap<CheckListItem, CreateUpdateItemDTO>().ReverseMap();
            CreateMap<CheckRecord, CreateUpdateCheckDTO>().ReverseMap();


            //CreateMap<Product, ProductDto>().ReverseMap();  
            //CreateMap<Product, UpdateProductRequestDto>().ReverseMap();

            //CreateMap<ProductInventory, CreateProductInventoryRequestDto>().ReverseMap();
            //CreateMap<ProductInventory, UpdateProductRequestDto>().ForMember(x => x.Quantity, otp => otp.MapFrom(x => x.Quantity)).ReverseMap();


        }
    }
}
