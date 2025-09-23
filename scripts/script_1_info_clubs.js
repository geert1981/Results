import { fetchJson, fillTable, normalizeWords, $, setText } from 'https://geert1981.github.io/Results/scripts/utils.js';
// COPYRIGHT YEAR
const current_year = new Date().getFullYear();
setText($("#Current_year_text"), $("#Current_year_text").innerHTML + `<h8>&copy; ${current_year} Designed by Geert Kril - All rights reserved</h8>`);

// INFO CLUBS
let bvbl = 'BVBL1156';
let page_style = 'background-color: red; color: white; background-image: linear-gradient(45deg, rgb(255, 0, 0), 70%, rgb(2, 0, 36));';
let team_logo = 'logos/BVBL1156.png';
let bvbl_code;

if (bvbl_code != null){
} else {
    bvbl_code = "BVBL1156";
}
// DEZE FUNCTIONS UITVOEREN BIJ KLIK OP CHANGE CLUB BUTTON
async function change_club(bvbl_code) {
    // console.log('Change club functie afgevuurd ...')
    bvbl = bvbl_code;
    localStorage.setItem('storage_bvbl', bvbl);
    update_page();

    // Controleer of update_club_details is gedefinieerd voordat je deze aanroept
    if (typeof update_club_details === 'function') {
        update_club_details();
    }
    // update_club_details();
    update_kalender_club();
    update_leden();
    update_kalender_team_id();
    teamRks = null;
    update_klassement_reeks_id();
}
document.addEventListener('DOMContentLoaded', function () {
    // Controleer of change_club is gedefinieerd voordat je deze aanroept
    if (typeof change_club === 'function') {
        change_club(bvbl_code);
    }
});

