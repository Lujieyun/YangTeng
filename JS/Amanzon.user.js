// ==UserScript==
// @name         Amanzon
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Joanne
// @match        *://www.amazon.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
   window.onload = function() {
      window.scrollTo(0, document.body.scrollHeight);

        // 输出内容
       let list_part = document.getElementsByClassName('a-section a-spacing-none puis-padding-right-small s-title-instructions-style');
       let list_detail = document.getElementsByClassName('a-size-base a-link-normal s-no-hover s-underline-text s-underline-link-text s-link-style a-text-normal');
       let src_list = document.getElementsByClassName('a-link-normal s-no-outline');
       let array_content = new Array();
       let P_U = document.getElementsByClassName('a-row a-size-base a-color-base');
       for(let i=0; i<list_part.length; i++) {
           console.log(i)
           array_content[i] = {};
           array_content[i]['Title'] = list_part[i].getElementsByClassName('a-size-medium a-color-base a-text-normal')[0].innerText
           let combination = document.getElementsByClassName('a-row a-size-small')[i];
           if(combination == undefined) {
               array_content[i]['Star'] = '';
               array_content[i]['Count'] = '';
           }
           else {
               array_content[i]['Star'] = combination.innerText.split('\n')[0];
               array_content[i]['Count'] = combination.innerText.split('\n')[1];
           }
           //array_content[i]['Price'] = P_U[i].getElementsByClassName('a-offscreen')[0].innerText;
           //array_content[i]['Url'] = 'https://www.amazon.com' + P_U[i].getAttribute('href');
           //array_content[i]['Src'] = src_list[i].getElementsByTagName('img')[0].getAttribute('src');
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
        document.getElementsByClassName('s-pagination-item s-pagination-next s-pagination-button s-pagination-separator')[0].click();
    }
})();