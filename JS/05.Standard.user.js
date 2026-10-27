// ==UserScript==
// @name         05.Standard
// @namespace    http://tampermonkey.net/
// @version      20230717
// @description  try to take over the world!
// @author       Joanne
// @match        *://www.standardbrand.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
   window.onload = function() {
      window.scrollTo(0, document.body.scrollHeight);

       //输入内容
       let list_row = document.getElementsByClassName('partText-div');
       let list_row_part = document.getElementsByClassName('popText-div');
       let scr_row = document.getElementsByClassName('partImg-div');

       let array_content = new Array();
       for(let i=0; i<list_row.length; i++) {
           array_content[i] = {};
           array_content[i]['Title'] = list_row[i].getElementsByClassName('resizeText')[0].innerText
           array_content[i]['Part_Number'] = list_row[i].getElementsByClassName('basepart-text')[0].innerText
           array_content[i]['POP'] = list_row_part[i].getElementsByTagName('span')[0].innerText
           array_content[i]['Per_Car'] = list_row_part[i].getElementsByTagName('span')[1].innerText
           array_content[i]['Src'] = scr_row[i].getElementsByTagName('img')[0].getAttribute('src')
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

    }
})();