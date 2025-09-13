# Iran Provinces Map 🇮🇷

An interactive web application to display the map of Iran’s provinces using ASP.NET Core and GeoJSON.

video link: https://youtu.be/koNlFu_4InE?si=Qds4lqRN6drlA_Pv


## Features ✨

- **Interactive Map**: Zoomable and pannable map of Iran’s provinces
    
- **Province Information**: Display details of each province on click
    
- **Data Caching**: Local caching of GeoJSON files for better performance
    
- **Database**: Using Entity Framework Core and SQL Server
    
- **Beautiful UI**: Modern and responsive design
    

## Technologies Used 🛠️

- **Backend**: ASP.NET Core 8.0
    
- **Frontend**: HTML5, CSS3, JavaScript
    
- **Database**: SQL Server with Entity Framework Core
    
- **Data Format**: GeoJSON
    
- **UI Framework**: Bootstrap
    

## Prerequisites 📋

- .NET 8.0 SDK
    
- SQL Server (LocalDB or SQL Server Express)
    
- Visual Studio 2022 or VS Code
    

## Installation & Setup 🚀

### 1. Clone the project

```bash
git clone https://github.com/pouria-azad/IranMap.git
cd "map 3"
```

### 2. Create the database

There are two ways to create the database:

#### Option 1: Use the SQL script (recommended)

Run the `SQLScript/file.sql` file in SQL Server Management Studio or run via command line:

```bash
# Run SQL script using sqlcmd
sqlcmd -S . -i SQLScript/file.sql
```

#### Option 2: Use Entity Framework migrations

```bash
# Run migrations
dotnet ef database update
```

### 3. Configure `appsettings.json`

Make sure your database connection string is correct in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=IranMapDB;Trusted_Connection=True;MultipleActiveResultSets=true;Encrypt=True;TrustServerCertificate=True"
  }
}
```

### 4. Run the project

```bash
dotnet run
```

The app will run at `https://localhost:5001` or `http://localhost:5000`.

## Project Structure 📁

```
map 3/
├── Controllers/
│   └── IranMapController.cs          # Main map controller
├── Data/
│   └── IranMapDbContext.cs           # Database context
├── Models/
│   ├── MapSettings.cs                # Map settings model
│   ├── ProvinceStats.cs              # Province statistics model
│   └── ErrorViewModel.cs             # Error model
├── Views/
│   ├── IranMap/
│   │   └── Index.cshtml              # Main map page
│   └── Shared/IranMap/
│       └── Map/
│           ├── _InfoBox.cshtml       # Info box partial view
│           └── _ProvinceInfoCard.cshtml # Province info card partial view
├── wwwroot/
│   ├── css/
│   │   └── map.css                   # Map styles
│   ├── js/
│   │   └── map.js                    # Map scripts
│   └── data/                         # GeoJSON files
├── SQLScript/
│   └── file.sql                      # Database creation script
└── Migrations/                       # EF migrations
```

## API Endpoints 🔌

### Get Iran Map GeoJSON

```
GET /ProvinceMap/GetIranMap
```

Returns the GeoJSON file of the entire Iran map.

### Get Specific Province Data

```
GET /ProvinceMap/GetProvinceData/{provinceCode}
```

Returns the GeoJSON data for the specified province code.

### Get List of Provinces

```
GET /GetProvincesList
```

Returns the list of all Iranian provinces.

## Configuration ⚙️

Settings in `appsettings.json`:

- `LocalDataFolder`: Folder for caching GeoJSON files locally
    
- `IranGeoJsonUrl`: URL for the full Iran GeoJSON file
    
- `ProvinceGeoJsonUrlTemplate`: Template URL for province GeoJSON files
    
- `CacheDurationMinutes`: Cache expiration time in minutes
    

## Contributing 🤝

1. Fork the repository
    
2. Create a new branch (`git checkout -b feature/amazing-feature`)
    
3. Commit your changes (`git commit -m 'Add amazing feature'`)
    
4. Push to your branch (`git push origin feature/amazing-feature`)
    
5. Open a Pull Request
    

## License 📄

This project is licensed under the MIT License.

## Support 💬

For questions or issues, please open an Issue.

---

**Note:** This project uses Iran GeoJSON data from the [iran-geojson repository](https://codeberg.org/mokazemi/iran-geojson).

---
