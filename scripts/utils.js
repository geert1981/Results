// utils.js
// Algemene utility-functies voor fetch, DOM, normalisatie en tabellen

/**
 * Voert een fetch uit met standaard error handling en JSON parsing.
 * @param {string} url
 * @param {object} options
 * @returns {Promise<any>} parsed JSON of null bij error
 */
export async function fetchJson(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

/**
 * Normaliseert een string: hoofdletter eerste letter, rest klein.
 * @param {string} word
 * @returns {string}
 */
export function normalizeWords(word) {
    return word.split(' ').map(
        part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    ).join(' ');
}

/**
 * Leegt een tabel-body en vult deze met rijen-data.
 * @param {HTMLTableSectionElement} tbody
 * @param {Array} rowsData
 * @param {function} rowBuilder - functie die een rij bouwt (tr element returnt)
 */
export function fillTable(tbody, rowsData, rowBuilder) {
    tbody.innerHTML = '';
    for (const rowData of rowsData) {
        const row = rowBuilder(rowData);
        tbody.appendChild(row);
    }
}

/**
 * Haalt een element op, geeft null als niet gevonden.
 * @param {string} selector
 * @returns {Element|null}
 */
export function $(selector) {
    return document.querySelector(selector);
}

/**
 * Zet de textContent van een element als het bestaat.
 * @param {string} selector
 * @param {string} text
 */
export function setText(selector, text) {
    const el = $(selector);
    if (el) el.textContent = text;
}
