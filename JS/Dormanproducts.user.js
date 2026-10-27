// ==UserScript==
// @name         Dormanproducts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://www.dormanproducts.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dormanproducts.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
   window.onload = function() {
      window.scrollTo(0, document.body.scrollHeight);

        // 输出内容
        let list_part_number = document.getElementsByClassName('item-headline');
        let list_part = document.getElementsByClassName('item-name')

        let array_content = new Array();
        for(let i=0; i<list_part_number.length; i++) {
            array_content[i] = {};
            array_content[i]['Part_Number'] = list_part[i].innerText
            array_content[i]['Url'] = 'https://www.dormanproducts.com/' + list_part_number[i].getElementsByTagName('a')[0].getAttribute('href');
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
        document.getElementsByClassName('pagingBottom_linextButton')[0].getElementsByTagName('a')[0].click();
    }
})();