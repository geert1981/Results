function scroll_team_buttons(direction) {
    const button_container = document.querySelector('.team_buttons_container');
    const button_height = button_container.firstElementChild.offsetHeight + 50; // 10 is the margin
    console.log("Button height:", button_height)

    button_container.scrollBy({
        top: direction * button_height,
        behavior: 'smooth',
        duration: 1000,
        block: 'start',
        inline: 'nearest',
    });
}