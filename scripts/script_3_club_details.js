import { fetchJson, fillTable, normalizeWords, $, setText } from './utils.js';
// CLUB DETAILS
let team_naam;
let team_id;
let team_reeks_id;
let team_reeks_naam;
let club_naam;


let club_reeks_default;
let club_team_default_id;
let club_team_default_naam;

var filtered_result;

let reeks_naam_filtered;
let reeks_id_filtered;
let team_naam_filtered;
let team_id_filtered;

function generate_team_buttons(team_naam, team_id, team_reeks_id, team_reeks_naam, club_naam, reeks_naam_filtered) {
    // console.log('Generatie team buttons functie afgevuurd ...')

    const laatste_vijf_karakters = team_naam.slice(-5);

    var button_team = document.createElement("button");
    button_team.textContent = laatste_vijf_karakters;

    // ADD ONCLICK-HANDLER
    button_team.addEventListener("click", function() {
        // UITGEVOERDE LOGICA NA KLIKKEN VAN BUTTON TEAM
        // console.log("Team button clicked:", team_naam, "-", team_id, "-", team_reeks_id, "-", team_reeks_naam, "-", club_naam, "-", bvbl);
        change_team(team_naam, team_id, team_reeks_id, team_reeks_naam, club_naam, reeks_naam_filtered);
    });
    return button_team;
}

