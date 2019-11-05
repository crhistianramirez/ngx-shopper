using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OrderCloud.AzureStorage;
using NgxShopper.Common.Models;
namespace NgxShopper.Common
{
    /// <summary>
    /// called once at startup
    /// registers abstract interfaces to their concrete counterparts
    /// anytime an interface is injected as a dependency to another class
    /// the framework will look up and use the associated concrete class
    /// </summary>
    public static class DependencyInjection
    {
        public static ServiceProvider RegisterServices(IServiceCollection services)
        {
            var settings = BuildAppSettings();
            services.AddSingleton<ISettings>(settings);
            return services.BuildServiceProvider();
        }
        private static Settings BuildAppSettings()
        {
            var builder = new ConfigurationBuilder();
            builder.AddEnvironmentVariables()
                .AddJsonFile($"appSettings.json", true) //for local dev only. this file should be excluded from the repo to avoid putting sensitive keys in the repo
                .AddAzureTableConfiguration();//checks environmental var ASPNETCORE_ENVIRONMENT, DEVOPS_APPNAME to find settings in azure table with connection string of (environmental var)DEVOPS_STORAGE
            var build = builder.Build();
            return build.Get<Settings>();
        }
    }
}
