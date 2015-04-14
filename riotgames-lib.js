var RiotAPI = function(apikey) {
    this.api_key = apikey;
};

RiotAPI.prototype.sendRequest = function(method, params, callback) {
    return $.ajax({
        type: "POST",
        url: "https://na.api.pvp.net/api/lol/na" + method,
        crossDomain: true,
        data: {
            api_key: this.api_key
        },
        async: false
    }).responseText;
};

RiotAPI.prototype.getChampions = function() {
    var data = this.sendRequest("/v1.2/champion", {});
};

RiotAPI.prototype.getChampion = function(champion_id) {
    var data = this.sendRequest("/v1.2/champion/" + champion_id, {});
};

RiotAPI.prototype.getTeamBySummoner = function(summoner_id) {
    var data = this.sendRequest("/v2.4/team/by-summoner/" + summoner_id, {});
};

RiotAPI.prototype.getTeam = function(team_id) {
    var data = this.sendRequest("/v2.4/team/" + team_id, {});
};