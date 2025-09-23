// SCRIPT OM BANNER ZIJWAARTS TE SCROLLEN MET DE PIJLEN
import { $ } from 'https://geert1981.github.io/Results/scripts/utils.js';

$('.scroll_left_banner')?.addEventListener('click', () => {
    console.log('Left button clicked');
    $('.lint_banner')?.scrollBy({
        left: -800, // grootte sprongen aanpassen
        behavior: 'smooth'
    });
});

$('.scroll_right_banner')?.addEventListener('click', () => {
    console.log('Right button clicked');
    $('.lint_banner')?.scrollBy({
        left: 800, // grootte sprongen aanpassen
        behavior: 'smooth'
    });

});
