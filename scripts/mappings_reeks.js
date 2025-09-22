// START REPLACE NAMES
export const search_poule_names = [
    // Beker van Belgie Heren
    "Beker van België Heren",           // 01
    // Beker van Vlaanderen Heren
    "Beker van Vlaanderen Heren",       // 01
    "Beker van Vlaanderen U18",         // 02
    "Beker van Vlaanderen U16",         // 03
    "Beker van Vlaanderen U14",         // 04
    // Beker van Limburg Heren
    "Beker van Limburg Heren",          // 01
    "Beker van Limburg U21 Jongens",    // 02
    "Beker van Limburg U18 Jongens",    // 03
    "Beker van Limburg U16 Jongens",    // 04
    "Beker van Limburg U14 Gemengd",    // 05
    "Beker van Limburg U12 Gemengd",    // 06
    // Beker van Oost-Vlaanderen Heren
    "Beker van Oost-Vlaanderen Heren",  // 01
    // Beker van Antwerpen Heren
    "Beker van Antwerpen Heren",        // 01
    "Beker van Antwerpen U21 Jongens",  // 02
    "Beker van Antwerpen U18 Jongens",  // 03
    "Beker van Antwerpen U16 Jongens",  // 04
    "Beker van Antwerpen U14 Gemengd",  // 05
    "Beker van Antwerpen U12 Gemengd",  // 06
    // Beker van Belgie Dames
    "Beker van België Dames",           // 01
    // Beker van Vlaanderen Dames
    "Beker van Vlaanderen Dames",       // 01
    // Beker van Limburg Dames
    "Beker van Limburg Dames",          // 01
    "Beker van Limburg U14 Meisjes",    // 02
    // Competities
    // Heren
    "Top Division Men",                 // 01
    "1e Landelijke Heren",              // 02
    "2e Landelijke Heren",              // 03
    "1e Prov. Heren Limburg",           // 04
    "2e Prov. Heren Limburg",           // 05
    "3e Prov. Heren Limburg",           // 06
    "1e Prov. Heren Antwerpen",         // 07
    "2e Prov. Heren Antwerpen",         // 08
    "3e Prov. Heren Antwerpen",         // 09
    "4e Prov. Heren Antwerpen",         // 10
    // Dames
    "1e Landelijke Dames",              // 01
    "2e Landelijke Dames",              // 02
    "1e Prov. Dames Limburg",           // 03
    "2e Prov. Dames Limburg",           // 04
    // Jeugd
    "U21 Niveau",                       // 01
    "U18 Niveau",                       // 02
    "U16 Niveau",                       // 03
    "U14 Niveau",                       // 04
    "U12 Niveau",                       // 05
    "U10 Niveau",                       // 06
    "U08 Niveau",                       // 07
];
        
export const replace_poule_names = [
    // Beker van Belgie Heren
    "BvB",          // 01
    // Beker van Vlaanderen Heren
    "BvVL",         // 01
    "BvVL",         // 02
    "BvVL",         // 03
    "BvVL",         // 04
    // Beker van Limburg Heren
    "BvL",          // 01
    "BvL",          // 02
    "BvL",          // 03
    "BvL",          // 04
    "BvL",          // 05
    "BvL",          // 06
    // Beker van Oost-Vlaanderen Heren
    "BvO-Vl",       // 01
    // Beker van Antwerpen Heren
    "BvA",          // 01
    "BvA",          // 02
    "BvA",          // 03
    "BvA",          // 04
    "BvA",          // 05
    "BvA",          // 06
    // Beker van Belgie Dames
    "BvB",          // 01
    // Beker van Vlaanderen Dames
    "BvVL",         // 01
    // Beker van Limburg Dames
    "BvL",          // 01
    "BvL",          // 02
    // Competities
    // Heren
    "TDM",          // 01
    "1e Lan",       // 02
    "2e Lan",       // 03
    "1e Prov Lim",  // 04
    "2e Prov Lim",  // 05
    "3e Prov Lim",  // 06
    "1e Prov Ant",  // 07
    "2e Prov Ant",  // 08
    "3e Prov Ant",  // 09
    "4e Prov Ant",  // 10
    // Dames
    "1e Lan",       // 01
    "2e Lan",       // 02
    "1e Prov Lim",  // 03
    "2e Prov Lim",  // 04
    // Jeugd
    "U21 Niv",      // 01
    "U18 Niv",      // 02
    "U16 Niv",      // 03
    "U14 Niv",      // 04
    "U12 Niv",      // 05
    "U10 Niv",      // 06
    "U08 Niv",   // 07
];   
// END REPLACE NAMES


// Escape RegExp-tekens in een string
const RegExp_escape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

// Vervang een poule- of reeksnaam door de gemapte korte naam indien gevonden
export function vervang_deel_van_naam(zoekterm_poule_names) {
    for (let i = 0; i < search_poule_names.length; i++) {
        const search_term_poule_names = search_poule_names[i];
        const replacement_poule_names = replace_poule_names[i];
        if (zoekterm_poule_names.includes(search_term_poule_names)) {
            const regex = new RegExp(RegExp_escape(search_term_poule_names), 'g');
            return zoekterm_poule_names.replace(regex, replacement_poule_names);
        }
    }
    return zoekterm_poule_names;
}