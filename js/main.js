

(function (global) {

    var dc = {};

    var homeHtml = "snippets/home-snippet.html";

    var categoryHtml = "snippets/category-snippet.html";

    var categoryJson = "json/katagoriler.json";

    var katagoriHTML = "snippets/katagoriler-snippet.html";
    var katagori_adiJson = "json/katagori_adi.json";

    var detayHTML = "snippets/detay-snippet.html";


    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    // Show loading icon inside element identified by 'selector'.
    var showLoading = function (selector) {
        var html = "";

        insertHtml(selector, html);
    };


    var insertProperty = function (string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string
            .replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    }
    // On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function (event) {

        // On first load, show home view
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            homeHtml,
            function (responseText) {
                document.querySelector("#main-content")
                    .innerHTML = responseText;
            },
            false);
    });

    
    dc.loadCategories = function () {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            categoryJson,
            buildCategoriesHTML, true);
    };


    function buildCategoriesHTML(categories) {

        $ajaxUtils.sendGetRequest(
            categoryHtml, function (responseText) {
                var finalHtml = "";
                finalHtml += "<section class='row'>";

                // Loop over categories
                for (var i = 0; i < categories.length; i++) {
                    // Insert category values
                    var html = responseText;
                    
                    var name = "" + categories[i].name;

                    html =
                        insertProperty(html, "name", name);

                    finalHtml += html;
                }

                finalHtml += "</section>";
                insertHtml("#main-content", finalHtml);
            }, false
        )

    }

    dc.loadElectronicss = function(){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            katagori_adiJson,
            buildKatagorieHTML, true);
    };

    function buildKatagorieHTML(categories) {
        $ajaxUtils.sendGetRequest(
            katagoriHTML, function (responseText) {
                var finalHtml = "";
                finalHtml += "<section class='row'>";
                
            
                // Loop over categories
                for (var i = 0; i < categories.length; i++) {
                    // Insert category values
                    var html = responseText;
                    
                    var name = "" + categories[i].isim;
                    var id = categories[i].id;
                    html =
                        insertProperty(html, "isim", name);
                    html= insertProperty(html,"id",id);

                    finalHtml += html;
                }

                finalHtml += "</section>";
                insertHtml("#main-content", finalHtml);
            }, false
        )

    }

    dc.loadElectronics = function(id){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            katagori_adiJson,
            (category) => builddetayHTML(category, id), true
        );
    };
    function builddetayHTML(categories, id){
        
        $ajaxUtils.sendGetRequest(
            detayHTML, function(responseText){
                var finalHtml = "";
                finalHtml += "<section class='row'>";
                var html = responseText;
                var name = ""+ categories[id-1].isim;
                var model = ""+ categories[id-1].model;
                var marka = ""+ categories[id-1].marka;
                var fiyat = ""+ categories[id-1].modelPrice;
                var ozet = ""+ categories[id-1].modelDetails;

                html = insertProperty(html,"isim", name);
                html = insertProperty(html,"model", model);
                html = insertProperty(html,"marka", marka);
                html = insertProperty(html,"modelPrice",fiyat);
                html = insertProperty(html,"modelDetails",ozet);
                
                finalHtml += html;
                finalHtml += "</section>";
                insertHtml("#main-content", finalHtml);

            }, false
        );
    };


    global.$dc = dc;

})(window);
