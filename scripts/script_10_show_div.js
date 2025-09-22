// Toon één div en verberg de rest (utility-based)
import { $ } from './utils.js';

export function show_div(divId) {
    // Verberg alle relevante divs
    const divs = [
        'klassement',
        'kalender_team',
        'kalender_reeks',
        'kalender_club',
        'leden',
        'bestuur',
        'sporthal'
    ];
    divs.forEach(id => {
        const el = $(`#${id}`);
        if (el) el.style.display = 'none';
    });
    // Toon geselecteerde div
    const selectedDiv = $(`#${divId}`);
    if (selectedDiv) selectedDiv.style.display = 'block';
}

