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
        public string ZipCode { get; set; } = string.Empty; // CEP
        public string Street { get; set; } = string.Empty;  // Rua/Logradouro
        public string Number { get; set; } = string.Empty;  // Número
        public string Complement { get; set; } = string.Empty; // Apto, Bloco
        public string Neighborhood { get; set; } = string.Empty; // Bairro
        public string City { get; set; } = string.Empty;    // Cidade
        public string State { get; set; } = string.Empty;   // UF (Estado)
    }
}