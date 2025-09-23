// Toggle zichtbaarheid van het team grid (utility-based)
import { $ } from './utils.js';

let teller_teams = 0;
let grid_teams_visible = false; // Status bewaren

export function toggle_teams() {
    const grid_teams = $('.grid_team_buttons');
    if (!grid_teams) return;
    // Toggle zichtbaarheid
    if (grid_teams_visible) {
        grid_teams.style.display = 'none';
        teller_teams++;
        console.log('none -', teller_teams);
    } else {
        grid_teams.style.display = 'flex';
        teller_teams++;
        console.log('flex -', teller_teams);
    }
    grid_teams_visible = !grid_teams_visible;
}
// END FUNCTIE TOGGLE_TEAMS