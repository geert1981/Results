function ical() {
    console.log('ical fired ...')
    const team_naam = localStorage.getItem('storage_team_naam');
    const team_id = localStorage.getItem('storage_team_id');
    const team_id_no_space = team_id.replace(/\s+/g, '00');

    const url_base = 'https://vblcal.wisseq.eu/vblcalsync/calsync.aspx?guid=';

    const url_ical = url_base + team_id_no_space;

    // CREATE POPUP
    const popupContainer = document.createElement('div');
    popupContainer.style.position = 'fixed';
    popupContainer.style.top = '50%';
    popupContainer.style.left = '50%';
    popupContainer.style.transform = 'translate(-50%, -50%)';
    popupContainer.style.background = '#fff';
    popupContainer.style.padding = '20px';
    popupContainer.style.border = '1px solid #ccc';
    popupContainer.style.zIndex = '9999';

    const popupText = document.createElement('p');
    popupText.innerText = 'Kopieer het onderstaande iCal-adres en voeg het toe aan je agenda:';

    const popupInput = document.createElement('input');
    popupInput.type = 'text';
    popupInput.value = url_ical;
    popupInput.readOnly = true;
    popupInput.style.width = '100%';

    const closeBtn = document.createElement('button');
    closeBtn.innerText = 'Sluiten';
    closeBtn.addEventListener('click', function () {
        document.body.removeChild(popupContainer);
    });

    popupContainer.appendChild(popupText);
    popupContainer.appendChild(popupInput);
    popupContainer.appendChild(closeBtn);

    // ADD POPUP TO DOM
    document.body.appendChild(popupContainer);

    // SELECT TEXT IN THE INPUT FIELD
    popupInput.select();
    document.execCommand('copy'); // Kopieer de tekst naar het klembord (optioneel)
}
