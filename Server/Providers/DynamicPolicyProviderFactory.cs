using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Cors;
using System.Web.Http.Cors;

namespace Server.Providers
{
    // TODO: review, custom policy provider for CORS
    public class DynamicPolicyProviderFactory : ICorsPolicyProviderFactory
    {
        public ICorsPolicyProvider GetCorsPolicyProvider(
          HttpRequestMessage request)
        {
            var route = request.GetRouteData();
            var controller = (string)route.Values["controller"];
            var corsRequestContext = request.GetCorsRequestContext();
            var originRequested = corsRequestContext.Origin;
            var policy = GetPolicyForControllerAndOrigin(
              controller, originRequested);

            return new CustomPolicyProvider(policy);
        }

        private CorsPolicy GetPolicyForControllerAndOrigin(
         string controller, string originRequested)
        {
            // Do database lookup to determine if the controller is allowed for
            // the origin and create CorsPolicy if it is (otherwise return null)
            var policy = new CorsPolicy();
            policy.Origins.Add(originRequested);
            policy.Methods.Add("GET");
            return policy;
        }
    }

    public class CustomPolicyProvider : ICorsPolicyProvider
    {
        CorsPolicy policy;
        public CustomPolicyProvider(CorsPolicy policy)
        {
            this.policy = policy;
        }
        public Task<CorsPolicy> GetCorsPolicyAsync(
          HttpRequestMessage request, CancellationToken cancellationToken)
        {
            return Task.FromResult(this.policy);
        }
    }
}