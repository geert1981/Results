// LEDEN CLUB
function update_leden() {
    const club_naam = localStorage.getItem('storage_page');
    // console.log('Page:', club_naam);

    // GET API
    // console.log('BVBL Leden:', bvbl);
    var link_leden = 'http://vblcb.wisseq.eu/VBLCB_WebService/data/RelatiesByOrgGuid?orgguid=';
    var url_leden = link_leden + bvbl;
    // console.log('URL Leden:', url_leden);

    // FUNCTIE CHECK WOORDEN + WOORD START MET HOOFDLETTERS + OVERIGE LETTERS ZIJN KLEINE LETTERS
    function normalize_words(word) {
        return word.split(' ').map(function(part) {
            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        }).join(' ');
    }
    // END FUNCTION

    var requestOptions_leden = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url_leden, requestOptions_leden)
        .then(response_leden => response_leden.json())
        .then(result_leden => {
            // console.log(result_leden);
            // CREATE TABLE
            const table_containerleden = document.querySelector(".grid_leden table tbody");
            table_containerleden.innerHTML = '';  // EMPTY CONTENT TBODY

            for (const leden of result_leden) {
                const row = table_containerleden.insertRow();
                // PUT DATA IN VAR's
                const leden_lidnr = leden.lidNr;
                const leden_naam = leden.naam;
                const leden_vnaam = leden.vnaam;
                const leden_cat = leden.cat;
                const leden_gebdat = leden.gebdat;

                // PUT VAR's IN CELL's
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
            }
        })
    .catch(error => console.log('error', error));
    // END GET API
}
update_leden();
// console.log('Call update leden');