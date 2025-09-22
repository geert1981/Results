import { fetchJson, fillTable, normalizeWords, $, setText } from './utils.js';
// KLASSEMENT
let teamRks;
let teamRksNm;
let bvbl_old;

update_klassement_reeks_id();

async function update_klassement() {
    const def_team_naam = localStorage.getItem('club_default_team_naam');
    const team_naam = localStorage.getItem('storage_team_naam');

    let club_reeks_default = localStorage.getItem('club_default_reeks_id');
    let club_teamId_default = localStorage.getItem('club_default_team_id');
    let club_teamNm_default = localStorage.getItem('club_default_team_naam');

    // LEEGMAKEN ARRAY => IS VOOR KALENDER REEKS!!!
    array_teams_reeks_guids = [];

    let teamRks = localStorage.getItem('storage_team_reeks_id');
    let teamRksNm = localStorage.getItem('storage_team_reeks_naam');
    // console.log(teamRks, "-", teamRksNm);
    let reeks_id, team_naam_reeks;
    if (bvbl_old == null) {
        // console.log('bvbl_old == null');
        reeks_id = club_reeks_default;
        team_naam_reeks = def_team_naam;
        // console.log(reeks_id, "-", team_naam_reeks, "-", teamRksNm);
    } else if (bvbl_old != bvbl) {
        // console.log('bvbl_old != bvbl');
        reeks_id = club_reeks_default;
        team_naam_reeks = def_team_naam;
        // console.log(reeks_id, "-", team_naam_reeks, "-", teamRksNm);
    } else if(bvbl_old == bvbl) {
        // console.log('bvbl_old == bvbl');
        reeks_id = teamRks;
        team_naam_reeks = team_naam;
        // console.log(reeks_id, "-", team_naam_reeks, "-", teamRksNm);
    }

    bvbl_old = bvbl;

    const link_reeks = 'http://vblcb.wisseq.eu/VBLCB_WebService/data/PouleByGuid?Pouleguid=';
    const url_reeks = link_reeks + reeks_id;
    // console.log('URL Reeks:', url_reeks);

    const requestOptions_reeks = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const result_reeks = await fetchJson(url_reeks, requestOptions_reeks);
        const klassement = result_reeks[0];
        const reeks_naam = klassement.naam;
        const reeks_teams = klassement.teams;
        setText($(".grid_reeks #title_klassement"), team_naam_reeks);
        setText($(".grid_reeks .title_reeks"), `<h7><b>${reeks_naam}</b></h7>`);
        const base_url_team = 'https://vblweb.wisseq.eu/Home/TeamDetail?teamguid=';
        const table_container_klassement = $(".grid_reeks table tbody");
        table_container_klassement.textContent = '';
        fillTable(table_container_klassement, reeks_teams, (reeks, row) => {
            const reeks_rang = reeks.rangNr;
            const reeks_team = reeks.naam;
            const reeks_play = reeks.wedAant;
            const reeks_won = reeks.wedWinst;
            const reeks_lost = reeks.wedVerloren;
            const reeks_draw = reeks.wedGelijk;
            const reeks_punten = reeks.punten;
            const reeks_team_id = reeks.guid;
            const link_team = document.createElement('a');
            link_team.href = base_url_team + reeks_team_id;
            link_team.target = '_blank';
            link_team.innerHTML = reeks_team;
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);
            const cell6 = row.insertCell(5);
            const cell7 = row.insertCell(6);
            cell1.innerHTML = reeks_rang;
            cell2.innerHTML = '';
            cell2.appendChild(link_team);
            cell3.innerHTML = reeks_play;
            cell4.innerHTML = reeks_won;
            cell5.innerHTML = reeks_lost;
            cell6.innerHTML = reeks_draw;
            cell7.innerHTML = reeks_punten;
        });
    } catch (error) {
        console.log('error', error);
    }
}
