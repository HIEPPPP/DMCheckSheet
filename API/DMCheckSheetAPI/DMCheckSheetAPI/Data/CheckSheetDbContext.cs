using DMCheckSheetAPI.Models.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DMCheckSheetAPI.Data
{
    public class CheckSheetDbContext : IdentityDbContext<User>
    {        
        public CheckSheetDbContext(DbContextOptions options) : base(options)
        {
        }
        public virtual DbSet<DeviceTypeMST> DeviceTypes { get; set; }
        public virtual DbSet<DeviceMST> Devices { get; set; }
        public virtual DbSet<CheckListItemMST> CheckListItems { get; set; }
        public virtual DbSet<CheckRecord> CheckRecords { get; set; }
        public virtual DbSet<CheckDetail> CheckDetails { get; set; }
        public virtual DbSet<User> UserLogins { get; set; }
    }
}
