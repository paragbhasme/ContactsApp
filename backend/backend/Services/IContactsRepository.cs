using backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services
{
    public interface IContactsRepository
    {
        
       
        //Task<IEnumerable<Contacts>> GetAllContacts(int pageNumber, int pageSize, bool sortDescending = false);
        Task<IEnumerable<Contacts>> GetAllContacts(int pageNumber, int pageSize, string sortBy = "Name", bool sortDescending = false);
        Task AddContact(Contacts contactToAdd);
        Task DeleteContact(int id);
        Task UpdateContact(int id, Contacts contactToAdd);
        Task<IEnumerable<Contacts>> GetFavourites();
    }
}
