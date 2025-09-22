// main.js - centrale entrypoint voor de app
// Importeer alle globale functies en hang ze aan window zodat ze vanuit HTML bereikbaar zijn

import { show_div } from './script_10_show_div.js';
import { ical } from './script_13_iCal.js';
import { stats_team, stats_club, stats_reeks, stats } from './script_14_links.js';
import { youtube, instagram, linkedin, facebook, x_twitter, tiktok } from './script_14_links.js';
import { scroll_team_buttons } from './script_11_scroll_up_down.js';
import { toggle_teams } from './script_12_toggle_teams.js';
import { change_club } from './script_1_info_clubs.js';
import { show_previous_week, show_current_week, show_next_week } from './script_8_kalender_reeks.js';
import { filter_table_leden } from './script_4_leden.js';

// Koppel functies aan window voor gebruik in onclick etc.
window.show_div = show_div;
window.ical = ical;
window.stats_team = stats_team;
window.stats_club = stats_club;
window.stats_reeks = stats_reeks;
window.stats = stats;
window.youtube = youtube;
window.instagram = instagram;
window.linkedin = linkedin;
window.facebook = facebook;
window.x_twitter = x_twitter;
window.tiktok = tiktok;
window.scroll_team_buttons = scroll_team_buttons;
window.toggle_teams = toggle_teams;
window.change_club = change_club;
window.show_previous_week = show_previous_week;
window.show_current_week = show_current_week;
window.show_next_week = show_next_week;
window.filter_table_leden = filter_table_leden;

// Voeg hier eventueel extra initialisatie toe
// ...
