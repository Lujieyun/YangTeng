// ==UserScript==
// @name         上海汽配展爬虫-itm
// @namespace    https://github.com/Lujieyun/crawler
// @version      2023.10.14
// @description  爬虫
// @author       Joanne
// @match        *://automechanika-shanghai.hk.messefrankfurt.com/*
// @icon         https://cdn11.bigcommerce.com/s-z9vhe3o238/product_images/CARDONE-CMark.png?t=1645211120
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.onload = function() {
        window.scrollTo(0, document.body.scrollHeight);

        // 输出内容
        let list_title = document.getElementsByClassName('ex-exhibitor-detail__title-headline')
        let list_detail = document.getElementsByClassName('ex-text-image__copy');
        let list_catagary = document.getElementsByClassName('ex-list-toggle');
        let list_key = document.getElementsByClassName('a-copy-lead ex-keyword-list__keyword text-muted');
        let list_lianxi = document.getElementsByClassName('ex-contact-box__address-field');
        let list_local_zhongwen = document.getElementsByClassName('ex-contact-box__container-location-category')
        let list_local_louceng = document.getElementsByClassName('ex-contact-box__container-location-hall');
        let list_local_weizhi = document.getElementsByClassName('ex-contact-box__container-location-stand')

        let array_key = new Array
        for(let i=0; i<list_key.length; i++) {
            array_key.push(list_key[i].innerText)
        }

        let array_content = new Array();

        array_content[0] = {};
        array_content[0]['title'] = list_title[0].innerText;
        array_content[0]['Url'] = window.location.href;

        if(list_detail[0] == undefined){
            array_content[0]['detail'] = ' ';
        }
        else{
            array_content[0]['detail'] = list_detail[0].innerText;
        }

        if(list_catagary[0] == undefined){
            array_content[0]['catagary'] = ' ';
        }
        else{
            array_content[0]['catagary'] = list_catagary[0].innerText;
        }

        if(list_key[0] == undefined){
            array_content[0]['key'] = ' ';
        }
        else{
            array_content[0]['key'] = array_key.join(';');
        }

        if(list_lianxi[0] == undefined){
            array_content[0]['lianxi'] = ' ';
        }
        else{
            array_content[0]['lianxi'] = list_lianxi[0].innerText;
        }

        let array_local = new Array();
        for(let i=0; i<list_local_louceng.length; i++) {
            array_local.push(list_local_zhongwen[i].innerText + list_local_louceng[i].innerText + ', ' + list_local_weizhi[i].innerText)
        }

        array_content[0]['local'] = array_local.join(';');

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
        let list_para = location.href.split('?')[1].split('&');
        let para_index;
        for(let i=0; i<list_para.length; i++) {
            if(list_para[i].startsWith('index=')) {
                para_index = list_para[i].split('index=')[1];
            }
        }
        console.log('index：' + para_index);

        window.location.href = 'http://localhost:8080/crawler/shanghai.html?index=' + (Number(para_index)+1);
    }
})();