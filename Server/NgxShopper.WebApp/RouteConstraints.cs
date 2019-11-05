using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web.Routing;

namespace NgxShopper.WebApp
{
    /// <summary>
    /// used to determine if a request is for the buyer app or seller app
    /// which then informs which content to serve up
    /// </summary>
    // https://blogs.msdn.microsoft.com/simonince/2010/12/02/different-routes-for-different-hosts-using-constraints/
    public class MatchesHost : IRouteConstraint
    {
        private readonly string _expectedHost;

        public MatchesHost(string expectedHost)
        {
            _expectedHost = expectedHost;
        }

        public bool Match(
            HttpContext httpContext,
            IRouter route,
            string routeKey,
            RouteValueDictionary values,
            RouteDirection routeDirection)
        {
            var actualHost = httpContext.Request.Host.Value;
            var isApiRoute = httpContext.Request.Path.Value.ToLower().StartsWith("/api");
            return !isApiRoute && actualHost == _expectedHost || actualHost == $"www{_expectedHost}";
        }
    }
}
