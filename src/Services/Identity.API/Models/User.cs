namespace Identity.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string CPF { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string ZipCode { get; set; } = string.Empty; 
        public string Street { get; set; } = string.Empty;  
        public string Number { get; set; } = string.Empty;  
        public string Complement { get; set; } = string.Empty; 
        public string Neighborhood { get; set; } = string.Empty; 
        public string City { get; set; } = string.Empty;   
        public string State { get; set; } = string.Empty;  
    }
}