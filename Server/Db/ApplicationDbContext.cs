using System.Diagnostics;
using Microsoft.AspNet.Identity.EntityFramework;
using Server.Models;

namespace Server.Db
{
    public class ApplicationDbContext: IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection")
        {
#if(DEBUG)
             Database.Log = sql => Debug.Write(sql);
#endif
        }
    }
}