using Microsoft.AspNet.Identity;

namespace Server.Providers
{
    /// <summary>
    /// Inherit from UserManager to be able to change the UserValidator
    /// This gives us the flexibility to use email as username for instance
    /// TODO: move out of providers namespace
    /// </summary>
    /// <typeparam name="TUser"></typeparam>
    public class ApplicationUserManager<TUser> : UserManager<TUser> where TUser : IUser
    {
        public ApplicationUserManager(IUserStore<TUser> store)
            : base(store)
        {
            UserValidator = new UserValidator<TUser>(this) { AllowOnlyAlphanumericUserNames = false };
        }
    }
}