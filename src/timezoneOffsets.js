const timezoneOffsets = {
    "Asia/Kashgar": 6,
    "Asia/Jerusalem": 3,
    "America/Phoenix": -7,
    "Europe/Berlin": -2,
    "Africa/Gaborone": 2,
    "Asia/Seoul": 9,
    "Africa/Dar_es_Salaam": 3,
    "America/Port-au-Prince": -4,
    "America/Montreal": -4,
    "America/Panama": -5,
    "Asia/Ho_Chi_Minh": 7,
    "America/Boise": -6,
    "Asia/Baghdad": 3,
    "Africa/El_Aaiun": 1,
    "Europe/Zagreb": 2,
    "America/Merida": -5,
    "Africa/Nouakchott": 0,
    "America/Santiago": -4,
    "Africa/Bissau": 0,
    "America/Los_Angeles": -7,
    "America/Sitka": -8,
    "Asia/Jakarta": 7,
    "Asia/Harbin": 8,
    "America/Belize": -6,
    "America/Vancouver": -7,
    "Asia/Tbilisi": 4,
    "Asia/Yerevan": 4,
    "Europe/Tallinn": 3,
    "Asia/Magadan": 11,
    "Australia/Perth": 8,
    "America/North_Dakota": -6,
    "Europe/Vilnius": 3,
    "Asia/Baku": 4,
    "Asia/Tehran": 4.5,
    "Europe/Lisbon": 1,
    "America/Araguaina": -3,
    "America/Coral_Harbour": -5,
    "Asia/Novokuznetsk": 7,
    "Asia/Thimphu": 6,
    "Australia/Darwin": 9.5,
    "Africa/Freetown": 0,
    "Atlantic/South_Georgia": -2,
    "Africa/Accra": 0,
    "Asia/Sakhalin": 11,
    "Australia/Adelaide": 9.5,
    "America/Jamaica": -5,
    "Europe/Tirane": 2,
    "Asia/Vladivostok": 10,
    "America/Scoresbysund": 0,
    "America/Moncton": -3,
    "Africa/Bujumbura": 2,
    "America/Glace_Bay": -3,
    "Atlantic/Stanley": -3,
    "Africa/Porto-Novo": -1,
    "America/Indiana": -4,
    "Asia/Ashgabat": 5,
    "America/Detroit": -4,
    "America/Menominee": -5,
    "Asia/Novosibirsk": 7,
    "Africa/Lagos": -1,
    "America/Godthab": -2,
    "America/Yakutat": -8,
    "Europe/Volgograd": 4,
    "Asia/Rangoon": 6.5,
    "Asia/Qatar": 3,
    "Indian/Antananarivo": 3,
    "Asia/Khandyga": 9,
    "Arctic/Longyearbyen": -2,
    "Australia/Hobart": 10,
    "Pacific/Galapagos": -6,
    "Asia/Oral": 5,
    "Asia/Taipei": 8,
    "Australia/Broken_Hill": 9.5,
    "America/Dawson_Creek": -7,
    "Africa/Mbabane": 2,
    "Africa/Cairo": 2,
    "America/Cambridge_Bay": -6,
    "Asia/Aqtau": 5,
    "Asia/Hovd": 7,
    "Asia/Ulaanbaatar": 8,
    "Africa/Nairobi": 3,
    "America/Kentucky": -4,
    "Australia/Melbourne": 10,
    "America/Halifax": -3,
    "America/Ojinaga": -6,
    "America/Nome": -8,
    "Asia/Jayapura": 9,
    "Asia/Ust-Nera": 10,
    "Asia/Yakutsk": 10,
    "Asia/Irkutsk": 8,
    "America/Tegucigalpa": -6,
    "Europe/Zaporozhye": 3,
    "America/Fortaleza": -3,
    "America/Yellowknife": -6,
    "Pacific/Fiji": 12,
    "Europe/Bratislava": 2,
    "America/Iqaluit": -4,
    "America/Resolute": -5,
    "Africa/Brazzaville": 1,
    "Africa/Libreville": -1,
    "America/New_York": -4,
    "Asia/Samarkand": 5,
    "Africa/Johannesburg": 2,
    "America/Bahia": -3,
    "Europe/Zurich": 2,
    "America/Paramaribo": -3,
    "Europe/Samara": 4,
    "Asia/Pyongyang": 9,
    "Europe/Ljubljana": 2,
    "Pacific/Port_Moresby": 10,
    "America/Manaus": -4,
    "Africa/Kampala": 3,
    "America/Rio_Branco": -5,
    "Africa/Bamako": 0,
    "America/Argentina": -3,
    "Asia/Yekaterinburg": 5,
    "America/Goose_Bay": -3,
    "Africa/Conakry": 0,
    "Africa/Asmara": 3,
    "America/Chihuahua": -6,
    "Europe/Warsaw": 2,
    "Asia/Ashkhabad": 5,
    "Asia/Novokuznetsk": 7,
    "Asia/Aqtobe": 5,
    "Europe/Bucharest": 3,
    "Asia/Colombo": 5.5,
    "Africa/Douala": 1,
    "America/Guyana": -4,
    "Asia/Bangkok": 7,
    "America/Denver": -6,
    "Africa/Lome": 0,
    "Europe/Kiev": 3,
    "Europe/Vienna": 2,
    "Europe/Rome": 2,
    "Asia/Manila": 8,
    "Asia/Tokyo": 9,
    "Africa/Kigali": 2,
    "Europe/Chisinau": 3,
    "America/Winnipeg": -5,
    "America/Nassau": -4,
    "Europe/Dublin": 1,
    "Asia/Kuching": 8,
    "Asia/Krasnoyarsk": 7,
    "Europe/Paris": 2,
    "America/Argentina": -3,
    "Asia/Almaty": 6,
    "Africa/Mogadishu": 3,
    "Asia/Dhaka": 6,
    "Africa/Malabo": 1,
    "Africa/Maputo": 2,
    "Europe/Sofia": 3,
    "Africa/Ndjamena": 1,
    "Asia/Kolkata": 5.5,
    "America/Indianapolis": -4,
    "America/Sao_Paulo": -3,
    "America/St_Johns": -2.5,
    "America/Nipigon": -4,
    "Asia/Damascus": 3,
    "Asia/Karachi": 5,
    "Europe/Belgrade": 2,
    "Asia/Kabul": 4.5,
    "America/Costa_Rica": -6,
    "Pacific/Pohnpei": 11,
    "Pacific/Samoa": -11,
    "America/Argentina": -3,
    "Asia/Beirut": 3,
    "Asia/Bahrain": 3,
    "America/Thunder_Bay": -4,
    "America/Caracas": -4.5,
    "America/Porto_Velho": -4,
    "America/Edmonton": -6,
    "Pacific/Honolulu": -10,
    "Africa/Khartoum": 2,
    "America/Juneau": -8,
    "Europe/Kaliningrad": 2,
    "Europe/Budapest": 2,
    "Asia/Bishkek": 6,
    "Africa/Monrovia": 0,
    "Europe/Oslo": 2,
    "America/Anchorage": -8,
    "America/Maceio": -3,
    "Asia/Amman": 3,
    "Asia/Dushanbe": 5,
    "America/Chicago": -5,
    "Europe/Prague": 2,
    "Africa/Abidjan": 0,
    "America/Port_of_Spain": -4,
    "Asia/Muscat": 4,
    "Asia/Aden": 3,
    "America/St_Barthelemy": -4,
    "America/Santarem": -3,
    "America/Bogota": -5,
    "America/Mexico_City": -5,
    "America/Blanc-Sablon": -4,
    "Asia/Dili": 9,
    "Europe/Moscow": 3,
    "Asia/Baghdad": 3,
    "Europe/Stockholm": 2,
    "Asia/Dubai": 4,
    "Africa/Luanda": 1,
    "America/Pangnirtung": -4,
    "Africa/Asmera": 3,
    "America/Cayenne": -3,
    "Africa/Lusaka": 2,
    "Europe/Helsinki": 3,
    "America/Guatemala": -6,
    "Asia/Kuala_Lumpur": 8,
    "America/El_Salvador": -6,
    "America/Dawson": -7,
    "Europe/Sarajevo": 2,
    "Africa/Windhoek": 2,
    "Asia/Kolkata": 5.5,
    "America/Whitehorse": -7,
    "Asia/Tashkent": 5,
    "Pacific/Tongatapu": 13,
    "America/Cancun": -5,
    "Africa/Dakar": 0,
    "America/Montserrat": -4,
    "America/Barbados": -4,
    "Africa/Addis_Ababa": 3,
    "Asia/Brunei": 8,
    "America/Cuiaba": -4,
    "America/St_Vincent": -4,
    "America/St_Kitts": -4,
    "Europe/Athens": 3,
    "Pacific/Niue": -11,
    "America/Belem": -3,
    "America/Fort_Nelson": -7,
    "Asia/Almaty": 6,
    "America/Tijuana": -7,
    "Europe/Uzhgorod": 3,
    "America/Santos": -3,
    "Pacific/Wake": 12,
    "America/Argentina": -3,
    "America/Managua": -6,
    "Europe/Kirov": 3,
    "Asia/Kolkata": 5.5,
    "Asia/Kolkata": 5.5,
    "Africa/Maseru": 2,
    "Europe/Isle_of_Man": 1,
    "Asia/Kolkata": 5.5,
}