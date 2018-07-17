/**
 * Created by Reshan Pubudu on 3/6/2018.
 */

dashboard();

function dashboard() {
    var html =
        "<style>\n" +
        "    #serchform table thead th {\n" +
        "        background-color: transparent;\n" +
        "    }\n" +
        "    #serchform table thead{\n" +
        "        background-color: transparent;\n" +
        "    }\n" +
        "    #serchform table{\n" +
        "        background-color: transparent;\n" +
        "    }\n" +
        "</style>\n" +
        "    <div id=\"serchform\" action=\"\" method=\"get\" class=\"sidebar-form\" style=\"border: none\">\n" +
        "        <table>\n" +
        "            <thead>\n" +
        "                    <th>\n" +
        "                        <span class=\"btn btn-primary col-sm-12 col-sm-1\" style=\"background-color: transparent;font-size: 18px;color: black\" readonly=\"\">PO#</span>\n" +
        "                    </th>\n" +
        "               <form action=\"\" id=\"\">\n" +
        "                    <th>\n" +
        "                        <div id=\"searchByPo\" class=\"input-group col-sm-12 col-sm-2\">\n" +
        "                             <input id=\"po\" type=\"text\" name=\"po\" class=\"form-control\" onkeyup=\"searchBy()\" style=\"width: 150px\" placeholder=\"Search...\">\n" +
        "                             <span class=\"input-group-btn\">\n" +
        "                                 <span id=\"searchByPo\" type=\"submit\" name=\"search\" onclick=\"searchBy()\" class=\"btn btn-flat\">\n" +
        "                                     <i class=\"fa fa-search\" ></i>\n" +
        "                                 </span>\n" +
        "                             </span>\n" +
        "                        </div>\n" +
        "                    </th>\n" +
        "                   </form>\n" +
        "                    <th>\n" +
        "                        <span class=\"btn btn-primary col-sm-12 col-sm-1\" style=\"background-color: transparent;font-size: 18px;color: black\" readonly=\"\">Supplier</span>\n" +
        "                    </th>\n" +
        "                    <th>\n" +
        "                        <div class=\"input-group col-sm-12 col-sm-2\">\n" +
        "                            <input id=\"supplier\" type=\"text\" name=\"supplier\" class=\"form-control\" onkeyup=searchBy() style=\"width: 150px\" placeholder=\"Search...\">\n" +
        "                            <span class=\"input-group-btn\">\n" +
        "                                <span type=\"submit\" name=\"search\" id=\"search-btn\" onclick=\"searchBy()\" class=\"btn btn-flat\">\n" +
        "                                    <i class=\"fa fa-search\"></i>\n" +
        "                                </span>\n" +
        "                            </span>\n" +
        "                        </div>\n" +
        "                    </th>\n" +
        "                    <th>\n" +
        "                        <span class=\"btn btn-primary col-sm-12 col-sm-1\" style=\"background-color: transparent;font-size: 18px;color: black\" readonly=\"\">Category</span>\n" +
        "                    </th>\n";
    html +=
        "                    <th>\n" +
        "                        <div class=\"input-group col-sm-12 col-sm-2\">\n" +
        "                            <input id=\"category\" type=\"text\" name=\"category\" class=\"form-control\" onkeyup=\"searchBy()\" style=\"width: 150px\" placeholder=\"Search...\">\n" +
        "                            <span class=\"input-group-btn\">\n" +
        "                                <span type=\"submit\" name=\"search\" id=\"search-btn\" onclick=\"searchBy()\" class='btn btn-flat'>\n" +
        "                                        <i class=\"fa fa-search\"></i>\n" +
        "                                </span>\n" +
        "                            </span>\n" +
        "                        </div>\n" +
        "                    </th>\n" +
        "            </thead>\n" +
        "        </table>\n" +
        "    </div>\n" +
        "    <form action=\"\" class=\"sidebar-form\" style=\"border: none\">\n" +
        "    </form>\n" +
        "<section class=\"content-header\">\n" +
        "    <link rel=\"stylesheet\" href=\"css/font-awesome.css\">\n" +
        "    <form id=\"itemForm\">\n" +
        "        <table id=\"itemTbl\" class=\"table table-bordered table-dark table-hover  ui celled padded table selectable unstackable\">\n" +
        "            <thead>\n" +
        "            <tr>\n" +
        "                <th>PO#</th>\n" +
        "                <th>Supplier</th>\n" +
        "                <th>Category</th>\n" +
        "                <th>Received Date</th>\n" +
        "                <th>Delivered Date</th>\n" +
        "            </tr>\n" +
        "            </thead>\n" +
        "            <tbody id=\"ordertablebody\">\n" +
        "    </tbody>\n" +
        "        </table>\n" +
        "        <p>\n" +
        "            <button onclick=placeOrder() type=\"button\" class=\"btn btn-primary\">Place Order</button>\n" +
        "            <button onclick='viewAll()' type=\"button\" class=\"btn btn-success\" style=\"float: right\">View All</button>\n" +
        "        </p>\n" +
        "    </form>\n" +
        "</section>\n";
    $('#mainContent').html(html);
    dashboardView();
}

function dashboardView() {
    loadOrderTblBody('dashboard', 0, 0);
}

function viewAll() {
    loadOrderTblBody('all', 0, 0);
}

function searchBy(){
    loadOrderTblBody('searchby', 0, 0);
}

function loadOrderTblBody(type, startwith, endwith) {
    var request = {};
    if(type === 'all'){
        request = {'type':type};
    } else if (type === 'dashboard'){
        request = {'type':type};
    } else if (type === 'searchby'){
        request = {'type':type, 'po':$('#po').val(), 'supplier':$('#supplier').val(), 'category':$('#category').val()};
    }
    $.get('viewOrders.php', request, function (responce) {
        var html = "";
        if (responce !== "") {
            var responces = JSON.parse(responce);
            for (var i = 1; i < responces.length; i++) {
                html +=
                    "<tr id=\"orderDetailRow\" onclick='orderTableRowOnclick(this)'>" +
                    "   <td id='po'>" + (responces[i][1]).substr(0,9)+ ".." + "</td>" +
                    "   <td id='supplier'>" + responces[i][8] + "</td>" +
                    "   <td id='category'>" + responces[i][9] + "</td>" +
                    "   <td id='receiveddate'>" + responces[i][4] + "</td>" +
                    "   <td id='delivereddate'>" + responces[i][6] + "</td>" +
                    "   <input type='hidden' value='" + responces[i][0] + "'>" +
                    "</tr>";
            }
        } else {
            html +=
                "<tr onclick=''>" +
                "   <td id='po'>N%</td>" +
                "   <td id='supplier'>N%</td>" +
                "   <td id='category'>N%</td>" +
                "   <td id='receiveddate'>N%</td>" +
                "   <td id='delivereddate'>N%</td>" +
                "</tr>";
        }
        $('#ordertablebody').html(html);
    });
}

