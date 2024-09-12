using backend.DbContext;
using backend.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class ContactsRepository : IContactsRepository
    {
        private readonly ContactsDBContext _contacts;

        public ContactsRepository(ContactsDBContext contacts)
        {
            _contacts = contacts;
        }



        //public async Task<IEnumerable<Contacts>> GetAllContacts(int pageNumber, int pageSize, bool sortDescending = false)
        //{
        //    var query = _contacts.Contact.AsQueryable();

        //    if (sortDescending)
        //    {
        //        query = query.OrderByDescending(c => c.Name.ToLower());
        //    }
        //    else
        //    {
        //        query = query.OrderBy(c => c.Name.ToLower());
        //    }

        //    return await query.Skip((pageNumber - 1) * pageSize)
        //                      .Take(pageSize)
        //                      .ToListAsync();
        //}

        public async Task<IEnumerable<Contacts>> GetAllContacts(int pageNumber, int pageSize, string sortBy = "Name", bool sortDescending = false)
        {
            var query = _contacts.Contact.AsQueryable();

            switch (sortBy.ToLower())
            {
                case "mobile":
                    query = sortDescending
                        ? query.OrderByDescending(c => c.Mobile)
                        : query.OrderBy(c => c.Mobile);
                    break;
                case "name":
                default:
                    query = sortDescending
                        ? query.OrderByDescending(c => c.Name)
                        : query.OrderBy(c => c.Name);
                    break;
            }

            return await query.Skip((pageNumber - 1) * pageSize)
                              .Take(pageSize)
                              .ToListAsync();
        }


        //public async Task<IEnumerable<Contacts>> GetFavourites(int pageNumber, int pageSize)
        public async Task<IEnumerable<Contacts>> GetFavourites()
        {
            return await _contacts.Contact
                                  .Where(c => c.Favourites)
                                  .OrderBy(c => c.Name.ToLower())
                                  .ToListAsync();
            //.Skip((pageNumber - 1) * pageSize)
            //.Take(pageSize)

        }


        public async Task AddContact(Contacts contactToAdd)
        {

            _contacts.Contact.Add(contactToAdd);
            await _contacts.SaveChangesAsync();

        }

        public async Task DeleteContact(int id)
        {
            var dContact = await _contacts.Contact.FindAsync(id);
            _contacts.Contact.Remove(dContact);
            await _contacts.SaveChangesAsync();

        }

        public async Task UpdateContact(int id, Contacts contactToUpdate)
        {
            var existingContact = await _contacts.Contact.FindAsync(id);

            if (existingContact == null)
            {
                throw new KeyNotFoundException($"Contact with ID {id} not found.");
            }
            existingContact.Name = contactToUpdate.Name;
            existingContact.Mobile = contactToUpdate.Mobile;
            existingContact.SecMobile = contactToUpdate.SecMobile;
            existingContact.Email = contactToUpdate.Email;
            existingContact.Photo = contactToUpdate.Photo;

            await _contacts.SaveChangesAsync();
        }


    }
}