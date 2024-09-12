namespace backend.Entities
{
    public class Contacts
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string Mobile { get; set; }

        public string SecMobile { get; set; }
        public string? Email { get; set; }
        public string? Photo { get; set; }

        public bool Favourites { get; set; } = false;
    }
}
