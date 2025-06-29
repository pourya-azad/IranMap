using map_3.Models;
using Microsoft.EntityFrameworkCore;

namespace map_3.Data
{
    public class IranMapDbContext : DbContext
    {
        public IranMapDbContext(DbContextOptions<IranMapDbContext> options) : base(options)
        {
        }

        public DbSet<ProvinceStats> ProvinceStats { get; set; }

    }
}