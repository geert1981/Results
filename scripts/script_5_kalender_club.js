import { fetchJson, fillTable, normalizeWords, $, setText } from './utils.js';
// KALENDER CLUB

function update_kalender_club() {
    const club_naam = localStorage.getItem('storage_page');
    // console.log('Page:', club_naam);

    let link_kalender_club = 'http://vblcb.wisseq.eu/VBLCB_WebService/data/OrgMatchesByGuid?issguid=';
    let url_kalender_club = link_kalender_club + bvbl; 
    // console.log(url_kalender_club);
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    fetch(url_kalender_club, requestOptions)
    .then(response_kalender_club => response_kalender_club.json())
    .then(result_kalender_club => {
        
        document.querySelector(".grid_kalender_club #title_kalender_club").innerHTML = club_naam;
        // FILTER GAMES + LOGS
        // const filtered_games_kalender_club = result_kalender_club;
        const filtered_games_kalender_club = filter_games_for_current_week(result_kalender_club);
        // console.log('Filtered Games:', filtered_games_kalender_club);
        // ALL CODE

        // SORT GAMES
        filtered_games_kalender_club.sort(compare_dates_times);

        // CREATE TABLE
        const table_container_kalender_club = document.querySelector(".grid_kalender_club .table_container table tbody");
        table_container_kalender_club.textContent = '';  // EMPTY CONTENT TBODY

        // console.log('Sorted Games:', filtered_games);
        for (const game_kalender_club of filtered_games_kalender_club) {
            // console.log('Adding game to table:', game_kalender_club);
            const row = table_container_kalender_club.insertRow();
            // PUT DATA IN VAR's
            const kalender_club_game_guid = game_kalender_club.guid;
            const kalender_club_game_id = game_kalender_club.wedID;
            const kalender_club_h_team_id = game_kalender_club.tTGUID;
            const kalender_club_h_team_name = game_kalender_club.tTNaam;
            const kalender_club_a_team_id = game_kalender_club.tUGUID;
            const kalender_club_a_team_name = game_kalender_club.tUNaam;
            const kalender_club_datum = game_kalender_club.datumString;
            const kalender_club_tijd = game_kalender_club.beginTijd;
            const kalender_club_result = game_kalender_club.uitslag;
            const kalender_club_plaats = game_kalender_club.accNaam;
            const kalender_club_reeks_id = game_kalender_club.pouleGUID;
            const kalender_club_reeks_name = game_kalender_club.pouleNaam;
            // CALL MAPPINGS_CLUB
            const gemapte_club_h_naam_kalender_club = vervang_club_naam(kalender_club_h_team_name);
            const gemapte_club_a_naam_kalender_club = vervang_club_naam(kalender_club_a_team_name);
            // CALL MAPPINGS_REEKS
            const gemapte_reeks_naam_kalender_club = vervang_deel_van_naam(kalender_club_reeks_name);
            const gemapte_reeks_naam_kalender_club_oefen = vervang_string(gemapte_reeks_naam_kalender_club, te_vervangen_woord, vervangen_woord);

            // DEFINIEER BASIS URL
            const base_url_team = 'https://vblweb.wisseq.eu/Home/TeamDetail?teamguid=';
            // const base_url_game = 'https://vblweb.wisseq.eu/Home/MatchDetail?wedguid=';
            const base_url_game = 'https://app.basketballstatsvlaanderen.be/clubs/' + bvbl + "/" + kalender_club_h_team_id + "/";
            const base_url_poule = 'https://vblweb.wisseq.eu/Home/Poule?Pouleguid=';

            // CREATE LINK
            const link_game = document.createElement('a');
            const link_h_team = document.createElement('a');
            const link_a_team = document.createElement('a');
            const link_poule = document.createElement('a');

            // Open links in een nieuw tabblad
            link_game.target = '_blank';
            link_h_team.target = '_blank';
            link_a_team.target = '_blank';
            link_poule.target = '_blank';

            link_game.href = base_url_game + kalender_club_game_guid;
            link_h_team.href = base_url_team + kalender_club_h_team_id;
            link_a_team.href = base_url_team + kalender_club_a_team_id;
            link_poule.href = base_url_poule + kalender_club_reeks_id;

            link_game.innerHTML = kalender_club_result;
            link_h_team.innerHTML = gemapte_club_h_naam_kalender_club;
            link_a_team.innerHTML = gemapte_club_a_naam_kalender_club;
            link_poule.innerHTML = gemapte_reeks_naam_kalender_club_oefen;

            // CHECK VARIABELEN
            // PUT VAR's IN CELL's
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);
            const cell6 = row.insertCell(5);
            const cell7 = row.insertCell(6);

            cell1.innerHTML = kalender_club_datum;
            cell2.innerHTML = kalender_club_tijd;
            cell3.innerHTML = '';
            async function update_kalender_club() {
                const club_naam = localStorage.getItem('storage_page');
                const link_kalender_club = 'http://vblcb.wisseq.eu/VBLCB_WebService/data/OrgMatchesByGuid?issguid=';
                const url_kalender_club = link_kalender_club + bvbl;
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };
                try {
                    const result_kalender_club = await fetchJson(url_kalender_club, requestOptions);
                    setText($(".grid_kalender_club #title_kalender_club"), club_naam);
                    const filtered_games_kalender_club = filter_games_for_current_week(result_kalender_club);
                    filtered_games_kalender_club.sort(compare_dates_times);
                    const table_container_kalender_club = $(".grid_kalender_club .table_container table tbody");
                    table_container_kalender_club.textContent = '';
                    fillTable(table_container_kalender_club, filtered_games_kalender_club, (game_kalender_club, row) => {
                        const kalender_club_game_guid = game_kalender_club.guid;
                        const kalender_club_game_id = game_kalender_club.wedID;
                        const kalender_club_h_team_id = game_kalender_club.tTGUID;
                        const kalender_club_h_team_name = game_kalender_club.tTNaam;
                        const kalender_club_a_team_id = game_kalender_club.tUGUID;
                        const kalender_club_a_team_name = game_kalender_club.tUNaam;
                        const kalender_club_datum = game_kalender_club.datumString;
                        const kalender_club_tijd = game_kalender_club.beginTijd;
                        const kalender_club_result = game_kalender_club.uitslag;
                        const kalender_club_plaats = game_kalender_club.accNaam;
                        const kalender_club_reeks_id = game_kalender_club.pouleGUID;
                        const kalender_club_reeks_name = game_kalender_club.pouleNaam;
                        const gemapte_club_h_naam_kalender_club = vervang_club_naam(kalender_club_h_team_name);
                        const gemapte_club_a_naam_kalender_club = vervang_club_naam(kalender_club_a_team_name);
                        const gemapte_reeks_naam_kalender_club = vervang_deel_van_naam(kalender_club_reeks_name);
                        const gemapte_reeks_naam_kalender_club_oefen = vervang_string(gemapte_reeks_naam_kalender_club, te_vervangen_woord, vervangen_woord);
                        const base_url_team = 'https://vblweb.wisseq.eu/Home/TeamDetail?teamguid=';
                        const base_url_game = 'https://app.basketballstatsvlaanderen.be/clubs/' + bvbl + "/" + kalender_club_h_team_id + "/";
                        const base_url_poule = 'https://vblweb.wisseq.eu/Home/Poule?Pouleguid=';
                        const link_game = document.createElement('a');
                        const link_h_team = document.createElement('a');
                        const link_a_team = document.createElement('a');
                        const link_poule = document.createElement('a');
                        link_game.target = '_blank';
                        link_h_team.target = '_blank';
                        link_a_team.target = '_blank';
                        link_poule.target = '_blank';
                        link_game.href = base_url_game + kalender_club_game_guid;
                        link_h_team.href = base_url_team + kalender_club_h_team_id;
                        link_a_team.href = base_url_team + kalender_club_a_team_id;
                        link_poule.href = base_url_poule + kalender_club_reeks_id;
                        // ... bestaande code voor cellen ...
                    });
                } catch (error) {
                    console.log('error', error);
                }
            }
            li_element.innerHTML = `
                <span class="game_row_1">
                    <span class="reeks">${gemapte_reeks_naam_kalender_banner_oefen}</span>
                    <span class="status">${"FINAL"}</span>
                </span>
                <span class="game_row_2">
                    <span class="h_team">
                        <span class="logo"><img src="logos/${h_team_bvbl}.png"></span>
                        <span class="team"><t8><b>${gemapte_h_naam_kalender_banner}</b></t8></span>
                        <span class="score"><b>${banner_h_result}</b></span>
                    </span>
                    <span class="a_team">
                        <span class="logo"><img src="logos/${a_team_bvbl}.png"></span>
                        <span class="team"><t8><b>${gemapte_a_naam_kalender_banner}</b></t8></span>
                        <span class="score"><b>${banner_a_result}</b></span>
                    </span>
                </span>
                <span class="game_row_3">
                    <span class="datefield">${kalender_banner_datum}</span>
                    <span class="viewlink">${kalender_banner_tijd}</span>
                </span>
            `;

            // Voeg het li-element toe aan het ul-element
            ul_element.appendChild(li_element);
            // Voeg het li-element toe aan de banner-container
            banner_container.appendChild(ul_element);
        }


        show_week(current_week_start_date);
    })
    .catch(error => console.log('error', error));
}


update_kalender_club();
