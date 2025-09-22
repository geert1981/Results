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
        $(`#${id}`)?.style.display = 'none';
    });
    // Toon geselecteerde div
    $(`#${divId}`)?.style.display = 'block';
}
