using System.Web.Http.Filters;
using Autofac.Integration.WebApi;

namespace Server.ExceptionHandling
{
    public class UnhandledExceptionFilter: IAutofacExceptionFilter
    {
        public void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            if (null != actionExecutedContext.Exception)
            {
                Elmah.ErrorSignal.FromCurrentContext().Raise(actionExecutedContext.Exception);
            }
        }
    }
}