function orderTableRowOnclick(id) {
    $('#mainContent').html(testOrder());
    $.get('searchOrder.php', {'oid':$(id).children('input').val()}, function (responce) {
        var res = JSON.parse(responce);
        var categories = "";
        for(var i = 1; i<res.categorys.length; i++){
            categories += "<input class=\"form-control\" value=\"" +res.categorys[i][1]+"\" readonly>\n";
        }
        $('#po').val(res.po);
        $('#project').val(res.project);
        $('#description').val(res.description);
        $('#sid').val(res.sid);
        $('#received').attr('checked', res.received == 1 ? true:false);
        $('#receiveddate').val(res.receivedDate);
        $('#delivereddate').val(res.deliveredDate);
        $('#categoriesselector').html(categories);
        document.getElementById("po").setAttribute("readonly", true);
        document.getElementById("project").setAttribute("readonly", true);
        document.getElementById("description").setAttribute("readonly", true);
        document.getElementById("sid").setAttribute("readonly", true);
        document.getElementById("received").setAttribute("readonly", true);
        document.getElementById("receiveddate").setAttribute("readonly", true);
        document.getElementById("delivereddate").setAttribute("readonly", true);
        $('#starratings').html(
            "       <style>" +
            "           fieldset, label { margin: 0; padding: 0; }\n" +
            "           .rating {border: none;float: left; display: inline}\n" +
            "           .rating > input { display: none; } \n" +
            "           .rating > label:before {margin: 5px;font-size: 2.25em;font-family: FontAwesome;display: inline-block;content: \"\\f005\";}\n" +
            "           .rating > .half:before {content: \"\\f089\";position: absolute;}\n" +
            "           .rating > label {color: #ddd;float: right;}\n" +
            "       </style>\n" +
            "               <fieldset id='starset' class=\"rating\">\n" +
            "                   <input type=\"radio\" id=\"star5\" value=\"5\" /><label id=\"star5lbl\" class = \"full\" title=\"Awesome - 5 stars\" value=\"5\"></label>\n" +
            "                   <input type=\"radio\" id=\"star4half\" value=\"4.5\" /><label id=\"star4halflbl\" class=\"half\" title=\"Pretty good - 4.5 stars\"  value=\"4.5\"></label>\n" +
            "                   <input type=\"radio\" id=\"star4\" value=\"4\" /><label id=\"star4lbl\" class = \"full\" title=\"Pretty good - 4 stars\"  value=\"4\"></label>\n" +
            "                   <input type=\"radio\" id=\"star3half\" value=\"3.5\" /><label id=\"star3halflbl\" class=\"half\" title=\"Meh - 3.5 stars\"  value=\"3.5\"></label>\n" +
            "                   <input type=\"radio\" id=\"star3\" value=\"3\" /><label id=\"star3lbl\" class = \"full\" title=\"Meh - 3 stars\"  value=\"3\"></label>\n" +
            "                   <input type=\"radio\" id=\"star2half\" value=\"2.5\" /><label id=\"star2halflbl\" class=\"half\" title=\"Kinda bad - 2.5 stars\"  value=\"2.5\"></label>\n" +
            "                   <input type=\"radio\" id=\"star2\" value=\"2\" /><label id=\"star2lbl\" class = \"full\" title=\"Kinda bad - 2 stars\"  value=\"2\"></label>\n" +
            "                   <input type=\"radio\" id=\"star1half\" value=\"1.5\" /><label id=\"star1halflbl\" class=\"half\" title=\"Meh - 1.5 stars\"  value=\"1.5\"></label>\n" +
            "                   <input type=\"radio\" id=\"star1\" value=\"1\" /><label id=\"star1lbl\" class = \"full\" title=\"Sucks big time - 1 star\"  value=\"1\"></label>\n" +
            "                   <input type=\"radio\" id=\"starhalf\" value=\".5\" /><label id=\"starhalflbl\" class=\"half\" title=\"Sucks big time - 0.5 stars\"  value=\".5\"></label>" +
            "               </fieldset>\n" +
            "               <br><b><span style='font-size: 15px' id='ratingvalue'>0</span></b>\n");
        setRatings(res.rating);
        $('#btnlocation').html(
            "<div class=\"col-sm-2\">\n" +
            "    <button id=\"backDashBoard\" type=\"button\" class=\"btn btn-success\" onclick=dashboard()>Back</button>\n" +
            "</div>\n");
    });
}

function setRatings(rate){
    var stars = ['starhalflbl','star1lbl','star1halflbl','star2lbl','star2halflbl','star3lbl','star3halflbl','star4lbl','star4halflbl','star5lbl'];
    var i = rate/0.5;
    $('#ratingvalue').text($('#'+stars[i-1]).attr('title'));
    while(i--!=0) {
        $('#'+stars[i]).css('color','#FFD700');
    }
}

