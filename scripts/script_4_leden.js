import { fetchJson, fillTable, normalizeWords, $, setText } from 'https://geert1981.github.io/Results/scripts/utils.js';
// LEDEN CLUB
async function update_leden() {
    const club_naam = localStorage.getItem('storage_page');
    const link_leden = 'http://vblcb.wisseq.eu/VBLCB_WebService/data/RelatiesByOrgGuid?orgguid=';
    const url_leden = link_leden + bvbl;
    const requestOptions_leden = {
        method: 'GET',
        redirect: 'follow'
    };
    try {
        const result_leden = await fetchJson(url_leden, requestOptions_leden);
        const table_containerleden = $(".grid_leden table tbody");
        table_containerleden.textContent = '';
        fillTable(table_containerleden, result_leden, (leden, row) => {
            const leden_lidnr = leden.lidNr;
            const leden_naam = normalizeWords(leden.naam);
            const leden_vnaam = normalizeWords(leden.vnaam);
            const leden_cat = leden.cat;
            const leden_gebdat = leden.gebdat;
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);
            cell1.innerHTML = leden_lidnr;
            cell2.innerHTML = leden_naam;
            cell3.innerHTML = leden_vnaam;
            cell4.innerHTML = leden_cat;
            cell5.innerHTML = leden_gebdat;
        });
    } catch (error) {
        console.log('error', error);
    }
}

update_leden();
