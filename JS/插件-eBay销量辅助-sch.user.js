// ==UserScript==
// @name         插件-eBay销量辅助-sch
// @namespace    https://github.com/Lujieyun/crawler
// @version      2023.05.26
// @description  eBay销量辅助
// @author       Joanne
// @match        *://www.ebay.com/sch/*
// @match        *://www.ebay.de/sch/*
// @match        *://www.ebay.co.uk/sch/*
// @match        *://www.ebay.com.au/sch/*
// @match        *://www.ebay.ca/sch/*
// @icon         https://www.ebay.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let list_item = document.getElementsByClassName('s-item__item-id s-item__itemID');
    for(let i=0; i<list_item.length; i++)
    {
        let id = list_item[i].textContent.split(':')[1].replace(' ', '');
        list_item[i].innerHTML = '<a href="https://www.ebay.com/bin/purchaseHistory?item=' + id + '" target="_blank" ><button style="background-color: #e9faff;">查看销量：' + id + '</button></a>';
    }
})();