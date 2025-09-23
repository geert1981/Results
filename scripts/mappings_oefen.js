
// START REPLACE NAMES
const te_vervangen_woord = ["OEFEN"];      
const vervangen_woord = ["Oefenwedstrijd"];   
const vervangen_woord_banner = ["OEFEN"];
// END REPLACE NAMES

// KALENDER TEAM
function vervang_string(gemapte_reeks_naam_kalender_team, te_vervangen_woord, vervangen_woord) {
    if (gemapte_reeks_naam_kalender_team.includes(te_vervangen_woord)) {
        return vervangen_woord;
    } else {
        return gemapte_reeks_naam_kalender_team;
    }
}

// KALENDER REEKS
function vervang_string(gemapte_reeks_naam_kalender_reeks, te_vervangen_woord, vervangen_woord) {
    if (gemapte_reeks_naam_kalender_reeks.includes(te_vervangen_woord)) {
        return vervangen_woord;
    } else {
        return gemapte_reeks_naam_kalender_reeks;
    }
}

// KALENDER CLUB
function vervang_string(gemapte_reeks_naam_kalender_club, te_vervangen_woord, vervangen_woord) {
    if (gemapte_reeks_naam_kalender_club.includes(te_vervangen_woord)) {
        return vervangen_woord;
    } else {
        return gemapte_reeks_naam_kalender_club;
    }
}

// KALENDER BANNER
function vervang_string(gemapte_reeks_naam_kalender_banner, te_vervangen_woord, vervangen_woord_banner) {
    if (gemapte_reeks_naam_kalender_banner.includes(te_vervangen_woord)) {
        return vervangen_woord_banner;
    } else {
        return gemapte_reeks_naam_kalender_banner;
    }
}