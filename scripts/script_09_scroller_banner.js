// SCRIPT OM BANNER ZIJWAARTS TE SCROLLEN MET DE PIJLEN
document.querySelector('.scroll_left_banner').addEventListener('click', function () {
    console.log('Left button clicked');
    document.querySelector('.lint_banner').scrollBy({
        left: -800, /* grootte sprongen aanpassen */
        behavior: 'smooth'
    });
});

document.querySelector('.scroll_right_banner').addEventListener('click', function () {
    console.log('Right button clicked');
    document.querySelector('.lint_banner').scrollBy({
        left: 800, /* grootte sprongen aanpassen */
        behavior: 'smooth'
    });
});