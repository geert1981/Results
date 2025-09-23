// KLASSEMENT
let teamRks;
let teamRksNm;
let bvbl_old;

update_klassement_reeks_id();

function update_klassement() {
    const def_team_naam = localStorage.getItem('club_default_team_naam');
    const team_naam = localStorage.getItem('storage_team_naam');

    club_reeks_default = localStorage.getItem('club_default_reeks_id');
    club_teamId_default = localStorage.getItem('club_default_team_id');
    club_teamNm_default = localStorage.getItem('club_default_team_naam');

    // LEEGMAKEN ARRAY => IS VOOR KALENDER REEKS!!!
    array_teams_reeks_guids = [];

    teamRks = localStorage.getItem('storage_team_reeks_id');
    teamRksNm = localStorage.getItem('storage_team_reeks_naam');
    // console.log(teamRks, "-", teamRksNm);
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

    var link_reeks = 'http://vblcb.wisseq.eu/VBLCB_WebService/data/PouleByGuid?Pouleguid=';
    var url_reeks = link_reeks + reeks_id;
    // console.log('URL Reeks:', url_reeks);

    var requestOptions_reeks = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url_reeks, requestOptions_reeks)
    .then(response_reeks => response_reeks.json())
    .then(result_reeks => {
        // console.log(result_reeks);
        let klassement = result_reeks[0];
        let reeks_naam = klassement.naam;
        let reeks_teams = klassement.teams;

        // UPDATE TITLE DIV CONTENT
        document.querySelector(".grid_reeks #title_klassement").innerHTML = team_naam_reeks;
        document.querySelector(".grid_reeks .title_reeks").innerHTML = "<h7><b>" + reeks_naam + "</b></h7>";

        // DEFINIEER BASIS URL
        const base_url_team = 'https://vblweb.wisseq.eu/Home/TeamDetail?teamguid=';

        // CREATE TABLE
        const table_container_klassement = document.querySelector(".grid_reeks table tbody");
        table_container_klassement.innerHTML = '';  // EMPTY CONTENT TBODY

        for (const reeks of reeks_teams) {
            // EACH LOOP CREATES NEW ROW
            var row = table_container_klassement.insertRow();

            // PUT DATA IN VAR's
            const reeks_rang = reeks.rangNr;
            const reeks_team = reeks.naam;
            const reeks_play = reeks.wedAant;
            const reeks_won = reeks.wedWinst;
            const reeks_lost = reeks.wedVerloren;
            const reeks_tied = reeks.wedGelijk;
            const reeks_point = reeks.wedPunt;
            const reeks_team_id = reeks.guid;
            // CALL MAPPINGS_CLUB
            const gemapte_club_name_reeks = vervang_club_naam(reeks_team);
            // CREATE LINK
            const link_team = document.createElement('a');

            link_team.href = base_url_team + reeks_team_id;
            link_team.innerHTML = gemapte_club_name_reeks;

            // VOEG TEAM ID TOE AAN ARRAY
            array_teams_reeks_guids.push(reeks_team_id);
      
            // PUT VAR's IN CELL's
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
            cell6.innerHTML = reeks_tied;
            cell7.innerHTML = reeks_point;
        }
    })
    .catch(error => console.log('error', error));
    

    // TIME OUT GEZET, ANDERS IS ARRAY_TEAMS_REEKS_GUIDS NIET VOLLEDIG GEVULD EN WORDT DE FUNCTIE TE VLUG UITGEVOERD
    setTimeout(() => {
        update_kalender_reeks_id();
        // console.log('Call update_kalender_reeks_id ...');
        // console.log(array_teams_reeks_guids);
    }, 100);
    
}