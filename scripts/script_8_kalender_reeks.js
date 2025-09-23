import { fetchJson, fillTable, normalizeWords, $, setText } from 'https://geert1981.github.io/Results/scripts/utils.js';
// KALENDER REEKS

async function update_kalender_reeks_id() {
    // console.log('update_kalender_reeks_id fired ...');

    // OPHALEN KALENDERS ALLE TEAMS UIT REEKS & BEWAREN IN ARRAY_GAMES_ALL_TEAMS
    let all_games = [];
    try {
        const fetch_count = array_teams_reeks_guids.length;
        const fetches = [];
        for (let teller_teams = 0; teller_teams < fetch_count; teller_teams++) {
            const team_id = array_teams_reeks_guids[teller_teams];
            const link_kalender_reeks = 'http://vblcb.wisseq.eu/VBLCB_WebService/data/TeamMatchesByGuid?teamguid=';
            const url_kalender_reeks = link_kalender_reeks + team_id;
            const requestOptions_kalender_reeks = {
                method: 'GET',
                redirect: 'follow'
            };
            fetches.push(fetchJson(url_kalender_reeks, requestOptions_kalender_reeks));
        }
        const all_results = await Promise.all(fetches);
        for (const result_kalender_reeks of all_results) {
            const filtered_games_kalender_reeks = filter_games_for_current_week(result_kalender_reeks);
            all_games.push(...filtered_games_kalender_reeks);
        }
        all_games.sort(compare_dates_times);
        const unique_all_games = filter_uniek_op_eigenschap(all_games, 'guid');
        const table_container_kalender_reeks = $(".grid_kalender_reeks table tbody");
        table_container_kalender_reeks.textContent = '';
        fillTable(table_container_kalender_reeks, unique_all_games, (game_kalender_reeks, row) => {
            const kalender_reeks_game_guid = game_kalender_reeks.guid;
            const kalender_reeks_game_id = game_kalender_reeks.wedID;
            const kalender_reeks_h_team_id = game_kalender_reeks.tTGUID;
            const kalender_reeks_h_team_name = game_kalender_reeks.tTNaam;
            const kalender_reeks_a_team_id = game_kalender_reeks.tUGUID;
            const kalender_reeks_a_team_name = game_kalender_reeks.tUNaam;
            const kalender_reeks_datum = game_kalender_reeks.datumString;
            const kalender_reeks_tijd = game_kalender_reeks.beginTijd;
            const kalender_reeks_result = game_kalender_reeks.uitslag;
            const kalender_reeks_plaats = game_kalender_reeks.accNaam;
            const kalender_reeks_reeks_id = game_kalender_reeks.pouleGUID;
            const kalender_reeks_reeks_name = game_kalender_reeks.pouleNaam;
            const gemapte_club_h_naam_kalender_reeks = vervang_club_naam(kalender_reeks_h_team_name);
            const gemapte_club_a_naam_kalender_reeks = vervang_club_naam(kalender_reeks_a_team_name);
            const gemapte_reeks_naam_kalender_reeks = vervang_deel_van_naam(kalender_reeks_reeks_name);
            const gemapte_reeks_naam_kalender_reeks_oefen = vervang_string(gemapte_reeks_naam_kalender_reeks, te_vervangen_woord, vervangen_woord);
            const base_url_team = 'https://vblweb.wisseq.eu/Home/TeamDetail?teamguid=';
            const base_url_game = 'https://app.basketballstatsvlaanderen.be/clubs/' + bvbl + "/" + kalender_reeks_h_team_id + "/";
            const base_url_poule = 'https://vblweb.wisseq.eu/Home/Poule?Pouleguid=';
            const link_game = document.createElement('a');
            // ...rest van de cellen en links...
        });
    } catch (error) {
        console.log('error', error);
    }
        const link_h_team = document.createElement('a');
        const link_a_team = document.createElement('a');
        const link_poule = document.createElement('a');

        // Open links in een nieuw tabblad
        link_game.target = '_blank';
        link_h_team.target = '_blank';
        link_a_team.target = '_blank';
        link_poule.target = '_blank';

        link_game.href = base_url_game + kalender_reeks_game_guid;
        link_h_team.href = base_url_team + kalender_reeks_h_team_id;
        link_a_team.href = base_url_team + kalender_reeks_a_team_id;
        link_poule.href = base_url_poule + kalender_reeks_reeks_id;

        link_game.textContent = kalender_reeks_result;
        link_h_team.textContent = gemapte_club_h_naam_kalender_reeks;
        link_a_team.textContent = gemapte_club_a_naam_kalender_reeks;
        link_poule.textContent = gemapte_reeks_naam_kalender_reeks_oefen;
        
        // CHECK VARIABELEN
        //  console.log('Check variabelen:', kalender_reeks_game_guid, "-", kalender_reeks_game_id, "-", kalender_reeks_h_team_id, "-", kalender_reeks_h_team_name, "-", kalender_reeks_a_team_id, "-", kalender_reeks_a_team_name, "-", kalender_reeks_datum, "-", kalender_reeks_tijd, "-", kalender_reeks_result, "-", kalender_reeks_plaats, "-", kalender_reeks_reeks_id, "-", kalender_reeks_reeks_name);
        // PUT VAR's IN CELL's
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);
        const cell7 = row.insertCell(6);

        cell1.textContent = kalender_reeks_datum
        cell2.textContent = kalender_reeks_tijd;
        cell3.innerHTML = '';
        cell3.appendChild(link_h_team);
        cell4.innerHTML = '';
        cell4.appendChild(link_game);
        cell5.innerHTML = '';
        cell5.appendChild(link_a_team);
        cell6.textContent = kalender_reeks_plaats;
        cell7.innerHTML = '';
        cell7.appendChild(link_poule);

        // Voeg het ID toe aan cell6 en cell7
        cell6.id = 'hide_small'; // Voeg ID toe aan cell6
        cell7.id = 'hide_small'; // Voeg ID toe aan cell7
        document.querySelector(".grid_kalender_reeks #title_kalender_reeks").innerHTML = kalender_reeks_reeks_name;
    }
 

// document.addEventListener('DOMContentLoaded', update_kalender_reeks_id());
