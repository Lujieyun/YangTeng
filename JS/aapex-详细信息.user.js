// ==UserScript==
// @name         aapex-详细信息
// @namespace    http://tampermonkey.net/
// @version      2023.10.13
// @description  抓取品牌简介
// @author       Joanne
// @match        *://aapex2023.mapyourshow.com/*
// @icon         https://aapex2023.mapyourshow.com/mys_shared/AAPEX2023/AAPEX2023_logo.png?breakcache=8FAA5BBF-F514-26F1-48DA4C06E42CD133
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.scrollTo(0, document.body.scrollHeight);

    // 输出内容
    let Detail = document.getElementsByClassName('js-read-more animated')[0];
    let array_content = new Array();

    array_content[0] = {};
    if(Detail == undefined) {
        array_content[0]['Detail'] = '';
    }
    else {
        array_content[0]['Detail'] = Detail.innerText;
    }

    array_content[0]['Url'] = window.location.href

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

    window.location.href = 'http://localhost:8080/crawler/aapex.html?index=' + (Number(para_index)+1);
})();