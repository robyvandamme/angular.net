using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Server.ExceptionHandling
{
    public class InternalServerErrorPlainTextResult : IHttpActionResult
    {
        public string Content { get; private set; }
        public Encoding Encoding { get; private set; }
        public HttpRequestMessage Request { get; private set; }

        public InternalServerErrorPlainTextResult(string content, Encoding encoding, HttpRequestMessage request)
        {
            if (content == null)
            {
                throw new ArgumentNullException("content");
            }

            if (encoding == null)
            {
                throw new ArgumentNullException("encoding");
            }

            if (request == null)
            {
                throw new ArgumentNullException("request");
            }

            Content = content;
            Encoding = encoding;
            Request = request;
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            return Task.FromResult(Execute());
        }

        private HttpResponseMessage Execute()
        {
            var response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
            response.RequestMessage = Request;
            response.Content = new StringContent(Content, Encoding);
            return response;
        }
    }
}