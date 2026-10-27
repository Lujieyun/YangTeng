// ==UserScript==
// @name         AutoteileDirekt爬虫-Menu
// @namespace    https://github.com/Lujieyun/crawler
// @version      2023.09.12
// @description  爬虫
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
        console.log('\n\n\n= = = = = = = = = = = = = = =');
        console.log('Tampermonkey 1：爬虫启动');

        // array
        let list_row = document.getElementsByClassName('product-card__wrapper');
        let list_Src = document.getElementsByClassName('product-card__image');
        let list_Url = document.getElementsByClassName('product-card__title-link');

        let array_content = new Array();
        for(let i=0; i<list_row.length; i++) {
            array_content[i] = {};
            array_content[i]['brand'] = list_row[i].getElementsByClassName('product-card__title')[0].innerText.split('\n')[0];
            array_content[i]['note_1'] = list_row[i].getElementsByClassName('product-card__title')[0].innerText.split('\n')[1];
            array_content[i]['Art. Nr'] = list_row[i].getElementsByClassName('product-card__artkl')[0].innerText.split(':')[1];
            array_content[i]['Url'] = list_Url[i].getAttribute('href')
            array_content[i]['Scr'] = list_Src[i].getElementsByTagName('img')[0].getAttribute('src');
        }
        console.log('Tampermonkey 2：目录获取成功');

        // json
        let json_content = JSON.stringify(array_content);
        console.log('Tampermonkey 3：转化JSON成功');

        // blob
        let blob_data = new Blob([json_content], {type: 'text/plain'});
        let blob_url = URL.createObjectURL(blob_data);
        let blob_a = document.createElement('a');
        blob_a.href = blob_url;
        blob_a.download = window.location.href + '.txt';
        blob_a.click();
        URL.revokeObjectURL(blob_url);
        console.log('Tampermonkey 4：爬虫结束');
        console.log('= = = = = = = = = = = = = = =\n\n\n');

        // next
        window.location.href = document.getElementsByClassName('listing-pagination__next-wrap')[0].getAttribute('href')
        //window.location.href = document.querySelector('span[data-pagination-next]').getAttribute('data-ajax-link');
    }
})();