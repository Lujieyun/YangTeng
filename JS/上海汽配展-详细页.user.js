// ==UserScript==
// @name         上海汽配展-详细页
// @namespace    http://tampermonkey.net/
// @version      2023.10.13
// @description  抓取品牌简介
// @author       Joanne
// @match        *://automechanika-shanghai.hk.messefrankfurt.com/*
// @icon         https://aapex2023.mapyourshow.com/mys_shared/AAPEX2023/AAPEX2023_logo.png?breakcache=8FAA5BBF-F514-26F1-48DA4C06E42CD133
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.scrollTo(0, document.body.scrollHeight);

    // 输出内容
    let list_part_number = document.getElementsByClassName('col-sm-8 ex-exhibitor-detail__title-container');
    let list_detail = document.getElementsByClassName('ex-detail-description');
    let list_category = document.getElementsByClassName('ex-list-toggle');
    let list_key = document.getElementsByClassName('ex-list-toggle__list-item');
    let list_lianxi = document.getElementsByClassName('ex-contact-box__address-field');
    let list_local = document.getElementsByClassName('ex-contact-box__container-location-item');
    let array_key = new Array();

    for(let i=0; i<list_key.length; i++){
        array_key.push(list_key[i].innerText)
    }

    let array_content = new Array();

    array_content[0] = {};

    if(list_detail == undefined) {
        array_content[0]['Detail'] = '';
    }
    else {
        array_content[0]['Detail'] = list_detail.innerText;
    }

    if(list_category == undefined) {
        array_content[0]['category'] = '';
    }
    else {
        array_content[0]['category'] = list_category[0].innerText;
    }

    let array_local = new Array();
    for(let i=0; i<list_local.length; i++){
        array_local.push(list_local[i].innerText)
    }


    array_content[0]['Name'] = list_part_number[0].innerText;

    array_content[0]['local'] = array_local.join(';');

    array_content[0]['key'] = array_key.join(';');
    array_content[0]['Url'] = window.location.href;
    array_content[0]['lianxi'] = list_lianxi[0].innerText;

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
})();