using Microsoft.AspNet.Identity.EntityFramework;

namespace Server.Models
{
    public sealed class ApplicationUser: IdentityUser
    {
        public string EmailAddress { get; set; }

        public ApplicationUser(string userName, string emailAddress): base(userName)
        {
            EmailAddress = emailAddress;
        }

        public ApplicationUser()
        {
           
        }
    }
}