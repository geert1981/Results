import { fetchJson, fillTable, normalizeWords, $, setText } from 'https://geert1981.github.io/Results/scripts/utils.js';
// SORT & FILTERS

let result_kalender_club = [];
let array_teams_reeks_guids = [];
let array_games_all_teams = [];
let current_week_start_date = new Date();
let last_day_of_week;
let day;
let month;
let year;
var teamNaam;
var teamId;
var teamReeksId;

// START FILTER - FUNCTION GET_CURRENT_WEEK
function get_current_week() {
    // console.log('get_current_week Called');
    const today = new Date();
    const current_day_of_week = today.getDay(); // 0 = ZONDAG, 1 = MAANDAG, enz.
    // console.log('Current day of week:', current_day_of_week);

    // BEREKEN STARTDATUM HUIDIG WEEK (MAANDAG)
    const days_until_monday = current_day_of_week === 0 ? 6 : current_day_of_week - 1;
    current_week_start_date = new Date(today.setDate(today.getDate() - days_until_monday));
    
    show_week(current_week_start_date);
    fetch_data_for_current_week(current_week_start_date);
}

// FILTER - FUNCTION SHOW_WEEK
function show_week(start_date) {
    const date_range_kalender_club = $('#date_range_kalender_club');
    if (date_range_kalender_club) {

        if (isNaN(start_date.getTime())) {
            console.error('Invalid start date:', start_date);
            return;
        }
        current_week_start_date = start_date;
        last_day_of_week = new Date(start_date);
        last_day_of_week.setDate(last_day_of_week.getDate() + 6);

        if (!isNaN(last_day_of_week.getTime())) {
            const formatted_first_day = format_date(start_date);
            const formatted_last_day = format_date(last_day_of_week);
            const week_range = `${formatted_first_day} - ${formatted_last_day}`;

            setText($('#previous_button'), "&#9668;");
            setText($('#refresh_button'), "&#10227;");
            setText($('#next_button'), "&#9658;");
            setText(date_range_kalender_club, week_range);
            setText($('#date_range_kalender_club'), week_range);
            setText($('#date_range_kalender_reeks'), week_range);
            // console.log('Start date:', formatted_first_day);
            // console.log('Last day of week:', formatted_last_day);
        } else {
            console.error('Invalid last day of week:', last_day_of_week);
        }
    } else {
        console.error('Element with id "date_range_kalender_club" not found.');
    }
}

// FILTER - FUNCTION SHOW_PREVIOUS_WEEK
// FUNCTION BUTTONS - WEEK RANGE
function show_previous_week() {
    // console.log("Previous week fired ...")
    if (current_week_start_date) {
        current_week_start_date.setDate(current_week_start_date.getDate() - 7);
        show_week(current_week_start_date);
        fetch_data_for_current_week(current_week_start_date);
    } else {
        console.error('current_week_start_date is not defined');
    }
}

// FILTER - FUNCTION SHOW_CURRENT_WEEK
function show_current_week() {
    // console.log("Current week fired ...")
    get_current_week();
}

// FILTER - FUNCTION SHOW_NEXT_WEEK
function show_next_week() {
    // console.log("Next week fired ...")
    current_week_start_date.setDate(current_week_start_date.getDate() + 7);
    show_week(current_week_start_date);
    fetch_data_for_current_week(current_week_start_date);
}

// FUNCTIE OM GEGEVENS OP TE HALEN VOOR DE HUIDIGE WEEK
function fetch_data_for_current_week(start_date) {
    // Voeg hier je logica toe om gegevens op te halen voor de huidige week
    // console.log('Fetching data for the current week:', start_date);
    update_kalender_club();
    update_kalender_reeks_id();
}
// END FUNCTION BUTTONS - WEEK RANGE
// END FILTER

