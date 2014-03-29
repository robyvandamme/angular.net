using System.Reflection;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Server.Controllers;
using Server.Db;
using Server.ExceptionHandling;

namespace Server
{
    public class ContainerConfig
    {
        public static void ConfigureContainer()
        {
            var builder = new ContainerBuilder();

            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterWebApiFilterProvider(GlobalConfiguration.Configuration);

            builder.Register(x => new UnhandledExceptionFilter())
                .AsWebApiExceptionFilterFor<BaseController>()
                 .InstancePerApiRequest();

            builder.RegisterType<ApplicationDbContext>().AsSelf().InstancePerApiRequest();

            var container = builder.Build();
            var resolver = new AutofacWebApiDependencyResolver(container);
            GlobalConfiguration.Configuration.DependencyResolver = resolver;

        }
    }
}