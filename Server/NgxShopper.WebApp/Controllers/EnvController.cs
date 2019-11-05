using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NgxShopper.Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace NgxShopper.WebApp.Controllers
{
    public class EnvController
    {
        private readonly ISettings _settings;

        public EnvController(ISettings settings)
        {
            _settings = settings;
        }

        /// <summary>
        /// call this route to get information about the currently deployed instance
        /// </summary>
        [HttpGet, Route("api/env")]
        public object GetEnv() => new
        {
            ASPNETCORE_ENVIRONMENT = _settings.ASPNETCORE_ENVIRONMENT,
            BUILD_NUMBER = _settings.BUILD_NUMBER,
            BUILD_COMMIT_ID = _settings.BUILD_COMMIT_ID
        };
    }
}
