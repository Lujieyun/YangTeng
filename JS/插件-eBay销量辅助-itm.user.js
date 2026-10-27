// ==UserScript==
// @name         插件-eBay销量辅助-itm
// @namespace    https://github.com/Lujieyun/crawler
// @version      2023.06.21
// @description  eBay销量辅助
// @author       Joanne
// @match        *://www.ebay.com/itm/*
// @match        *://www.ebay.de/itm/*
// @match        *://www.ebay.co.uk/itm/*
// @match        *://www.ebay.com.au/itm/*
// @match        *://www.ebay.ca/itm/*
// @icon         https://www.ebay.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    if(window.location.href.indexOf('http://www.ebay.com') != -1) {
        let item_number = document.getElementsByClassName('ux-layout-section ux-layout-section--itemId ux-layout-section--ALIGN-RIGHT')[0].textContent.split(':')[1].replace(' ', '');
        let content = '<div style="border: 3px solid red"><iframe id="Lennon" src="https://www.ebay.com/bin/purchaseHistory?item=' + item_number + '" width="100%" height="500"></iframe></div>';
        document.querySelector('div[class="tabbable"]').insertAdjacentHTML("beforebegin", content);
    }
    else {
        let item_number = document.getElementsByClassName('ux-layout-section ux-layout-section--itemId ux-layout-section--ALIGN-RIGHT')[0].textContent.split(':')[1].replace(' ', '')
        let content = '<a href="https://www.ebay.com/bin/purchaseHistory?item=' + item_number + '" target="_blank" style="position: fixed;right: 450px;bottom: 300px;z-index: 99;"><button style="font-size: 30px;background-color: #e9faff;">查看销量</button></a>'
        document.querySelector("body").insertAdjacentHTML("afterbegin", content);
    }
})();