document.addEventListener('DOMContentLoaded', change_club(bvbl_code));
const clubs_info = {
    BVBL1156: 'Lommel',
    BVBL1106: 'Leopoldsburg',
    BVBL1465: 'Limburg United',
    BVBL1076: 'Beringen',
    BVBL1267: 'Stevoort',
    BVBL1294: 'Tongeren',
    BVBL1081: 'Zolder',
    BVBL1130: 'Zonhoven',
    BVBL1104: 'Optima',
    BVBL1027: 'KSTBB',
    BVBL1146: 'Peer',
    BVBL1126: 'Mol',
    BVBL1419: 'Houthalen',
    BVBL1176: 'Lummen',
    BVBL1217: 'Hades',
    BVBL1087: 'Hasselt',
    BVBL1455: 'Bree',
    BVBL1255: 'Aarschot',
    BVBL1195: 'Guco',
    BVBL1189: 'Oxaco',
    BVBL1458: 'Elite',
    BVBL1126: 'Mol',
    BVBL1022: 'Oostende',
    BVBL1004: 'Antwerp',
    BVBL1051: 'Finexa',
    BVBL1223: 'Nieuwerkerken',

    BVBL1053: 'Tienen',
    BVBL1263: 'Basket Brugge',
    BVBL1139: 'Aartselaar',
    BVBL1068: 'Donza',
    BVBL1254: 'Alfa',
    BVBL1160: 'Alken',
    BVBL1569: 'Menen',
    BVBL1414: 'Gentson',
    BVBL1510: 'Antwerp Wolf Pack',
    BVBL1522: 'Avanti Brugge',
    BVBL1541: 'Diksmuide',
    BVBL1021: 'Zele',
    BVBL1488: 'Loyers',
    BVBL1377: 'Blue Stars Brugge',
    BVBL1116: 'Gems',
    BVBL1304: 'Bacclo',
    BVBL1107: 'Dilbeek',
    BVBL1237: 'Desselgem',
    BVBL1437: 'Zemst',
    BVBL1092: 'Malle',
    BVBL1343: 'Meetjesland',
    BVBL1026: 'Izegem',
    BVBL1260: 'Poperinge',
    BVBL1114: 'Sijsele',
    BVBL1426: 'Ieper',
    BVBL1306: 'Stabroek',
    BVBL1173: 'Willebroek',
    BVBL1504: 'Lede',
    BVBL1225: 'Dessel',
    BVBL1122: 'Sint-Amands',
    BVBL1098: 'Koekelare',
    BVBL1449: 'Vilvoorde',
    BVBL1566: 'Zwijndrecht',
    BVBL1185: 'Alsemberg',
    BVBL1379: 'As',
    BVBL1253: 'Assenede',
    BVBL1265: 'Kasterlee',
    BVBL1389: 'Bazel',
    BVBL1231: 'Berlaar',
    BVBL1321: 'Niel',
    BVBL1376: 'Ninove',
    BVBL1159: 'Zwevezele',
    BVBL1460: 'Erebodegem',
    BVBL1136: 'Falco Gent',
    BVBL1146: 'Feniks Gent',
    BVBL1328: 'Zoersel',
    BVBL1158: 'Hansbeke',
    BVBL1251: 'Geel',
    BVBL1361: 'Oudenburg',
    BVBL1101: 'Gullegem',
    BVBL1261: 'Haacht',
    BVBL1037: 'Oudenaarde',
    BVBL1061: 'Zottegem',
    BVBL1404: 'Destelbergen',
    BVBL1363: 'Houtem',
    BVBL1230: 'Koksijde',
    BVBL1286: 'Laakdal',
    BVBL1521: 'Lions Gent',
    BVBL1054: 'Lokeren',
    BVBL1271: 'Nijlen',
    BVBL1181: 'Brasschaat',
    BVBL1354: 'Wommelgem',
    BVBL1141: 'Denderleeuw',
    BVBL1169: 'Pelt',
    BVBL1208: 'Putte',
    BVBL1331: 'Rumst',
    BVBL1216: 'Schelle',
    BVBL1450: 'Ploegsteert',
    BVBL1558: 'Denderleeuw',
    BVBL1194: 'Wervik',
    BVBL1010: 'Sint-Amandsberg',
    BVBL1289: 'Gavere',
    BVBL1207: 'Sint-Stevens-Woluwe',
    BVBL1109: 'Hamme',
    BVBL1461: 'Zulte-Leiestreek',
    BVBL1330: 'Oedelem',
    BVBL1232: 'Asse-Ternat',
    BVBL1123: 'Erpe-Mere',
    BVBL1277: 'Schoten-Brasschaat',
    BVBL1084: 'Knokke-Heist',
    BVBL1257: 'Grimbergen',
    BVBL1042: 'Zwevegem',
    BVBL1203: 'Lede',
    BVBL1538: 'Lions Genk',
    BVBL1131: 'Maasmechelen',
    BVBL1005: 'Machelen-Diegem',
    BVBL1564: 'Molenbeek',
    BVBL1291: 'Opwijk',
    BVBL1559: 'Polaris Brussel',
    BVBL1155: 'Overijse',
    BVBL1283: 'Eernegem',
    BVBL1172: 'Betekom',
    BVBL1190: 'Bilzerse',
    BVBL1032: 'Vorst',
    BVBL1348: 'Black Sheep',
    BVBL1048: 'Ronse-Kluisbergen',
    BVBL1218: 'Wielsbeke',
    BVBL1424: 'Boortmeerbeek',
    BVBL1269: 'Kortemark',
    BVBL1552: 'Lauwe',
    BVBL1432: 'Blankenberge',
    BVBL1171: 'Scherpenheuvel',
    BVBL1118: 'Cosmo Genk',
    BVBL1326: 'Okapi Aalst',
    BVBL1386: 'Rode Leeuwen',
    BVBL1406: 'Dino Brussels',
    BVBL1115: 'Duffel',
    BVBL1196: 'Bertem',
    BVBL1162: 'Aalter',
    BVBL1380: 'Edegemse',
    BVBL1180: 'Knesselare',
    BVBL1573: 'Overtime Brussels',
    BVBL1134: 'Essense',
    BVBL1111: 'Ekeren',
    BVBL1417: 'Femina Habac',
    BVBL1142: 'Fenics Leuven',
    BVBL1034: 'Waregem',
    BVBL1226: 'Gent-Oost',
    BVBL1102: 'Bornem',
    BVBL1586: 'Affligem',
    BVBL1447: 'Hageland',
    BVBL1540: 'Helchteren',
    BVBL1452: 'Wevelgem-Moorsele',
    BVBL1127: 'Kortrijk',
    BVBL1058: 'Kontich',
    BVBL1199: 'Zaventem',
    BVBL1413: 'Zwevegem',
    BVBL1153: 'Edegem',
    BVBL1309: 'Kangoeroes Mechelen',
    BVBL1062: 'Bredene',
    BVBL1161: 'Bavi Gent',
    BVBL1186: 'Okido Arendonk',
    BVBL1206: 'Racing Brugge',
    BVBL1142: 'Laarne',
    BVBL1152: 'Turnhout',
    BVBL1205: 'Iebac Ieper',
    BVBL1168: 'Waasmunster',
    BVBL1078: 'De Panne',
    BVBL1197: 'Melsele-Beveren',
    BVBL1441: 'Avelgem',
    BVBL1075: 'Oostkamp',
    BVBL1047: 'Scheldejeugd Temse',
    BVBL1070: 'Geraardsbergen',
    BVBL1080: 'Herentalse',
    BVBL1029: 'Sint-Niklase',
    BVBL1163: 'Landen',
    BVBL1097: 'Macabi Antwerpen',
    BVBL1349: 'Merchtem',
    BVBL1006: 'Berchem',
    BVBL1124: 'Middelkerke',
    BVBL1188: 'Brabo Antwerpen',
    BVBL1223: 'Nieuwerkerken',
    BVBL1024: 'Okapi Aalst',
    BVBL1229: 'Olicsa Antwerpen',
    BVBL1049: 'Orly Hasselt',
    BVBL1108: 'Baasrode',
    BVBL1396: 'Huldenberg',
    BVBL1147: 'Wilrijk',
    BVBL1554: 'Wetteren',
    BVBL1167: 'Gembo',
    BVBL1150: 'Zelzate',
    BVBL1025: 'Zwijndrecht',
    BVBL1125: 'Leuven Bears',
    BVBL1238: 'Diest',
    BVBL1249: 'Zuiderkempen'
};