// FUNCTION TO FILTER GAMES FOR CURRENT WEEK
function filter_games_for_current_week(games) {
    last_day_of_week = new Date(current_week_start_date);
    last_day_of_week.setDate(last_day_of_week.getDate() + 6);
    return games.filter(game => {
        const date_parts = game.datumString.split('-');
        const game_date = new Date(`${date_parts[2]}-${date_parts[1]}-${date_parts[0]}`);
        if (!isNaN(game_date.getTime())) { // CHECK GELDIGHEID DATUM
            return game_date >= current_week_start_date && game_date <= last_day_of_week;
        }
        return false; // NEGEER ONGELDIGE DATUMS
    });
}
// END FILTER

// FUNCTION TO FORMAT DATUM ALS "DD-MM-YYYY"
function format_date(date) {
    day = date.getDate();
    month = date.getMonth() + 1; // MAANDEN BEGINNEN VANAF 0, DUS VOEG 1 TOE
    year = date.getFullYear();
    //VOEG VOORLOOP 0 TOE ALS DAG/MAAND MAAR 1 CIJFER IS
    day = (day < 10) ? "0" + day : day;
    month = (month < 10) ? "0" + month : month;
    return day + "-" + month + "-" + year;
}

// SORT FUNCTION
function compare_dates_times(a, b) {
    const date_a = new Date(a.datumString.split('-').reverse().join('-'));
    const date_b = new Date(b.datumString.split('-').reverse().join('-'));
    let time_a, time_b;
    
    // VERGELIJK DATUMS
    if (date_a < date_b) {
        return -1;
    } else if (date_a > date_b) {
        return 1;
    } else {
        // DATUMS GELIJK, VERGELIJK OP TIJD
        time_a = a.beginTijd ? parseTime(a.beginTijd) : null;
        time_b = b.beginTijd ? parseTime(b.beginTijd) : null;
    }

    // CHECK OF TIJDEN BESCHIKBAAR ZIJN
    if (time_a && time_b) {
        return time_a - time_b;
    } else if (time_a === null && time_b !== null) {
        return -1; // ALS ALLEEN TIME_A BESCHIKBAAR IS, PLAATS DEZE EERDER
    } else if (time_a !== null && time_b === null) {
        return 1; // ALS ALLEEN TIME_B BESCHIKBAAR IS, PLAATS DEZE EERDER
    } else {
        return 0; // ALS BEIDE NIET BESCHIKBAAR ZIJN, BESCHOUW ZE ALS GELIJK
    }
}

// HULPFUNCTIE OM TIJD TE PARSEN NAAR DATUMOBJECT
function parseTime(timeString) {
    // SPLIT TIJD BIJ '.' IPV ':'
    const [hours, minutes] = timeString.split('.').map(Number);
    // REFERENTIEDATUM 1 JAN 1970, MAAR STEL UREN EN MINUTEN IN
    return new Date(1970, 0, 1, hours, minutes);
}
// END SORT FUNCTION

// FILTER OP DUBBELE WAARDE IN ARRAY
function filter_uniek_op_eigenschap(array, eigenshap) {
    const gezien = new Set();
    return array.filter((item) => {
        const value = item[eigenshap];
        if (!gezien.has(value)){
            gezien.add(value);
            return true;
        }
        return false;
    });
}
// END FILTER OP DUBBELE WAARDE IN ARRAY

// FILTER LEDEN
function filter_table_leden() {
    // Gebruik let/const en $ voor DOM-selectie
    const input = $("#filter_input");
    const filter = input.value.toUpperCase();
    const table = $("#leden");
    const tbody = table.querySelector("tbody");
    const tr = tbody.getElementsByTagName("tr");
    // LOOP ALL ROWS + VERBERG OVERBODIGE
    for (let i = 0; i < tr.length; i++) {
        const tds = tr[i].getElementsByTagName("td");
        for (let j = 0; j < tds.length; j++) {
            const td = tds[j];
            if (td) {
                const txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;  // SHOW ROW BIJ OVEREENKOMST
                } else {
                    tr[i].style.display = "none";  // HIDE ROW BIJ GEEN OVEREENKOMST
                }
            }
        }
    }
}
  // END FILTER LEDEN

// Roep get_current_week aan wanneer de pagina is geladen
window.onload = function() {
    get_current_week();

};
