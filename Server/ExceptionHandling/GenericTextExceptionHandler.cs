using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.ExceptionHandling;

namespace Server.ExceptionHandling
{
    public class GenericTextExceptionHandler: IExceptionHandler
    {
        public Task HandleAsync(ExceptionHandlerContext context, CancellationToken cancellationToken)
        {
            // TODO: send something relevant back to the client that we can handle depending on whats happened
            // this implementation was taken from http://aspnet.codeplex.com/SourceControl/latest#Samples/WebApi/Elmah/Elmah.Server/ExceptionHandling/GenericTextExceptionHandler.cs
            context.Result = new InternalServerErrorPlainTextResult(
               "An unhandled exception occurred; check the log for more information.",
               Encoding.UTF8, context.Request);

            return Task.FromResult<object>(null);
        }
    }
}