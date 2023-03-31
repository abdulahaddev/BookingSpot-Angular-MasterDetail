using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Angular_MasterDetails.Models
{
    public class Client
    {
        public int ClientId { get; set; }
        public string ClientName { get; set; }
        [Column(TypeName = "date")]
        public DateTime BirthDate { get; set; }
        public int PhoneNo { get; set; }
        public string Picture { get; set; }
        public bool MaritalStatus { get; set; }

        public virtual ICollection<BookingEntry> bookingEntries { get; set; } = new List<BookingEntry>();

    }
    public class Spot
    {
        public int SpotId { get; set; }
        public string? SpotName { get; set; }
        public virtual ICollection<BookingEntry> bookingEntries { get; set; } = new List<BookingEntry>();
    }
    public class BookingEntry
    {
        public int BookingEntryId { get; set; }
        [ForeignKey("Client")]
        public int ClientId { get; set; }
        [ForeignKey("Spot")]
        public int SpotId { get; set; }

        //Nav
        public virtual Client Client { get; set; }
        public virtual Spot Spot { get; set; }
    }
    public class BookingDbContext : DbContext
    {
        public BookingDbContext(DbContextOptions<BookingDbContext> options) : base(options) { }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Spot> Spots { get; set; }
        public DbSet<BookingEntry> BookingEntries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Spot>().HasData
                (
                    new Spot { SpotId = 1, SpotName = "Panam City"},
                    new Spot { SpotId = 2, SpotName = "Sylhet"},
                    new Spot { SpotId = 3, SpotName = "Bandarban"},
                    new Spot { SpotId = 4, SpotName = "Cox's Bazar"},
                    new Spot { SpotId = 5, SpotName = "Bagerhat"}
                );
        }

        internal object Find(int clientId)
        {
            throw new NotImplementedException();
        }
    }
}
