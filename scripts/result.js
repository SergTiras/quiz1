(function () {
const Result = {

    url: new URL(location.href),
    init() {
        document.getElementById("result-score").innerText = this.url.searchParams.get("score") + '/' + this.url.searchParams.get("total");
    },

}

Result.init();


})();