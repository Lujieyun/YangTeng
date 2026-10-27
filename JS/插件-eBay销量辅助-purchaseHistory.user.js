// ==UserScript==
// @name         插件-eBay销量辅助-purchaseHistory
// @namespace    https://github.com/Lujieyun/crawler
// @version      2023.05.26
// @description  eBay销量辅助
// @author       Joanne
// @match        *://www.ebay.com/bin/purchaseHistory?item=*
// @icon         https://www.ebay.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function date_conversion(date_in)
    {
        let date_my = date_in.replace(/^[1-9][0-9]{0,1} /, "");
        let date_ym = date_my.split(" ")[1] + date_my.split(" ")[0];
        date_ym = date_ym.replace("Jan", ".01");
        date_ym = date_ym.replace("Feb", ".02");
        date_ym = date_ym.replace("Mar", ".03");
        date_ym = date_ym.replace("Apr", ".04");
        date_ym = date_ym.replace("May", ".05");
        date_ym = date_ym.replace("Jun", ".06");
        date_ym = date_ym.replace("Jul", ".07");
        date_ym = date_ym.replace("Aug", ".08");
        date_ym = date_ym.replace("Sep", ".09");
        date_ym = date_ym.replace("Oct", ".10");
        date_ym = date_ym.replace("Nov", ".11");
        date_ym = date_ym.replace("Dec", ".12");

        return date_ym;
    }

    let sold = {};

    // Recent purchases
    let table_fixed_price = document.getElementsByClassName('app-table fixed-price');
    if(table_fixed_price.length != 0)
    {
        let list_tr = table_fixed_price[0].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for(let i=0; i<list_tr.length; i++)
        {
            let list_td = list_tr[i].getElementsByTagName('td');
            let date_ym = date_conversion(list_td[3].textContent);
            if(date_ym in sold == false)
            {
                sold[date_ym] = Number(list_td[2].textContent);
            }
            else
            {
                sold[date_ym] += Number(list_td[2].textContent);
            }
        }
    }

    // Offer history
    let table_offer = document.getElementsByClassName('app-table offer');
    if(table_offer.length != 0)
    {
        let list_tr = table_offer[0].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for(let i=0; i<list_tr.length; i++)
        {
            let list_td = list_tr[i].getElementsByTagName('td');
            if(list_td[1].textContent == 'Accepted')
            {
                let date_ym = date_conversion(list_td[3].textContent);
                if(date_ym in sold == false)
                {
                    sold[date_ym] = Number(list_td[2].textContent);
                }
                else
                {
                    sold[date_ym] += Number(list_td[2].textContent);
                }
            }
        }
    }

    let content = '<table border="1" bgcolor="#e9faff" style="margin-left: 350px;border-collapse: collapse;font-size:16px;text-align: center;"><thead style="font-size:18px;font-weight: bold;"><tr><th>年月</th><th>月销</th><th>周销</th></tr></thead><tbody>';
    let list_date = Object.keys(sold);
    list_date.sort();
    for(let i=list_date.length-1; i>-1; i--)
    {
        content += "<tr><td>&emsp;" + list_date[i] + "&emsp;</td><td>&emsp;" + sold[list_date[i]] + "&emsp;</td><td>&emsp;" + sold[list_date[i]]/4 +"&emsp;</td></tr>";
    }
    content += "</tbody></table><br/><br/>";
    document.querySelector(".app-item-card.ph").insertAdjacentHTML("beforebegin", content);
})();