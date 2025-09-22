// Converteer JS timestamp naar iCal-formaat (UTC, zonder streepjes/punten)
export function jsDTCodeToICal(jsDTCode, timeZone) {
    const seconds = jsDTCode / 1000;
    const date = new Date(seconds * 1000);
    // Handmatig offset toevoegen (voor tijdzone-correctie)
    const offsetMinutes = date.getTimezoneOffset();
    const offsetMilliseconds = offsetMinutes * 60 * 1000;
    const localDateTimeWithOffset = new Date(date.getTime() + offsetMilliseconds);
    return localDateTimeWithOffset.toISOString().replace(/[-:.]/g, '').slice(0, -4) + 'Z';
}

// Genereer en download een iCal-bestand voor de teamkalender
export function ical() {
    const result_kalender_team_ical_string = localStorage.getItem('storage_result_kalender_team');
    const events = JSON.parse(result_kalender_team_ical_string);
    let ical_data = 'BEGIN:VCALENDAR\r\n';
    ical_data += 'VERSION:2.0\r\n';
    ical_data += 'PRODID:VBL-KALENDER\r\n';
    events.forEach(event => {
        ical_data += 'BEGIN:VEVENT\r\n';
        ical_data += `UID:${event.guid}\r\n`;
        ical_data += `DTSTAMP:${new Date().toISOString().replace(/[-:.]/g, '').slice(0, -4)}Z\r\n`;
        const ical_date = jsDTCodeToICal(event.jsDTCode, 'Europe/Brussels');
        ical_data += `DTSTART:${ical_date}\r\n`;
        const updatedTime = addTwoHoursToTimeString(ical_date);
        ical_data += `DTEND:${updatedTime}\r\n`;
        ical_data += `SUMMARY:${event.tTNaam} - ${event.tUNaam}\r\n`;
        ical_data += `LOCATION:${event.accNaam}\r\n`;
        ical_data += 'END:VEVENT\r\n';
    });
    ical_data += 'END:VCALENDAR\r\n';
    const team_naam = localStorage.getItem('storage_team_naam');
    const blob = new Blob([ical_data], { type: 'text/calendar' });
    const download_link = document.createElement('a');
    download_link.href = window.URL.createObjectURL(blob);
    download_link.download = `kalender ${team_naam}.ics`;
    document.body.appendChild(download_link);
    download_link.click();
    document.body.removeChild(download_link);
}

// Voeg 2 uur toe aan een iCal-tijdstring (YYYYMMDDTHHMMSSZ)
export function addTwoHoursToTimeString(timeString) {
    const dateRegex = /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})00Z/;
    const match = timeString.match(dateRegex);
    if (!match) throw new Error('Ongeldige tijdindeling');
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const day = parseInt(match[3], 10);
    const hours = parseInt(match[4], 10);
    const minutes = parseInt(match[5], 10);
    const date = new Date(Date.UTC(year, month, day, hours, minutes));
    date.setUTCHours(date.getUTCHours() + 2);
    return date.toISOString().replace(/[-:.]/g, '').slice(0, -4) + 'Z';
}