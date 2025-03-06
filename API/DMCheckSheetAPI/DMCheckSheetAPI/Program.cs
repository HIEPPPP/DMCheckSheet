using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Repositories.Implementation;
using DMCheckSheetAPI.Repositories.Interface;
using DMCheckSheetAPI.Services;
using Ecommerce.API.Mapping;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//builder.Services.AddIdentityCore<ExtendedIdentityUser>()
//    .AddRoles<IdentityRole>()
//    .AddTokenProvider<DataProtectorTokenProvider<ExtendedIdentityUser>>("EcomsysHiepdd")
//    .AddEntityFrameworkStores<EcomsysHiepddContext>()
//    .AddDefaultTokenProviders();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:5173")
                          .AllowAnyMethod()
        .AllowAnyHeader());
});


builder.Services.AddDbContext<CheckSheetDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("CheckSheetConnectString"));
});

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

builder.Services.AddTransient<IDeviceRepository, DeviceRepository>();
builder.Services.AddTransient<IDeviceTypeRepository, DeviceTypeRepository>();
builder.Services.AddTransient<ICheckListItemRepository, CheckListItemRepository>();
builder.Services.AddTransient<ICheckRecordRepository, CheckRecordRepository>();
builder.Services.AddTransient<ICheckDetailRepository, CheckDetailRepository>();

builder.Services.AddTransient<DeviceSevices>();
builder.Services.AddTransient<DeviceTypeServices>();
builder.Services.AddTransient<CheckListItemServices>();
builder.Services.AddTransient<CheckRecordServices>();
builder.Services.AddTransient<CheckDetailServices>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