function placeOrder() {
    // $('#mainContent').html(returnPlaceOrderForm());
    $('#mainContent').html(testOrder());
    $.get('viewSuppliers.php',{'type':'names'},function (responce) {
        if(responce !== "") {
            var responces = JSON.parse(responce);
            var suppliers = "<select class=\"form-control select2-dropdown\" name=\"supplier\" id=\"supplierselector\" onchange=\"supplierOnChange(this)\">\n";
            // var supplier = "";
            for (var i = 1; i < responces.length; i++) {
                suppliers += "<option value=\"" + responces[i][0] + "\">" + responces[i][1] + "</option>\n";
            }
            suppliers += "</select>\n";
            $('#suppliersselect').html(suppliers);
        } else {
            alert('pleace add Supplier');
        }
    });

    $.get('viewCategories.php', {'type':'all'}, function (responce) {
        if (responce !== "") {
            var responces = JSON.parse(responce);
            var categorys =
                "   <style>" +
                "       #categoryselector {background-color: #00a65a;color: whitesmoke; border-bottom: solid 3px #00e765; height:38px;width:150px;border-radius:8px;text-align: center;font-size: 20px;margin-bottom: 10px;cursor: pointer}   " +
                "   </style>" +
                "        <div class=\"row\">\n" +
                "          <div class=\"col-xs-12\">\n" +
                "            <div class=\"filter-container isotopeFilters\">\n" +
                "              <ul id='categoriesselector' class=\"list-inline filter\">\n";
            for (var i = 1; i < responces.length; i++) {
                if (i > 10) break;
                categorys +=
                    "<li id=\"categoryselector\" onmouseenter=\"categoryMouseEvent(this)\" onmouseout=\"categoryMouseEvent(this)\" onclick=\"categoryOnClick(this)\">" +
                    responces[i][1] +
                    "   <input id=\"categoryId\" type=\"hidden\" value=\"" + responces[i][0] + "\">" +
                    "   <input id=\"clicked\" type=\"hidden\" value=\"0\">" +
                    "</li>\n";
            }
            categorys +="              </ul>\n" +
                "          </div>\n" +
                "        </div>" +
                "       </div>";
            $('#categoriesselector').html(categorys);
        } else {
            alert('pleace add Category');
        }
    });
    $('#starratings').html(
        "       <style>" +
        "           fieldset, label { margin: 0; padding: 0; }\n" +
        "           .rating {border: none;float: left; display: inline}\n" +
        "           .rating > input { display: none; } \n" +
        "           .rating > label:before {margin: 5px;font-size: 2.25em;font-family: FontAwesome;display: inline-block;content: \"\\f005\";}\n" +
        "           .rating > .half:before {content: \"\\f089\";position: absolute;}\n" +
        "           .rating > label {color: #ddd;float: right;}\n" +
        "           .rating > input:checked ~ label, /* show gold star when clicked */\n" +
        "           .rating:not(:checked) > label:hover, /* hover current star */\n" +
        "           .rating:not(:checked) > label:hover ~ label { color: #FFD700;  } /* hover previous stars in list */\n" +
        "           .rating > input:checked + label:hover, /* hover current star when changing rating */\n" +
        "           .rating > input:checked ~ label:hover,\n" +
        "           .rating > label:hover ~ input:checked ~ label, /* lighten current selection */\n" +
        "           .rating > input:checked ~ label:hover ~ label { color: #FFED85;  } \n" +
        "       </style>\n" +
        "    <p class=\"form-group\" style='margin-bottom:0px '>\n" +
        "       <label style='margin: 0px; padding: 0px;'>Rating:</label>" +
        "    </p>" +
        "   <fieldset id='starset' class=\"rating\">\n" +
        "       <input type=\"radio\" id=\"star5\" name=\"rating\" value=\"5\" /><label onclick='starSet(this)' class = \"full\" for=\"star5\" title=\"Awesome - 5 stars\" value=\"5\"></label>\n" +
        "       <input type=\"radio\" id=\"star4half\" name=\"rating\" value=\"4.5\" /><label onclick='starSet(this)' class=\"half\" for=\"star4half\" title=\"Pretty good - 4.5 stars\"  value=\"4.5\"></label>\n" +
        "       <input type=\"radio\" id=\"star4\" name=\"rating\" value=\"4\" /><label onclick='starSet(this)' class = \"full\" for=\"star4\" title=\"Pretty good - 4 stars\"  value=\"4\"></label>\n" +
        "       <input type=\"radio\" id=\"star3half\" name=\"rating\" value=\"3.5\" /><label onclick='starSet(this)' class=\"half\" for=\"star3half\" title=\"Meh - 3.5 stars\"  value=\"3.5\"></label>\n" +
        "       <input type=\"radio\" id=\"star3\" name=\"rating\" value=\"3\" /><label onclick='starSet(this)' class = \"full\" for=\"star3\" title=\"Meh - 3 stars\"  value=\"3\"></label>\n" +
        "       <input type=\"radio\" id=\"star2half\" name=\"rating\" value=\"2.5\" /><label onclick='starSet(this)' class=\"half\" for=\"star2half\" title=\"Kinda bad - 2.5 stars\"  value=\"2.5\"></label>\n" +
        "       <input type=\"radio\" id=\"star2\" name=\"rating\" value=\"2\" /><label onclick='starSet(this)' class = \"full\" for=\"star2\" title=\"Kinda bad - 2 stars\"  value=\"2\"></label>\n" +
        "       <input type=\"radio\" id=\"star1half\" name=\"rating\" value=\"1.5\" /><label onclick='starSet(this)' class=\"half\" for=\"star1half\" title=\"Meh - 1.5 stars\"  value=\"1.5\"></label>\n" +
        "       <input type=\"radio\" id=\"star1\" name=\"rating\" value=\"1\" /><label onclick='starSet(this)' class = \"full\" for=\"star1\" title=\"Sucks big time - 1 star\"  value=\"1\"></label>\n" +
        "       <input type=\"radio\" id=\"starhalf\" name=\"rating\" value=\".5\" /><label onclick='starSet(this)' class=\"half\" for=\"starhalf\" title=\"Sucks big time - 0.5 stars\"  value=\".5\"></label>" +
        "   </fieldset>" +
        "   <br><b><span style='font-size: 15px' id='ratingvalue'>0</span></b>");
    $('#btnlocation').html(
        "<div class=\"col-sm-8\"></div>" +
        "<div class=\"col-sm-1\">\n" +
        "   <button class=\"btn btn-success\" type=\"button\" onclick=\"dashboard()\">View All Orders</button>" +
        "</div>" +
        "<div class=\"col-sm-2\">\n" +
        "   <button class=\"btn btn-primary\" type=\"button\" onclick=\"addOrder()\">Create Order</button>" +
        "</div>");
}

function categoryMouseEvent(id) {
    if($(id).children('#clicked').val() != 2){
        if($(id).children('#clicked').val() == 0 ){
            $(id).css("background-color" , "#00e765");
            $(id).css("color" , "white");
            $(id).css("border-bottom" , "solid 5px #00a65a");
            $(id).children('#clicked').val(1);
        } else if ($(id).children('#clicked').val() == 1){
            $(id).css("background-color" , "#00a65a");
            $(id).css("color" , "whitesmoke");
            $(id).css("border-bottom" , "solid 3px #00e765");
            $(id).children('#clicked').val(0);
        }
    }
}

var catarray = [] ;
function categoryOnClick(id) {
    if($(id).children('#clicked').val() != 2){
        $(id).css("background-color" , "#00e765");
        $(id).css("color" , "white");
        $(id).css("border-bottom" , "solid 5px #00a65a");
        $(id).children('#clicked').val(2);
        catarray.push($(id).children('#categoryId').val());
    } else {
        $(id).css("background-color" , "#00a65a");
        $(id).css("color" , "whitesmoke");
        $(id).css("border-bottom" , "solid 3px #00e765");
        $(id).children('#clicked').val(1);
        catarray.splice(catarray.indexOf($(id).children('#categoryId').val()),1);
    }
}

//  Rating stars

function starSet(id) {
    $('#ratingvalue').text($(id).attr('title'));
    $('#ratingfinal').val($(id).attr('value'));
}

function supplierOnChange(id) {
//        alert($(id).val());
}

function addOrder() {
    if(catarray.length!=0) {
        $.post("addOrder.php", {"form": $("#placeOrderForm").serializeArray(), "array": catarray}, function (responce) {
            if (responce == 1) {
                alert('Place Order Succses');
                $('#po').val("");
                $('#project').val("");
                $('#description').val("");
                $('#receiveddate').val("");
                $('#received').attr("checked", false);
                $('#delivereddate').val("");
                $('#rating').val("");
                catarray = [];
            } else {
                alert('Place Order faild');
            }
        });
    } else {
        alert("Pleace Select Category");
    }
}

function updateOrderView() {
    $('#mainContent').html(testOrder());
    var po =
        "<select class=\"form-control select2-dropdown\" name=\"po\" id=\"po\" onchange=\"updateOrderSearch()\">\n";
    $.get('viewOrders.php', {'type': 'po'}, function (responce) {
        if(responce !== "") {
            var responces = JSON.parse(responce);
            for (var i = 1; i < responces.length; i++) {
                po += "<option value=\"" + responces[i][0] + "\">" + responces[i][1] + "</option>\n";
            }
        } else {
            alert('No Orders..');
        }
        po += "</select>\n";
        $('#poselect').html(po);
        updateOrderSearch();
    });
}

