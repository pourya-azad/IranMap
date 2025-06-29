namespace map_3.Models
{
    public class MapSettings
    {
        public required string LocalDataFolder { get; set; }
        public required string IranGeoJsonUrl { get; set; }
        public required string ProvinceGeoJsonUrlTemplate { get; set; }
        public int CacheDurationMinutes { get; set; }

        // ✨ رشته اتصال به SQL Server
        public string SqlConnectionString { get; set; }
    }
}
