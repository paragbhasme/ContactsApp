using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.DbContext
{
    public class ContactsDBContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public ContactsDBContext(DbContextOptions<ContactsDBContext> options) : base(options)
        {
        }

        public DbSet<Contacts> Contact { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}