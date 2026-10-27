// ==UserScript==
// @name         CARiD爬虫-sch
// @namespace    https://github.com/Lujieyun/crawler
// @version      2023.06.17
// @description  爬虫
// @author       Joanne
// @match        *://www.carid.com/*
// @icon         https://www.carid.com/domain-specific/carid/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.onload = function() {
        window.scrollTo(0, document.body.scrollHeight);

        // 输出内容
        let list_part = document.getElementsByClassName('js-products-panel-mobile-group products-panel-group-ajax')[0].getElementsByClassName('lst-info-left-part');
        let array_content = new Array();
        for(let i=0; i<list_part.length; i++) {
            array_content[i] = {};
            array_content[i]['Url'] = 'https://www.carid.com' + list_part[i].getElementsByTagName('a')[0].getAttribute('href');
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
        if(document.getElementsByClassName('pagination-next')[0].getAttribute('href') != null) {
            window.location.href = 'https://www.carid.com' + document.getElementsByClassName('pagination-next')[0].getAttribute('href').click();
        }
    }
})();