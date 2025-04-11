using DMCheckSheetAPI.Models.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DMCheckSheetAPI.Data
{
    public class CheckSheetDbContext : IdentityDbContext<User>
    {        
        public CheckSheetDbContext(DbContextOptions<CheckSheetDbContext> options) : base(options)
        {
        }
        public virtual DbSet<DeviceMST> Devices { get; set; }
        public virtual DbSet<CheckSheetMST> CheckSheets { get; set; }
        public virtual DbSet<CheckSheetItemMST> CheckSheetItems { get; set; }
        public virtual DbSet<CheckSheetDevice> CheckSheetDevices { get; set; }
        public virtual DbSet<CheckResult> CheckResults { get; set; }
        public virtual DbSet<ResultAction> ResultActions { get; set; }
    }
}
