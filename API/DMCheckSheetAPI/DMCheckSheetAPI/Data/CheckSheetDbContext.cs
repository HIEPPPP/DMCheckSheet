using DMCheckSheetAPI.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace DMCheckSheetAPI.Data
{
    public class CheckSheetDbContext : DbContext
    {        
        public CheckSheetDbContext(DbContextOptions options) : base(options)
        {
        }
        public virtual DbSet<DeviceType> DeviceTypes { get; set; }
        public virtual DbSet<Device> Devices { get; set; }
        public virtual DbSet<CheckListItem> CheckListItems { get; set; }
        public virtual DbSet<CheckRecord> CheckRecords { get; set; }
        public virtual DbSet<CheckDetail> CheckDetails { get; set; }
        public virtual DbSet<UserLogin> UserLogins { get; set; }

    }
}
