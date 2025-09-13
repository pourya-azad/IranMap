# نقشه استان‌های ایران 🇮🇷

یک وب‌اپلیکیشن تعاملی برای نمایش نقشه استان‌های ایران با استفاده از ASP.NET Core و GeoJSON.

## ویژگی‌ها ✨

- **نقشه تعاملی**: نمایش نقشه استان‌های ایران با قابلیت زوم و حرکت
- **اطلاعات استان‌ها**: نمایش جزئیات هر استان با کلیک روی آن
- **کش کردن داده‌ها**: ذخیره فایل‌های GeoJSON محلی برای بهبود عملکرد
- **پایگاه داده**: استفاده از Entity Framework Core و SQL Server
- **رابط کاربری زیبا**: طراحی مدرن و ریسپانسیو

## تکنولوژی‌های استفاده شده 🛠️

- **Backend**: ASP.NET Core 8.0
- **Frontend**: HTML5, CSS3, JavaScript
- **Database**: SQL Server با Entity Framework Core
- **Data Format**: GeoJSON
- **UI Framework**: Bootstrap

## پیش‌نیازها 📋

- .NET 8.0 SDK
- SQL Server (LocalDB یا SQL Server Express)
- Visual Studio 2022 یا VS Code

## نصب و راه‌اندازی 🚀

### 1. کلون کردن پروژه
```bash
git clone https://github.com/pouria-azad/IranMap.git
cd "map 3"
```

### 2. ساخت پایگاه داده
دو روش برای ساخت پایگاه داده وجود دارد:

#### روش اول: استفاده از فایل SQL (پیشنهادی)
فایل `SQLScript/file.sql` را در SQL Server Management Studio اجرا کنید یا با دستور زیر:

```bash
# اجرای فایل SQL با sqlcmd
sqlcmd -S . -i SQLScript/file.sql
```

#### روش دوم: استفاده از Entity Framework
```bash
# اجرای مایگریشن‌ها
dotnet ef database update
```

### 3. تنظیم فایل appsettings.json
اطمینان حاصل کنید که تنظیمات اتصال به پایگاه داده در فایل `appsettings.json` صحیح باشد:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=IranMapDB;Trusted_Connection=True;MultipleActiveResultSets=true;Encrypt=True;TrustServerCertificate=True"
  }
}
```

### 4. اجرای پروژه
```bash
dotnet run
```

پروژه در آدرس `https://localhost:5001` یا `http://localhost:5000` اجرا خواهد شد.

## ساختار پروژه 📁

```
map 3/
├── Controllers/
│   └── IranMapController.cs          # کنترلر اصلی نقشه
├── Data/
│   └── IranMapDbContext.cs           # کانتکست پایگاه داده
├── Models/
│   ├── MapSettings.cs                # تنظیمات نقشه
│   ├── ProvinceStats.cs              # آمار استان‌ها
│   └── ErrorViewModel.cs             # مدل خطا
├── Views/
│   ├── IranMap/
│   │   └── Index.cshtml              # صفحه اصلی نقشه
│   └── Shared/IranMap/
│       └── Map/
│           ├── _InfoBox.cshtml       # باکس اطلاعات
│           └── _ProvinceInfoCard.cshtml # کارت اطلاعات استان
├── wwwroot/
│   ├── css/
│   │   └── map.css                   # استایل‌های نقشه
│   ├── js/
│   │   └── map.js                    # اسکریپت‌های نقشه
│   └── data/                         # فایل‌های GeoJSON
├── SQLScript/
│   └── file.sql                      # اسکریپت ساخت پایگاه داده
└── Migrations/                       # مایگریشن‌های پایگاه داده
```

## API Endpoints 🔌

### دریافت نقشه ایران
```
GET /ProvinceMap/GetIranMap
```
دریافت فایل GeoJSON کل نقشه ایران

### دریافت داده استان خاص
```
GET /ProvinceMap/GetProvinceData/{provinceCode}
```
دریافت فایل GeoJSON استان با کد مشخص

### دریافت لیست استان‌ها
```
GET /GetProvincesList
```
دریافت لیست تمام استان‌های ایران

## تنظیمات ⚙️

تنظیمات پروژه در فایل `appsettings.json` قابل تغییر است:

- `LocalDataFolder`: پوشه ذخیره فایل‌های GeoJSON محلی
- `IranGeoJsonUrl`: آدرس فایل GeoJSON کل ایران
- `ProvinceGeoJsonUrlTemplate`: قالب آدرس فایل‌های GeoJSON استان‌ها
- `CacheDurationMinutes`: مدت زمان کش (به دقیقه)

## مشارکت 🤝

برای مشارکت در پروژه:

1. پروژه را Fork کنید
2. یک شاخه جدید ایجاد کنید (`git checkout -b feature/amazing-feature`)
3. تغییرات خود را Commit کنید (`git commit -m 'Add amazing feature'`)
4. به شاخه اصلی Push کنید (`git push origin feature/amazing-feature`)
5. یک Pull Request ایجاد کنید

## مجوز 📄

این پروژه تحت مجوز MIT منتشر شده است.

## پشتیبانی 💬

برای سوالات و مشکلات، لطفاً یک Issue ایجاد کنید.

---

**نکته**: این پروژه از داده‌های GeoJSON ایران از مخزن [iran-geojson](https://codeberg.org/mokazemi/iran-geojson) استفاده می‌کند.
