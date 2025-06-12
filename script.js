document.addEventListener('DOMContentLoaded', () => {
    const languageSelectionScreen = document.getElementById('language-selection');
    const menuScreen = document.getElementById('menu-screen');
    const languageItems = document.querySelectorAll('.language-item');
    const confirmButton = document.getElementById('confirm-language-btn');
    const cartTotalElement = document.getElementById('cart-total');
    const menuCategoriesContainer = document.getElementById('menu-categories');
    const menuItemsContainer = document.getElementById('menu-items-container');
    const screenTitleElement = document.querySelector('#language-selection .screen-title');
    const cartSummaryTextElement = document.querySelector('.cart-summary span'); // "Cəm:" mətnini tutmaq üçün


    let selectedLanguage = 'az'; // Default dil Azərbaycan
    let cartTotal = 0;

    // Tərcümələr üçün ümumi mətnlər (başlıqlar, düymələr, mesajlar)
    const translations = {
        'az': {
            'dil_sechin': 'Dil seçin',
            'tesdiq_et': 'Təsdiq et',
            'cem': 'Cəm',
            'no_items_in_category': 'Bu kateqoriyada hələ heç bir yemək yoxdur.',
            // Kateqoriya adlarının tərcüməsi üçün (navigasiyada görünən adlar)
            'SETLER_CATEGORY': 'SETLƏR',
            'ISTI_QAYNARTILAR_CATEGORY': 'İsti Qaynartılar',
            'SOYUQ_QAYNARTILAR_CATEGORY': 'Soyuq Qaynartılar',
            'SALATLAR_CATEGORY': 'Salatlar',
            'SENDVICLER_CATEGORY': 'Sendviçlər',
            'ISTI_YEMEKLER_CATEGORY': 'İsti Yeməklər',
            'SIRNIYYATLAR_CATEGORY': 'Şirniyyatlar',
            'KABABLAR_CATEGORY': 'Kaboblar',
            'QARNIRLER_CATEGORY': 'Qarnirlər',
            'PIVE_QAYNARTILARI_CATEGORY': 'Pivə Qaynartıları',
            'ALCOHOL_COCKTAILS_CATEGORY': 'Alkoqollu Kokteyllər',
            'VODKA_CATEGORY': 'Vodka (50 ml)',
            'WHISKEY_CATEGORY': 'Viski (50 ml)',
            'GIN_CATEGORY': 'Cin (50 ml)',
            'TEQUILA_CATEGORY': 'Tekila (50 ml)',
            'RUM_CATEGORY': 'Rom (50 ml)',
            'LIQOUR_CATEGORY': 'Likör (50 ml)',
            'BEER_CATEGORY': 'Pivə',
            'RED_WHITE_WINE_CATEGORY': 'Qırmızı/Ağ Şərab',
            'HOT_DRINKS_CATEGORY': 'İsti İçkilər',
            'QELYAN_CATEGORY': 'Qəlyan',
            'SOFT_DRINKS_CATEGORY': 'Sərinləşdirici İçkilər',
            'NON_ALCOHOL_DRINKS_CATEGORY': 'Alkoqolsuz Kokteyllər',
            'ÇAY_SETLERI_CATEGORY': 'Çay Setləri',
            'PIVE_SETLERI_CATEGORY': 'Pivə Setləri',
            'YEMEK_SETLERI_CATEGORY': 'Yemək Setləri',
            'SEHER_YEMEYI_CATEGORY': 'Səhər Yeməyi'
        },
        'en': {
            'dil_sechin': 'Select Language',
            'tesdiq_et': 'Confirm',
            'cem': 'Total',
            'no_items_in_category': 'There are no items in this category yet.',
            'SETLER_CATEGORY': 'SETS',
            'ISTI_QAYNARTILAR_CATEGORY': 'Hot Appetizers',
            'SOYUQ_QAYNARTILAR_CATEGORY': 'Cold Appetizers',
            'SALATLAR_CATEGORY': 'Salads',
            'SENDVICLER_CATEGORY': 'Sandwiches',
            'ISTI_YEMEKLER_CATEGORY': 'Hot Dishes',
            'SIRNIYYATLAR_CATEGORY': 'Desserts',
            'KABABLAR_CATEGORY': 'Kebabs',
            'QARNIRLER_CATEGORY': 'Side Dishes',
            'PIVE_QAYNARTILARI_CATEGORY': 'Beer Snacks',
            'ALCOHOL_COCKTAILS_CATEGORY': 'Alcoholic Cocktails',
            'VODKA_CATEGORY': 'Vodka (50 ml)',
            'WHISKEY_CATEGORY': 'Whiskey (50 ml)',
            'GIN_CATEGORY': 'Gin (50 ml)',
            'TEQUILA_CATEGORY': 'Tequila (50 ml)',
            'RUM_CATEGORY': 'Rum (50 ml)',
            'LIQOUR_CATEGORY': 'Liqueur (50 ml)',
            'BEER_CATEGORY': 'Beer',
            'RED_WHITE_WINE_CATEGORY': 'Red/White Wine',
            'HOT_DRINKS_CATEGORY': 'Hot Drinks',
            'QELYAN_CATEGORY': 'Hookah',
            'SOFT_DRINKS_CATEGORY': 'Soft Drinks',
            'NON_ALCOHOL_DRINKS_CATEGORY': 'Non-Alcoholic Cocktails',
            'ÇAY_SETLERI_CATEGORY': 'Tea Sets',
            'PIVE_SETLERI_CATEGORY': 'Beer Sets',
            'YEMEK_SETLERI_CATEGORY': 'Meal Sets',
            'SEHER_YEMEYI_CATEGORY': 'Breakfast'
        },
        'ru': {
            'dil_sechin': 'Выберите язык',
            'tesdiq_et': 'Подтвердить',
            'cem': 'Итого',
            'no_items_in_category': 'В этой категории пока нет товаров.',
            'SETLER_CATEGORY': 'НАБОРЫ',
            'ISTI_QAYNARTILAR_CATEGORY': 'Горячие закуски',
            'SOYUQ_QAYNARTILAR_CATEGORY': 'Холодные закуски',
            'SALATLAR_CATEGORY': 'Салаты',
            'SENDVICLER_CATEGORY': 'Сэндвичи',
            'ISTI_YEMEKLER_CATEGORY': 'Горячие блюда',
            'SIRNIYYATLAR_CATEGORY': 'Десерты',
            'KABABLAR_CATEGORY': 'Кебабы',
            'QARNIRLER_CATEGORY': 'Гарниры',
            'PIVE_QAYNARTILARI_CATEGORY': 'Закуски к пиву',
            'ALCOHOL_COCKTAILS_CATEGORY': 'Алкогольные коктейли',
            'VODKA_CATEGORY': 'Водка (50 мл)',
            'WHISKEY_CATEGORY': 'Виски (50 мл)',
            'GIN_CATEGORY': 'Джин (50 мл)',
            'TEQUILA_CATEGORY': 'Текила (50 мл)',
            'RUM_CATEGORY': 'Ром (50 мл)',
            'LIQOUR_CATEGORY': 'Ликер (50 мл)',
            'BEER_CATEGORY': 'Пиво',
            'RED_WHITE_WINE_CATEGORY': 'Красное/Белое вино',
            'HOT_DRINKS_CATEGORY': 'Горячие напитки',
            'QELYAN_CATEGORY': 'Кальян',
            'SOFT_DRINKS_CATEGORY': 'Безалкогольные напитки',
            'NON_ALCOHOL_DRINKS_CATEGORY': 'Безалкогольные коктейли',
            'ÇAY_SETLERI_CATEGORY': 'Чайные наборы',
            'PIVE_SETLERI_CATEGORY': 'Пивные наборы',
            'YEMEK_SETLERI_CATEGORY': 'Комплексные обеды',
            'SEHER_YEMEYI_CATEGORY': 'Завтрак'
        },
        'tr': {
            'dil_sechin': 'Dil Seçin',
            'tesdiq_et': 'Onayla',
            'cem': 'Toplam',
            'no_items_in_category': 'Bu kategoride henüz ürün bulunmamaktadır.',
            'SETLER_CATEGORY': 'SETLER',
            'ISTI_QAYNARTILAR_CATEGORY': 'Sıcak Mezeler',
            'SOYUQ_QAYNARTILAR_CATEGORY': 'Soğuk Mezeler',
            'SALATLAR_CATEGORY': 'Salatalar',
            'SENDVICLER_CATEGORY': 'Sandviçler',
            'ISTI_YEMEKLER_CATEGORY': 'Sıcak Yemekler',
            'SIRNIYYATLAR_CATEGORY': 'Tatlılar',
            'KABABLAR_CATEGORY': 'Kebaplar',
            'QARNIRLER_CATEGORY': 'Yan Ürünler',
            'PIVE_QAYNARTILARI_CATEGORY': 'Bira Mezeleri',
            'ALCOHOL_COCKTAILS_CATEGORY': 'Alkollü Kokteyller',
            'VODKA_CATEGORY': 'Votka (50 ml)',
            'WHISKEY_CATEGORY': 'Viski (50 ml)',
            'GIN_CATEGORY': 'Cin (50 ml)',
            'TEQUILA_CATEGORY': 'Tekila (50 ml)',
            'RUM_CATEGORY': 'Rom (50 ml)',
            'LIQOUR_CATEGORY': 'Likör (50 ml)',
            'BEER_CATEGORY': 'Bira',
            'RED_WHITE_WINE_CATEGORY': 'Kırmızı/Beyaz Şarap',
            'HOT_DRINKS_CATEGORY': 'Sıcak İçecekler',
            'QELYAN_CATEGORY': 'Nargile',
            'SOFT_DRINKS_CATEGORY': 'Alkolsüz İçecekler',
            'NON_ALCOHOL_DRINKS_CATEGORY': 'Alkolsüz Kokteyller',
            'ÇAY_SETLERI_CATEGORY': 'Çay Setleri',
            'PIVE_SETLERI_CATEGORY': 'Bira Setleri',
            'YEMEK_SETLERI_CATEGORY': 'Yemek Setleri',
            'SEHER_YEMEYI_CATEGORY': 'Kahvaltı'
        }
    };


    // Məhsul məlumatları (qiymət və şəkil ortaqdır, ad və təsvir dilə görə dəyişir)
    // Hər məhsulun ID-si sabit qalır.
    const productData = [
        // ----------- KÖHNƏ SETLƏR -----------
        {
            id: 'set1',
            image: "images/student-set.jpg",
            oldPrice: 51.00,
            currentPrice: 32.00,
            categoryKey: 'SETLER_CATEGORY', // Kateqoriya ID-si
            names: {
                az: "Tələbə Seti",
                en: "Student Set",
                ru: "Студенческий Набор",
                tr: "Öğrenci Seti"
            },
            descriptions: {
                az: "Şaurma 4 ədəd, Fri 4 ədəd, Pizza Marqarita 1 ədəd, Pepsi 1 lt, Çay, Mürəbbə, Qəlyan Çaşqada",
                en: "4 Shawarma, 4 Fries, 1 Margherita Pizza, 1 lt Pepsi, Tea, Assorted Jam, Hookah",
                ru: "4 Шаурмы, 4 Картофеля Фри, 1 Пицца Маргарита, 1 л Pepsi, Чай, Ассорти из варенья, Кальян",
                tr: "4 Adet Şavurma, 4 Adet Patates Kızartması, 1 Adet Margherita Pizza, 1 Lt Pepsi, Çay, Karışık Reçel, Nargile"
            }
        },
        {
            id: 'set2',
            image: "images/family-set.jpg",
            oldPrice: 45.00,
            currentPrice: 35.00,
            categoryKey: 'SETLER_CATEGORY',
            names: {
                az: "Ailə Seti",
                en: "Family Set",
                ru: "Семейный Набор",
                tr: "Aile Seti"
            },
            descriptions: {
                az: "Döner 2 ədəd, Qızarmış Kartof, Xırdalan pivəsi, Salfetka, Qəlyan, Çay",
                en: "2 Doner, French Fries, Khirdalan Beer, Napkin, Hookah, Tea",
                ru: "2 Донера, Картофель Фри, Пиво Xırdalan, Салфетка, Кальян, Чай",
                tr: "2 Adet Döner, Patates Kızartması, Xırdalan Birası, Peçete, Nargile, Çay"
            }
        },
        // ----------- Çay Setləri (Əvvəlki) -----------
        {
            id: 'tea1',
            image: "images/tea-set-1.jpg",
            price: 15.00,
            categoryKey: 'ÇAY_SETLERI_CATEGORY',
            names: {
                az: "Klassik Çay Dəsti",
                en: "Classic Tea Set",
                ru: "Классический Чайный Набор",
                tr: "Klasik Çay Seti"
            },
            descriptions: {
                az: "Qara çay, Limon, Mürəbbə assorti, Şirniyyat",
                en: "Black tea, Lemon, Assorted jams, Sweets",
                ru: "Черный чай, Лимон, Ассорти из варенья, Сладости",
                tr: "Siyah çay, Limon, Karışık reçeller, Tatlılar"
            }
        },
        {
            id: 'tea2',
            image: "images/tea-set-2.jpg",
            price: 18.00,
            categoryKey: 'ÇAY_SETLERI_CATEGORY',
            names: {
                az: "Yaşıl Çay Dəsti",
                en: "Green Tea Set",
                ru: "Набор Зеленого Чая",
                tr: "Yeşil Çay Seti"
            },
            descriptions: {
                az: "Yaşıl çay, Bal, Quru meyvələr, Nanə",
                en: "Green tea, Honey, Dried fruits, Mint",
                ru: "Зеленый чай, Мед, Сухофрукты, Мята",
                tr: "Yeşil çay, Bal, Kuru meyveler, Nane"
            }
        },
        // ----------- Pivə Setləri (Əvvəlki) -----------
        {
            id: 'beer_set1',
            image: "images/beer-set-1.jpg",
            price: 22.00,
            categoryKey: 'PIVE_SETLERI_CATEGORY',
            names: {
                az: "Pivə Menyu 1",
                en: "Beer Menu 1",
                ru: "Пивное Меню 1",
                tr: "Bira Menü 1"
            },
            descriptions: {
                az: "2 pivə, Kartof Fri, Soğan Halqaları",
                en: "2 beers, French Fries, Onion Rings",
                ru: "2 пива, Картофель Фри, Луковые Кольца",
                tr: "2 bira, Patates Kızartması, Soğan Halkaları"
            }
        },
        {
            id: 'beer_set2',
            image: "images/beer-set-2.jpg",
            price: 38.00,
            categoryKey: 'PIVE_SETLERI_CATEGORY',
            names: {
                az: "Pivə Menyu 2",
                en: "Beer Menu 2",
                ru: "Пивное Меню 2",
                tr: "Bira Menü 2"
            },
            descriptions: {
                az: "4 pivə, Çips, Quru ət, Pendir topları",
                en: "4 beers, Chips, Dried meat, Cheese balls",
                ru: "4 пива, Чипсы, Сушеное мясо, Сырные шарики",
                tr: "4 bira, Cips, Kuru et, Peynir topları"
            }
        },
        // ----------- Yemək Setləri (Əvvəlki) -----------
        {
            id: 'food1',
            image: "images/meat-set.jpg",
            price: 28.50,
            categoryKey: 'YEMEK_SETLERI_CATEGORY',
            names: {
                az: "Ət Menyu",
                en: "Meat Menu",
                ru: "Мясное Меню",
                tr: "Et Menü"
            },
            descriptions: {
                az: "Lülə kabab, Tikə kabab, Tərəvəzlər, Çörək",
                en: "Lula kebab, Tikka kebab, Vegetables, Bread",
                ru: "Люля-кебаб, Шашлык из мякоти, Овощи, Хлеб",
                tr: "Lüle kebap, Kuşbaşı kebap, Sebzeler, Ekmek"
            }
        },
        {
            id: 'food2',
            image: "images/chicken-set.jpg",
            price: 24.00,
            categoryKey: 'YEMEK_SETLERI_CATEGORY',
            names: {
                az: "Toyuq Menyu",
                en: "Chicken Menu",
                ru: "Куриное Меню",
                tr: "Tavuk Menü"
            },
            descriptions: {
                az: "Toyuq kabab, Quzu kabab, Kartof, Souslar",
                en: "Chicken kebab, Lamb kebab, Potatoes, Sauces",
                ru: "Шашлык из курицы, Шашлык из баранины, Картофель, Соусы",
                tr: "Tavuk kebap, Kuzu kebap, Patates, Soslar"
            }
        },
        // ----------- Səhər Yeməyi (Əvvəlki) -----------
        {
            id: 'breakfast1',
            image: "images/breakfast-village.jpg",
            price: 12.00,
            categoryKey: 'SEHER_YEMEYI_CATEGORY',
            names: {
                az: "Kənd Səhər Yeməyi",
                en: "Village Breakfast",
                ru: "Деревенский Завтрак",
                tr: "Köy Kahvaltısı"
            },
            descriptions: {
                az: "Kərə yağı, Bal, Pendir, Yumurta, Təzə çörək",
                en: "Butter, Honey, Cheese, Eggs, Fresh bread",
                ru: "Сливочное масло, Мед, Сыр, Яйца, Свежий хлеб",
                tr: "Tereyağı, Bal, Peynir, Yumurta, Taze ekmek"
            }
        },
        {
            id: 'breakfast2',
            image: "images/breakfast-european.jpg",
            price: 14.50,
            categoryKey: 'SEHER_YEMEYI_CATEGORY',
            names: {
                az: "Avropa Səhər Yeməyi",
                en: "European Breakfast",
                ru: "Европейский Завтрак",
                tr: "Avrupa Kahvaltısı"
            },
            descriptions: {
                az: "Omlet, Sosiska, Pomidor, Xiyar, Tost",
                en: "Omelette, Sausage, Tomato, Cucumber, Toast",
                ru: "Омлет, Сосиски, Помидоры, Огурцы, Тосты",
                tr: "Omlet, Sosis, Domates, Salatalık, Tost"
            }
        },
        // ----------- YENİ MƏHSULLAR (tempImageNvO8GN.jpg) -----------
        // İsti Qaynartılar
        {
            id: 'isti_qaynar_1',
            image: "images/pendir-assorti.jpg",
            price: 7.00,
            categoryKey: 'ISTI_QAYNARTILAR_CATEGORY',
            names: { az: "Pendir assorti", en: "Cheese assortment", ru: "Ассорти сыров", tr: "Peynir tabağı" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'isti_qaynar_2',
            image: "images/qizarmis-pendir.jpg",
            price: 5.00,
            categoryKey: 'ISTI_QAYNARTILAR_CATEGORY',
            names: { az: "Qızarmış Pendir", en: "Fried Cheese", ru: "Жареный сыр", tr: "Kızarmış Peynir" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'isti_qaynar_3',
            image: "images/qarides.jpg",
            price: 4.00,
            categoryKey: 'ISTI_QAYNARTILAR_CATEGORY',
            names: { az: "Qarides", en: "Shrimp", ru: "Креветки", tr: "Karides" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'isti_qaynar_4',
            image: "images/dovga.jpg",
            price: 3.00,
            categoryKey: 'ISTI_QAYNARTILAR_CATEGORY',
            names: { az: "Dovğa", en: "Dovga", ru: "Довга", tr: "Dovğa" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'isti_qaynar_5',
            image: "images/saca.jpg",
            price: 2.00,
            categoryKey: 'ISTI_QAYNARTILAR_CATEGORY',
            names: { az: "Saça", en: "Sacha", ru: "Сача", tr: "Saça" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        // Soyuq Qaynartılar
        {
            id: 'soyuq_qaynar_1',
            image: "images/pendir-assorti-soyuq.jpg",
            price: 7.00,
            categoryKey: 'SOYUQ_QAYNARTILAR_CATEGORY',
            names: { az: "Pendir assorti", en: "Cheese assortment", ru: "Ассорти сыров", tr: "Peynir tabağı" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'soyuq_qaynar_2',
            image: "images/tervez-tabaği.jpg",
            price: 6.00,
            categoryKey: 'SOYUQ_QAYNARTILAR_CATEGORY',
            names: { az: "Tərəvəz tabağı", en: "Vegetable plate", ru: "Овощное ассорти", tr: "Sebze tabağı" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'soyuq_qaynar_3',
            image: "images/qara-zeytun.jpg",
            price: 5.00,
            categoryKey: 'SOYUQ_QAYNARTILAR_CATEGORY',
            names: { az: "Qara zeytun", en: "Black olives", ru: "Черные оливки", tr: "Siyah zeytin" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'soyuq_qaynar_4',
            image: "images/badimcan-murebbesi.jpg",
            price: 4.00,
            categoryKey: 'SOYUQ_QAYNARTILAR_CATEGORY',
            names: { az: "Badımcan mürəbbəsi", en: "Eggplant jam", ru: "Баклажанное варенье", tr: "Patlıcan reçeli" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'soyuq_qaynar_5',
            image: "images/limon.jpg",
            price: 2.00,
            categoryKey: 'SOYUQ_QAYNARTILAR_CATEGORY',
            names: { az: "Limon", en: "Lemon", ru: "Лимон", tr: "Limon" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        // Salatlar
        {
            id: 'salad_1',
            image: "images/vinaigrette-salad.jpg",
            price: 8.00,
            categoryKey: 'SALATLAR_CATEGORY',
            names: { az: "Vineqret pomidor salatı", en: "Vinaigrette tomato salad", ru: "Винегрет томатный салат", tr: "Vinegret domates salatası" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'salad_2',
            image: "images/kartof-salati-mayonezli.jpg",
            price: 8.00,
            categoryKey: 'SALATLAR_CATEGORY',
            names: { az: "Kartof salatı mayonezli", en: "Potato salad with mayonnaise", ru: "Картофельный салат с майонезом", tr: "Mayonezli patates salatası" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'salad_3',
            image: "images/sezar-salad-toyuqlu.jpg",
            price: 10.00,
            categoryKey: 'SALATLAR_CATEGORY',
            names: { az: "Sezar salatı toyuqlu", en: "Caesar salad with chicken", ru: "Салат Цезарь с курицей", tr: "Tavuklu Sezar salata" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'salad_4',
            image: "images/sezar-salati-kerevizli.jpg",
            price: 12.00,
            categoryKey: 'SALATLAR_CATEGORY',
            names: { az: "Sezar salatı kərəvizli", en: "Caesar salad with celery", ru: "Салат Цезарь с сельдереем", tr: "Kerevizli Sezar salata" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'salad_5',
            image: "images/ispanaq-salati.jpg",
            price: 7.00,
            categoryKey: 'SALATLAR_CATEGORY',
            names: { az: "İspanaq salatı", en: "Spinach salad", ru: "Салат из шпината", tr: "Ispanak salatası" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'salad_6',
            image: "images/manqal-salati.jpg",
            price: 7.00,
            categoryKey: 'SALATLAR_CATEGORY',
            names: { az: "Manqal salatı", en: "Mangal salad", ru: "Мангал салат", tr: "Mangal salata" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        // Sendviçlər
        {
            id: 'sandwich_1',
            image: "images/club-sandwich.jpg",
            price: 9.00,
            categoryKey: 'SENDVICLER_CATEGORY',
            names: { az: "Club Sandwich", en: "Club Sandwich", ru: "Клаб-сэндвич", tr: "Kulüp Sandviç" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'sandwich_2',
            image: "images/cheeseburger.jpg",
            price: 10.00,
            categoryKey: 'SENDVICLER_CATEGORY',
            names: { az: "Cheeseburger", en: "Cheeseburger", ru: "Чизбургер", tr: "Çizburger" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'sandwich_3',
            image: "images/shaorma.jpg",
            price: 7.00,
            categoryKey: 'SENDVICLER_CATEGORY',
            names: { az: "Şaurma", en: "Shawarma", ru: "Шаурма", tr: "Şavurma" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'sandwich_4',
            image: "images/nuggets.jpg",
            price: 7.00,
            categoryKey: 'SENDVICLER_CATEGORY',
            names: { az: "Naggets", en: "Nuggets", ru: "Наггетсы", tr: "Nuggetlar" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        // İsti Yeməklər
        {
            id: 'hot_dish_1',
            image: "images/sac-qovurma.jpg",
            price: 25.00,
            categoryKey: 'ISTI_YEMEKLER_CATEGORY',
            names: { az: "Sac Qovurma", en: "Sac Roast", ru: "Садж Говурма", tr: "Sac Kavurma" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'hot_dish_2',
            image: "images/sezar-ciger.jpg",
            price: 10.00,
            categoryKey: 'ISTI_YEMEKLER_CATEGORY',
            names: { az: "Sezar Ciyər", en: "Caesar Liver", ru: "Печень Цезарь", tr: "Sezar Ciğer" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'hot_dish_3',
            image: "images/toyuq-tobaka.jpg",
            price: 10.00,
            categoryKey: 'ISTI_YEMEKLER_CATEGORY',
            names: { az: "Toyuq Tobaka", en: "Chicken Tobaka", ru: "Курица Табака", tr: "Tavuk Tabaka" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'hot_dish_4',
            image: "images/qovurma.jpg",
            price: 15.00,
            categoryKey: 'ISTI_YEMEKLER_CATEGORY',
            names: { az: "Qovurma", en: "Roast", ru: "Говурма", tr: "Kavurma" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'hot_dish_5',
            image: "images/qara-qovurma.jpg",
            price: 16.00,
            categoryKey: 'ISTI_YEMEKLER_CATEGORY',
            names: { az: "Qara Qovurma", en: "Black Roast", ru: "Черная Говурма", tr: "Kara Kavurma" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'hot_dish_6',
            image: "images/kete-sup.jpg",
            price: 14.00,
            categoryKey: 'ISTI_YEMEKLER_CATEGORY',
            names: { az: "Kətə Şorb", en: "Kata Soup", ru: "Суп Ката", tr: "Kete Çorba" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'hot_dish_7',
            image: "images/cup-lentil-soup.jpg",
            price: 14.00,
            categoryKey: 'ISTI_YEMEKLER_CATEGORY',
            names: { az: "Çaşqada Mərci Şorb", en: "Cup Lentil Soup", ru: "Чечевичный Суп в Чашке", tr: "Bardakta Mercimek Çorbası" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'hot_dish_8',
            image: "images/qara-ciger-cugundur.jpg",
            price: 15.00,
            categoryKey: 'ISTI_YEMEKLER_CATEGORY',
            names: { az: "Qara Ciyər çuğundur", en: "Black Liver with Beet", ru: "Черная печень со свеклой", tr: "Kara Ciğerli Pancar" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'hot_dish_9',
            image: "images/toyuq-slinget.jpg",
            price: 17.00,
            categoryKey: 'ISTI_YEMEKLER_CATEGORY',
            names: { az: "Toyuq Slinqet", en: "Chicken Slinget", ru: "Куриный Слингет", tr: "Tavuk Slinget" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        // Şirniyyatlar
        {
            id: 'dessert_1',
            image: "images/konfet.jpg",
            price: 7.00,
            categoryKey: 'SIRNIYYATLAR_CATEGORY',
            names: { az: "Konfet", en: "Candy", ru: "Конфеты", tr: "Şekerleme" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'dessert_2',
            image: "images/murebbe.jpg",
            price: 7.00,
            categoryKey: 'SIRNIYYATLAR_CATEGORY',
            names: { az: "Mürəbbə", en: "Jam", ru: "Варенье", tr: "Reçel" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'dessert_3',
            image: "images/xurma.jpg",
            price: 7.00,
            categoryKey: 'SIRNIYYATLAR_CATEGORY',
            names: { az: "Xurma", en: "Date", ru: "Финики", tr: "Hurma" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        // Kaboblar
        {
            id: 'kebab_1',
            image: "images/lula-kebab.jpg",
            price: 8.00,
            categoryKey: 'KABABLAR_CATEGORY',
            names: { az: "Lülə", en: "Lula kebab", ru: "Люля-кебаб", tr: "Lüle kebap" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'kebab_2',
            image: "images/tike-kebab.jpg",
            price: 9.00,
            categoryKey: 'KABABLAR_CATEGORY',
            names: { az: "Tikə", en: "Tike kebab", ru: "Тике-кебаб", tr: "Kuşbaşı kebap" }
            , descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'kebab_3',
            image: "images/toyuq-kebab.jpg",
            price: 7.00,
            categoryKey: 'KABABLAR_CATEGORY',
            names: { az: "Toyuq Kabab", en: "Chicken Kebab", ru: "Куриный шашлык", tr: "Tavuk kebap" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'kebab_4',
            image: "images/qaraciyer-kebab.jpg",
            price: 7.00,
            categoryKey: 'KABABLAR_CATEGORY',
            names: { az: "Qaraciyər Kabab", en: "Liver Kebab", ru: "Шашлык из печени", tr: "Ciğer kebap" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'kebab_5',
            image: "images/dolma.jpg",
            price: 10.00,
            categoryKey: 'KABABLAR_CATEGORY',
            names: { az: "Dolma", en: "Dolma", ru: "Долма", tr: "Dolma" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'kebab_6',
            image: "images/cız-bız.jpg",
            price: 9.00,
            categoryKey: 'KABABLAR_CATEGORY',
            names: { az: "Cız-Bız", en: "Jiz-Biz", ru: "Джиз-Биз", tr: "Cızbız" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        // Qarnirlər
        {
            id: 'garnish_1',
            image: "images/kartof-fri.jpg",
            price: 4.00,
            categoryKey: 'QARNIRLER_CATEGORY',
            names: { az: "Kartof Fri", en: "French Fries", ru: "Картофель Фри", tr: "Patates Kızartması" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'garnish_2',
            image: "images/duyu.jpg",
            price: 4.00,
            categoryKey: 'QARNIRLER_CATEGORY',
            names: { az: "Düyü", en: "Rice", ru: "Рис", tr: "Pirinç" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'garnish_3',
            image: "images/kartof-ev-sayagi.jpg",
            price: 5.00,
            categoryKey: 'QARNIRLER_CATEGORY',
            names: { az: "Kartof ev sayağı", en: "Homemade potatoes", ru: "Картофель по-домашнему", tr: "Ev Usulü Patates" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'garnish_4',
            image: "images/kartof-pomidor.jpg",
            price: 5.00,
            categoryKey: 'QARNIRLER_CATEGORY',
            names: { az: "Kartof pomidor", en: "Potato tomato", ru: "Картофель помидор", tr: "Patates domates" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'garnish_5',
            image: "images/tervez-ballıca.jpg",
            price: 4.00,
            categoryKey: 'QARNIRLER_CATEGORY',
            names: { az: "Tərəvəz Ballıca", en: "Vegetable Balls", ru: "Овощные шарики", tr: "Sebzeli Köfteler" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'garnish_6',
            image: "images/kartof-qizartmasi.jpg",
            price: 5.00,
            categoryKey: 'QARNIRLER_CATEGORY',
            names: { az: "Kartof qızartması", en: "Fried Potatoes", ru: "Жареный картофель", tr: "Kızarmış Patates" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'garnish_7',
            image: "images/kartof-kütləsi.jpg",
            price: 5.00,
            categoryKey: 'QARNIRLER_CATEGORY',
            names: { az: "Kartof kütləsi", en: "Mashed Potatoes", ru: "Картофельное пюре", tr: "Patates Püresi" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        // Pivə Qaynartıları
        {
            id: 'beer_snack_1',
            image: "images/qarides-pive.jpg",
            price: 15.00,
            categoryKey: 'PIVE_QAYNARTILARI_CATEGORY',
            names: { az: "Qarides", en: "Shrimp", ru: "Креветки", tr: "Karides" },
            descriptions: { az: "Pivə üçün", en: "For beer", ru: "К пиву", tr: "Bira için" }
        },
        {
            id: 'beer_snack_2',
            image: "images/pendir-pive.jpg",
            price: 12.00,
            categoryKey: 'PIVE_QAYNARTILARI_CATEGORY',
            names: { az: "Pendir", en: "Cheese", ru: "Сыр", tr: "Peynir" },
            descriptions: { az: "Pivə üçün", en: "For beer", ru: "К пиву", tr: "Bira için" }
        },
        {
            id: 'beer_snack_3',
            image: "images/sosiska-pive.jpg",
            price: 8.00,
            categoryKey: 'PIVE_QAYNARTILARI_CATEGORY',
            names: { az: "Sosiska", en: "Sausage", ru: "Сосиски", tr: "Sosis" },
            descriptions: { az: "Pivə üçün", en: "For beer", ru: "К пиву", tr: "Bira için" }
        },
        {
            id: 'beer_snack_4',
            image: "images/cips-pive.jpg",
            price: 5.00,
            categoryKey: 'PIVE_QAYNARTILARI_CATEGORY',
            names: { az: "Çips", en: "Chips", ru: "Чипсы", tr: "Cips" },
            descriptions: { az: "Pivə üçün", en: "For beer", ru: "К пиву", tr: "Bira için" }
        },
        {
            id: 'beer_snack_5',
            image: "images/quru-et.jpg",
            price: 10.00,
            categoryKey: 'PIVE_QAYNARTILARI_CATEGORY',
            names: { az: "Quru ət", en: "Dried meat", ru: "Сушеное мясо", tr: "Kuru et" },
            descriptions: { az: "Pivə üçün", en: "For beer", ru: "К пиву", tr: "Bira için" }
        },

        // ----------- YENİ MƏHSULLAR (tempImageTgDn5P.jpg) -----------
        // Alcoholic Cocktails
        {
            id: 'cocktail_1',
            image: "images/margarita.jpg",
            price: 15.00,
            categoryKey: 'ALCOHOL_COCKTAILS_CATEGORY',
            names: { az: "Margarita", en: "Margarita", ru: "Маргарита", tr: "Margarita" },
            descriptions: { az: "Tekila, Triple sec, Laym suyu", en: "Tequila, Triple sec, Lime juice", ru: "Текила, Трипл Сек, Сок лайма", tr: "Tekila, Triple sec, Limon suyu" }
        },
        {
            id: 'cocktail_2',
            image: "images/pina-colada.jpg",
            price: 10.00,
            categoryKey: 'ALCOHOL_COCKTAILS_CATEGORY',
            names: { az: "Pina Colada", en: "Pina Colada", ru: "Пина Колада", tr: "Pina Colada" },
            descriptions: { az: "Ağ rom, Kokos kremi, Ananas suyu", en: "White rum, Coconut cream, Pineapple juice", ru: "Белый ром, Кокосовый крем, Ананасовый сок", tr: "Beyaz rom, Hindistan cevizi kreması, Ananas suyu" }
        },
        {
            id: 'cocktail_3',
            image: "images/mojito-classic.jpg",
            price: 10.00,
            categoryKey: 'ALCOHOL_COCKTAILS_CATEGORY',
            names: { az: "Moyito klassik", en: "Mojito Classic", ru: "Мохито классический", tr: "Mojito Klasik" },
            descriptions: { az: "Ağ rom, Laym, Nanə, Şəkər, Soda", en: "White rum, Lime, Mint, Sugar, Soda", ru: "Белый ром, Лайм, Мята, Сахар, Содовая", tr: "Beyaz rom, Limon, Nane, Şeker, Soda" }
        },
        {
            id: 'cocktail_4',
            image: "images/long-island.jpg",
            price: 10.00,
            categoryKey: 'ALCOHOL_COCKTAILS_CATEGORY',
            names: { az: "Long Island", en: "Long Island", ru: "Лонг Айленд", tr: "Long Island" },
            descriptions: { az: "Cin, Rom, Tekila, Araq, Triple sec, Kola", en: "Gin, Rum, Tequila, Vodka, Triple sec, Cola", ru: "Джин, Ром, Текила, Водка, Трипл Сек, Кола", tr: "Cin, Rom, Tekila, Votka, Triple sec, Kola" }
        },
        // Vodka (50 ml)
        {
            id: 'vodka_1',
            image: "images/finlandia.jpg",
            price: 7.00,
            oldPrice: 15.00,
            categoryKey: 'VODKA_CATEGORY',
            names: { az: "Finlandia", en: "Finlandia", ru: "Финляндия", tr: "Finlandiya" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'vodka_2',
            image: "images/absolute.jpg",
            price: 7.00,
            oldPrice: 15.00,
            categoryKey: 'VODKA_CATEGORY',
            names: { az: "Absolute", en: "Absolute", ru: "Абсолют", tr: "Absolut" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'vodka_3',
            image: "images/level.jpg",
            price: 4.00,
            oldPrice: 8.00,
            categoryKey: 'VODKA_CATEGORY',
            names: { az: "Level", en: "Level", ru: "Левел", tr: "Level" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        // Whiskey (50 ml)
        {
            id: 'whiskey_1',
            image: "images/chivas-regal.jpg",
            price: 12.00,
            oldPrice: 20.00,
            categoryKey: 'WHISKEY_CATEGORY',
            names: { az: "Chivas Regal 12", en: "Chivas Regal 12", ru: "Чивас Ригал 12", tr: "Chivas Regal 12" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'whiskey_2',
            image: "images/monkey-shoulder.jpg",
            price: 10.00,
            oldPrice: 18.00,
            categoryKey: 'WHISKEY_CATEGORY',
            names: { az: "Monkey Shoulder", en: "Monkey Shoulder", ru: "Манки Шоулдер", tr: "Monkey Shoulder" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'whiskey_3',
            image: "images/jack-daniels.jpg",
            price: 7.00,
            oldPrice: 10.00,
            categoryKey: 'WHISKEY_CATEGORY',
            names: { az: "Jack Daniels", en: "Jack Daniels", ru: "Джек Дэниелс", tr: "Jack Daniels" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        // Gin (50 ml)
        {
            id: 'gin_1',
            image: "images/bombay-sapphire.jpg",
            price: 7.00,
            oldPrice: 90.00,
            categoryKey: 'GIN_CATEGORY',
            names: { az: "Bombay Sapphire", en: "Bombay Sapphire", ru: "Бомбей Сапфир", tr: "Bombay Sapphire" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'gin_2',
            image: "images/gordons.jpg",
            price: 7.00,
            oldPrice: 90.00,
            categoryKey: 'GIN_CATEGORY',
            names: { az: "Gordons", en: "Gordons", ru: "Гордонс", tr: "Gordons" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        // Tequila (50 ml)
        {
            id: 'tequila_1',
            image: "images/olmeca-blanco.jpg",
            price: 8.00,
            oldPrice: 45.00,
            categoryKey: 'TEQUILA_CATEGORY',
            names: { az: "Olmeca Blanco", en: "Olmeca Blanco", ru: "Ольмека Бланко", tr: "Olmeca Blanco" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'tequila_2',
            image: "images/olmeca-gold.jpg",
            price: 8.00,
            oldPrice: 45.00,
            categoryKey: 'TEQUILA_CATEGORY',
            names: { az: "Olmeca Gold", en: "Olmeca Gold", ru: "Ольмека Голд", tr: "Olmeca Gold" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        // Rum (50 ml)
        {
            id: 'rum_1',
            image: "images/bacardi-superior.jpg",
            price: 7.00,
            oldPrice: 95.00,
            categoryKey: 'RUM_CATEGORY',
            names: { az: "Bacardi Superior", en: "Bacardi Superior", ru: "Бакарди Супериор", tr: "Bacardi Superior" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'rum_2',
            image: "images/bacardi-black.jpg",
            price: 7.00,
            oldPrice: 95.00,
            categoryKey: 'RUM_CATEGORY',
            names: { az: "Bacardi Black", en: "Bacardi Black", ru: "Бакарди Блэк", tr: "Bacardi Black" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        // Liqueur (50 ml)
        {
            id: 'liqour_1',
            image: "images/jagermeister.jpg",
            price: 7.00,
            oldPrice: 110.00,
            categoryKey: 'LIQOUR_CATEGORY',
            names: { az: "Jagermeister", en: "Jagermeister", ru: "Егермейстер", tr: "Jagermeister" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        // Beer
        {
            id: 'beer_1',
            image: "images/heineken.jpg",
            price: 6.00,
            categoryKey: 'BEER_CATEGORY',
            names: { az: "Heineken", en: "Heineken", ru: "Хайнекен", tr: "Heineken" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'beer_2',
            image: "images/corona.jpg",
            price: 7.00,
            categoryKey: 'BEER_CATEGORY',
            names: { az: "Corona", en: "Corona", ru: "Корона", tr: "Corona" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'beer_3',
            image: "images/efes.jpg",
            price: 4.00,
            categoryKey: 'BEER_CATEGORY',
            names: { az: "Efes", en: "Efes", ru: "Эфес", tr: "Efes" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'beer_4',
            image: "images/xirdalan-draft.jpg",
            price: 4.00,
            categoryKey: 'BEER_CATEGORY',
            names: { az: "Xırdalan draft", en: "Khirdalan draft", ru: "Хырдалан драфт", tr: "Hırdalan Fıçı" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'beer_5',
            image: "images/kozlak.jpg",
            price: 5.00,
            categoryKey: 'BEER_CATEGORY',
            names: { az: "Kozlak", en: "Kozlak", ru: "Козлак", tr: "Kozlak" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        // Red / White Wine
        {
            id: 'wine_1',
            image: "images/sarab.jpg",
            price: 7.00,
            oldPrice: 22.00,
            categoryKey: 'RED_WHITE_WINE_CATEGORY',
            names: { az: "Şərab", en: "Wine", ru: "Вино", tr: "Şarap" },
            descriptions: { az: "Qırmızı/Ağ", en: "Red/White", ru: "Красное/Белое", tr: "Kırmızı/Beyaz" }
        },
        {
            id: 'wine_2',
            image: "images/meydan.jpg",
            price: 8.00,
            oldPrice: 40.00,
            categoryKey: 'RED_WHITE_WINE_CATEGORY',
            names: { az: "Meydan", en: "Meydan", ru: "Мейдан", tr: "Meydan" },
            descriptions: { az: "Qırmızı/Ağ", en: "Red/White", ru: "Красное/Белое", tr: "Kırmızı/Beyaz" }
        },
        // Hot Drinks
        {
            id: 'hot_drink_1',
            image: "images/black-green-tea-pot.jpg",
            price: 7.00,
            categoryKey: 'HOT_DRINKS_CATEGORY',
            names: { az: "Qara/Yaşıl Çay", en: "Black/Green Tea (Pot)", ru: "Черный/Зеленый Чай (Чайник)", tr: "Siyah/Yeşil Çay (Demlik)" },
            descriptions: { az: "Çaynikdə", en: "In pot", ru: "В чайнике", tr: "Demlikte" }
        },
        {
            id: 'hot_drink_2',
            image: "images/fruit-tea-pot.jpg",
            price: 10.00,
            categoryKey: 'HOT_DRINKS_CATEGORY',
            names: { az: "Meyvəli Çay", en: "Fruit Tea (Pot)", ru: "Фруктовый Чай (Чайник)", tr: "Meyve Çayı (Demlik)" },
            descriptions: { az: "Çaynikdə", en: "In pot", ru: "В чайнике", tr: "Demlikte" }
        },
        {
            id: 'hot_drink_3',
            image: "images/tea-set-xusus.jpg",
            price: 35.00,
            oldPrice: 55.00,
            categoryKey: 'HOT_DRINKS_CATEGORY',
            names: { az: "Çay Seti", en: "Tea Set", ru: "Чайный Набор", tr: "Çay Seti" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'hot_drink_4',
            image: "images/espresso.jpg",
            price: 4.00,
            categoryKey: 'HOT_DRINKS_CATEGORY',
            names: { az: "Espresso", en: "Espresso", ru: "Эспрессо", tr: "Espresso" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        // Qəlyan
        {
            id: 'qelyan_1',
            image: "images/qelyan-apelsin.jpg",
            price: 30.00,
            categoryKey: 'QELYAN_CATEGORY',
            names: { az: "Qəlyan apelsində", en: "Hookah in Orange", ru: "Кальян на апельсине", tr: "Portakallı Nargile" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'qelyan_2',
            image: "images/qelyan-greyfurt.jpg",
            price: 40.00,
            categoryKey: 'QELYAN_CATEGORY',
            names: { az: "Qəlyan qreyfurtdə", en: "Hookah in Grapefruit", ru: "Кальян на грейпфруте", tr: "Greyfurtlu Nargile" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        // Soft Drinks
        {
            id: 'soft_drink_1',
            image: "images/coca-cola.jpg",
            price: 3.00,
            categoryKey: 'SOFT_DRINKS_CATEGORY',
            names: { az: "Qazlı içkilər", en: "Carbonated drinks", ru: "Газированные напитки", tr: "Gazlı içecekler" },
            descriptions: { az: "Coca-Cola, Fanta, Sprite", en: "Coca-Cola, Fanta, Sprite", ru: "Кока-Кола, Фанта, Спрайт", tr: "Coca-Cola, Fanta, Sprite" }
        },
        {
            id: 'soft_drink_2',
            image: "images/water.jpg",
            price: 4.00,
            categoryKey: 'SOFT_DRINKS_CATEGORY',
            names: { az: "Su", en: "Water", ru: "Вода", tr: "Su" },
            descriptions: { az: "Qazlı/Qazsız", en: "Sparkling/Still", ru: "Газированная/Без газа", tr: "Gazlı/Gazsız" }
        },
        {
            id: 'soft_drink_3',
            image: "images/limonad.jpg",
            price: 4.00,
            categoryKey: 'SOFT_DRINKS_CATEGORY',
            names: { az: "Limonad", en: "Lemonade", ru: "Лимонад", tr: "Limonata" },
            descriptions: { az: "Evdə hazırlanan", en: "Homemade", ru: "Домашний", tr: "Ev yapımı" }
        },
        {
            id: 'soft_drink_4',
            image: "images/ice-tea.jpg",
            price: 4.00,
            categoryKey: 'SOFT_DRINKS_CATEGORY',
            names: { az: "Ice tea", en: "Ice Tea", ru: "Холодный чай", tr: "Buzlu Çay" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        },
        {
            id: 'soft_drink_5',
            image: "images/kompot.jpg",
            price: 4.00,
            categoryKey: 'SOFT_DRINKS_CATEGORY',
            names: { az: "Kompot", en: "Compote", ru: "Компот", tr: "Komposto" },
            descriptions: { az: "0.5 L", en: "0.5 L", ru: "0.5 л", tr: "0.5 L" }
        },
        {
            id: 'soft_drink_6',
            image: "images/meyve-suyu.jpg",
            price: 7.00,
            oldPrice: 10.00,
            categoryKey: 'SOFT_DRINKS_CATEGORY',
            names: { az: "Meyvə suyu", en: "Fruit juice", ru: "Фруктовый сок", tr: "Meyve suyu" },
            descriptions: { az: "Təzə sıxılmış", en: "Freshly squeezed", ru: "Свежевыжатый", tr: "Taze sıkılmış" }
        },
        // Non-Alcoholic Drinks
        {
            id: 'non_alcohol_1',
            image: "images/strawberry-with-basil.jpg",
            price: 15.00,
            categoryKey: 'NON_ALCOHOL_DRINKS_CATEGORY',
            names: { az: "Çiyələk Reyhanlı", en: "Strawberry with Basil", ru: "Клубника с базиликом", tr: "Çilekli Fesleğenli" },
            descriptions: { az: "Çiyələk, Reyhan, Qarpız, Şərbət, Qazlı su", en: "Strawberry, Basil, Watermelon, Syrup, Soda", ru: "Клубника, Базилик, Арбуз, Сироп, Газированная вода", tr: "Çilek, Fesleğen, Karpuz, Şerbet, Gazlı su" }
        },
        {
            id: 'non_alcohol_2',
            image: "images/red-bull.jpg",
            price: 6.00,
            categoryKey: 'NON_ALCOHOL_DRINKS_CATEGORY',
            names: { az: "Red Bull", en: "Red Bull", ru: "Ред Булл", tr: "Red Bull" },
            descriptions: { az: "", en: "", ru: "", tr: "" }
        }
    ];

    // Kateqoriya açarlarının düzülüşü (Nav barda görünən sıra)
    const categoryOrder = [
        'SETLER_CATEGORY',
        'ISTI_QAYNARTILAR_CATEGORY',
        'SOYUQ_QAYNARTILAR_CATEGORY',
        'SALATLAR_CATEGORY',
        'SENDVICLER_CATEGORY',
        'ISTI_YEMEKLER_CATEGORY',
        'SIRNIYYATLAR_CATEGORY',
        'KABABLAR_CATEGORY',
        'QARNIRLER_CATEGORY',
        'PIVE_QAYNARTILARI_CATEGORY',
        'ALCOHOL_COCKTAILS_CATEGORY',
        'VODKA_CATEGORY',
        'WHISKEY_CATEGORY',
        'GIN_CATEGORY',
        'TEQUILA_CATEGORY',
        'RUM_CATEGORY',
        'LIQOUR_CATEGORY',
        'BEER_CATEGORY',
        'RED_WHITE_WINE_CATEGORY',
        'HOT_DRINKS_CATEGORY',
        'QELYAN_CATEGORY',
        'SOFT_DRINKS_CATEGORY',
        'NON_ALCOHOL_DRINKS_CATEGORY',
        'ÇAY_SETLERI_CATEGORY',
        'PIVE_SETLERI_CATEGORY',
        'YEMEK_SETLERI_CATEGORY',
        'SEHER_YEMEYI_CATEGORY'
    ];

    // Mətnləri cari dilə uyğun yeniləyən funksiya
    function updateTexts() {
        screenTitleElement.textContent = translations[selectedLanguage].dil_sechin;
        confirmButton.textContent = translations[selectedLanguage].tesdiq_et;

        // "Cəm:" mətnini və səbət totalını yenilə
        cartSummaryTextElement.innerHTML = `
            <div class="cart-icon"><i class="fas fa-shopping-basket"></i></div>
            <span>${translations[selectedLanguage].cem}: <span id="cart-total">${cartTotal.toFixed(2)}</span> ₼</span>
        `;

        renderCategories(); // Kateqoriyaları yenidən yüklə (adları dəyişəcək)

        let categoryToRender = categoryOrder[0]; // Default olaraq birinci kateqoriya

        // Əvvəlki aktiv kateqoriyanı yadda saxla
        const activeCategoryBtn = document.querySelector('.category-btn.active');
        if (activeCategoryBtn) {
            categoryToRender = activeCategoryBtn.dataset.categoryKey;
        }

        renderMenuItems(categoryToRender);
        // Yeni dilə uyğun düyməni aktiv et
        const newActiveBtn = document.querySelector(`.category-btn[data-category-key="${categoryToRender}"]`);
        if (newActiveBtn) {
            newActiveBtn.classList.add('active');
        }
    }


    // Dil seçimi funksionallığı
    languageItems.forEach(item => {
        item.addEventListener('click', () => {
            languageItems.forEach(li => li.classList.remove('selected'));
            item.classList.add('selected');
            selectedLanguage = item.dataset.lang;
            confirmButton.disabled = false;
            confirmButton.style.opacity = 1;
            confirmButton.style.pointerEvents = 'all';
        });
    });

    // Təsdiq et düyməsinə klikləmə
    confirmButton.addEventListener('click', () => {
        if (selectedLanguage) {
            languageSelectionScreen.classList.remove('active');
            menuScreen.classList.add('active');
            updateTexts(); // Mətnləri yeni dilə uyğun yenilə
            console.log(`Selected language: ${selectedLanguage}`);

            // Menyuya keçəndə səbəti sıfırla
            cartTotal = 0;
            document.getElementById('cart-total').textContent = cartTotal.toFixed(2); // Düzgün elementə yaz
        }
    });

    // Headerdə saatı yenilə
    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        document.querySelector('.time').textContent = `${hours}:${minutes}`;
    }
    updateTime();
    setInterval(updateTime, 60000); // Hər dəqiqədə yenilə

    // Ekranlar arasında keçid funksiyaları
    window.hideLanguageSelection = function() {
        languageSelectionScreen.classList.remove('active');
        menuScreen.classList.add('active'); // X düyməsinə basıldıqda menyu ekranı avtomatik açılsın
        updateTexts(); // Mətnləri cari dilə uyğun yenilə
        cartTotal = 0; // Səbəti sıfırla
        document.getElementById('cart-total').textContent = cartTotal.toFixed(2); // Düzgün elementə yaz
    };

    window.showLanguageSelection = function() {
        menuScreen.classList.remove('active');
        languageSelectionScreen.classList.add('active');
    };

    // Kateqoriyaları render etmə funksiyası
    function renderCategories() {
        menuCategoriesContainer.innerHTML = ''; // Əvvəlki kateqoriyaları təmizlə

        categoryOrder.forEach(categoryKey => {
            const button = document.createElement('button');
            button.classList.add('category-btn');
            // Tərcümə olunmuş adı göstəririk
            button.textContent = translations[selectedLanguage][categoryKey]; // translations-dan birbaşa alırıq
            button.dataset.categoryKey = categoryKey; // Orijinal key'i data attribute olaraq saxlayırıq
            button.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                renderMenuItems(categoryKey); // Orijinal key ilə yeməkləri göstər
            });
            menuCategoriesContainer.appendChild(button);
        });
    }

    // Yeməkləri render etmə funksiyası
    function renderMenuItems(categoryKey) {
        menuItemsContainer.innerHTML = ''; // Əvvəlki yeməkləri təmizlə

        // Seçilmiş kateqoriyaya aid məhsulları filter edirik
        const items = productData.filter(item => item.categoryKey === categoryKey);

        if (!items || items.length === 0) {
            menuItemsContainer.innerHTML = `<p style="text-align: center; color: #a0a0a0; margin-top: 50px;">${translations[selectedLanguage].no_items_in_category}</p>`;
            return;
        }

        const categoryTitle = translations[selectedLanguage][categoryKey]; // Kateqoriya başlığını tərcümədən alırıq
        const sectionTitle = document.createElement('h2');
        sectionTitle.classList.add('section-title');
        sectionTitle.textContent = categoryTitle;
        menuItemsContainer.appendChild(sectionTitle);

        // SETLƏR kateqoriyası üçün xüsusi render (fərqli dizaynı var)
        if (categoryKey === 'SETLER_CATEGORY') {
            items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('menu-item');
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.names[selectedLanguage]}">
                    <div class="item-details">
                        <h3>${item.names[selectedLanguage]}</h3>
                        <p>${item.descriptions[selectedLanguage]}</p>
                        ${item.oldPrice ? `<p class="old-price">${item.oldPrice.toFixed(2)} ₼</p>` : ''}
                        <p class="current-price">${item.currentPrice.toFixed(2)} ₼</p>
                    </div>
                    <button class="add-to-cart-btn" data-price="${item.currentPrice.toFixed(2)}"><i class="fas fa-plus"></i></button>
                `;
                menuItemsContainer.appendChild(itemDiv);
            });
        } else {
            // Digər kateqoriyalar üçün ümumi render (grid dizaynı)
            const gridDiv = document.createElement('div');
            gridDiv.classList.add('tea-sets-grid'); // Ümumi grid classı

            items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('tea-set-item');
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.names[selectedLanguage]}">
                    <div class="tea-set-details">
                        <h3>${item.names[selectedLanguage]}</h3>
                        <p>${item.descriptions[selectedLanguage]}</p>
                        <p class="price">${item.price.toFixed(2)} ₼</p>
                    </div>
                    <button class="add-to-cart-btn" data-price="${item.price.toFixed(2)}"><i class="fas fa-plus"></i></button>
                `;
                gridDiv.appendChild(itemDiv);
            });
            menuItemsContainer.appendChild(gridDiv);
        }

        attachAddToCartListeners();
    }

    // Səbətə əlavə et düyməsinin funksionallığı
    function attachAddToCartListeners() {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.onclick = null; // Əvvəlki event listenerləri sil (təkrarlanmaması üçün)
            button.addEventListener('click', (event) => {
                const price = parseFloat(event.currentTarget.dataset.price);
                if (!isNaN(price)) {
                    cartTotal += price;
                    document.getElementById('cart-total').textContent = cartTotal.toFixed(2);
                    console.log(`Added item to cart. Current total: ${cartTotal.toFixed(2)} ₼`);
                }
            });
        });
    }

    // Səhifə yüklənəndə ilk dil seçimi ekranını göstər
    updateTime();
    // Dil seçimi ekranının başlıq və düymə mətnlərini default dilə uyğun yenilə
    updateTexts();

    // Menyu ekranına keçildikdə ilk kateqoriyanı göstərmək üçün
    if (menuScreen.classList.contains('active')) {
        updateTexts(); // Mətnləri yenilə
    }
});
