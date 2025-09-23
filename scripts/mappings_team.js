console.log('mappings_team.js');
// START REPLACE NAMES
const search_team = [
    // DSE
    "DSE  1",
    "DSE  2", 
    "DSE  3",
    "DSE  4",
    // HSE
    "HSE  1",
    "HSE  2",
    "HSE  3",
    "HSE  4",
    "HSE  5",
    // G12
    "G12  1",
    "G12  2",
    "G12  3",
    "G12  4",
    "G12  5",
    // G14
    "G14  1",
    "G14  2",
    "G14  3",
    "G14  4",
    "G14  5",
    // J16
    "J16  1", 
    "J16  2",  
    "J16  3",  
    "J16  4", 
    // J18
    "J18  1", 
    "J18  2", 
    "J18  3", 
    // M14
    "M14  1", 
    "M14  2", 
    "M14  3", 
    // M16
    "M16  1",
    "M16  2",
    "M16  3",
    // M19
    "M19  1",
    "M19  2",
    // J21
    "J21  1",  
    // DSE
    "DSE++1",
    "DSE++2",
    "DSE++3",
    "DSE++4",
    // HSE
    "HSE++1",
    "HSE++2",
    "HSE++3",
    "HSE++4",
    "HSE++5",
    // G12
    "G12++1", 
    "G12++2", 
    "G12++3", 
    "G12++4", 
    "G12++5", 
    // G14
    "G14++1", 
    "G14++2", 
    "G14++3", 
    "G14++4", 
    "G14++5", 
    // J16
    "J16++1", 
    "J16++2", 
    "J16++3", 
    "J16++4", 
    // J18
    "J18++1", 
    "J18++2", 
    "J18++3", 
    // M14
    "M14++1", 
    "M14++2", 
    "M14++3", 
    // M16
    "M16++1", 
    "M16++2", 
    "M16++3", 
    // M19
    "M19++1", 
    "M19++2", 
    // J21
    "J21++1", 
];
        
const replace_team = [
    // DSE
    "Seniors dames A", 
    "Seniors dames B", 
    "Seniors dames C", 
    "Seniors dames D", 
    // HSE
    "Seniors heren A", 
    "Seniors heren B", 
    "Seniors heren C", 
    "Seniors heren D", 
    "Seniors heren E", 
    // G12
    "Benjamins gemengd A", 
    "Benjamins gemengd B", 
    "Benjamins gemengd C", 
    "Benjamins gemengd D", 
    "Benjamins gemengd E", 
    // G14
    "Pupillen gemengd A", 
    "Pupillen gemengd B", 
    "Pupillen gemengd C", 
    "Pupillen gemengd D", 
    "Pupillen gemengd E", 
    // J16
    "Miniemen jongens A", 
    "Miniemen jongens B", 
    "Miniemen jongens C", 
    "Miniemen jongens D", 
    // J18
    "Kadetten jongens A", 
    "Kadetten jongens B", 
    "Kadetten jongens C", 
    // M14
    "Pupillen meisjes A", 
    "Pupillen meisjes B", 
    "Pupillen meisjes C", 
    // M16
    "Miniemen meisjes A", 
    "Miniemen meisjes B", 
    "Miniemen meisjes C", 
    // M19
    "Kadetten meisjes A", 
    "Kadetten meisjes B", 
    // J21
    "Junioren jongens A", 
    // DSE
    "Seniors dames A", 
    "Seniors dames B", 
    "Seniors dames C", 
    "Seniors dames D",
    // HSE
    "Seniors heren A", 
    "Seniors heren B",
    "Seniors heren C", 
    "Seniors heren D", 
    "Seniors heren E", 
    // G12
    "Benjamins gemengd A", 
    "Benjamins gemengd B", 
    "Benjamins gemengd C", 
    "Benjamins gemengd D", 
    "Benjamins gemengd E", 
    // G14
    "Pupillen gemengd A", 
    "Pupillen gemengd B", 
    "Pupillen gemengd C", 
    "Pupillen gemengd D", 
    "Pupillen gemengd E", 
    // J16
    "Miniemen jongens A", 
    "Miniemen jongens B", 
    "Miniemen jongens C", 
    "Miniemen jongens D", 
    // J18
    "Kadetten jongens A",
    "Kadetten jongens B",
    "Kadetten jongens C",
    // M14
    "Pupillen meisjes A", 
    "Pupillen meisjes B", 
    "Pupillen meisjes C", 
    // M16
    "Miniemen meisjes A", 
    "Miniemen meisjes B", 
    "Miniemen meisjes C", 
    // M19
    "Kadetten meisjes A", 
    "Kadetten meisjes B",
    // J21
    "Junioren jongens A",
];
// END REPLACE NAMES
  

// Voorbeeld van hoe je de naam kunt vervangen
function vervang_team_naam(zoekterm) {
    console.log('Vervang team naam functie afgevuurd ...')
    const index = search_team.indexOf(zoekterm);
    if (index !== -1) {
        return replace_team[index];
    } else {
        return zoekterm; // Als de zoekterm niet wordt gevonden, retourneer de originele naam
    }
}

// Selecteer alle knoppen binnen de div
const team_knoppen = document.querySelectorAll('.grid_link_teams button');

// Loop door elke knop en vervang de tekst binnen de knop met de gemapte naam
team_knoppen.forEach(knop => {
    const huidige_tekst = knop.innerText;
    const nieuwe_tekst = vervang_team_naam(huidige_tekst);
    knop.innerText = nieuwe_tekst;
});

// Toon de resultaten
console.log("Knoppen zijn aangepast:", team_knoppen);