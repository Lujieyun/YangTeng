// ==UserScript==
// @name         Autoteiledirekt-try
// @namespace    http://tampermonkey.net/
// @version      2023.9.1
// @description  Autoteiledirekt-目录页
// @author       Joanne
// @match        *://www.autoteiledirekt.de/*
// @icon         https://www.autoteiledirekt.de/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.onload = function() {
        window.scrollTo(0, document.body.scrollHeight);

        // 输出内容
        let list_part = document.getElementsByClassName('product-card__wrapper');
        let list_url = document.getElementsByClassName('product-card__title');
        let list_Art = document.getElementsByClassName('product-card__artkl');
        let array_content = new Array();
        for(let i=0; i<list_part.length; i++) {
            array_content[i] = {};
            array_content[i]['title'] = list_url[i].innerText;
            array_content[i]['Art.Nr'] = list_Art[i].innerText;
            array_content[i]['Url'] = list_url[i].getElementsByTagName('a')[0].getAttribute('href');
        }
        // json
        let json_content = JSON.stringify(array_content);
        console.log(json_content);

        // blob
        let blob_data = new Blob([json_content], {type: 'text/plain'});
        let blob_url = URL.createObjectURL(blob_data);
        let blob_a = document.createElement('a');
        blob_a.href = blob_url;
        blob_a.download = window.location.href.replace('http://', '').replace('https://', '') + '.txt';
        blob_a.click();
        URL.revokeObjectURL(blob_url);


        // next
        window.location.href = document.getElementsByClassName('listing-pagination__next')[0].getAttribute('href');
    }
})();