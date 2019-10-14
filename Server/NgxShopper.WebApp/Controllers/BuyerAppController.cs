using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using NgxShopper.Common;
using NgxShopper.Common.Models;
using System.IO;
using Newtonsoft.Json;

namespace AspCoreServer.Controllers
{
    public class BuyerAppController : Controller
    {
        protected readonly IHostingEnvironment HostingEnvironment;
        private readonly FileStats _files;
        public BuyerAppController(IHostingEnvironment hostingEnv)
        {
            HostingEnvironment = hostingEnv;
            var fileStatsPath = Path.Combine("wwwroot", "ngxbuyer", "dist", "filestats.json");
            _files = JsonConvert.DeserializeObject<FileStats>(System.IO.File.ReadAllText(fileStatsPath));
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var prerenderResult = await Request.PrerenderBuyer();
            ViewData["SpaHtml"] = prerenderResult.Html; // our <app-root /> from Angular
            ViewData["Title"] = prerenderResult.Globals["title"]; // set our <title> from Angular
            ViewData["Styles"] = prerenderResult.Globals["styles"]; // put styles in the correct place
            ViewData["Scripts"] = prerenderResult.Globals["scripts"]; // scripts (that were in our header)
            ViewData["Meta"] = prerenderResult.Globals["meta"]; // set our <meta> SEO tags
            ViewData["Links"] = prerenderResult.Globals["links"]; // set our <link rel="canonical"> etc SEO tags
            ViewData["TransferData"] = prerenderResult.Globals["transferData"]; // our transfer data set to window.TRANSFER_CACHE = {};

            return View(_files);
        }
    }
}