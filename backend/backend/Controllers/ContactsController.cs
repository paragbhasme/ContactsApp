using backend.DbContext;
using backend.Entities;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/contacts")]
    [ApiController]
    public class ContactsController : ControllerBase
    {

        private readonly IContactsRepository _contactsRepository;
        private readonly ContactsDBContext _contacts;

        public ContactsController(IContactsRepository contactsRepository, ContactsDBContext contacts)
        {
            _contactsRepository = contactsRepository;
            _contacts = contacts;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contacts>>> GetContacts(
     int pageNumber,
     int pageSize,
     string sortBy,
     bool sortDescending)
        {
            // Validate input parameters
            if (pageNumber <= 0 || pageSize <= 0)
            {
                return BadRequest("Invalid page number or page size.");
            }

            // Call the repository method with the provided parameters
            var contactList = await _contactsRepository.GetAllContacts(pageNumber, pageSize, sortBy, sortDescending);

            // Return the result
            return Ok(contactList);
        }


        [HttpGet("favourites")]
        public async Task<ActionResult<IEnumerable<Contacts>>> GetFavouritesContacts()
        {
            //if (pageNumber <= 0 || pageSize <= 0)
            //{
            //    return BadRequest("Invalid page number or page size.");
            //}

            var contactList = await _contactsRepository.GetFavourites();
            return Ok(contactList);
        }


        [HttpPost]
        public async Task<ActionResult> AddContact(Contacts contactToAdd)
        {
            if (contactToAdd == null)
            {
                return BadRequest();
            }
            try
            {
                _contactsRepository.AddContact(contactToAdd);
                return Ok();
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating the contact.");
            }

        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteContact(int id)
        {
            _contactsRepository.DeleteContact(id);
            return Ok();
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateContact(int id, Contacts contactToUpdate)
        {
            if (contactToUpdate == null)
            {
                throw new ArgumentNullException(nameof(contactToUpdate), "Contact data is required.");
            }
            _contactsRepository.UpdateContact(id, contactToUpdate);
            return Ok();
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> ToggleFavourites(int id, bool favourites)
        {
            var ObjectToToggle = await _contacts.Contact.FindAsync(id);
            ObjectToToggle.Favourites = favourites;
            await _contacts.SaveChangesAsync();
            return Ok();
        }
    }
}
