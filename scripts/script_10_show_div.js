// FUNCTIE SHOW_DIV
function show_div(divId) {
    // VERBERG DIV's
    document.getElementById('klassement').style.display = 'none';
    document.getElementById('kalender_team').style.display = 'none';
    document.getElementById('kalender_reeks').style.display = 'none';
    document.getElementById('kalender_club').style.display = 'none';
    document.getElementById('leden').style.display = 'none';
    document.getElementById('bestuur').style.display = 'none';
    document.getElementById('sporthal').style.display = 'none';

    // TOON GESELECTEERDE
    document.getElementById(divId).style.display = 'block';
}

// function button_kalender_reeks() {
//     console.log('button_kalender_reeks fired ...');
//     show_div('kalender_reeks');
//     show_current_week();
//     update_kalender_reeks_id;
// }