async function update_club_details() {
    // RESET DE INHOUD VAN stamnummer_site_element
    const stamnummer_site_element = $("#stamnummer_site");
    setText(stamnummer_site_element, '');

    // GET API
    let secretaris;
    let secretaris_tel;
    let secretaris_gsm;
    let secretaris_mail;

    const link_club_details = 'http://vblcb.wisseq.eu/VBLCB_WebService/data/OrgDetailByGuid?issguid=';
    const url_club_details = link_club_details + bvbl;
    const requestOptions_club_details = {
        method: 'GET',
        redirect: 'follow'
    };
    try {
        const result_club_details = await fetchJson(url_club_details, requestOptions_club_details);
        const club_naam = result_club_details[0].naam;
        const club_id = result_club_details[0].guid;
        const club_stamNr = result_club_details[0].stamNr;
        const club_website = result_club_details[0].website;
        const club_adres_straat = result_club_details[0].adres.straat;
        const club_adres_nr = result_club_details[0].adres.huisNr;
        const club_adres_postcode = result_club_details[0].adres.postcode;
        const club_adres_plaats = result_club_details[0].adres.plaats;
        const club_email = result_club_details[0].email;

        // BUTTONS SPORTHALLEN
        const aantal_sporthallen = result_club_details[0].accomms.length;
        const sporthallen_container = $("#sporthallen_buttons");
        setText(sporthallen_container, ''); // EMPTY CONTAINER BEFORE ADDING BUTTONS
        // ...rest van de functie...
    } catch (error) {
        console.log('error', error);
    }

            for (let t = 0; t < aantal_sporthallen; t++) {
                var club_accomms = result_club_details[0].accomms[t].naam; 
                var club_accomms_straat = result_club_details[0].accomms[t].adres.straat;
                var club_accomms_nr = result_club_details[0].accomms[t].adres.huisNr;
                var club_accomms_postcode = result_club_details[0].accomms[t].adres.postcode;
                var club_accomms_plaats = result_club_details[0].accomms[t].adres.plaats;
        
                // CREATE BUTTON FOR EACH SPORTHAL
                var button = document.createElement("button");
                button.innerHTML = club_accomms;

                // CLOSURE OM VARIABELEN VAST TE LEGGEN
                (function (accomm, straat, nr, postcode, plaats) {
                    button.onclick = function() {
                        // DISPLAY INFO FOR CLICKED SPORTHAL
                        document.getElementById('sporthal_naam').innerHTML = "<h7><b>" + accomm + "</b></h7>";

                        // GOOGLE MAPS IFRAME
                        var google_maps_adres = postcode + "+" + plaats + "+" + straat + "+" + nr + "+,+Belgie";
                        var google_maps_api_key = "AIzaSyAKvedS92uNSiu31byzY18gFOOSMyxuNFA";
                        var google_maps_url = "https://www.google.com/maps/embed/v1/place?q=" + google_maps_adres + "&key=" + google_maps_api_key;
                        var google_maps_iframe = document.getElementById("google_maps_frame");
                        google_maps_iframe.src = google_maps_url;
                    };
                })(club_accomms, club_accomms_straat, club_accomms_nr, club_accomms_postcode, club_accomms_plaats);

                // APPEND BUTTON TO THE CONTAINER
                sporthallen_container.appendChild(button);
            }
            // Display information for the first sporthal by default
            document.getElementById('sporthal_naam').innerHTML = "<h7><b>" + result_club_details[0].accomms[0].naam + "</b></h7>";

            // GOOGLE MAPS IFRAME FOR DEFAULT VALUE
            var google_maps_adres_default = result_club_details[0].accomms[0].adres.postcode + "+" +
                result_club_details[0].accomms[0].adres.plaats + "+" +
                result_club_details[0].accomms[0].adres.straat + "+" +
                result_club_details[0].accomms[0].adres.huisNr + "+,+Belgie";

            var google_maps_api_key = "AIzaSyAKvedS92uNSiu31byzY18gFOOSMyxuNFA";
            var google_maps_url_default = "https://www.google.com/maps/embed/v1/place?q=" + google_maps_adres_default + "&key=" + google_maps_api_key;
            var google_maps_iframe_default = document.getElementById("google_maps_frame");
            google_maps_iframe_default.src = google_maps_url_default;

            // BESTUUR
            for (var c = 0; c < result_club_details[0].bestuur.length; c++){
                if (result_club_details[0].bestuur.length != 4) {
                    document.getElementById('ondervoorzitter_title').innerHTML = "";
                    document.getElementById('ondervoorzitter_naam').innerHTML = "";
                    document.getElementById('ondervoorzitter_tel').innerHTML = "";
                    document.getElementById('ondervoorzitter_gsm').innerHTML = "";
                    document.getElementById('ondervoorzitter_email').innerHTML = "";
                }
                
                var bestuur_naam = result_club_details[0].bestuur[c].naam;
                var bestuur_kenmerk = result_club_details[0].bestuur[c].kenmerk;
                if (result_club_details[0].bestuur[c].telefoon != null) {
                    var bestuur_telefoon = result_club_details[0].bestuur[c].telefoon;
                } else {
                    var bestuur_telefoon = "-";
                }
                
                if (result_club_details[0].bestuur[c].mobiel != null) {
                    var bestuur_gsm = result_club_details[0].bestuur[c].mobiel;
                } else {
                    var bestuur_gsm = "-";
                }
                var bestuur_email = result_club_details[0].bestuur[c].email;
                
                if (bestuur_kenmerk == "Voorzitter") {
                    let voorzitter = bestuur_naam;
                    let voorzitter_tel = bestuur_telefoon;
                    let voorzitter_gsm = bestuur_gsm;
                    let voorzitter_mail = bestuur_email;
                    document.getElementById('voorzitter_title').innerHTML = "<h7><b>Voorzitter</b></h7>";
                    document.getElementById('voorzitter_naam').innerHTML = "<h7>" + voorzitter + "</h7>";
                    document.getElementById('voorzitter_tel').innerHTML = "<h7>" + voorzitter_tel + "</h7>";
                    document.getElementById('voorzitter_gsm').innerHTML = "<h7>" + voorzitter_gsm + "</h7>";
                    document.getElementById('voorzitter_email').innerHTML = "<h7>" + voorzitter_mail + "</h7>";
                } else if (bestuur_kenmerk == "Secretaris") {
                    secretaris = bestuur_naam;
                    secretaris_tel = bestuur_telefoon;
                    secretaris_gsm = bestuur_gsm;
                    secretaris_mail = bestuur_email;
                    document.getElementById('secretaris_title').innerHTML = "<h7><b>Secretaris</b></h7>";
                    document.getElementById('secretaris_naam').innerHTML = "<h7>" + secretaris + "</h7>";
                    document.getElementById('secretaris_tel').innerHTML = "<h7>" + secretaris_tel + "</h7>";
                    document.getElementById('secretaris_gsm').innerHTML = "<h7>" + secretaris_gsm + "</h7>";
                    document.getElementById('secretaris_email').innerHTML = "<h7>" + secretaris_mail + "</h7>";
                } else if (bestuur_kenmerk == "Penningmeester") {
                    let penningmeester = bestuur_naam;
                    let penningmeester_tel = bestuur_telefoon;
                    let penningmeester_gsm = bestuur_gsm;
                    let penningmeester_mail = bestuur_email;
                    document.getElementById('penningmeester_title').innerHTML = "<h7><b>Penningmeester</b></h7>";
                    document.getElementById('penningmeester_naam').innerHTML = "<h7>" + penningmeester + "</h7>";
                    document.getElementById('penningmeester_tel').innerHTML = "<h7>" + penningmeester_tel + "</h7>";
                    document.getElementById('penningmeester_gsm').innerHTML = "<h7>" + penningmeester_gsm + "</h7>";
                    document.getElementById('penningmeester_email').innerHTML = "<h7>" + penningmeester_mail + "</h7>";
                } else if (bestuur_kenmerk == "Ondervoorzitter") {
                    let ondervoorzitter = bestuur_naam;
                    let ondervoorzitter_tel = bestuur_telefoon;
                    let ondervoorzitter_gsm = bestuur_gsm;
                    let ondervoorzitter_mail = bestuur_email;
                    document.getElementById('ondervoorzitter_title').innerHTML = "<h7><b>Ondervoorzitter</b></h7>";
                    document.getElementById('ondervoorzitter_naam').innerHTML = "<h7>" + ondervoorzitter + "</h7>";
                    document.getElementById('ondervoorzitter_tel').innerHTML = "<h7>" + ondervoorzitter_tel + "</h7>";
                    document.getElementById('ondervoorzitter_gsm').innerHTML = "<h7>" + ondervoorzitter_gsm + "</h7>";
                    document.getElementById('ondervoorzitter_email').innerHTML = "<h7>" + ondervoorzitter_mail + "</h7>";
                } 
            }
            
            // CHECK IF TEAMS IS NOG EMPTY
            if (result_club_details[0].teams && result_club_details[0].teams.length > 0) {
                var link_team_container = document.getElementById('team_buttons_content');

                // VERWIJDER ALLE BESTAANDE KNOPPEN
                link_team_container.innerHTML = "";

                // VOEG TEKST TOE
                // link_team_container.innerHTML += "<h3>Teams</h3>";

                var details = result_club_details[0];
                // CREATE EMPTY ARRAY TO FILTER ON REEKSEN
                var reeksen_teams_club = [];
                for (var teller = 0; teller < details.teams.length; teller++) {
                    // CHECK IF NAME EXISTS
                    if (details.teams[teller].naam) {
                        team_naam = details.teams[teller].naam;
                        team_id = details.teams[teller].guid;
                        team_naam = details.teams[teller].naam;
                        team_reeks_id = details.teams[teller].poules[0].guid;
                        team_reeks_naam = details.teams[teller].poules[0].naam;
                        var team_button = generate_team_buttons(team_naam, team_id, team_reeks_id, team_reeks_naam, club_naam, reeks_naam_filtered);
                        link_team_container.appendChild(team_button);
                
                       // CHECK REEKSEN BEKER
                        if (details.teams[teller].poules && details.teams[teller].poules.length > 0) {                            
                            for (var t = 0; t < details.teams[teller].poules.length; t++) {
                                var team_reeks_naam_final = details.teams[teller].poules[t].naam;
                                var team_reeks_id_final = details.teams[teller].poules[t].guid;
                                // console.log(team_reeks_id_final, "-", team_reeks_naam_final);
                                // PUT ALL REEKSEN OF EACH TEAM TO ARRAY
                                reeksen_teams_club.push({
                                    team_id: team_id,
                                    team_naam: team_naam,
                                    reeks_id: team_reeks_id_final,
                                    reeks_naam: team_reeks_naam_final
                                });
                            }
                        }
                    }
                }
                // FILTER ALLE BEKER & OEFEN REEKSEN
                var no_beker_oefen = reeksen_teams_club.filter(function(team){
                    return !team.reeks_naam.includes("Beker") && !team.reeks_naam.includes("OEFEN");
                });

                for (var i = 0; i < no_beker_oefen.length; i++){
                    // console.log(no_beker_oefen[i].team_naam, " - ", no_beker_oefen[i].reeks_id, " - ", no_beker_oefen[i].reeks_naam);
                }
                // Teller om bij te houden hoe vaak elke teamnaam voorkomt
                var team_count = {};

                // Loop door de array en tel de teamnamen
                no_beker_oefen.forEach(function(team){
                    var teamNaam = team.team_naam;
                    team_count[teamNaam] = (team_count[teamNaam] || 0) + 1;
                });

                // Filter op basis van de telling en de reeksnaam
                filtered_result = no_beker_oefen.filter(function(team){
                    var teamNaam = team.team_naam;
                    return (team_count[teamNaam] > 1) && (team.reeks_naam.includes("Play") || team.reeks_naam.includes("R2"));
                });

                // Voeg teams toe die slechts één keer voorkomen zonder filter toe te passen
                filtered_result = filtered_result.concat(no_beker_oefen.filter(function(team){
                    var teamNaam = team.team_naam;
                    return team_count[teamNaam] === 1;
                }));

                // CHECK ARRAY FILTERED_RESULT
                // console.log(filtered_result);

                for (var i = 0; i < filtered_result.length; i++){
                    reeks_naam_filtered = filtered_result[i].reeks_naam;
                    reeks_id_filtered = filtered_result[i].reeks_id;
                    team_naam_filtered = filtered_result[i].team_naam;
                    team_id_filtered = filtered_result[i].team_id;
                    
                    if (team_naam_filtered.includes('HSE A')){
                        // console.log(team_naam_filtered, "-", reeks_id_filtered, "-", reeks_naam_filtered, "-", team_id_filtered);
                        localStorage.setItem('club_default_reeks_id', reeks_id_filtered);
                        localStorage.setItem('club_default_reeks_naam', reeks_naam_filtered);
                        localStorage.setItem('club_default_team_naam', team_naam_filtered);
                        localStorage.setItem('club_default_team_id', team_id_filtered);
                        update_klassement();
                        break;
                    } else if (!team_naam_filtered.includes('HSE A') && team_naam_filtered.includes('HSE B')){
                        // console.log(team_naam_filtered, "-", reeks_id_filtered, "-", reeks_naam_filtered, "-", team_id_filtered);
                        localStorage.setItem('club_default_reeks_id', reeks_id_filtered);
                        localStorage.setItem('club_default_reeks_naam', reeks_naam_filtered);
                        localStorage.setItem('club_default_team_naam', team_naam_filtered);
                        localStorage.setItem('club_default_team_id', team_id_filtered);
                        update_klassement();
                        break;
                    } else if (!team_naam_filtered.includes('HSE A') && !team_naam_filtered.includes('HSE B') && team_naam_filtered.includes('DSE A')) {
                        // console.log(team_naam_filtered, "-", reeks_id_filtered, "-", reeks_naam_filtered, "-", team_id_filtered);
                        localStorage.setItem('club_default_reeks_id', reeks_id_filtered);
                        localStorage.setItem('club_default_reeks_naam', reeks_naam_filtered);
                        localStorage.setItem('club_default_team_naam', team_naam_filtered);
                        localStorage.setItem('club_default_team_id', team_id_filtered);
                        update_klassement();
                        break;
                    }
                }
            }
            
            // SET DEFAULT TEAM & REEKS
            club_team_default_id = result_club_details[0].teams[0].guid;
            // club_team_default_name = result_club_details[0].teams[0].naam;
            // club_reeks_default = result_club_details[0].teams[0].poules[0].guid;
            // localStorage.setItem('storage_def_team', club_team_default_id);
            // localStorage.setItem('storage_def_reeks', club_reeks_default);
            // localStorage.setItem('storage_def_team_naam', club_team_default_name);
            // CHECK ARRAY FILTERED_RESULT
            for (var i = 0; i < filtered_result.length; i++){
                reeks_naam_filtered = filtered_result[i].reeks_naam;
                reeks_id_filtered = filtered_result[i].reeks_id;
                team_naam_filtered = filtered_result[i].naam;
                // SHOW REEKS OF SELECTED TEAM
                if (team_naam_filtered == team_naam){
                    // console.log(team_naam_filtered, "-", reeks_id_filtered, "-", reeks_naam_filtered);
                    // localStorage.setItem('club_reeks_default', reeks_id_filtered);
                    // localStorage.setItem('club_team_default_name', reeks_naam_filtered);
                }
            }           
            // CREATE SITE LINK
            stamnummer_site_element = document.getElementById('stamnummer_site');

            // CREATE SPAN ELEMENT VOOR STAMNUMMER
            var stamnummer_tekst_element = document.createElement('span');
            
            // CREATE LINK (a-element)
            var website_link = document.createElement('a');

            // ADD ELEMENTEN IN DE JUISTE VOLGORDE
            stamnummer_site_element.appendChild(stamnummer_tekst_element);
            stamnummer_site_element.appendChild(website_link); // ADD LINK TO STAMNUMMER_SITE_ELEMENT

            // SET TEXT + URL FOR LINK
            website_link.innerHTML = "<h7>" + club_website + "</h7>";
            website_link.href = 'https://' + club_website;
            website_link.target = "_blank"; // OPEN IN NIEUW TABBLAD

            document.getElementById('clubnaam').innerHTML = club_naam;
            stamnummer_tekst_element.innerHTML = "<h7>Stamnummer: " + club_stamNr + " - </h7>";
            document.getElementById('adres').innerHTML = "<h7>Postadres: " + club_adres_straat + " " + club_adres_nr + ", " + club_adres_postcode + " " + club_adres_plaats + "</h7>";
            document.getElementById('secretaris').innerHTML = "<h7>Secretaris: " + secretaris + "  <i class='fa-solid fa-phone'></i> " + secretaris_tel + "  <i class='fa-solid fa-mobile'></i> " + secretaris_gsm + "  <i class='fa-solid fa-envelope'></i> " + secretaris_mail + "</h7>";
    // END GET API
}
document.addEventListener('DOMContentLoaded', update_club_details);
// console.log('Call update club details');




