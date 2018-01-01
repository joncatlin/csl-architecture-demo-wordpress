
    //******************************************************************************
    function GetPortfoliosListener() {
        console.log("In GetPortfoliosListener");
        console.log(this.responseText);

        portfolios = JSON.parse(this.responseText);
        console.dir(portfolios);

        console.log(portfolios.Commands);
        console.dir(portfolios.Commands);


    }


    //******************************************************************************
    function UserActionGetPortfolios() {
        console.log("In GetPortfolios");

        var xhttp = new XMLHttpRequest();
        xhttp.addEventListener("load", GetPortfoliosListener);

        xhttp.open("GET", "http://docker01.dest.internal:8085/api/rules", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();

    }

    // Get the portfolio informstion
    UserActionGetPortfolios();