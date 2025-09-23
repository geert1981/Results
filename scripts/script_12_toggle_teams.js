// FUNCTIE TOGGLE_TEAMS
let teller_teams = 0;
var grid_teams_visible = false; // VAR OM STATUS TE BEWAREN
function toggle_teams() {
    var grid_teams = document.querySelector('.grid_team_buttons');
    // IF grid_teams_visible TRUE -> VERBERG grid_teams. ANDERS grid_teams TONEN
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