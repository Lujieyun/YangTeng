// ==UserScript==
// @name         UAC加载全部页面
// @namespace    http://tampermonkey.net/
// @version      2023.10.9
// @description  try to take over the world!
// @author       You
// @match        https://uacparts.com/Catalog/*
// @icon         https://uacparts.com/Images/Search-Search-icon.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
   //window.onload = function() {
      window.scrollTo(0, document.body.scrollHeight);
        // 输出内容
        let list_part_number = document.getElementsByClassName('part-label');
        let list_URL = document.getElementsByClassName('part-image');
        let list_detail = document.getElementsByClassName('part-info');

        let array_content = new Array();
        for(let i=0; i<list_part_number.length; i++) {
            array_content[i] = {};
            array_content[i]['Part_Number'] = list_part_number[i].innerText;
            array_content[i]['Url'] = 'https://uacparts.com/' + list_URL[i].getElementsByTagName('img')[0].getAttribute('src');
            array_content[i]['detail'] = list_detail[i].getElementsByClassName('comments')[0].innerText
        }
        // json
        let json_content = JSON.stringify(array_content);
        console.log(json_content);

        // blob
        let blob_data = new Blob([json_content], {type: 'text/plain'});
        let blob_url = URL.createObjectURL(blob_data);
        let blob_a = document.createElement('a');
        blob_a.href = blob_url;
        blob_a.download = 'menu.txt';
        blob_a.click();
        URL.revokeObjectURL(blob_url);

        // next
        document.getElementsByClassName('awe-morebtn')[0].click();
    //}
})();