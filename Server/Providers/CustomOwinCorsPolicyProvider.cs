using System.Configuration;
using System.Threading.Tasks;
using System.Web.Cors;
using Microsoft.Owin;

namespace Server.Providers
{
    public class CustomOwinCorsPolicyProvider : Microsoft.Owin.Cors.ICorsPolicyProvider
    {
        private readonly CorsPolicy _policy;

        public CustomOwinCorsPolicyProvider()
        {
            _policy = ConfigPolicy();
        }

        private CorsPolicy ConfigPolicy()
        {
            string[] domains = ConfigurationManager.AppSettings["CORS"].Split(';');
            var policy = new CorsPolicy();
            foreach (var domain in domains)
            {
                policy.Origins.Add(domain);
            }
            policy.AllowAnyMethod = true;
            policy.AllowAnyHeader = true;
            policy.SupportsCredentials = true;
            return policy;     
        }

        public Task<CorsPolicy> GetCorsPolicyAsync(IOwinRequest request)
        {
            return Task.FromResult(this._policy);
        }
    }
}