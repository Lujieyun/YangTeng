// ==UserScript==
// @name         centricparts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Joanne
// @match        *://www.centricparts.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
   window.onload = function() {
      window.scrollTo(0, document.body.scrollHeight);

        // 输出内容
       let list_part = document.getElementsByClassName('product details product-item-details');
       let list_detail = document.getElementsByClassName('attr-details');
       let list_img = document.getElementsByClassName('img-container');
       let array_content = new Array();
       for(let i=0; i<list_part.length; i++) {
           console.log(i)
           array_content[i] = {};
           array_content[i]['Part'] = list_part[i].getElementsByClassName('sku-title')[0].innerText;
           array_content[i]['leibei'] = list_part[i].getElementsByClassName('product-item-link')[0].innerText;
           if(list_part[i].getElementsByClassName('attr-light')[0] == undefined) {
               array_content[i]['title'] = '';
           }
           else {
               array_content[i]['title'] = list_part[i].getElementsByClassName('attr-light')[0].innerText;
           }
           if(list_detail[0].getElementsByClassName('right')[0] == undefined) {
               array_content[i]['Performance'] = '';
           }
           else {
               array_content[i]['Performance'] = list_detail[0].getElementsByClassName('right')[0].innerText;
           }
           if(list_detail[0].getElementsByClassName('right')[1] == undefined) {
               array_content[i]['Brand'] = '';
           }
           else {
               array_content[i]['Brand'] = list_detail[0].getElementsByClassName('right')[1].innerText;
           }
           //array_content[i]['title'] = list_part[i].getElementsByClassName('attr-light')[0].innerText;
           //array_content[i]['Performance'] = list_detail[0].getElementsByClassName('right')[0].innerText;
           //array_content[i]['Brand'] = list_detail[0].getElementsByClassName('right')[1].innerText;
           array_content[i]['URL'] = list_part[i].getElementsByClassName('product-item-link')[0].getAttribute('href')
           array_content[i]['img'] = list_img[i].getElementsByTagName('img')[0].getAttribute('src')
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
        document.getElementsByClassName('action  next')[0].click();
    }
})();