<script type="text/javascript">

    var baseURL = "http://docker07.concordservicing.com:9119/"

    //******************************************************************************
    function reqListener() {
        console.log(this.responseText);
        myObj = JSON.parse(this.responseText);

            // Find all elements with matching names to the keys inside the returned Json
            for (const [key, value] of Object.entries(myObj)) {
                console.log(key + " has a value=" + value);
                var idToFind = "display_" + key;
                console.log("idToFindis=" + idToFind);
                var elem = document.getElementById(idToFind);
                if (elem != null) {
                elem.textContent = value;
            }
        }
    }

    //******************************************************************************
    function UserActionGetAccountDetails(AccountNumber) {
        console.log("Hi jon");
    // Reset the text of all elements that start with display.
    //        jQuery('[id^="display_"]').textContent("");
    jQuery('[id^="display_"]').text("");

        if (AccountNumber == "") AccountNumber = 0;
        console.log("AccountNumber = " + AccountNumber);

        var xhttp = new XMLHttpRequest();
        xhttp.addEventListener("load", reqListener);

        xhttp.open("GET", baseURL + "api/values/"+AccountNumber);
        //          xhttp.open("GET", "http://localhost:63982/api/values", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();

    }

    //******************************************************************************
    function GetPortfoliosListener() {
        console.log("In GetPortfoliosListener");
        console.log(this.responseText);

        portfolios = JSON.parse(this.responseText);
	    console.dir(portfolios);

        // Populate the selector for the portfolios
        jQuery.each(portfolios, function (key, value) {
            jQuery("#display_portfolioSelector").append(jQuery('<option></option>').val(value.PortfolioName).html(value.PortfolioName));
        });
    }

    //******************************************************************************
    function UserActionGetPortfolios() {
        console.log("In GetPortfolios");

    var xhttp = new XMLHttpRequest();
        xhttp.addEventListener("load", GetPortfoliosListener);

        xhttp.open("GET", baseURL + "api/Portfolio/GetPortfolios");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();

    }


    var selectedPortfolio;

    //******************************************************************************
    function GetPortfolioDetailsListener() {
        console.log("In GetPortfolioDetailsListener, selected portfolio=" + selectedPortfolio);
        console.log(this.responseText);

        portfolios = JSON.parse(this.responseText);
	    console.dir(portfolios);



        // Get the specific portfolio we are interested in
        console.log("Parsing array returned from service to find specific portfolio");
        for (var j = 0; j < portfolios.length; j++){
            console.log("\tFound portfolio name="+portfolios[j].PortfolioName);

            // Find all elements with matching names to the keys inside the returned Json
            for (const [key, value] of Object.entries(portfolios[j])) {
                console.log(key + " has a value=" + value);
                var idToFind = "display_" + key;
                console.log("idToFindis=" + idToFind);
                var elem = document.getElementById(idToFind);
                if (elem != null) {
                    elem.textContent = value;
                }
            }
        }
    }

    //******************************************************************************
    function UserActionGetPortfolioDetails(portfolio) {
        console.log("In GetPortfoliosDetails, selected portfolio="+portfolio);
        selectedPortfolio = portfolio;
    
        var xhttp = new XMLHttpRequest();
        xhttp.addEventListener("load", GetPortfolioDetailsListener);

        xhttp.open("GET", baseURL + "api/Portfolio/GetPortfolios");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    }



    //******************************************************************************
    function UserActionGetAccountsByPortfolioId(Id) {
        console.log("In GetAccountsByPortfolioId, Id=" + Id);

    var xhttp = new XMLHttpRequest();
        xhttp.addEventListener("load", GetAccountsByPortfolioIdListener);

        xhttp.open("GET", "http://docker01.concordservicing.com:9119/api/Account/GetAccountsByPortfolioId?portfolioId="+Id);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();

    }

    //******************************************************************************
    function GetAccountsByPortfolioIdListener() {
        console.log("In GetAccountsByPortfolioIdListener");
        console.log(this.responseText);

        accounts = JSON.parse(this.responseText);

        // Transform the converted json into a flat array without attribute names
        var _accounts = [];
        var res = Object.keys(accounts)
            // iterate over them and generate the array
            .map(function(k) {
                // generate the array element
                var _account = [];
                for(var propt in  accounts[k]){
                    console.log("accounts[" + k + "]=" + propt);
                    _account.push(accounts[k][propt]);
                }
                console.log("_account="+ _account);
                _accounts.push(_account);
        });


        // DO NOT REMOVE SAMPLE OF AJAX that works
        // This next example works!!!! Next try to get the column titles to be read from the data
        /*
        jQuery('#display_Accounts').dataTable( {
        "ajax": {
        "url": "http://docker01.concordservicing.com:9119/api/Account/GetAccountsByPortfolioId?portfolioId=2",
                "dataSrc": ""
            },
            "columns": [
            {"data": "ID" },
            {"data": "PortfolioID" },
            {"data": "CurrentBalance" },
            {"data": "AccountStatus" }
            ]
        } );
        */

        // Create the datatable and initialize it
        var demoDatatable = jQuery('#display_Accounts').dataTable( {
        destroy: true,
            data: _accounts,
            colReorder: true,
            dom: 'Bfrtip',
            buttons: ['pageLength', 'colvis', 'excelHtml5', 'pdf', 'copy', 'print'],
            columns: [
                {"title": "ID" },
                {"title": "Portfolio ID" },
                {"title": "Current Balance" },
                {"title": "Account Status" },
                {"title": "As Of Date" }
            ]
        } );

        // Add some buttons NOT WORKING 'demoDatable is not a function'
        new jQuery.fn.dataTable.Buttons( demoDatatable, {
        name: 'commands',
            buttons: [
                {
        extend: 'collection',
                    text: 'Export',
                    buttons: [ 'excelHtml5', 'pdf', 'copy' ],
                    fade: true
                }
            ]
        } );
        //demoDatatable.buttons().containers().appendTo( 'body' );


        // Highlight the row and column when hover NOT WORKING 'demoDatable is not a function'
        jQuery('#display_Accounts tbody')
        .on( 'mouseenter', 'td', function () {
            var colIdx = demoDatatable.cell(this).index().column;

            jQuery( demoDatatable.cells().nodes() ).removeClass( 'highlight' );
            jQuery( demoDatatable.column( colIdx ).nodes() ).addClass( 'highlight' );
        } );

    }


    //******************************************************************************
    function TriggerPortfolioSelected(obj) {
        console.log("In TriggerPortfolioSelected, slected index=" + obj.selectedIndex);

        var event = new CustomEvent("PortfolioSelected", {
            detail: {
                message: "PortfolioSelected",
				portfolio: obj.options[obj.selectedIndex].text,
			},
			bubbles: true,
			cancelable: true
		});
	
		obj.dispatchEvent(event);
    }


    </script>
    <link rel="stylesheet" type="text/css" href="/wp-content/techdemo/DataTables/datatables.min.css" />
    <script type="text/javascript" src="/wp-content/techdemo/DataTables/datatables.min.js"></script>

    <!--
        https://datatables.net/reference/button/
-->