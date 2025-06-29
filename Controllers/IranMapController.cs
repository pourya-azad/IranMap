using map_3.Data;
using map_3.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace map_3.Controllers
{
    public class IranMapController(
        IHttpClientFactory clientFactory,
        IOptions<MapSettings> mapSettings,
        IranMapDbContext context) : Controller
    {
        private readonly IHttpClientFactory _clientFactory = clientFactory;
        private readonly MapSettings _mapSettings = mapSettings.Value;
        private readonly IranMapDbContext _context = context;

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("ProvinceMap/GetIranMap")]
        public async Task<IActionResult> GetIranMap()
        {
            var localPath = Path.Combine(
                Directory.GetCurrentDirectory(),
                _mapSettings.LocalDataFolder,
                "iran_provinces_geo.json"
            );

            try
            {
                if (System.IO.File.Exists(localPath))
                {
                    var geoJsonData = await System.IO.File.ReadAllTextAsync(localPath);
                    return Content(geoJsonData, "application/json");
                }

                var client = _clientFactory.CreateClient();
                var externalGeoJsonData = await client.GetStringAsync(
                    _mapSettings.IranGeoJsonUrl
                );

                var directory = Path.GetDirectoryName(localPath);
                if (!Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                }

                await System.IO.File.WriteAllTextAsync(localPath, externalGeoJsonData);

                return Content(externalGeoJsonData, "application/json");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"خطا در بارگذاری فایل GeoJSON ایران: {ex.Message}");
            }
        }

        [HttpGet("ProvinceMap/GetProvinceData/{provinceCode}")]
        public async Task<IActionResult> GetProvinceData(string provinceCode)
        {
            if (string.IsNullOrEmpty(provinceCode))
                return BadRequest("کد استان نامعتبر است");

            var fileName = $"IR-{provinceCode}_geo.json";
            var localPath = Path.Combine(
                Directory.GetCurrentDirectory(),
                _mapSettings.LocalDataFolder,
                fileName
            );

            try
            {
                if (System.IO.File.Exists(localPath))
                {
                    var geoJsonData = await System.IO.File.ReadAllTextAsync(localPath);
                    return Content(geoJsonData, "application/json");
                }

                var client = _clientFactory.CreateClient();
                var url = string.Format(_mapSettings.ProvinceGeoJsonUrlTemplate, provinceCode);
                var externalGeoJsonData = await client.GetStringAsync(url);

                var directory = Path.GetDirectoryName(localPath);
                if (!Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                }

                await System.IO.File.WriteAllTextAsync(localPath, externalGeoJsonData);

                return Content(externalGeoJsonData, "application/json");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"خطا در بارگذاری فایل GeoJSON استان: {ex.Message}");
            }
        }

        [HttpGet]
        public IActionResult GetProvincesList()
        {
            // بدون تغییر
            var provinces = new List<object>
            {
                new { code = "00", name = "اراک" },
                new { code = "01", name = "آذربایجان شرقی" },
                new { code = "02", name = "آذربایجان غربی" },
                new { code = "03", name = "اردبیل" },
                new { code = "04", name = "اصفهان" },
                new { code = "05", name = "البرز" },
                new { code = "06", name = "ایلام" },
                new { code = "07", name = "بوشهر" },
                new { code = "08", name = "تهران" },
                new { code = "09", name = "خراسان رضوی" },
                new { code = "10", name = "خراسان جنوبی" },
                new { code = "11", name = "خراسان شمالی" },
                new { code = "12", name = "خوزستان" },
                new { code = "13", name = "زنجان" },
                new { code = "14", name = "سمنان" },
                new { code = "15", name = "سیستان و بلوچستان" },
                new { code = "16", name = "فارس" },
                new { code = "17", name = "قزوین" },
                new { code = "18", name = "قم" },
                new { code = "19", name = "کردستان" },
                new { code = "20", name = "کرمان" },
                new { code = "21", name = "کرمانشاه" },
                new { code = "22", name = "کهگیلویه و بویراحمد" },
                new { code = "23", name = "گلستان" },
                new { code = "24", name = "گیلان" },
                new { code = "25", name = "لرستان" },
                new { code = "26", name = "مازندران" },
                new { code = "27", name = "مرکزی" },
                new { code = "28", name = "هرمزگان" },
                new { code = "29", name = "همدان" },
                new { code = "30", name = "یزد" }

            };

            return Json(provinces);
        }
    }
}
