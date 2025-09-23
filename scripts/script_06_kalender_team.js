// KALENDER TEAM
let bvbl_old_2;
let club_teamId_default;

update_kalender_team_id();

document.addEventListener('DOMContentLoaded', function () {
    update_kalender_team();
});


async function update_kalender_team() {
    const def_team_naam = localStorage.getItem('storage_def_team_naam');
    const team_naam = localStorage.getItem('storage_team_naam');
    const teamId = localStorage.getItem('storage_team_id');

    // console.log("Team ID:", teamId, "& Default Team ID:", club_teamId_default);
    if (bvbl_old_2 == null) {
        team_id = club_teamId_default;
        team_naam_kalender = def_team_naam;
    } else if (bvbl_old_2 != bvbl) {
        team_id = club_teamId_default;
        team_naam_kalender = def_team_naam;
    } else if(bvbl_old_2 == bvbl) {
        team_id = teamId;
        team_naam_kalender = team_naam;
    }
    bvbl_old_2 = bvbl;

    // GET API
    var link_kalender_team = 'http://vblcb.wisseq.eu/VBLCB_WebService/data/TeamMatchesByGuid?teamguid=';
    var url_kalender_team = link_kalender_team + team_id;
    // console.log('URL team:', url_kalender_team);

    const requestOptions_kalender_team = {
        method: 'GET',
        redirect: 'follow'
    };
     
    fetch(url_kalender_team, requestOptions_kalender_team)
        .then(response_kalender_team => response_kalender_team.json())
        .then(result_kalender_team => {

            // STORAGE ARRAY FOR ICAL
            localStorage.setItem('storage_result_kalender_team', JSON.stringify(result_kalender_team));  
            
            // CALL FUNCTION FROM HERE FOR TESTING
            // ical(); 
            
            document.querySelector(".grid_kalender_team #title_kalender_team").innerHTML = team_naam_kalender;
            // CALL SORT FUNCTION
            result_kalender_team.sort(compare_dates_times);
            // mapping mss hier plaatsen

            // CREATE TABLE
            const table_container_kalender_team = document.querySelector(".grid_kalender_team table tbody");
            table_container_kalender_team.textContent = '';  // EMPTY CONTENT TBODY
            for (const game_kalender_team of result_kalender_team) {
                // console.log('Adding game to table:', game);
                const row = table_container_kalender_team.insertRow();
                // PUT DATA IN VAR's
                const kalender_team_game_guid = game_kalender_team.guid;
                const kalender_team_game_id = game_kalender_team.wedID;
                const kalender_team_h_team_id = game_kalender_team.tTGUID;
                const kalender_team_h_team_name = game_kalender_team.tTNaam;
                const kalender_team_a_team_id = game_kalender_team.tUGUID;
                const kalender_team_a_team_name = game_kalender_team.tUNaam;
                const kalender_team_datum = game_kalender_team.datumString;
                const kalender_team_tijd = game_kalender_team.beginTijd;
                const kalender_team_result = game_kalender_team.uitslag;
                const kalender_team_plaats = game_kalender_team.accNaam;
                const kalender_team_reeks_id = game_kalender_team.pouleGUID;
                const kalender_team_reeks_name = game_kalender_team.pouleNaam;
                // CALL MAPPINGS_CLUB
                const gemapte_club_h_naam_kalender_team = vervang_club_naam(kalender_team_h_team_name);
                const gemapte_club_a_naam_kalender_team = vervang_club_naam(kalender_team_a_team_name);
                // CALL MAPPINGS_REEKS
                const gemapte_reeks_naam_kalender_team = vervang_deel_van_naam(kalender_team_reeks_name);
                const gemapte_reeks_naam_kalender_team_oefen = vervang_string(gemapte_reeks_naam_kalender_team, te_vervangen_woord, vervangen_woord);
                // console.log('Reeks niet gemapt:', kalender_team_reeks_name);
                // console.log('Reeks gemapt:', gemapte_reeks_naam_kalender_team);
                // console.log('Reeks gemapt oefen:', gemapte_reeks_naam_kalender_team_oefen);

                // DEFINIEER BASIS URL
                const base_url_team = 'https://vblweb.wisseq.eu/Home/TeamDetail?teamguid=';
                // const base_url_game = 'https://vblweb.wisseq.eu/Home/MatchDetail?wedguid=';
                const base_url_game = 'https://app.basketballstatsvlaanderen.be/clubs/' + bvbl + "/" + kalender_team_h_team_id + "/";
                const base_url_poule = 'https://vblweb.wisseq.eu/Home/Poule?Pouleguid=';

                // CREATE LINK
                const link_game = document.createElement('a');
                const link_h_team = document.createElement('a');
                const link_a_team = document.createElement('a');
                const link_poule = document.createElement('a');

                link_game.href = base_url_game + kalender_team_game_guid;
                link_h_team.href = base_url_team + kalender_team_h_team_id;
                link_a_team.href = base_url_team + kalender_team_a_team_id;
                link_poule.href = base_url_poule + kalender_team_reeks_id;

                // Open links in een nieuw tabblad
                link_game.target = '_blank';
                link_h_team.target = '_blank';
                link_a_team.target = '_blank';
                link_poule.target = '_blank';

                // Stel de onclick-eigenschap van de link in op de gewenste functie
                // link_game.onclick = stats_team;

                link_game.innerHTML = kalender_team_result;
                link_h_team.innerHTML = gemapte_club_h_naam_kalender_team;
                link_a_team.innerHTML = gemapte_club_a_naam_kalender_team;
                // link_poule.innerHTML = gemapte_reeks_naam_kalender_team;
                link_poule.innerHTML = gemapte_reeks_naam_kalender_team_oefen;

                // CHECK VARIABELEN
                // console.log('Check variabelen:', kalender_team_game_guid, "-", kalender_team_game_id, "-", kalender_team_h_team_id, "-", kalender_team_h_team_name, "-", kalender_team_a_team_id, "-", kalender_team_a_team_name, "-", kalender_team_datum, "-", kalender_team_tijd, "-", kalender_team_result, "-", kalender_team_plaats, "-", kalender_team_reeks_id, "-", kalender_team_reeks_name);
                // PUT VAR's IN CELL's
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);
                const cell5 = row.insertCell(4);
                const cell6 = row.insertCell(5);
                const cell7 = row.insertCell(6);

                cell1.innerHTML = kalender_team_datum;
                cell2.innerHTML = kalender_team_tijd;
                cell3.innerHTML = '';
                cell3.appendChild(link_h_team);
                cell4.innerHTML = '';
                cell4.appendChild(link_game);
                cell5.innerHTML = '';
                cell5.appendChild(link_a_team);
                cell6.innerHTML = kalender_team_plaats;
                cell7.innerHTML = '';
                cell7.appendChild(link_poule);

                // Voeg het ID toe aan cell6 en cell7
                cell6.id = 'hide_small'; // Voeg ID toe aan cell6
                cell7.id = 'hide_small'; // Voeg ID toe aan cell7
            }
        })
        .catch(error => console.log('error', error));
    // END GET API

}

function update_kalender_team_id() {
    if (teamId == null) {
        // console.log('BVBL:', bvbl);
        var link_club_details = 'http://vblcb.wisseq.eu/VBLCB_WebService/data/OrgDetailByGuid?issguid=';
        var url_club_details = link_club_details + bvbl;
        var requestOptions_club_details = {
            method: 'GET',
            redirect: 'follow'
        };  
        fetch(url_club_details, requestOptions_club_details)
        .then(response_club_details => response_club_details.json())
        .then(result_club_details => {
            // SET DEFAULT TEAM & REEKS
            club_teamNm_default = result_club_details[0].teams[0].naam;
            club_teamId_default = result_club_details[0].teams[0].guid;
            club_reeks_default = result_club_details[0].teams[0].poules[0].guid;
            // console.log('Club gewijzigd:', club_teamNm_default, club_teamId_default, club_reeks_default);
            update_kalender_team();
        })
    } else if (teamId != null) {
        // console.log('TeamRks is niet leeg');
        update_kalender_team();
    }
}