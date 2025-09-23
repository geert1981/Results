function jsDTCodeToICal(jsDTCode, timeZone) {
    // JS TIMESTAMP OM NAAR SECONDEN
    var seconds = jsDTCode / 1000;

    // CONVERT TO ICAL DATE & TIME
    var date = new Date(seconds * 1000); // VERMENIGVULDIG MET 1000 OMDAT DATE IN MILLISECONDEN WERKT

    // OMZETTEN NAAR SPECIFIEKE TIJDZONE
    var localDateTime = date.toLocaleString('nl-BE', { timeZone: timeZone }); // VERVANG 'nl-BE' DOOR GEWENSTE TAALCODE

    // HANDMATIG TOEVOEGEN OFFSET
    var offsetMinutes = date.getTimezoneOffset();
    var offsetMilliseconds = offsetMinutes * 60 * 1000;
    var localDateTimeWithOffset = new Date(date.getTime() + offsetMilliseconds);

    return localDateTimeWithOffset.toISOString().replace(/[-:.]/g, '').slice(0, -4) + 'Z';
}

function ical(){
    const result_kalender_team_ical_string = localStorage.getItem('storage_result_kalender_team');
    const events = JSON.parse(result_kalender_team_ical_string);

    // BEGIN iCal
    var ical_data = "BEGIN:VCALENDAR\r\n";
    ical_data += "VERSION:2.0\r\n";
    ical_data += "PRODID:VBL-KALENDER\r\n";

    // LOOP WEDSTRIJDEN EN GENEREER iCal
    events.forEach(function (event) {
        // console.log('Processing event:', event);

        ical_data += "BEGIN:VEVENT" + "\r\n";
        ical_data += "UID:" + event.guid + "\r\n";
        ical_data += "DTSTAMP:" + new Date().toISOString().replace(/[-:.]/g, '').slice(0, -4) + 'Z' + "\r\n";

        // CONVERT DATE & TIME
        var ical_date = jsDTCodeToICal(event.jsDTCode, 'Europe/Brussels'); // GEWENSTE TIJDZONE
        // console.log(ical_date, '= Converted date');
        ical_data += "DTSTART:" + ical_date + "\r\n";

        // +2:00
        var originalTime = ical_date;
        var updatedTime = addTwoHoursToTimeString(originalTime);
        // console.log(updatedTime, '= updated time');
        ical_data += "DTEND:" + updatedTime + "\r\n";

        ical_data += "SUMMARY:" + event.tTNaam + " - " + event.tUNaam + "\r\n";
        ical_data += "LOCATION:" + event.accNaam + "\r\n";
        ical_data += "END:VEVENT\r\n";
    });

    // END iCal
    ical_data += "END:VCALENDAR\r\n";
    // console.log(ical_data);
    

    // BEGIN DOWNLOAD
    // HAAL NAAM TEAM OP OM BESTANDSNAAM OP TE BOUWEN
    const team_naam = localStorage.getItem('storage_team_naam');
    
    const ical_script = ical_data; // Vervang 'ical_data' door je gegenereerde iCal-scriptstring
    const blob = new Blob([ical_script], { type: 'text/calendar' });

    const download_link = document.createElement('a');
    download_link.href = window.URL.createObjectURL(blob);
    download_link.download = 'kalender ' + team_naam + '.ics'; // GEEF BESTAND EEN NAAM

    document.body.appendChild(download_link);
    download_link.click();

    document.body.removeChild(download_link);
    // EINDE DOWNLOAD
}


function addTwoHoursToTimeString(timeString) {
    // PARSE ORIGINAL STRING
    var dateRegex = /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})00Z/;
    var match = timeString.match(dateRegex);

    if (!match) {
        throw new Error('Ongeldige tijdindeling');
    }

    // BOUW DATE-OBJECT
    var year = parseInt(match[1], 10);
    var month = parseInt(match[2], 10) - 1; // MAANDEN IN JS ZIJN 0-GEBASEERD (0 = JAN, 1 = FEB, enz.)
    var day = parseInt(match[3], 10);
    var hours = parseInt(match[4], 10);
    var minutes = parseInt(match[5], 10);

    var date = new Date(Date.UTC(year, month, day, hours, minutes));

    // ADD 2 HOURS
    date.setUTCHours(date.getUTCHours() + 2);

    // FORMAT TERUG NAAR GEWENST FORMAAT (YYYYMMDDTHHMMSSZ)
    var formattedTime = date.toISOString().replace(/[-:.]/g, '').slice(0, -4) + 'Z';

    return formattedTime;
}