function updateOrderSearch(){
    $.get('searchOrder.php', {'oid':$('#po').val()}, function (responce) {
        var res = JSON.parse(responce);
        var categories = "";
        for(var i = 1; i<res.categorys.length; i++){
            categories += "<input class=\"form-control\" value=\"" +res.categorys[i][1]+"\" readonly>\n";
        }
        $('#project').val(res.project);
        $('#description').val(res.description);
        $('#sid').val(res.sid);
        $('#received').attr('checked', res.received == 1 ? true:false);
        $('#receiveddate').val(res.receivedDate);
        $('#delivereddate').val(res.deliveredDate);
        $('#categoriesselector').html(categories);
        $('#starratings').html(
            "<style>" +
            "    fieldset, label { margin: 0; padding: 0; }\n" +
            "    .rating {border: none;float: left; display: inline}\n" +
            "    .rating > input { display: none; } \n" +
            "    .rating > label:before {margin: 5px;font-size: 2.25em;font-family: FontAwesome;display: inline-block;content: \"\\f005\";}\n" +
            "    .rating > .half:before {content: \"\\f089\";position: absolute;}\n" +
            "    .rating > label {color: #ddd;float: right;}\n" +
            "    .rating > input:checked ~ label, /* show gold star when clicked */\n" +
            "    .rating:not(:checked) > label:hover, /* hover current star */\n" +
            "    .rating:not(:checked) > label:hover ~ label { color: #FFD700;  } /* hover previous stars in list */\n" +
            "    .rating > input:checked + label:hover, /* hover current star when changing rating */\n" +
            "    .rating > input:checked ~ label:hover,\n" +
            "    .rating > label:hover ~ input:checked ~ label, /* lighten current selection */\n" +
            "    .rating > input:checked ~ label:hover ~ label { color: #FFED85;  } \n" +
            "</style>\n" +
            "<p class=\"form-group\" style='margin-bottom:0px '>\n" +
            "    <label style='margin: 0px; padding: 0px;'>Rating:</label>" +
            "</p>" +
            "<fieldset id='starset' class=\"rating\">\n" +
            "    <input type=\"radio\" id=\"star5\" name=\"rating\" value=\"5\" /><label onclick='starSet(this)' class = \"full\" for=\"star5\" title=\"Awesome - 5 stars\" value=\"5\"></label>\n" +
            "    <input type=\"radio\" id=\"star4half\" name=\"rating\" value=\"4.5\" /><label onclick='starSet(this)' class=\"half\" for=\"star4half\" title=\"Pretty good - 4.5 stars\"  value=\"4.5\"></label>\n" +
            "    <input type=\"radio\" id=\"star4\" name=\"rating\" value=\"4\" /><label onclick='starSet(this)' class = \"full\" for=\"star4\" title=\"Pretty good - 4 stars\"  value=\"4\"></label>\n" +
            "    <input type=\"radio\" id=\"star3half\" name=\"rating\" value=\"3.5\" /><label onclick='starSet(this)' class=\"half\" for=\"star3half\" title=\"Meh - 3.5 stars\"  value=\"3.5\"></label>\n" +
            "    <input type=\"radio\" id=\"star3\" name=\"rating\" value=\"3\" /><label onclick='starSet(this)' class = \"full\" for=\"star3\" title=\"Meh - 3 stars\"  value=\"3\"></label>\n" +
            "    <input type=\"radio\" id=\"star2half\" name=\"rating\" value=\"2.5\" /><label onclick='starSet(this)' class=\"half\" for=\"star2half\" title=\"Kinda bad - 2.5 stars\"  value=\"2.5\"></label>\n" +
            "    <input type=\"radio\" id=\"star2\" name=\"rating\" value=\"2\" /><label onclick='starSet(this)' class = \"full\" for=\"star2\" title=\"Kinda bad - 2 stars\"  value=\"2\"></label>\n" +
            "    <input type=\"radio\" id=\"star1half\" name=\"rating\" value=\"1.5\" /><label onclick='starSet(this)' class=\"half\" for=\"star1half\" title=\"Meh - 1.5 stars\"  value=\"1.5\"></label>\n" +
            "    <input type=\"radio\" id=\"star1\" name=\"rating\" value=\"1\" /><label onclick='starSet(this)' class = \"full\" for=\"star1\" title=\"Sucks big time - 1 star\"  value=\"1\"></label>\n" +
            "    <input type=\"radio\" id=\"starhalf\" name=\"rating\" value=\".5\" /><label onclick='starSet(this)' class=\"half\" for=\"starhalf\" title=\"Sucks big time - 0.5 stars\"  value=\".5\"></label>" +
            "</fieldset>" +
            "<br><b><span style='font-size: 15px' id='ratingvalue'>0</span></b>");
        $('#btnlocation').html(
            "<div class=\"col-sm-2\">\n" +
            "    <button id=\"backDashBoard\" type=\"button\" class=\"btn btn-success\" onclick=dashboard()>Back</button>\n" +
            "</div>\n" +
            "<div class=\"col-sm-7\"></div>\n" +
            "<div class=\"col-sm-2\">\n" +
            "    <button id=\"backDashBoard\" type=\"button\" class=\"btn btn-success\">Update Order</button>\n" +
            "</div>\n");
        setRatings(res.rating);
    });
}

// Manage Supplier Script

function addSupplier() {
    $('#mainContent').html(returnSupplierForm());
}

function saveSupplier() {
    $.post("addSupplier.php",$("#addSupplierForm").serialize(), function (responce) {
        if(responce==1){
            $('#addSupplierForm :input').each(function () {
                if($(this).attr('type') !== 'button'){
                    $(this).val('');
                }
            });
            alert('Supplier added');
        }else {
            alert('Supplier Added faild');
        }
    });
}

function viewAllSuppliers() {
    var html =
        "<section class=\"content-header\">\n" +
        "    <link rel=\"stylesheet\" href=\"css/font-awesome.css\">\n" +
        "    <form id=\"itemForm\">\n" +
        "        <table id=\"itemTbl\" class=\"table table-bordered table-dark table-hover  ui celled padded table selectable unstackable\">\n" +
        "            <thead>\n" +
        "            <tr>\n" +
        "                <th>Supplier Name</th>\n" +
        "                <th>Country</th>\n" +
        "                <th style='width: 130px;'>Contact</th>\n" +
        "                <th>E-Mail</th>\n" +
        "                <th style='width: 130px;'>Fax No.</th>\n" +
        "            </tr>\n" +
        "            </thead>\n" +
        "            <tbody id=\"supplierTblBody\">\n";
    $.get('viewSuppliers.php', {'type':'all'}, function (responce) {
        if(responce !== "") {
            var responces = JSON.parse(responce);
            for (var i = 1; i < responces.length; i++) {
                if (i > 10) break;
                html +=
                    "<tr onclick=\"supplierTableRowOnClick(this)\">" +
                    "   <td id='supplierName'>" + responces[i][1] + "</td>" +
                    "   <td id='addressForcorrCountry'>" + responces[i][2] + "</td>" +
                    "   <td id='telephone'>" + responces[i][3] + "</td>" +
                    "   <td id='email'>" + responces[i][4] + "</td>" +
                    "   <td id='fax'>" + responces[i][5] + "</td>" +
                    "   <input type='hidden' value='" + responces[i][0] + "'>" +
                    "</tr>";
            }
        } else {
            html +=
                "<tr onclick=\"\">" +
                "   <td id='po'>N%</td>" +
                "   <td id='supplier'>N%</td>" +
                "   <td id='category'>N%</td>" +
                "   <td id='receiveddate'>N%</td>" +
                "   <td id='delivereddate'>N%</td>" +
                "</tr>";
        }
        html+=
            "           </tbody>\n" +
            "        </table>\n" +
            "        <p>\n" +
            "            <button id=\"placeOrder\" type=\"submit\" class=\"btn btn-primary\" style=\"color: white\" onclick=addSupplier()>Add Supplier</button>\n" +
            "        </p>\n" +
            "\n" +
            "    </form>\n" +
            "</section>";
        $('#mainContent').html(html);
    });
}

