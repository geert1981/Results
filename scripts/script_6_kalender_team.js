import { fetchJson, fillTable, normalizeWords, $, setText } from './utils.js';
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
    let team_id, team_naam_kalender;
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
    const link_kalender_team = 'http://vblcb.wisseq.eu/VBLCB_WebService/data/TeamMatchesByGuid?teamguid=';
    const url_kalender_team = link_kalender_team + team_id;
    const requestOptions_kalender_team = {
        method: 'GET',
        redirect: 'follow'
    };
    try {
        const result_kalender_team = await fetchJson(url_kalender_team, requestOptions_kalender_team);
        if (!result_kalender_team) return;

        // STORAGE ARRAY FOR ICAL
        localStorage.setItem('storage_result_kalender_team', JSON.stringify(result_kalender_team));

    setText($(".grid_kalender_team #title_kalender_team"), team_naam_kalender);
    result_kalender_team.sort(compare_dates_times);

    const table_container_kalender_team = $(".grid_kalender_team table tbody");
    table_container_kalender_team.textContent = '';
    fillTable(table_container_kalender_team, result_kalender_team, (game_kalender_team, row) => {
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
            const gemapte_club_h_naam_kalender_team = vervang_club_naam(kalender_team_h_team_name);
            const gemapte_club_a_naam_kalender_team = vervang_club_naam(kalender_team_a_team_name);
            const gemapte_reeks_naam_kalender_team = vervang_deel_van_naam(kalender_team_reeks_name);
            const gemapte_reeks_naam_kalender_team_oefen = vervang_string(gemapte_reeks_naam_kalender_team, te_vervangen_woord, vervangen_woord);
            const base_url_team = 'https://vblweb.wisseq.eu/Home/TeamDetail?teamguid=';
            const base_url_game = 'https://app.basketballstatsvlaanderen.be/clubs/' + bvbl + "/" + kalender_team_h_team_id + "/";
            const base_url_poule = 'https://vblweb.wisseq.eu/Home/Poule?Pouleguid=';
            const link_game = document.createElement('a');
            const link_h_team = document.createElement('a');
            const link_a_team = document.createElement('a');
            const link_poule = document.createElement('a');
            link_game.href = base_url_game + kalender_team_game_guid;
            link_h_team.href = base_url_team + kalender_team_h_team_id;
            link_a_team.href = base_url_team + kalender_team_a_team_id;
            link_poule.href = base_url_poule + kalender_team_reeks_id;
            link_game.target = '_blank';
            link_h_team.target = '_blank';
            link_a_team.target = '_blank';
            link_poule.target = '_blank';
            link_game.innerHTML = kalender_team_result;
            link_h_team.innerHTML = gemapte_club_h_naam_kalender_team;
            link_a_team.innerHTML = gemapte_club_a_naam_kalender_team;
            link_poule.innerHTML = gemapte_reeks_naam_kalender_team_oefen;
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
            cell6.id = 'hide_small';
            cell7.id = 'hide_small';
        });
    } catch (error) {
        console.log('error', error);
    }

    // Verwijder dubbele oude fetch/table code hieronder:
    // ...existing code...

    // einde functie
}