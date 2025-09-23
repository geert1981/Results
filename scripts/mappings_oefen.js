
// START REPLACE NAMES
export const te_vervangen_woord = ["OEFEN"];
export const vervangen_woord = ["Oefenwedstrijd"];
export const vervangen_woord_banner = ["OEFEN"];
// END REPLACE NAMES

// Vervang een woord in een string door een andere waarde indien gevonden
export function vervang_string(input, zoekwoord, vervangwoord) {
    return input.includes(zoekwoord) ? vervangwoord : input;
}