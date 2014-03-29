using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace Server.Controllers
{
    [RoutePrefix("api/Diagnostics")]
    public class DiagnosticsController : BaseController
    {
        [Route("Exception")]
        public string GetException()
        {
            var result = "This works as expected";
            throw new NotImplementedException(result);
        }

        [Route("Ping")]
        public OkResult GetPing()
        {
            return Ok();
        }
    }
}