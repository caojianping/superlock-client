export interface IAreaCode {
    name: string;
    id: string;
    code: string;
}

export const defaultAreaCode: IAreaCode = {
    name: 'China (中国)',
    id: 'cn',
    code: '86'
};

// 热门国家/地区：中国、泰国、缅甸、马来西亚、越南、柬埔寨、菲律宾、新加坡
export const HotAreaCodes = [
    {
        name: 'China (中国)',
        id: 'cn',
        code: '86'
    },
    {
        name: 'Thailand (ไทย)',
        id: 'th',
        code: '66'
    },
    {
        name: 'Myanmar (Burma) (မြန်မာ)',
        id: 'mm',
        code: '95'
    },
    {
        name: 'Malaysia',
        id: 'my',
        code: '60'
    },
    {
        name: 'Vietnam (Việt Nam)',
        id: 'vn',
        code: '84'
    },
    {
        name: 'Cambodia (កម្ពុជា)',
        id: 'kh',
        code: '855'
    },
    {
        name: 'Philippines',
        id: 'ph',
        code: '63'
    },
    {
        name: 'Singapore',
        id: 'sg',
        code: '65'
    }
];

export const AreaCodes = [
    {
        name: 'Afghanistan (‫افغانستان‬‎)',
        id: 'af',
        code: '93'
    },
    {
        name: 'Åland Islands (Åland)',
        id: 'ax',
        code: '358'
    },
    {
        name: 'Albania (Shqipëri)',
        id: 'al',
        code: '355'
    },
    {
        name: 'Algeria (‫الجزائر‬‎)',
        id: 'dz',
        code: '213'
    },
    {
        name: 'American Samoa',
        id: 'as',
        code: '1684'
    },
    {
        name: 'Andorra',
        id: 'ad',
        code: '376'
    },
    {
        name: 'Angola',
        id: 'ao',
        code: '244'
    },
    {
        name: 'Anguilla',
        id: 'ai',
        code: '1264'
    },
    {
        name: 'Antigua and Barbuda',
        id: 'ag',
        code: '1268'
    },
    {
        name: 'Argentina',
        id: 'ar',
        code: '54'
    },
    {
        name: 'Armenia (Հայաստան)',
        id: 'am',
        code: '374'
    },
    {
        name: 'Aruba',
        id: 'aw',
        code: '297'
    },
    {
        name: 'Australia',
        id: 'au',
        code: '61'
    },
    {
        name: 'Austria (Österreich)',
        id: 'at',
        code: '43'
    },
    {
        name: 'Azerbaijan (Azərbaycan)',
        id: 'az',
        code: '994'
    },
    {
        name: 'Bahamas',
        id: 'bs',
        code: '1242'
    },
    {
        name: 'Bahrain (‫البحرين‬‎)',
        id: 'bh',
        code: '973'
    },
    {
        name: 'Bangladesh (বাংলাদেশ)',
        id: 'bd',
        code: '880'
    },
    {
        name: 'Barbados',
        id: 'bb',
        code: '1246'
    },
    {
        name: 'Belarus (Беларусь)',
        id: 'by',
        code: '375'
    },
    {
        name: 'Belgium (België)',
        id: 'be',
        code: '32'
    },
    {
        name: 'Belize',
        id: 'bz',
        code: '501'
    },
    {
        name: 'Benin (Bénin)',
        id: 'bj',
        code: '229'
    },
    {
        name: 'Bermuda',
        id: 'bm',
        code: '1441'
    },
    {
        name: 'Bhutan (འབྲུག)',
        id: 'bt',
        code: '975'
    },
    {
        name: 'Bolivia',
        id: 'bo',
        code: '591'
    },
    {
        name: 'Bosnia and Herzegovina (Босна и Херцеговина)',
        id: 'ba',
        code: '387'
    },
    {
        name: 'Botswana',
        id: 'bw',
        code: '267'
    },
    {
        name: 'Brazil (Brasil)',
        id: 'br',
        code: '55'
    },
    {
        name: 'British Indian Ocean Territory',
        id: 'io',
        code: '246'
    },
    {
        name: 'British Virgin Islands',
        id: 'vg',
        code: '1284'
    },
    {
        name: 'Brunei',
        id: 'bn',
        code: '673'
    },
    {
        name: 'Bulgaria (България)',
        id: 'bg',
        code: '359'
    },
    {
        name: 'Burkina Faso',
        id: 'bf',
        code: '226'
    },
    {
        name: 'Burundi (Uburundi)',
        id: 'bi',
        code: '257'
    },
    {
        name: 'Cambodia (កម្ពុជា)',
        id: 'kh',
        code: '855'
    },
    {
        name: 'Cameroon (Cameroun)',
        id: 'cm',
        code: '237'
    },
    {
        name: 'Canada',
        id: 'ca',
        code: '1'
    },
    {
        name: 'Cape Verde (Kabu Verdi)',
        id: 'cv',
        code: '238'
    },
    {
        name: 'Caribbean Netherlands',
        id: 'bq',
        code: '5997'
    },
    {
        name: 'Cayman Islands',
        id: 'ky',
        code: '1345'
    },
    {
        name: 'Central African Republic (République centrafricaine)',
        id: 'cf',
        code: '236'
    },
    {
        name: 'Chad (Tchad)',
        id: 'td',
        code: '235'
    },
    {
        name: 'Chile',
        id: 'cl',
        code: '56'
    },
    {
        name: 'China (中国)',
        id: 'cn',
        code: '86'
    },
    {
        name: 'Christmas Island',
        id: 'cx',
        code: '61'
    },
    {
        name: 'Cocos (Keeling) Islands (Kepulauan Cocos (Keeling))',
        id: 'cc',
        code: '61'
    },
    {
        name: 'Colombia',
        id: 'co',
        code: '57'
    },
    {
        name: 'Comoros (‫جزر القمر‬‎)',
        id: 'km',
        code: '269'
    },
    {
        name: 'Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)',
        id: 'cd',
        code: '243'
    },
    {
        name: 'Congo (Republic) (Congo-Brazzaville)',
        id: 'cg',
        code: '242'
    },
    {
        name: 'Cook Islands',
        id: 'ck',
        code: '682'
    },
    {
        name: 'Costa Rica',
        id: 'cr',
        code: '506'
    },
    {
        name: 'Côte d’Ivoire',
        id: 'ci',
        code: '225'
    },
    {
        name: 'Croatia (Hrvatska)',
        id: 'hr',
        code: '385'
    },
    {
        name: 'Cuba',
        id: 'cu',
        code: '53'
    },
    {
        name: 'Curaçao',
        id: 'cw',
        code: '5999'
    },
    {
        name: 'Cyprus (Κύπρος)',
        id: 'cy',
        code: '357'
    },
    {
        name: 'Czech Republic (Česká republika)',
        id: 'cz',
        code: '420'
    },
    {
        name: 'Denmark (Danmark)',
        id: 'dk',
        code: '45'
    },
    {
        name: 'Djibouti',
        id: 'dj',
        code: '253'
    },
    {
        name: 'Dominica',
        id: 'dm',
        code: '1767'
    },
    {
        name: 'Dominican Republic (República Dominicana)',
        id: 'do',
        code: '1809'
    },
    {
        name: 'Ecuador',
        id: 'ec',
        code: '593'
    },
    {
        name: 'Egypt (‫مصر‬‎)',
        id: 'eg',
        code: '20'
    },
    {
        name: 'El Salvador',
        id: 'sv',
        code: '503'
    },
    {
        name: 'Equatorial Guinea (Guinea Ecuatorial)',
        id: 'gq',
        code: '240'
    },
    {
        name: 'Eritrea',
        id: 'er',
        code: '291'
    },
    {
        name: 'Estonia (Eesti)',
        id: 'ee',
        code: '372'
    },
    {
        name: 'Ethiopia',
        id: 'et',
        code: '251'
    },
    {
        name: 'Falkland Islands (Islas Malvinas)',
        id: 'fk',
        code: '500'
    },
    {
        name: 'Faroe Islands (Føroyar)',
        id: 'fo',
        code: '298'
    },
    {
        name: 'Fiji',
        id: 'fj',
        code: '679'
    },
    {
        name: 'Finland (Suomi)',
        id: 'fi',
        code: '358'
    },
    {
        name: 'France',
        id: 'fr',
        code: '33'
    },
    {
        name: 'French Guiana (Guyane française)',
        id: 'gf',
        code: '594'
    },
    {
        name: 'French Polynesia (Polynésie française)',
        id: 'pf',
        code: '689'
    },
    {
        name: 'Gabon',
        id: 'ga',
        code: '241'
    },
    {
        name: 'Gambia',
        id: 'gm',
        code: '220'
    },
    {
        name: 'Georgia (საქართველო)',
        id: 'ge',
        code: '995'
    },
    {
        name: 'Germany (Deutschland)',
        id: 'de',
        code: '49'
    },
    {
        name: 'Ghana (Gaana)',
        id: 'gh',
        code: '233'
    },
    {
        name: 'Gibraltar',
        id: 'gi',
        code: '350'
    },
    {
        name: 'Greece (Ελλάδα)',
        id: 'gr',
        code: '30'
    },
    {
        name: 'Greenland (Kalaallit Nunaat)',
        id: 'gl',
        code: '299'
    },
    {
        name: 'Grenada',
        id: 'gd',
        code: '1473'
    },
    {
        name: 'Guadeloupe',
        id: 'gp',
        code: '590'
    },
    {
        name: 'Guam',
        id: 'gu',
        code: '1671'
    },
    {
        name: 'Guatemala',
        id: 'gt',
        code: '502'
    },
    {
        name: 'Guernsey',
        id: 'gg',
        code: '44'
    },
    {
        name: 'Guinea (Guinée)',
        id: 'gn',
        code: '224'
    },
    {
        name: 'Guinea-Bissau (Guiné Bissau)',
        id: 'gw',
        code: '245'
    },
    {
        name: 'Guyana',
        id: 'gy',
        code: '592'
    },
    {
        name: 'Haiti',
        id: 'ht',
        code: '509'
    },
    {
        name: 'Honduras',
        id: 'hn',
        code: '504'
    },
    {
        name: 'Hong Kong (香港)',
        id: 'hk',
        code: '852'
    },
    {
        name: 'Hungary (Magyarország)',
        id: 'hu',
        code: '36'
    },
    {
        name: 'Iceland (Ísland)',
        id: 'is',
        code: '354'
    },
    {
        name: 'India (भारत)',
        id: 'in',
        code: '91'
    },
    {
        name: 'Indonesia',
        id: 'id',
        code: '62'
    },
    {
        name: 'Iran (‫ایران‬‎)',
        id: 'ir',
        code: '98'
    },
    {
        name: 'Iraq (‫العراق‬‎)',
        id: 'iq',
        code: '964'
    },
    {
        name: 'Ireland',
        id: 'ie',
        code: '353'
    },
    {
        name: 'Isle of Man',
        id: 'im',
        code: '44'
    },
    {
        name: 'Israel (‫ישראל‬‎)',
        id: 'il',
        code: '972'
    },
    {
        name: 'Italy (Italia)',
        id: 'it',
        code: '39'
    },
    {
        name: 'Jamaica',
        id: 'jm',
        code: '1876'
    },
    {
        name: 'Japan (日本)',
        id: 'jp',
        code: '81'
    },
    {
        name: 'Jersey',
        id: 'je',
        code: '44'
    },
    {
        name: 'Jordan (‫الأردن‬‎)',
        id: 'jo',
        code: '962'
    },
    {
        name: 'Kazakhstan (Казахстан)',
        id: 'kz',
        code: '7'
    },
    {
        name: 'Kenya',
        id: 'ke',
        code: '254'
    },
    {
        name: 'Kiribati',
        id: 'ki',
        code: '686'
    },
    {
        name: 'Kosovo (Kosovë)',
        id: 'xk',
        code: '377'
    },
    {
        name: 'Kuwait (‫الكويت‬‎)',
        id: 'kw',
        code: '965'
    },
    {
        name: 'Kyrgyzstan (Кыргызстан)',
        id: 'kg',
        code: '996'
    },
    {
        name: 'Laos (ລາວ)',
        id: 'la',
        code: '856'
    },
    {
        name: 'Latvia (Latvija)',
        id: 'lv',
        code: '371'
    },
    {
        name: 'Lebanon (‫لبنان‬‎)',
        id: 'lb',
        code: '961'
    },
    {
        name: 'Lesotho',
        id: 'ls',
        code: '266'
    },
    {
        name: 'Liberia',
        id: 'lr',
        code: '231'
    },
    {
        name: 'Libya (‫ليبيا‬‎)',
        id: 'ly',
        code: '218'
    },
    {
        name: 'Liechtenstein',
        id: 'li',
        code: '423'
    },
    {
        name: 'Lithuania (Lietuva)',
        id: 'lt',
        code: '370'
    },
    {
        name: 'Luxembourg',
        id: 'lu',
        code: '352'
    },
    {
        name: 'Macau (澳門)',
        id: 'mo',
        code: '853'
    },
    {
        name: 'Macedonia (FYROM) (Македонија)',
        id: 'mk',
        code: '389'
    },
    {
        name: 'Madagascar (Madagasikara)',
        id: 'mg',
        code: '261'
    },
    {
        name: 'Malawi',
        id: 'mw',
        code: '265'
    },
    {
        name: 'Malaysia',
        id: 'my',
        code: '60'
    },
    {
        name: 'Maldives',
        id: 'mv',
        code: '960'
    },
    {
        name: 'Mali',
        id: 'ml',
        code: '223'
    },
    {
        name: 'Malta',
        id: 'mt',
        code: '356'
    },
    {
        name: 'Marshall Islands',
        id: 'mh',
        code: '692'
    },
    {
        name: 'Martinique',
        id: 'mq',
        code: '596'
    },
    {
        name: 'Mauritania (‫موريتانيا‬‎)',
        id: 'mr',
        code: '222'
    },
    {
        name: 'Mauritius (Moris)',
        id: 'mu',
        code: '230'
    },
    {
        name: 'Mayotte',
        id: 'yt',
        code: '262'
    },
    {
        name: 'Mexico (México)',
        id: 'mx',
        code: '52'
    },
    {
        name: 'Micronesia',
        id: 'fm',
        code: '691'
    },
    {
        name: 'Moldova (Republica Moldova)',
        id: 'md',
        code: '373'
    },
    {
        name: 'Monaco',
        id: 'mc',
        code: '377'
    },
    {
        name: 'Mongolia (Монгол)',
        id: 'mn',
        code: '976'
    },
    {
        name: 'Montenegro (Crna Gora)',
        id: 'me',
        code: '382'
    },
    {
        name: 'Montserrat',
        id: 'ms',
        code: '1664'
    },
    {
        name: 'Morocco (‫المغرب‬‎)',
        id: 'ma',
        code: '212'
    },
    {
        name: 'Mozambique (Moçambique)',
        id: 'mz',
        code: '258'
    },
    {
        name: 'Myanmar (Burma) (မြန်မာ)',
        id: 'mm',
        code: '95'
    },
    {
        name: 'Namibia (Namibië)',
        id: 'na',
        code: '264'
    },
    {
        name: 'Nauru',
        id: 'nr',
        code: '674'
    },
    {
        name: 'Nepal (नेपाल)',
        id: 'np',
        code: '977'
    },
    {
        name: 'Netherlands (Nederland)',
        id: 'nl',
        code: '31'
    },
    {
        name: 'New Caledonia (Nouvelle-Calédonie)',
        id: 'nc',
        code: '687'
    },
    {
        name: 'New Zealand',
        id: 'nz',
        code: '64'
    },
    {
        name: 'Nicaragua',
        id: 'ni',
        code: '505'
    },
    {
        name: 'Niger (Nijar)',
        id: 'ne',
        code: '227'
    },
    {
        name: 'Nigeria',
        id: 'ng',
        code: '234'
    },
    {
        name: 'Niue',
        id: 'nu',
        code: '683'
    },
    {
        name: 'Norfolk Island',
        id: 'nf',
        code: '672'
    },
    {
        name: 'North Korea (조선 민주주의 인민 공화국)',
        id: 'kp',
        code: '850'
    },
    {
        name: 'Northern Mariana Islands',
        id: 'mp',
        code: '1670'
    },
    {
        name: 'Norway (Norge)',
        id: 'no',
        code: '47'
    },
    {
        name: 'Oman (‫عُمان‬‎)',
        id: 'om',
        code: '968'
    },
    {
        name: 'Pakistan (‫پاکستان‬‎)',
        id: 'pk',
        code: '92'
    },
    {
        name: 'Palau',
        id: 'pw',
        code: '680'
    },
    {
        name: 'Palestine (‫فلسطين‬‎)',
        id: 'ps',
        code: '970'
    },
    {
        name: 'Panama (Panamá)',
        id: 'pa',
        code: '507'
    },
    {
        name: 'Papua New Guinea',
        id: 'pg',
        code: '675'
    },
    {
        name: 'Paraguay',
        id: 'py',
        code: '595'
    },
    {
        name: 'Peru (Perú)',
        id: 'pe',
        code: '51'
    },
    {
        name: 'Philippines',
        id: 'ph',
        code: '63'
    },
    {
        name: 'Pitcairn Islands',
        id: 'pn',
        code: '64'
    },
    {
        name: 'Poland (Polska)',
        id: 'pl',
        code: '48'
    },
    {
        name: 'Portugal',
        id: 'pt',
        code: '351'
    },
    {
        name: 'Puerto Rico',
        id: 'pr',
        code: '1787'
    },
    {
        name: 'Qatar (‫قطر‬‎)',
        id: 'qa',
        code: '974'
    },
    {
        name: 'Réunion (La Réunion)',
        id: 're',
        code: '262'
    },
    {
        name: 'Romania (România)',
        id: 'ro',
        code: '40'
    },
    {
        name: 'Russia (Россия)',
        id: 'ru',
        code: '7'
    },
    {
        name: 'Rwanda',
        id: 'rw',
        code: '250'
    },
    {
        name: 'Saint Barthélemy (Saint-Barthélemy)',
        id: 'bl',
        code: '590'
    },
    {
        name: 'Saint Helena',
        id: 'sh',
        code: '290'
    },
    {
        name: 'Saint Kitts and Nevis',
        id: 'kn',
        code: '1869'
    },
    {
        name: 'Saint Lucia',
        id: 'lc',
        code: '1758'
    },
    {
        name: 'Saint Martin (Saint-Martin (partie française))',
        id: 'mf',
        code: '590'
    },
    {
        name: 'Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)',
        id: 'pm',
        code: '508'
    },
    {
        name: 'Saint Vincent and the Grenadines',
        id: 'vc',
        code: '1784'
    },
    {
        name: 'Samoa',
        id: 'ws',
        code: '685'
    },
    {
        name: 'San Marino',
        id: 'sm',
        code: '378'
    },
    {
        name: 'São Tomé and Príncipe (São Tomé e Príncipe)',
        id: 'st',
        code: '239'
    },
    {
        name: 'Saudi Arabia (‫المملكة العربية السعودية‬‎)',
        id: 'sa',
        code: '966'
    },
    {
        name: 'Senegal (Sénégal)',
        id: 'sn',
        code: '221'
    },
    {
        name: 'Serbia (Србија)',
        id: 'rs',
        code: '381'
    },
    {
        name: 'Seychelles',
        id: 'sc',
        code: '248'
    },
    {
        name: 'Sierra Leone',
        id: 'sl',
        code: '232'
    },
    {
        name: 'Singapore',
        id: 'sg',
        code: '65'
    },
    {
        name: 'Sint Maarten',
        id: 'sx',
        code: '1721'
    },
    {
        name: 'Slovakia (Slovensko)',
        id: 'sk',
        code: '421'
    },
    {
        name: 'Slovenia (Slovenija)',
        id: 'si',
        code: '386'
    },
    {
        name: 'Solomon Islands',
        id: 'sb',
        code: '677'
    },
    {
        name: 'Somalia (Soomaaliya)',
        id: 'so',
        code: '252'
    },
    {
        name: 'South Africa',
        id: 'za',
        code: '27'
    },
    {
        name: 'South Georgia & South Sandwich Islands',
        id: 'gs',
        code: '500'
    },
    {
        name: 'South Korea (대한민국)',
        id: 'kr',
        code: '82'
    },
    {
        name: 'South Sudan (‫جنوب السودان‬‎)',
        id: 'ss',
        code: '211'
    },
    {
        name: 'Spain (España)',
        id: 'es',
        code: '34'
    },
    {
        name: 'Sri Lanka (ශ්‍රී ලංකාව)',
        id: 'lk',
        code: '94'
    },
    {
        name: 'Sudan (‫السودان‬‎)',
        id: 'sd',
        code: '249'
    },
    {
        name: 'Suriname',
        id: 'sr',
        code: '597'
    },
    {
        name: 'Svalbard and Jan Mayen (Svalbard og Jan Mayen)',
        id: 'sj',
        code: '4779'
    },
    {
        name: 'Swaziland',
        id: 'sz',
        code: '268'
    },
    {
        name: 'Sweden (Sverige)',
        id: 'se',
        code: '46'
    },
    {
        name: 'Switzerland (Schweiz)',
        id: 'ch',
        code: '41'
    },
    {
        name: 'Syria (‫سوريا‬‎)',
        id: 'sy',
        code: '963'
    },
    {
        name: 'Taiwan (台灣)',
        id: 'tw',
        code: '886'
    },
    {
        name: 'Tajikistan',
        id: 'tj',
        code: '992'
    },
    {
        name: 'Tanzania',
        id: 'tz',
        code: '255'
    },
    {
        name: 'Thailand (ไทย)',
        id: 'th',
        code: '66'
    },
    {
        name: 'Timor-Leste',
        id: 'tl',
        code: '670'
    },
    {
        name: 'Togo',
        id: 'tg',
        code: '228'
    },
    {
        name: 'Tokelau',
        id: 'tk',
        code: '690'
    },
    {
        name: 'Tonga',
        id: 'to',
        code: '676'
    },
    {
        name: 'Trinidad and Tobago',
        id: 'tt',
        code: '1868'
    },
    {
        name: 'Tunisia (‫تونس‬‎)',
        id: 'tn',
        code: '216'
    },
    {
        name: 'Turkey (Türkiye)',
        id: 'tr',
        code: '90'
    },
    {
        name: 'Turkmenistan',
        id: 'tm',
        code: '993'
    },
    {
        name: 'Turks and Caicos Islands',
        id: 'tc',
        code: '1649'
    },
    {
        name: 'Tuvalu',
        id: 'tv',
        code: '688'
    },
    {
        name: 'Uganda',
        id: 'ug',
        code: '256'
    },
    {
        name: 'Ukraine (Україна)',
        id: 'ua',
        code: '380'
    },
    {
        name: 'United Arab Emirates (‫الإمارات العربية المتحدة‬‎)',
        id: 'ae',
        code: '971'
    },
    {
        name: 'United Kingdom',
        id: 'gb',
        code: '44'
    },
    {
        name: 'United States',
        id: 'us',
        code: '1'
    },
    {
        name: 'U.S. Virgin Islands',
        id: 'vi',
        code: '1340'
    },
    {
        name: 'Uruguay',
        id: 'uy',
        code: '598'
    },
    {
        name: 'Uzbekistan (Oʻzbekiston)',
        id: 'uz',
        code: '998'
    },
    {
        name: 'Vanuatu',
        id: 'vu',
        code: '678'
    },
    {
        name: 'Vatican City (Città del Vaticano)',
        id: 'va',
        code: '379'
    },
    {
        name: 'Venezuela',
        id: 've',
        code: '58'
    },
    {
        name: 'Vietnam (Việt Nam)',
        id: 'vn',
        code: '84'
    },
    {
        name: 'Wallis and Futuna',
        id: 'wf',
        code: '681'
    },
    {
        name: 'Western Sahara (‫الصحراء الغربية‬‎)',
        id: 'eh',
        code: '212'
    },
    {
        name: 'Yemen (‫اليمن‬‎)',
        id: 'ye',
        code: '967'
    },
    {
        name: 'Zambia',
        id: 'zm',
        code: '260'
    },
    {
        name: 'Zimbabwe',
        id: 'zw',
        code: '263'
    }
];
