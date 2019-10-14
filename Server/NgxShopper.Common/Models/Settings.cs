using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NgxShopper.Common.Models
{
    public interface ISettings
    {
        // auto-populated settings
        string ASPNETCORE_ENVIRONMENT { get; }
        string BUILD_NUMBER { get; }
        string BUILD_COMMIT_ID { get; }


        string BuyerHost { get; }
        string SellerHost { get; }

    }

    public class Settings : ISettings
    {
        // auto-populated settings
        public string ASPNETCORE_ENVIRONMENT { get; set; }
        public string BUILD_NUMBER { get; set; }
        public string BUILD_COMMIT_ID { get; set; }

        public string BuyerHost { get; set; }
        public string SellerHost { get; set; }
    }
}