function supplierTableRowOnClick(id) {
    $('#mainContent').html(returnSupplierForm());
    $('#addSupplierForm :input').each(function () {
        if($(this).attr('type') !== 'button'){
            $(this).attr('readonly', true);
        }
    });
    $('#buttondiv').html("<button id=\"back\" type=\"button\" class=\"btn btn-success\" onclick=viewAllSuppliers()>Back</button>");

    $.get('searchSupplier.php', {'sid':$(id).children('input').val()}, function (responce) {
        var res = JSON.parse(responce);
        $('#addSupplierForm input[name = supplierName                       ]').val(res.supplierName                       );
        $('#addSupplierForm input[name = addressForcorrStreetAndNum         ]').val(res.addressForcorrStreetAndNum         );
        $('#addSupplierForm input[name = addressForcorrCity                 ]').val(res.addressForcorrCity                 );
        $('#addSupplierForm input[name = addressForcorrCountry              ]').val(res.addressForcorrCountry              );
        $('#addSupplierForm input[name = addressForcorrPostalCode           ]').val(res.addressForcorrPostalCode           );
        $('#addSupplierForm input[name = telephone                          ]').val(res.telephone                          );
        $('#addSupplierForm input[name = fax                                ]').val(res.fax                                );
        $('#addSupplierForm input[name = email                              ]').val(res.email                              );
        $('#addSupplierForm input[name = contactPersonForPaymentTel         ]').val(res.contactPersonForPaymentTel         );
        $('#addSupplierForm input[name = contactPersonForPaymentEmail       ]').val(res.contactPersonForPaymentEmail       );
        $('#addSupplierForm input[name = contactPersonForOrderPlacementTel  ]').val(res.contactPersonForOrderPlacementTel  );
        $('#addSupplierForm input[name = contactPersonForOrderPlacementEmail]').val(res.contactPersonForOrderPlacementEmail);
        $('#addSupplierForm input[name = nominatedBy                        ]').val(res.nominatedBy                        );
        $('#addSupplierForm input[name = payeName                           ]').val(res.payeName                           );
        $('#addSupplierForm input[name = addressForPayStreetAndNum          ]').val(res.addressForPayStreetAndNum          );
        $('#addSupplierForm input[name = addressForPayCity                  ]').val(res.addressForPayCity                  );
        $('#addSupplierForm input[name = addressForPayCountry               ]').val(res.addressForPayCountry               );
        $('#addSupplierForm input[name = addressForPayPostalCode            ]').val(res.addressForPayPostalCode            );

        $('#addSupplierForm input[name = creaditPeriodDays                  ]').val(res.creaditPeriodDays                  );
        $('#addSupplierForm input[name = creaditPeriodIfOther               ]').val(res.creaditPeriodIfOther               );
        $('#addSupplierForm input[name = settlementCurrency                 ]').val(res.settlementCurrency                 );
        $('#addSupplierForm input[name = settlementCurrencyIfOther          ]').val(res.settlementCurrencyIfOther          );
        $('#addSupplierForm input[name = SVATNo                             ]').val(res.SVATNo                             );
        $('#addSupplierForm input[name = bankName                           ]').val(res.bankName                           );
        $('#addSupplierForm input[name = bankAccNo                          ]').val(res.bankAccNo                          );
        $('#addSupplierForm input[name = bankAddressStreetAndNum            ]').val(res.bankAddressStreetAndNum            );
        $('#addSupplierForm input[name = bankAddressCity                    ]').val(res.bankAddressCity                    );
        $('#addSupplierForm input[name = bankAddressCountry                 ]').val(res.bankAddressCountry                 );
        $('#addSupplierForm input[name = bankAddressBranch                  ]').val(res.bankAddressBranch                  );
        $('#addSupplierForm input[name = sortCode                           ]').val(res.sortCode                           );
        $('#addSupplierForm input[name = completedByName                    ]').val(res.completedByName                    );
        $('#addSupplierForm input[name = completedByDate                    ]').val(res.completedByDate                    );
    });
}

function updateSupplierSetForm() {
    $('#mainContent').html(returnSupplierForm());
    $.get('viewSuppliers.php', {'type':'supplierNames'}, function (responce) {
        var html = "<select class=\"form-control select2-dropdown\" style='height: 30px;font-size: 12px' onchange=\"findBySidAndSetSupplier(this)\">\n";
        if(responce !== "") {
            var responces = JSON.parse(responce);
            for (var i = 1; i < responces.length; i++) {
                html += "<option value=\"" + responces[i][0] + "\" style=''>" + responces[i][1] + "</option>\n";
            }
        } else {
            alert('No Supplier..');
        }
        html += "</select>\n";
        $('#supplierNameSelect').html(html);
    });
}

function findBySidAndSetSupplier(id) {
    alert($(id).val());
}

// Manage Category Script

function category() {
    var html =
        "<section class=\"content-header\">\n" +
        "    <link rel=\"stylesheet\" href=\"css/font-awesome.css\">\n" +
        "    <form id=\"\" action=\"\" method=\"\" enctype=\"\">\n" +
        "        <table id=\"itemTbl\" class=\"table table-bordered table-dark table-hover  ui celled padded table selectable unstackable\">\n" +
        "            <thead>\n" +
        "            <tr>\n" +
        "                <th></th>" +
        "                <th>Category</th>\n" +
        "                <th>Added Date</th>" +
        "            </tr>\n" +
        "            </thead>\n" +
        "            <tbody id=\"categorytblbody\">\n";
    $.get('viewCategories.php', {'type':'all'}, function (responce) {
        if(responce !== "") {
            var responces = JSON.parse(responce);
            for (var i = 1; i < responces.length; i++) {
                if (i > 10) break;
                html +=
                    "<tr onclick=''>\n" +
                    "   <td id='cid' style='width: 50px;'>" + responces[i][0] + "</td>" +
                    "   <td id='category'>" + responces[i][1] + "</td>\n" +
                    "   <td id='addeddate'>" + responces[i][2] + "</td>\n" +
                    "</tr>";
            }
        } else {
            html +=
                "<tr onclick=''>\n" +
                "   <td id='cid' style='width: 50px;'>N%</td>" +
                "   <td id='category'>N%</td>\n" +
                "   <td id='addeddate'>N%</td>\n" +
                "</tr>";
        }
        html +=
            "        </tbody>\n" +
            "        </table>\n" +
            "    </form>\n" +
            "</section>\n" +

            "<section class=\"content-header\">\n" +
            "<form id=\"addCategoryForm\">\n" +
            "   <p class=\"form-group\">\n" +
            "       <label>Category :</label>\n" +
            "       <input class=\"form-control\" name=\"category\" placeholder=\"Enter Category Name\">\n" +
            "   </p>\n" +
            "   <p class=\"form-group\">\n" +
            "       <label>Added Date :</label>\n" +
            "       <input class=\"form-control \" name=\"addeddate\" placeholder=\"Select Date\">\n" +
            "   </p>\n" +
            "   <p>\n" +
            "       <button onclick=addCategory() type=\"button\" class=\"btn btn-primary\">Add</button>\n" +
            "       <button onclick=updateCategory() type=\"button\" class=\"btn btn-success\">Update</button>\n" +
            "       <button onclick=deleteCategory() type=\"button\" class=\"btn btn-danger\">Delete</button>\n" +
            "   </p>\n" +
            "</form>\n" +
            "</section>";
        $('#mainContent').html(html);
    });
}

