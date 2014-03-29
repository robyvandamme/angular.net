using System.Data.Entity;
using System.Diagnostics;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Server.Db;
using Server.Db.Migrations;

namespace Server
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            // TODO; see if we handle the migrations here or have WebDeploy take care of it
            // Do it here for now, for webdeploy db credentials need to be added to the pubxml file
            // PROBLEM: throws SQL Errors in DEBUG (missing column in the migrations table apparently... 
            // Invalid column name 'CreatedOn')
            // only RELEASE for now, no problems on PROD so far...
#if(!DEBUG)
         Database.SetInitializer(new MigrateDatabaseToLatestVersion<ApplicationDbContext, Configuration>());
#endif

            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            ContainerConfig.ConfigureContainer();

        }
    }
}
