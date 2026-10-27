// ==UserScript==
// @name         FourSeasons
// @namespace    http://tampermonkey.net/
// @version      2023.7.10
// @description  try to take over the world!
// @author       You
// @match        *://ecatalog.smpcorp.com/*
// @icon         https://www.4s.com/en/ecatalog?part=blower&type=p&search=s
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
   window.onload = function() {
      window.scrollTo(0, document.body.scrollHeight);

       // 输出内容
       let list_part = document.getElementsByClassName('basepart-text');

       let array_content = new Array();
       for(let i=0; i<list_part.length; i++) {
           array_content[i] = {};
           array_content[i]['Part_Number'] = list_part[i].innerText;
           array_content[i]['Url'] = 'https://ecatalog.smpcorp.com/v2/fs/#/partdetail/part/' + String(list_part[i].innerText);
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
        window.scrollTo(0, -document.body.scrollHeight);
        }
})();