function addCategory() {
    $.post("addCategory.php",$("#addCategoryForm").serialize(), function (responce) {
        if(responce == 1){
            $.get('viewCategories.php', {'type':'all'}, function (responce) {
                var html = "";
                var responces = JSON.parse(responce);
                for (var i = 1; i < responces.length; i++) {
                    if (i > 10) break;
                    html +=
                        "<tr onclick=''>\n" +
                        "   <td id='cid' style='width: 50px;'>" + responces[i][0] + "</td>" +
                        "   <td id='category'>" + responces[i][1] + "</td>\n" +
                        "   <td id='addeddate'>" + responces[i][2] + "</td>\n" +
                        "</tr>";
                }
                $('#categorytblbody').html(html);
            });
        }else {
            alert('Added faild');
        }
    });
}

function updateCategory() {
//        $.post("addSupplier.php",$("#saveCategoryForm").serialize(), function (responce) {
//            if(responce==1){
//                alert('added');
//            }else {
//                alert('faild');
//            }
//        });
}

function deleteCategory() {
//        $.post("addSupplier.php",$("#saveCategoryForm").serialize(), function (responce) {
//            if(responce==1){
//                alert('added');
//            }else {
//                alert('faild');
//            }
//        });
}


function returnPlaceOrderForm() {
    var html =
        "<section class=\"content-header\">\n" +
        "<form id=\"placeOrderForm\">\n" +
        "    <p id=\"poselect\" class=\"form-group\">\n" +
        "        <label>PO#:</label>\n" +
        "        <input class=\"form-control\" id='po' name=\"po\" placeholder=\"Enter PO# Code\">\n" +
        "    </p>\n" +
        "    <p class=\"form-group\">\n" +
        "        <label>Project:</label>\n" +
        "        <input class=\"form-control \" id='project' name=\"project\" placeholder=\"Enter Description \">\n" +
        "    </p>\n" +
        "    <p class=\"form-group\">\n" +
        "        <label>Description:</label>\n" +
        "        <input class=\"form-control \" id='description' name=\"description\" placeholder=\"Enter Unit Price\">\n" +
        "    </p>\n" +
        "    <p class=\"form-group\">\n" +
        "        <label>Received Date :</label>\n" +
        "        <input class=\"form-control \" id='receiveddate' name=\"receiveddate\" placeholder=\"Enter Qty\">\n" +
        "    </p>\n" +
        "    <p class=\"form-group\">\n" +
        "        <input type=\"checkbox\" id='received' name=\"received\">" +
        "        <label>Received</label>\n" +
        "    </p>\n" +
        "    <p class=\"form-group\">\n" +
        "        <label>Delivered Date:</label>\n" +
        "        <input class=\"form-control \" id='delivereddate' name=\"delivereddate\" placeholder=\"2018.01.01\">\n" +
        "    </p>\n";
    html +=
        "       <style>" +
        "           fieldset, label { margin: 0; padding: 0; }\n" +
        "           .rating {border: none;float: left; display: inline}\n" +
        "           .rating > input { display: none; } \n" +
        "           .rating > label:before {margin: 5px;font-size: 2.25em;font-family: FontAwesome;display: inline-block;content: \"\\f005\";}\n" +
        "           .rating > .half:before {content: \"\\f089\";position: absolute;}\n" +
        "           .rating > label {color: #ddd;float: right;}\n" +
        "           .rating > input:checked ~ label, /* show gold star when clicked */\n" +
        "           .rating:not(:checked) > label:hover, /* hover current star */\n" +
        "           .rating:not(:checked) > label:hover ~ label { color: #FFD700;  } /* hover previous stars in list */\n" +
        "           .rating > input:checked + label:hover, /* hover current star when changing rating */\n" +
        "           .rating > input:checked ~ label:hover,\n" +
        "           .rating > label:hover ~ input:checked ~ label, /* lighten current selection */\n" +
        "           .rating > input:checked ~ label:hover ~ label { color: #FFED85;  } \n" +
        "       </style>\n" +
        "    <p class=\"form-group\" style='margin-bottom:0px '>\n" +
        "       <label style='margin: 0px; padding: 0px;'>Rating:</label>" +
        "    </p>" +
        "   <fieldset id='starset' class=\"rating\">\n" +
        "       <input type=\"radio\" id=\"star5\" name=\"rating\" value=\"5\" /><label onclick='starSet(this)' class = \"full\" for=\"star5\" title=\"Awesome - 5 stars\" value=\"5\"></label>\n" +
        "       <input type=\"radio\" id=\"star4half\" name=\"rating\" value=\"4.5\" /><label onclick='starSet(this)' class=\"half\" for=\"star4half\" title=\"Pretty good - 4.5 stars\"  value=\"4.5\"></label>\n" +
        "       <input type=\"radio\" id=\"star4\" name=\"rating\" value=\"4\" /><label onclick='starSet(this)' class = \"full\" for=\"star4\" title=\"Pretty good - 4 stars\"  value=\"4\"></label>\n" +
        "       <input type=\"radio\" id=\"star3half\" name=\"rating\" value=\"3.5\" /><label onclick='starSet(this)' class=\"half\" for=\"star3half\" title=\"Meh - 3.5 stars\"  value=\"3.5\"></label>\n" +
        "       <input type=\"radio\" id=\"star3\" name=\"rating\" value=\"3\" /><label onclick='starSet(this)' class = \"full\" for=\"star3\" title=\"Meh - 3 stars\"  value=\"3\"></label>\n" +
        "       <input type=\"radio\" id=\"star2half\" name=\"rating\" value=\"2.5\" /><label onclick='starSet(this)' class=\"half\" for=\"star2half\" title=\"Kinda bad - 2.5 stars\"  value=\"2.5\"></label>\n" +
        "       <input type=\"radio\" id=\"star2\" name=\"rating\" value=\"2\" /><label onclick='starSet(this)' class = \"full\" for=\"star2\" title=\"Kinda bad - 2 stars\"  value=\"2\"></label>\n" +
        "       <input type=\"radio\" id=\"star1half\" name=\"rating\" value=\"1.5\" /><label onclick='starSet(this)' class=\"half\" for=\"star1half\" title=\"Meh - 1.5 stars\"  value=\"1.5\"></label>\n" +
        "       <input type=\"radio\" id=\"star1\" name=\"rating\" value=\"1\" /><label onclick='starSet(this)' class = \"full\" for=\"star1\" title=\"Sucks big time - 1 star\"  value=\"1\"></label>\n" +
        "       <input type=\"radio\" id=\"starhalf\" name=\"rating\" value=\".5\" /><label onclick='starSet(this)' class=\"half\" for=\"starhalf\" title=\"Sucks big time - 0.5 stars\"  value=\".5\"></label>" +
        "   </fieldset>" +
        "   <br><b><span style='font-size: 15px' id='ratingvalue'>0</span></b>";
    html +=
        "   <div classtexttext='form-group' style='height: 16px'></div>\n" +
        "   <p class=\"form-group\">\n" +
        "       <label>Supplier:</label>\n" +
        "       <select class=\"form-control select2-dropdown\" name=\"supplier\" id=\"supplierselector\" onchange=\"supplierOnChange(this)\">\n" +
        // load suppliers hear
        "       </select>\n" +
        "   </p>" +
        "   <style>" +
        "       #categoryselector {background-color: #00a65a;color: whitesmoke; border-bottom: solid 3px #00e765; height:38px;width:150px;border-radius:8px;text-align: center;font-size: 20px;margin-bottom: 10px;cursor: pointer}   " +
        "   </style>" +
        "    <p class=\"form-group\">\n" +
        "        <label>Category:</label>\n" +
        "        <div class=\"row\">\n" +
        "          <div class=\"col-xs-12\">\n" +
        "            <div class=\"filter-container isotopeFilters\">\n" +
        "              <ul id='categoriesselector' class=\"list-inline filter\">\n" +
        // load categorys hear
        "              </ul>\n" +
        "          </div>\n" +
        "        </div>" +
        "       </div>" +
        "    </p>" +
        "    <p class=\"form-group\">" +
        "        <button class=\"btn btn-success\" type=\"button\" onclick=\"dashboard()\">View All Orders</button>" +
        "        <button class=\"btn btn-primary\" type=\"button\" onclick=\"addOrder()\">Create Order</button>" +
        "    </p>" +
        "</form>\n" +
        "</section>";

    return html;
}

