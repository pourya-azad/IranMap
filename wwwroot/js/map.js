/**
 * نقشه تعاملی استان‌های ایران
 * این ماژول یک نقشه تعاملی از استان‌های ایران را نمایش می‌دهد و به کاربر امکان
 * مشاهده اطلاعات بیشتر درباره هر استان، شهرستان‌ها و شهرهای آن را می‌دهد.
 */
(function () {
    'use strict';

    /**
     * ماژول پیکربندی
     * تنظیمات و داده‌های ثابت برنامه
     */
    const Config = {
        // استایل‌های نقشه
        styles: {
            province: {
                weight: 1,
                color: '#010101',
                
                fillOpacity: 0.7,
                // به جای fillColor ثابت، از تابع استفاده می‌کنیم تا گرادینت اعمال شود
                fillColor: '#3388ff'
            },
            highlightProvince: {
                weight: 3,
                color: '#0B5245',
                fillOpacity: 0.8,
                fillColor: '#F8FAF9'
            },
            county: {
                weight: 1,
                color: '#010101',
                fillOpacity: 0.5,
                fillColor: '#273F17'
            },
            cityMarker: {
                iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png', // آیکون پیش‌فرض Leaflet
                iconSize: [25, 25], // اندازه آیکون
                iconAnchor: [12, 41], // نقطه اتصال آیکون (پایین وسط)
                popupAnchor: [0, -41], // موقعیت پاپ‌آپ نسبت به آیکون
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png', // سایه آیکون
                shadowSize: [41, 41] // اندازه سایه
            }
        },

        // تنظیمات نقشه پایه
        map: {
            center: [32.4279, 53.6880],
            zoom: 5,
            tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },

        // کد و نام استان‌های ایران
        provinces: [
            { name: "مرکزی", code: "00" },
            { name: "گیلان", code: "01" },
            { name: "مازندران", code: "02" },
            { name: "آذربایجان شرقی", code: "03" },
            { name: "آذربایجان غربی", code: "04" },
            { name: "کرمانشاه", code: "05" },
            { name: "خوزستان", code: "06" },
            { name: "فارس", code: "07" },
            { name: "کرمان", code: "08" },
            { name: "خراسان رضوی", code: "09" },
            { name: "اصفهان", code: "10" },
            { name: "سیستان و بلوچستان", code: "11" },
            { name: "کردستان", code: "12" },
            { name: "همدان", code: "13" },
            { name: "چهارمحال و بختیاری", code: "14" },
            { name: "لرستان", code: "15" },
            { name: "ایلام", code: "16" },
            { name: "کهگیلویه و بویراحمد", code: "17" },
            { name: "بوشهر", code: "18" },
            { name: "زنجان", code: "19" },
            { name: "سمنان", code: "20" },
            { name: "یزد", code: "21" },
            { name: "هرمزگان", code: "22" },
            { name: "تهران", code: "23" },
            { name: "اردبیل", code: "24" },
            { name: "قم", code: "25" },
            { name: "قزوین", code: "26" },
            { name: "گلستان", code: "27" },
            { name: "خراسان شمالی", code: "28" },
            { name: "خراسان جنوبی", code: "29" },
            { name: "البرز", code: "30" }
        ],

        // مراکز استان‌ها
        provincialCapitals: {
            'تهران': 'تهران',
            'اصفهان': 'اصفهان',
            'فارس': 'شیراز',
            'خراسان رضوی': 'مشهد',
            'آذربایجان شرقی': 'تبریز',
            'آذربایجان غربی': 'ارومیه',
            'اردبیل': 'اردبیل',
            'البرز': 'کرج',
            'ایلام': 'ایلام',
            'بوشهر': 'بوشهر',
            'خراسان جنوبی': 'بیرجند',
            'خراسان شمالی': 'بجنورد',
            'خوزستان': 'اهواز',
            'زنجان': 'زنجان',
            'سمنان': 'سمنان',
            'سیستان و بلوچستان': 'زاهدان',
            'قزوین': 'قزوین',
            'قم': 'قم',
            'کردستان': 'سنندج',
            'کرمان': 'کرمان',
            'کرمانشاه': 'کرمانشاه',
            'کهگیلویه و بویراحمد': 'یاسوج',
            'گلستان': 'گرگان',
            'گیلان': 'رشت',
            'لرستان': 'خرم‌آباد',
            'مازندران': 'ساری',
            'مرکزی': 'اراک',
            'هرمزگان': 'بندرعباس',
            'همدان': 'همدان',
            'یزد': 'یزد'
        },

        // آدرس‌های API
        api: {
            iranMap: '/ProvinceMap/GetIranMap',
            provinceData: '/ProvinceMap/GetProvinceData/'
        },

        // شناسه‌های المان‌های DOM
        dom: {
            map: 'map',
            backButton: 'backToIran',
            statsInfo: 'statsInfo',
            provinceTitle: 'provinceTitle',
            provinceInfo: 'provinceInfo',
            provinceInfoCard: 'provinceInfoCard'
        }
    };

    /**
     * ماژول مدیریت وضعیت برنامه
     * نگهداری وضعیت فعلی برنامه
     */
    const State = {
        map: null,
        layers: {
            provinces: null,
            counties: null,
            cities: null
        },
        selection: {
            provinceCode: null,
            provinceLayer: null,
            provinceName: null
        },

        setSelectedProvince(code, name, layer) {
            this.selection.provinceCode = code;
            this.selection.provinceName = name;
            this.selection.provinceLayer = layer;
        },

        resetSelection() {
            this.selection.provinceCode = null;
            this.selection.provinceName = null;
            this.selection.provinceLayer = null;
        },

        clearLayers(layerNames) {
            layerNames.forEach(name => {
                if (this.layers[name]) {
                    this.map.removeLayer(this.layers[name]);
                    this.layers[name] = null;
                }
            });
        }
    };

    /**
     * ماژول رابط کاربری
     * مدیریت المان‌های UI و نمایش اطلاعات
     */
    const UI = {
        updateInfoBox(feature) {
            const name = this._getFeatureName(feature);
            const pop = this._getRandomPopulation();
            const area = this._getRandomArea();

            document.getElementById(Config.dom.statsInfo).innerHTML = `
                <p><strong>نام:</strong> ${name}</p>
                <p><strong>جمعیت:</strong> ${pop.toLocaleString()} نفر</p>
                <p><strong>مساحت:</strong> ${area} کیلومتر مربع</p>`;
        },

        resetInfoBox() {
            document.getElementById(Config.dom.statsInfo).innerHTML =
                'برای مشاهده اطلاعات، روی استان کلیک کنید.';
        },

        showProvinceInfo(name, counties, cities) {
            document.getElementById(Config.dom.provinceTitle).textContent = `استان ${name}`;
            document.getElementById(Config.dom.provinceInfo).innerHTML = `
                <p><strong>تعداد شهرستان‌ها:</strong> ${counties.length}</p>
                <p><strong>تعداد شهرها:</strong> ${cities.length}</p>
                <p><strong>مرکز استان:</strong> ${this._findProvincialCapital(cities, name)}</p>
                <p>برای مشاهده اطلاعات هر شهرستان، روی آن حرکت کنید.</p>`;
            document.getElementById(Config.dom.provinceInfoCard).style.display = 'block';
        },

        showError(message) {
            document.getElementById(Config.dom.provinceInfo).innerHTML =
                `<p class="error">خطا: ${message}</p>`;
            console.error(message);
        },

        hideProvinceInfo() {
            document.getElementById(Config.dom.provinceInfoCard).style.display = 'none';
        },

        _findProvincialCapital(cities, provinceName) {
            if (Config.provincialCapitals[provinceName]) {
                return Config.provincialCapitals[provinceName];
            }

            for (let city of cities) {
                const cityName = this._getFeatureName(city);
                if (cityName && provinceName.includes(cityName)) {
                    return cityName;
                }
            }
            return 'نامشخص';
        },

        _getFeatureName(feature) {
            return feature.properties.tags?.name || feature.properties.name || 'نامشخص';
        },

        _getRandomPopulation() {
            return Math.floor(Math.random() * 1000000) + 50000;
        },

        _getRandomArea() {
            return (Math.random() * 3000 + 200).toFixed(1);
        }
    };

    /**
     * ماژول عملیات نقشه
     * مدیریت نقشه و رویدادهای آن
     */
    const MapHandler = {
        // تابع برای اعمال گرادینت به پلیگون‌ها
        applyGradientStyle(feature) {
            return {
                weight: Config.styles.province.weight,
                color: Config.styles.province.color,
                dashArray: Config.styles.province.dashArray,
                fillOpacity: Config.styles.province.fillOpacity,
                // به جای رنگ ثابت، از کلاس سی‌اس‌اس استفاده می‌کنیم
                className: 'province-gradient'
            };
        },

        initMap() {
            State.map = L.map(Config.dom.map)
                .setView(Config.map.center, Config.map.zoom);

            L.tileLayer(Config.map.tileUrl, {
                attribution: Config.map.attribution
            }).addTo(State.map);

            // اضافه کردن استایل گرادینت به صفحه
            this._addGradientStyle();

            this._setupEventListeners();
            this.loadIranMap();
        },

        // تابع برای اضافه کردن استایل گرادینت به صفحه
        _addGradientStyle() {
            // ایجاد یک المنت استایل برای گرادینت
            const style = document.createElement('style');
            style.textContent = `
                .province-gradient {
                    fill: linear-gradient(306deg, rgba(3, 12, 36, 1) 8%, rgba(11, 57, 94, 1) 100%);
                }
                /* برای SVG در Leaflet باید از استایل‌های SVG استفاده کنیم */
                .leaflet-interactive.province-gradient {
                    fill: url(#province-gradient);
                }
            `;
            document.head.appendChild(style);

            // اضافه کردن تعریف گرادینت به SVG نقشه
            this._addSVGGradientDef();
        },

        // اضافه کردن تعریف گرادینت به SVG نقشه
        _addSVGGradientDef() {
            // دریافت المنت SVG از Leaflet
            const svgElement = document.querySelector('.leaflet-overlay-pane svg');
            if (!svgElement) {
                // اگر هنوز SVG ایجاد نشده، کمی صبر می‌کنیم و دوباره تلاش می‌کنیم
                setTimeout(() => this._addSVGGradientDef(), 100);
                return;
            }

            // اضافه کردن تعریف گرادینت
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', 'province-gradient');
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '50%');
            gradient.setAttribute('x2', '100%');
            gradient.setAttribute('y2', '50%');

            // ایجاد نقاط توقف گرادینت
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '8%');
            stop1.setAttribute('stop-color', '#2D7B31');

            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('stop-color', '#2D7B31');

            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            defs.appendChild(gradient);
            svgElement.appendChild(defs);
        },

        highlightFeature(e) {
            const layer = e.target;
            layer.setStyle({
                weight: 3,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.8
            });

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }
        },

        resetHighlight(e) {
            if (!State.selection.provinceCode) {
                State.layers.provinces.resetStyle(e.target);
            } else if (State.layers.counties && e.target !== State.selection.provinceLayer) {
                State.layers.counties.resetStyle(e.target);
            }
        },

        handleCountyFeature(feature, layer) {
            layer.on({
                mouseover: (e) => {
                    this.highlightFeature(e);
                    UI.updateInfoBox(feature);
                },
                mouseout: (e) => {
                    this.resetHighlight(e);
                    UI.resetInfoBox();
                }
            });

            const name = UI._getFeatureName(feature);
            layer.bindTooltip(name, { direction: 'center' });
        },

        handleProvinceFeature(feature, layer) {
            const provinceName = UI._getFeatureName(feature);

            layer.on({
                mouseover: (e) => {
                    if (!State.selection.provinceCode) {
                        this.highlightFeature(e);
                        UI.updateInfoBox(feature);
                    }
                },
                mouseout: (e) => {
                    if (!State.selection.provinceCode) {
                        this.resetHighlight(e);
                        UI.resetInfoBox();
                    }
                },
                click: (e) => this.handleProvinceClick(e, feature)
            });

            layer.bindTooltip(provinceName, { direction: 'center' });
        },

        handleCityFeature(feature, layer) {
            const cityName = UI._getFeatureName(feature);

            layer.bindPopup(`<b>${cityName}</b>`);
            layer.on('mouseover', function () {
                this.openPopup();
                UI.updateInfoBox({ properties: { name: cityName, type: 'شهر' } });
            });

            layer.on('mouseout', function () {
                this.closePopup();
                UI.resetInfoBox();
            });
        },

        handleProvinceClick(e, feature) {
            const layer = e.target;
            const properties = feature.properties;
            let provinceName = properties.name ||
                (properties.tags && properties.tags.name) ||
                'ناشناس';

            provinceName = provinceName.replace(/^استان\s+/, '').trim();

            const matchedProvince = Config.provinces.find(p => p.name === provinceName);
            if (!matchedProvince) {
                ErrorHandler.handleError(`کد استان برای "${provinceName}" یافت نشد.`);
                return;
            }

            if (State.layers.provinces) {
                State.layers.provinces.eachLayer(layer =>
                    State.layers.provinces.resetStyle(layer));
                layer.setStyle(Config.styles.highlightProvince);
            }

            State.setSelectedProvince(matchedProvince.code, provinceName, layer);
            this.loadProvinceData(matchedProvince.code, provinceName);

        },

        async loadIranMap() {
            try {
                const data = await DataProvider.fetchIranMap();

                State.clearLayers(['counties', 'cities']);

                State.layers.provinces = L.geoJSON(data, {
                    filter: feature => feature.geometry.type !== 'Point',
                    style: this.applyGradientStyle, // استفاده از تابع استایل گرادینت
                    onEachFeature: (feature, layer) => this.handleProvinceFeature(feature, layer)
                }).addTo(State.map);

                State.map.fitBounds(State.layers.provinces.getBounds());

            } catch (error) {
                ErrorHandler.handleError("خطا در بارگذاری نقشه ایران.", error);
            }
        },

        async loadProvinceData(code, name) {
            try {
                UI.showProvinceInfo(name, [], []);

                const data = await DataProvider.fetchProvinceData(code);

                const cities = data.features.filter(f => f.geometry.type === 'Point');
                const counties = data.features.filter(f => f.geometry.type !== 'Point');

                State.clearLayers(['counties', 'cities']);

                State.layers.counties = L.geoJSON(counties, {
                    style: Config.styles.county,
                    onEachFeature: (feature, layer) => this.handleCountyFeature(feature, layer)
                }).addTo(State.map);

                State.layers.cities = L.geoJSON(cities, {
                    pointToLayer: (feature, latlng) => {
                        return L.marker(latlng, {
                            icon: L.icon(Config.styles.cityMarker)
                        });
                    },
                    onEachFeature: (feature, layer) => this.handleCityFeature(feature, layer)
                }).addTo(State.map);

                if (State.layers.counties.getBounds().isValid()) {
                    State.map.fitBounds(State.layers.counties.getBounds());
                }

                UI.showProvinceInfo(name, counties, cities);

            } catch (error) {
                ErrorHandler.handleError("خطا در بارگذاری اطلاعات استان.", error);
            }
        },

        backToIranMap() {
            if (State.selection.provinceLayer && State.layers.provinces) {
                State.layers.provinces.resetStyle(State.selection.provinceLayer);
            }

            State.resetSelection();
            UI.hideProvinceInfo();
            UI.resetInfoBox();

            State.clearLayers(['counties', 'cities']);

            this.loadIranMap();
        },

        _setupEventListeners() {
            document.getElementById(Config.dom.backButton)
                .addEventListener('click', () => this.backToIranMap());
        }
    };

    /**
     * ماژول ارتباط با سرور
     * دریافت داده‌ها از سرور
     */
    const DataProvider = {
        async fetchIranMap() {
            const response = await fetch(Config.api.iranMap);
            if (!response.ok) {
                throw new Error(`خطا در دریافت نقشه ایران: ${response.statusText}`);
            }
            return await response.json();
        },

        async fetchProvinceData(code) {
            const response = await fetch(`${Config.api.provinceData}${code}`);
            if (!response.ok) {
                throw new Error(`خطا در دریافت اطلاعات استان: ${response.statusText}`);
            }
            return await response.json();
        }
    };

    /**
     * ماژول مدیریت خطاها
     * پردازش و نمایش خطاها
     */
    const ErrorHandler = {
        handleError(message, error) {
            if (error) {
                console.error(message, error);
                message = `${message} ${error.message}`;
            } else {
                console.error(message);
            }

            UI.showError(message);
            alert(message);
        }
    };

    /**
     * تابع شروع برنامه
     * راه‌اندازی نقشه پس از بارگذاری صفحه
     */
    function initialize() {
        document.addEventListener('DOMContentLoaded', () => {
            MapHandler.initMap();
        });

    }

    // شروع برنامه
    initialize();
})();