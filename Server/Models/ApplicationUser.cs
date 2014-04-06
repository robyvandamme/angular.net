using Microsoft.AspNet.Identity.EntityFramework;

namespace Server.Models
{
    public sealed class ApplicationUser: IdentityUser
    {
        public string Email { get; set; }

        /// <summary>
        /// Will be used to store the external username in case of External Login Provider
        /// Username in that case will be a GUID for now since I want to register
        /// a new external login without requiring user interaction, and avoid duplicates for UserName
        /// TODO: make sure we always return DisplayName: Create an ApplicationUserView object?
        /// </summary>
        public string DisplayName { get; set; }

        public ApplicationUser(string userName, string email, string displayName): base(userName)
        {
            Email = email;
            DisplayName = displayName;
        }

        public ApplicationUser()
        {
        }
    }
}