function returnSupplierForm(){
    var html =
        "<Style>" +
        "   #addSupplierForm p{" +
        "       margin-bottom: 2px;" +
        "   }" +
        "   .heddingforaddsupplier{" +
        "       font-size: 17px;" +
        "   }" +
        "   .level3{" +
        "       margin-left: 30px;" +
        "       margin-bottom: 0px;" +
        "   }" +
        "   .level2{" +
        "       margin-bottom: 0px;" +
        "   }" +
        "   .form-control{" +
        "       height: 25px;" +
        "   }" +
        "   .level3 label{font-weight: normal}" +
        "   .row label{font-weight: normal; text-align: right}" +
        "</Style>" +

        "<section class=\"content-header\" style=\"height: 1900px\">" +
        "   <form id=\"addSupplierForm\">" +
        "       <p class=\"form-group\">" +
        "           <label class='heddingforaddsupplier'><u><b>1. Name of Supplier </b></u></label>" +
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'></div>\n" +
        "                   <div id='supplierNameSelect' class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"supplierName\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "           </p>" +
        "       </p>" +
        "       <p class=\"form-group\">" +
        "           <label class='heddingforaddsupplier'><u><b>2. Contact Details </b></u></label>" +
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <label>a. Correspondent Address</label>" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>Street & Number : </div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"addressForcorrStreetAndNum\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        // "               <br>\n" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>City  :</div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"addressForcorrCity\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        // "               <br>\n" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>Country :</div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"addressForcorrCountry\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        // "               <br>\n" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>Postal Code :</div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"addressForcorrPostalCode\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "           </p>";
    html +=
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <label>b. Telephone/Mobile Phone</label>" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'></div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"telephone\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "           </p>" +
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <label>c. Fax Number</label>" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'></div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"fax\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "           </p>" +
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <label>d. Email address</label>" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'></div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"email\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "           </p>" +
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <label>e. Contact Person for payments</label>" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>Telephone / Mobile :</div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"contactPersonForPaymentTel\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>Email Address :</div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"contactPersonForPaymentEmail\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "           </p>" +
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <label>f. Contact Person for Order placement</label>" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>Telephone / Mobile :</div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"contactPersonForOrderPlacementTel\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>Email Address :</div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"contactPersonForOrderPlacementEmail\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "           </p>" +
        "       </p>";
    html +=
        "       <p class=\"form-group\">" +
        "           <label class='heddingforaddsupplier'><u><b>3. Nominated / Introduced by</b></u></label>" +
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'></div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"nominatedBy\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "           </p>" +
        "       </p>" +
        "       <p class=\"form-group\">" +
        "           <label class='heddingforaddsupplier'><u><b>4. Payment Details </b></u></label>" +
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <label>a. Payee Name (if different from (1) above) </label>" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'></div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"payeName\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "           </p>" +
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <label>b. Address for Payment Purposes (If Different from 2 a. above)</label>" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>Street & Number : </div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"addressForPayStreetAndNum\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>City  :</div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"addressForPayCity\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>Country :</div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"addressForPayCountry\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>Postal Code :</div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"addressForPayPostalCode\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "           </p>";
    html +=
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <label>c. Terms of Trade </label>" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>FOB :</div>\n" +
        "                   <div class=\"col-sm-2\">\n" +
        "                       <input class=\"form-control \" name=\"\" placeholder=\"\">" +
        "                   </div>\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>Ex-works :</div>\n" +
        "                   <div class=\"col-sm-2\">\n" +
        "                       <input class=\"form-control \" name=\"\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>CIF :</div>\n" +
        "                   <div class=\"col-sm-2\">\n" +
        "                       <input class=\"form-control \" name=\"\" placeholder=\"\">" +
        "                   </div>\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>Not Applicable :</div>\n" +
        "                   <div class=\"col-sm-2\">\n" +
        "                       <input class=\"form-control \" name=\"\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "           </p>";
    html +=
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <label>d. Preferred Payment Method (Please select only one)</label>" +
        "               <p class=\"form-group col-lg-11 level3\">" +
        "                   <div class='row'>" +
        "                       <label class='col-sm-3'>Telegraphic Transfer :</label>" +
        "                       <input type='checkbox' class=\"col-sm-1\" name=\"\">" +
        "                       <label class='col-sm-2'>Demand Draft :</label>" +
        "                       <input type='checkbox' class=\"col-sm-1\" name=\"\">" +
        "                   </div>" +
        "                   <div class='row'>" +
        "                       <label class='col-sm-3'>Cheque :</label>" +
        "                       <input type='checkbox' class=\"col-sm-1\" name=\"\">" +
        "                       <label class='col-sm-2'>Slip Transfer :</label>" +
        "                       <input type='checkbox' class=\"col-sm-1\" name=\"\">" +
        "                   </div>" +
        "                   <div class='row'>" +
        "                       <label class='col-sm-3'>Letter of Credit :</label>" +
        "                       <input type='checkbox' class=\"col-sm-1\" name=\"\">" +
        "                       <label class='col-sm-2'>Any other :</label>" +
        "                       <input type='checkbox' class=\"col-sm-1\" name=\"\">" +
        "                   </div>" +
        "               </p>" +
        "           </p>" +
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <label>e. Dispatch Mode (Applicable only for Cheque/Draft, please select only one)</label>" +
        "               <p class=\"form-group col-lg-11 level3\">" +
        "                   <div class='row'>" +
        "                       <label class='col-sm-3'>Courier to Beneficiary :</label>" +
        "                       <input type='checkbox' class=\"col-sm-1\" name=\"\">" +
        "                   </div>" +
        "                   <div class='row'>" +
        "                       <label class='col-sm-3'>Collected at Veroxlabs (Pvt) Ltd :</label>" +
        "                       <input type='checkbox' class=\"col-sm-1\" name=\"\">" +
        "                   </div>" +
        "                   <div class='row'>" +
        "                       <label class='col-sm-3'>Collected at Bank Counter :</label>" +
        "                       <input type='checkbox' class=\"col-sm-1\" name=\"\">" +
        "                   </div>" +
        "               </p>" +
        "           </p>" +
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <label>f. Credit Period (Days) </label>" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'></div>\n" +
        "                   <div class=\"col-sm-3\">\n" +
        "                       <input class=\"form-control \" name=\"creaditPeriodDays\" placeholder=\"\">" +
        "                   </div>\n" +
        "                   <div class=\"col-sm-1\" style='text-align: right'>If Other :</div>\n" +
        "                   <div class=\"col-sm-3\">\n" +
        "                       <input class=\"form-control \" name=\"creaditPeriodIfOther\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "           </p>";
    html +=
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <label>g. Settlement Currency</label>" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'></div>\n" +
        "                   <div class=\"col-sm-3\">\n" +
        "                       <input class=\"form-control \" name=\"settlementCurrency\" placeholder=\"\">" +
        "                   </div>\n" +
        "                   <div class=\"col-sm-1\" style='text-align: right'>If Other :</div>\n" +
        "                   <div class=\"col-sm-3\">\n" +
        "                       <input class=\"form-control \" name=\"settlementCurrencyIfOther\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "           </p>" +
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <label>h. SVAT No. (only if applicable)</label>" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'></div>\n" +
        "                   <div class=\"col-sm-3\">\n" +
        "                       <input class=\"form-control \" name=\"SVATNo\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "           </p>" +
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <p class=\"form-group col-lg-11 level3\" style='align-items: center'>" +
        "                  <label><i><u>Point \"i\" to \"l\" is only applicable for payment method \"Telegraphic Transfer\" & \"Slip Transfer\"</u></i></label>" +
        "               </p>" +
        "           </p>" +
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <label>i. Bank Name </label>" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style=''></div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"bankName\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "           </p>" +
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <label>j. Bank Account Number</label>" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style=''></div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"bankAccNo\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "           </p>";
    html +=
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <label>k. Bank Address </label>" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>Street & Number :</div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"bankAddressStreetAndNum\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        // "               <br>\n" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>City  :</div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"bankAddressCity\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        // "               <br>\n" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>Country :</div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"bankAddressCountry\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        // "               <br>\n" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>Bank Branch :</div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"bankAddressBranch\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "           </p>";
    html +=
        "           <p class=\"form-group col-lg-11 level2\">" +
        "               <label>l. Sort code /SWIFT code /ADN. code /CBID code</label>" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style=''></div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control \" name=\"sortCode\" placeholder=\"\">" +
        "                   </div>\n" +
        "               </div>\n" +
        "           </p>" +
        "       </p>" +
        "       <div class='row'></div><br><br>" +
        "       <p class=\"form-group\">" +
        "           <label><u><B>Completed by : </B></u></label>" +
        "           <p class=\"form-group col-lg-12 level2\">" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style=' text-align: right'>Name :</div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control\" name=\"completedByName\">\n" +
        "                   </div>\n" +
        "               </div>\n" +
        "               <br>\n" +
        "               <div class=\"row\">\n" +
        "                   <div class=\"col-sm-2\" style='text-align: right'>Date :</div>\n" +
        "                   <div class=\"col-sm-9\">\n" +
        "                       <input class=\"form-control\" name=\"completedByDate\">\n" +
        "                   </div>\n" +
        "               </div>\n " +
        "           </p>" +
        "       </p>" +
        "       <div id=\"buttondiv\" class=\"row col-lg-11\" style='margin-top: 15px;'>" +
        "           <button type='button' onclick=saveSupplier() style='margin-left: 20px; float: right' class=\"btn btn-primary\">Add Supplier</button>" +
        "       </div>" +
        "   </form>" +
        "</section>";
    return html;
}

