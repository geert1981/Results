// Scroll de team buttons container omhoog of omlaag (utility-based)
import { $ } from 'https://geert1981.github.io/Results/scripts/utils.js';

export function scroll_team_buttons(direction) {
    const button_container = $('.team_buttons_container');
    if (!button_container?.firstElementChild) return;
    const button_height = button_container.firstElementChild.offsetHeight + 50; // 50 = marge
    console.log('Button height:', button_height);
    button_container.scrollBy({
        top: direction * button_height,
        behavior: 'smooth'
    });

}
