using DMCheckSheetAPI.Data;
using DMCheckSheetAPI.Middleware;
using DMCheckSheetAPI.Repositories.Implementation;
using DMCheckSheetAPI.Repositories.Interface;
using DMCheckSheetAPI.Services;
using Ecommerce.API.Mapping;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using DMCheckSheetAPI.Models.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

var logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("Logs/DMCheckSheet_Log.txt", rollingInterval: RollingInterval.Month)
    .MinimumLevel.Information()
    .CreateLogger();

builder.Logging.ClearProviders();
builder.Logging.AddSerilog(logger);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "DMCheckSheet API", Version = "v1" });

    // Cấu hình xác thực JWT cho Swagger
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Nhập JWT token vào đây"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy => policy
        .WithOrigins(
            "http://172.17.140.11:5000",
            "https://172.17.140.11:5000",
            "http://172.17.140.11:5001",
            "https://172.17.140.11:5001",
            "https://172.17.140.11:5002",
            "http://localhost:5118",
            "http://localhost:5173"
        )
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
    );
});


builder.Services.AddDbContext<CheckSheetDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("CheckSheetConnectString"));
});

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

// Repository
builder.Services.AddScoped<IDeviceRepository, DeviceRepository>();
builder.Services.AddScoped<ICheckSheetRepository, CheckSheetRepository>();
builder.Services.AddScoped<ICheckSheetItemRepository, CheckSheetItemRepository>();
builder.Services.AddScoped<ICheckResultRepository, CheckResultRepository>();
builder.Services.AddScoped<IResultActionRepository, ResultActionRepository>();
builder.Services.AddScoped<ICheckSheetDeviceRepository, CheckSheetDeviceRepository>();
builder.Services.AddScoped<IUserReposiory, UserReposiory>();

// Services
builder.Services.AddScoped<DeviceSevices>();
builder.Services.AddScoped<CheckSheetServices>();
builder.Services.AddScoped<CheckSheetItemServices>();
builder.Services.AddScoped<CheckResultServices>();
builder.Services.AddScoped<ResultActionServices>();
builder.Services.AddScoped<CheckSheetDeviceServices>();
builder.Services.AddScoped<UsersServices>();

builder.Services.AddIdentityCore<User>()
    .AddRoles<IdentityRole>()
    .AddTokenProvider<DataProtectorTokenProvider<User>>("CheckSheetDbContext")
    .AddEntityFrameworkStores<CheckSheetDbContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;
});

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    };
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", policy =>
    policy.RequireClaim("http://schemas.microsoft.com/ws/2008/06/identity/claims/role", "Admin"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


//app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