function testOrder(){
    var html =
        "<style>\n" +
        "   .col-sm-2{\n" +
        "       text-align:right;\n" +
        "       vertical-align: middle;\n" +
        "       font-size:17px;\n" +
        "   }\n" +
        "   .col-sm-9{" +
        "       font-size:15px;\n" +
        "   }\n" +
        "</style>\n" +

        "<section class=\"content-header\">\n" +
        "<form id=\"placeOrderForm\">\n" +
        "   <div class=\"container-fluid\">\n" +
        "       <div class=\"row\">\n" +
        "          <div class=\"col-sm-2\">PO# :</div>\n" +
        "          <div id='poselect' class=\"col-sm-9\">\n" +
        "              <input id=\"po\" name=\"po\" class=\"form-control\">\n" +
        "          </div>\n" +
        "       </div>\n" +
        "       <br>\n" +
        "       <div class=\"row\">\n" +
        "           <div class=\"col-sm-2\">Project :</div>\n" +
        "           <div class=\"col-sm-9\">\n" +
        "              <input id=\"project\" name=\"project\" class=\"form-control\">\n" +
        "           </div>\n" +
        "       </div>\n" +
        "       <br>\n" +
        "       <div class=\"row\">\n" +
        "           <div class=\"col-sm-2\">Description :</div>\n" +
        "           <div class=\"col-sm-9\">\n" +
        "               <input id=\"description\" name=\"description\" class=\"form-control\">\n" +
        "           </div>\n" +
        "       </div>\n" +
        "       <br>\n" +
        "       <div class=\"row\">\n" +
        "           <div class=\"col-sm-2\">Supplier :</div>\n" +
        "           <div id='suppliersselect' class=\"col-sm-9\">\n" +
        "               <input id=\"sid\" name=\"sid\" class=\"form-control\" style=\"width:80%;display:inline\">" +
        "               <button type=\"button\" class=\"btn btn-success\" style=\"float:right\" onclick=\"\">View Supplier Details</button>" +
        "           </div>\n" +
        "       </div>\n" +
        "       <br>\n" +
        "       <div class=\"row\">\n" +
        "           <div class=\"col-sm-2\">Received :</div>\n" +
        "           <div class=\"col-sm-9\">\n" +
        "               <input type=\"checkbox\" id=\"received\" name=\"received\">\n" +
        "           </div>\n" +
        "       </div>\n" +
        "       <br>\n" +
        "       <div class=\"row\">\n" +
        "           <div class=\"col-sm-2\">Received Date :</div>\n" +
        "           <div class=\"col-sm-9\">\n" +
        "               <input id=\"receiveddate\" name=\"receiveddate\" class=\"form-control\">\n" +
        "           </div>\n" +
        "       </div>\n" +
        "       <br>\n" +
        "       <div class=\"row\">\n" +
        "           <div class=\"col-sm-2\">Delivered Date :</div>\n" +
        "           <div class=\"col-sm-9\">\n" +
        "               <input id=\"delivereddate\" name=\"delivereddate\" class=\"form-control\">\n" +
        "           </div>\n" +
        "       </div>\n" +
        "       <br>\n";
    html +=
        "       <div class=\"row\">\n" +
        "           <div class=\"col-sm-2\"><br>Rating :</div>\n" +
        "           <div id='starratings' class=\"col-sm-9\">\n" +
        // load stars hear
        "           </div>\n" +
        "       </div>\n" +
        "       <br>\n" +
        "       <div class=\"row\">\n" +
        "           <div class=\"col-sm-2\">Category :</div>\n" +
        "           <div id=\"categoriesselector\" class=\"col-sm-9\">\n" +
        // load catgories hear
        "          </div>\n" +
        "      </div>\n" +
        "      </br>\n" +
        "      <div id='btnlocation' class=\"row\">\n" +
        // load buttons hear
        "      </div>\n" +
        "   </div>" +
        "</form>\n" +
        "</section>";
    return html;
}


//     Test addSupplier.php
//    window.location.replace("addSupplier.php?name=name&address=address&country=country&contact=contact&fax=fax&email=email");
//     Test addCategory.php
//    window.location.replace("addCategory.php");
// Test viewOrders.php
//    window.location.replace('viewOrders.php?type=all');
//    window.location.replace('viewOrders.php?type=po');
// Test searchOrder.php
//    window.location.replace("searchOrder.php?oid=4");
//     window.location.replace("DBConnection.php");
// Test searchSupplier.php
//     window.location.replace('searchSupplier.php?sid=1');