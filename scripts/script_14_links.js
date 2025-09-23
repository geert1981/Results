function youtube() {
    var url = "https://www.youtube.com/@basketbalvlaanderen";
    window.open(url, '_blank');
}

function instagram() {
    var url = "https://www.instagram.com/basketbalvlaanderen/";
    window.open(url, '_blank');
}

function linkedin() {
    var url = "https://be.linkedin.com/company/basketbal-vlaanderen";
    window.open(url, '_blank');
}

function facebook() {
    var url = "https://www.facebook.com/basketbalvlaanderenvzw/";
    window.open(url, '_blank');
}

function x_twitter() {
    var url = "https://twitter.com/BasketbalVlaand/status/439483647046205440";
    window.open(url, '_blank');
}

function tiktok() {
    var url ="https://www.tiktok.com/tag/basketbalvlaanderen";
    window.open(url, "_blank");
}

function stats() {
    var url ="https://app.basketballstatsvlaanderen.be";
    window.open(url, "_blank");
}

function stats_team() {
    var url ="https://app.basketballstatsvlaanderen.be/clubs/";
    const team_naam = localStorage.getItem('storage_team_naam');
    const team_id = localStorage.getItem('storage_team_id');
    const team_reeks_id = localStorage.getItem('storage_team_reeks_id');
    console.log(team_naam, team_id);

    var url_stats_team = url + bvbl + "/" + team_id;
    var url_final = url_stats_team.replace(/ /g, '%20');

    console.log(url_final);
    window.open(url_final, "_blank");
}

function stats_club(){
    var url ="https://app.basketballstatsvlaanderen.be/clubs/";
    var url_final = url + bvbl;
    window.open(url_final, "_blank");
}

function stats_reeks(){
    var url ="https://app.basketballstatsvlaanderen.be/competitions/";
    const team_reeks_id = localStorage.getItem('storage_team_reeks_id');
    var url_final = url + team_reeks_id;
    window.open(url_final, "_blank");
}