// DEZE FUNCTIONS UITVOEREN BIJ KLIK OP CHANGE TEAM BUTTON
async function change_team(team_naam, team_id, team_reeks_id, team_reeks_naam, club_naam, reeks_naam_filtered) {
    // console.log('Change team functie afgevuurd ...')
    // console.log(team_naam, "-", team_id);

    // CHECK ARRAY FILTERED_RESULT
    // console.log(filtered_result);
    for (var i = 0; i < filtered_result.length; i++){
        reeks_naam_filtered = filtered_result[i].reeks_naam;
        reeks_id_filtered = filtered_result[i].reeks_id;
        team_naam_filtered = filtered_result[i].team_naam;
        team_id_filtered = filtered_result[i].team_id;
        // SHOW REEKS OF SELECTED TEAM
        if (team_naam_filtered == team_naam){
            console.log(team_naam_filtered, "-", reeks_id_filtered, "-", reeks_naam_filtered);
            localStorage.setItem('storage_team_reeks_id', reeks_id_filtered);
            localStorage.setItem('storage_team_reeks_naam', reeks_naam_filtered);
        }
    }
    localStorage.setItem('storage_team_naam', team_naam);
    localStorage.setItem('storage_team_id', team_id);
    localStorage.setItem('storage_club_naam', club_naam);
    // console.log(localStorage.getItem('storage_team_naam'), "-", localStorage.getItem('storage_team_id'), "-", localStorage.getItem('storage_club_naam'), "-", localStorage.getItem('storage_team_reeks_id'), "-", localStorage.getItem('storage_team_reeks_naam'));
    // var def_reeks = localStorage.getItem('club_reeks_default');
    // console.log(def_reeks);
    
    // NEW 31/12/2023
    await update_page();
    // console.log('Call update page');
    update_club_details();
    // console.log('Call update_club_details ... Change team');
    update_kalender_club();
    // console.log('Call update kalender club');
    update_leden();
    // console.log('Call update leden');
    update_kalender_team_id();
    // console.log('Call update_kalender_team_id');
    update_klassement_reeks_id();
    // console.log('Call update klassement');
}
document.addEventListener('DOMContentLoaded', update_club_details);
document.addEventListener('DOMContentLoaded', change_team(team_naam, team_id, team_reeks_id, team_reeks_naam, club_naam, reeks_naam_filtered));