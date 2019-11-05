using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;
using NgxShopper.Common;
using NgxShopper.Common.Models;
using Microsoft.AspNetCore.NodeServices;
using NgxShopper.WebApp;

namespace ngx_shopper_dotnet
{
    public class Startup
    {
        private IServiceProvider _provider;
        public void ConfigureServices(IServiceCollection services)
        {
            _provider = DependencyInjection.RegisterServices(services);
            var settings = _provider.GetService<ISettings>();
            services
                .AddCors(o => o.AddPolicy("corsforall", builder =>
                {
                    builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                }))

                .AddMvc()
                // don't mess with casing https://github.com/aspnet/Announcements/issues/194
                .AddJsonOptions(opts => opts.SerializerSettings.ContractResolver = new DefaultContractResolver());

            services.AddNodeServices(); // allows us to invoke node.js code from an asp.net core application
        }

        // Any registered services are available for injection in this method
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ISettings settings)
        {
            app.UseCors("corsforall");
            app.UseStaticFiles();
            app.UseMvc(routes => {

                // handle buyer routes
                routes.MapRoute(
                    "buyer_default",
                    "{*url}", 
                    new { controller = "BuyerApp", action = "Index" }, 
                    new { host = new MatchesHost(settings.BuyerHost) }
                );

                // handle seller routes
                //routes.MapRoute(
                //    name: "seller_default",
                //    template: "{controller=SellerApp}/{action=Index}/{id?}",
                //    defaults: new { controller = "SellerApp", action = "Index" },
                //    constraints: new { host = new MatchesHost(settings.SellerHost) }
                //    );
            });

            // if route starts with /api should 404 within .NET
            // else serve up the index and delegate routing to angular
            app.MapWhen(x => !x.Request.Path.Value.StartsWith("/api"), builder =>
            {
                builder.UseMvc(routes =>
                {
                    routes.MapSpaFallbackRoute(
                        name: "spa-fallback",
                        defaults: new { controller = "BuyerApp", action = "Index" });
                });
            });
        }
    }
}