document.addEventListener('DOMContentLoaded', function() {
    init('BVBL1156'); // Standaardwaarde voor bvbl_code, vervang dit met de gewenste waarde
});

function update_page() {
    let page;
    switch (bvbl) {
        case 'BVBL1465':
            // console.log('Style:', bvbl);
            page = 'Hubo Limburg United';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgba(44, 93, 143, 1); color: white; background-image: linear-gradient(45deg, rgb(0, 0, 128), 70%, rgb(2, 0, 36));';
            team_logo = 'logos/BVBL1465.png';
            init();
            break;
        case 'BVBL1106':
            // console.log('Style:', bvbl);
            page = 'KBBC Union Leopoldsburg';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: #248f24; color: white; background-image: linear-gradient(45deg, #248f24 , 70%, rgb(2, 0, 36));';
            team_logo = 'logos/BVBL1106.png';
            init();
            break;
        case 'BVBL1156':
            // console.log('Style:', bvbl);
            page = 'BBC Croonen Lommel';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: red; color: white; background-image: linear-gradient(45deg, rgb(255, 0, 0), 70%, rgb(2, 0, 36));';
            team_logo = 'logos/BVBL1156.png';
            init();
            break;
        case 'BVBL1267':
            // console.log('Style:', bvbl);
            page = 'Style Stevoort BBC';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgb(0, 128, 0); color: white; background-image: linear-gradient(45deg, rgb(0, 128, 0) , 70%, rgb(2, 0, 36));';
            team_logo = 'logos/BVBL1267.png';
            init();
            break;
        case 'BVBL1076':
            // console.log('Style:', bvbl);
            page = 'KBBC Miners Beringen';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgb(90, 87, 87); color: white; background-image: linear-gradient(45deg, rgb(90, 87, 87), 70%, rgb(2, 0, 36));';
            team_logo = 'logos/BVBL1076.png';
            init();
            break;
        case 'BVBL1294':
            // console.log('Style:', bvbl);
            page = 'BasKet Tongeren';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: blue; color: white; background-image: linear-gradient(45deg, rgb(0, 0, 255), 70%, rgb(2, 0, 36));';
            team_logo = 'logos/BVBL1294.png';
            init();
            break;
        case 'BVBL1130':
            // console.log('Style:', bvbl);
            page = 'Basket Zonhoven';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgb(0, 0, 255); color: white; background-image: linear-gradient(45deg, rgb(0, 0, 255), 70%, rgb(2, 0, 36));';
            team_logo = 'logos/BVBL1130.png';
            init();
            break;
        case 'BVBL1126':
            // console.log('Style:', bvbl);
            page = 'K. Vabco Mol BBC';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgb(70, 130, 180); color: white; background-image: linear-gradient(45deg, rgb(70, 130, 180), 70%, rgb(2, 0, 36));';
            team_logo = 'logos/BVBL1126.png';
            init();
            break;
        case 'BVBL1022':
            // console.log('Style:', bvbl);
            page = 'BC Oostende Basket@Sea';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgb(255, 255, 0); color: white; background-image: linear-gradient(45deg, rgb(255, 255, 0), 70%, rgb(2, 0, 36));';
            team_logo = 'logos/BVBL1022.png';
            init();
            break;
        case 'BVBL1146':
            // console.log('Style:', bvbl);
            page = 'Peer BBC vzw';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgb(255, 255, 0); color: white; background-image: linear-gradient(45deg, rgb(255, 255, 0), 70%, rgb(2, 0, 36));';
            team_logo = 'logos/BVBL1146.png';
            init();
            break;
        case 'BVBL1027':
            console.log('Style:', bvbl);
            page = 'Kon Sint-Truidense Basketbal (KSTBB)';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgb(255, 255, 0); color: white; background-image: linear-gradient(45deg, rgb(255, 255, 0), 70%, rgb(2, 0, 36));';
            team_logo = 'logos/BVBL1027.png';
            init();
            break;
        case 'BVBL1081':
            // console.log('Style:', bvbl);
            page = 'KBBC Zolder vzw';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: #248f24; color: white; background-image: linear-gradient(45deg, #248f24 , 70%, rgb(2, 0, 36));';
            team_logo = 'logos/BVBL1081.png';
            init();
            break;
        case 'BVBL1051':
            // console.log('Style:', bvbl);
            page = 'KBGO Finexa Basket@Sea';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgb(0, 0, 128); color: white; background-image: linear-gradient(45deg, rgb(0, 0, 128) , 70%, rgb(2, 0, 36));';
            team_logo = 'logos/BVBL1051.png';
            init();
            break;
        case 'BVBL1104':
            // console.log('Style:', bvbl);
            page = 'BBC Optima Tessenderlo';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgb(0, 0, 255); color: white; background-image: linear-gradient(45deg, rgb(2, 0, 36), 20%, rgb(0, 0, 255));';
            team_logo = 'logos/BVBL1104.png';
            init();
            break;
        case 'BVBL1419':
            // console.log('Style:', bvbl);
            page = 'Basket Houthalen';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgb(0, 0, 255); color: white; background-image: linear-gradient(45deg, rgb(2, 0, 36), 20%, rgb(0, 0, 255));';
            team_logo = 'logos/BVBL1419.png';
            init();
            break;
        case 'BVBL1176':
            // console.log('Style:', bvbl);
            page = 'Basket Lummen';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgb(255, 255, 0); color: white; background-image: linear-gradient(45deg, rgb(2, 0, 36), 20%, rgb(255, 255, 0));';
            team_logo = 'logos/BVBL1176.png';
            init();
            break;
        case 'BVBL1255':
            // console.log('Style:', bvbl);
            page = 'GSG Aarschot';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgb(0, 255, 0); color: white; background-image: linear-gradient(45deg, rgb(2, 0, 36), 20%, rgb(0, 255, 0));';
            team_logo = 'logos/BVBL1255.png';
            init();
            break;
        case 'BVBL1195':
            // console.log('Style:', bvbl);
            page = 'Guco Lier';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgb(0, 128, 0); color: white; background-image: linear-gradient(45deg, rgb(2, 0, 36), 20%, rgb(0, 128, 0));';
            team_logo = 'logos/BVBL1195.png';
            init();
            break;
        case 'BVBL1217':
            // console.log('Style:', bvbl);
            page = 'Hades Kiewit BBC';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgb(0, 255, 0); color: white; background-image: linear-gradient(45deg, rgb(2, 0, 36), 20%, rgb(0, 255, 0));';
            team_logo = 'logos/BVBL1217.png';
            init();
            break;
        case 'BVBL1087':
            // console.log('Style:', bvbl);
            page = 'Hasselt BT';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgb(90, 87, 87); color: white; background-image: linear-gradient(45deg, rgb(2, 0, 36), 20%, rgb(90, 87, 87));';
            team_logo = 'logos/BVBL1087.png';
            init();
            break;
        case 'BVBL1223':
            // console.log('Style:', bvbl);
            page = 'Nieuwerkerken';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgb(255, 0, 0); color: white; background-image: linear-gradient(45deg, rgb(2, 0, 36), 20%, rgb(255, 0, 0));';
            team_logo = 'logos/BVBL1223.png';
            init();
            break;
        case 'BVBL1455':
            // console.log('Style:', bvbl);
            page = 'Bree Basket';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgb(0, 0, 255); color: white; background-image: linear-gradient(45deg, rgb(2, 0, 36), 20%, rgb(0, 0, 255));';
            team_logo = 'logos/BVBL1455.png';
            init();
            break;
        case 'BVBL1458':
            // console.log('Style:', bvbl);
            page = 'Elite Academy Antwerp';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgb(0, 0, 255); color: white; background-image: linear-gradient(45deg, rgb(2, 0, 36), 20%, rgb(90, 87, 87));';
            team_logo = 'logos/BVBL1458.png';
            init();
            break;
        case 'BVBL1189':
            // console.log('Style:', bvbl);
            page = 'Oxaco BBC Boechout';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: rgb(0, 0, 255); color: white; background-image: linear-gradient(45deg, rgb(2, 0, 36), 20%, rgb(0, 255, 0));';
            team_logo = 'logos/BVBL1189.png';
            init();
            break;
        case 'BVBL1249':
            // console.log('Style:', bvbl);
            page = 'Zuiderkempen';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: red; color: white; background-image: linear-gradient(45deg, rgb(255, 0, 0), 70%, rgb(2, 0, 36));';
            team_logo = 'logos/BVBL1249.png';
            init();
            break;
        case 'BVBL1004':
            // console.log('Style:', bvbl);
            page = 'Antwerp Giants';
            localStorage.setItem('storage_page', page);
            page_style = 'background-color: red; color: white; background-image: linear-gradient(45deg, rgb(255, 0, 0), 70%, rgb(2, 0, 36));';
            team_logo = 'logos/BVBL1004.png';
            init();
            break;
        default:
            // console.log('Style: Default');
            page = 'Onbekend';
            page_style = 'background-color: white; color: black;';
            team_logo = '';
            init();
    }
    const club_naam = localStorage.getItem('storage_page');
    // console.log('Page:', club_naam);
}

function init() {
    // PAS STYLES TOE
    var club_details_container = document.getElementById('result_club_details');
    var team_logo_element = club_details_container.querySelector('#team_logo');

    // Leeg de inhoud van de #team_logo-div
    team_logo_element.innerHTML = '';

    // Maak een nieuw img-element aan voor het logo
    var logo_img = document.createElement('img');
    logo_img.src = team_logo;
    logo_img.alt = 'Club Logo';

    // Voeg het img-element toe aan de #team_logo-div
    team_logo_element.appendChild(logo_img);

    // ... (rest van je code)
    club_details_container.style.cssText = page_style;

}
