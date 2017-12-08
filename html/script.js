<script type="text/javascript">

    var portfoliosDatatable;

    //******************************************************************************
    function storageAvailable(type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage.length !== 0;
        }
    }


    //******************************************************************************
    function objectsToArray(objectsToConvert) {
        // Transform the converted json into a flat array without attribute names
        var _objectsToConvert = [];
        var res = Object.keys(objectsToConvert)
          // iterate over them and generate the array
          .map(function(k) {
            // generate the array element 
            var _convertedObject = [];
            for(var propt in  objectsToConvert[k]){
        _convertedObject.push(objectsToConvert[k][propt]);
            }
            _objectsToConvert.push(_convertedObject);
        });

    }



    //******************************************************************************
    function TableOnLoad(item) {
        console.log("In TableOnLoad: " + item);
    }

    //******************************************************************************
    function TableOnPageShow(item) {
        console.log("In TableOnPageShow: " + item);
    }

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

        xhttp.open("GET", "http://localhost:63982/api/values/"+AccountNumber);
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

        // Convert the data to a flat array
        _portfolios = objectsToArray(portfolios);
        console.dir(_portfolios);

        // Display the portfolios in a table
        portfoliosDatatable = jQuery('#display_Portfolios').dataTable( {
        destroy: true,
            data: _portfolios,
            colReorder: true,
            dom: 'Bfrtip',
            buttons: ['pageLength', 'colvis'],
            columns: [
                {"title": "# of Accounts" },
                {"title": "As Of Date" },
                {"title": "ID" },
                {"title": "Portfolio Name" },
                {"title": "Total Balance" }
            ]
        } );


/*
        // Populate the selector for the portfolios
        jQuery.each(portfolios, function (key, value) {
        jQuery("#display_portfolioSelector").append(jQuery('<option></option>').val(value.id).html(value.name));
        });
*/
    }


    //******************************************************************************
    function UserActionGetPortfolios() {
        console.log("In GetPortfolios");
        if (storageAvailable('localStorage')) {
            // Yippee! We can use localStorage awesomeness
            console.log("Local storage available");
        }
        else {
            // Too bad, no localStorage for us
            console.log("Local storage NOT!!!!! available");
        }

        var xhttp = new XMLHttpRequest();
        xhttp.addEventListener("load", GetPortfoliosListener);

        xhttp.open("GET", "http://docker01.concordservicing.com:9119/api/Portfolio/GetPortfolios");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();

    }


    //******************************************************************************
    function UserActionGetAccountsByPortfolioId(Id) {
        console.log("In GetAccountsByPortfolioId, Id="+Id);

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

        // Convert the data to a flat array
        _accounts = objectsToArray(accounts);

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
                {"title": "Account Status" },
                {"title": "As Of Date" },
                {"title": "Current Balance" },
                {"title": "ID" },
                {"title": "Portfolio ID" }
            ]
        } );

        // Add some buttons NOT WORKING 'demoDatable is not a function'
/*
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
        demoDatatable.buttons().containers().appendTo( 'body' );
*/

        // Highlight the row and column when hover NOT WORKING 'demoDatable is not a function'
/*
        jQuery('#display_Accounts tbody')
        .on( 'mouseenter', 'td', function () {
            var colIdx = demoDatatable.cell(this).index().column;
  
            jQuery( demoDatatable.cells().nodes() ).removeClass( 'highlight' );
            jQuery( demoDatatable.column( colIdx ).nodes() ).addClass( 'highlight' );
        } );
*/
    }



    //******************************************************************************
    function UserActionGetRulesByPortfolioId(Id) {
        console.log("In GetRulesByPortfolioId, Id=" + Id);

        var xhttp = new XMLHttpRequest();
        xhttp.addEventListener("load", GetRulesByPortfolioIdListener);

        xhttp.open("GET", "http://10.123.11.65:9119/api/rules/"+Id);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();

    }



    //******************************************************************************
    function GetRulesByPortfolioIdListener() {
        console.log("In GetRulesByPortfolioIdListener");
        console.log(this.responseText);

        accounts = JSON.parse(this.responseText);
/*
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
*/
    }




</script>
<link rel="stylesheet" type="text/css" href="/wp-content/techdemo/DataTables/datatables.min.css" />
<script type="text/javascript" src="/wp-content/techdemo/DataTables/datatables.min.js"></script>

    <!--
    https://datatables.net/reference/button/
    -->
