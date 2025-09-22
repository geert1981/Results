// Social media links
export function youtube() {
    window.open("https://www.youtube.com/@basketbalvlaanderen", '_blank');
}
export function instagram() {
    window.open("https://www.instagram.com/basketbalvlaanderen/", '_blank');
}
export function linkedin() {
    window.open("https://be.linkedin.com/company/basketbal-vlaanderen", '_blank');
}
export function facebook() {
    window.open("https://www.facebook.com/basketbalvlaanderenvzw/", '_blank');
}
export function x_twitter() {
    window.open("https://twitter.com/BasketbalVlaand/status/439483647046205440", '_blank');
}
export function tiktok() {
    window.open("https://www.tiktok.com/tag/basketbalvlaanderen", "_blank");
}

// Stats links
export function stats() {
    window.open("https://app.basketballstatsvlaanderen.be", "_blank");
}
export function stats_team() {
    const team_id = localStorage.getItem('storage_team_id');
    if (!team_id) return;
    const url_final = `https://app.basketballstatsvlaanderen.be/clubs/${encodeURIComponent(team_id)}`;
    window.open(url_final, "_blank");
}
export function stats_club() {
    // bvbl is niet gedefinieerd, dus alleen basislink
    window.open("https://app.basketballstatsvlaanderen.be/clubs/", "_blank");
}
export function stats_reeks() {
    const team_reeks_id = localStorage.getItem('storage_team_reeks_id');
    if (!team_reeks_id) return;
    const url_final = `https://app.basketballstatsvlaanderen.be/competitions/${encodeURIComponent(team_reeks_id)}`;
    window.open(url_final, "_blank");
}