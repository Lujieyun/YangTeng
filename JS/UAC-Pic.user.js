// ==UserScript==
// @name         UAC-Pic
// @namespace    https://github.com/Lujieyun/crawler
// @version      2023.09.12
// @description  爬虫
// @author       Joanne
// @match        *://uacparts.com//*
// @match        *://www.uacparts.com/*
// @icon         https://uacparts.com/Images/Search-Search-icon.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    //window.onload = function() {
        window.scrollTo(0, document.body.scrollHeight);
        console.log('\n\n\n= = = = = = = = = = = = = = =');
        console.log('Tampermonkey 1：爬虫启动');

        let pic = document.querySelector('img');
        console.log('Tampermonkey 2：图片获取成功');

        // canvas
        let canvas = document.createElement('canvas');
        canvas.width = pic.width;
        canvas.height = pic.height;
        canvas.getContext('2d').drawImage(pic, 0, 0, canvas.width, canvas.height);

        // blob
        let blob_a = document.createElement('a');
        blob_a.href = canvas.toDataURL();
        blob_a.download = window.location.href + '.jpeg';
        blob_a.click();
        console.log('Tampermonkey 3：爬虫结束');
        console.log('= = = = = = = = = = = = = = =\n\n\n');

        // next
        let list_param = window.location.href.split('?')[1].split('&');
        let param_index;
        for(let i=0; i<list_param.length; i++) {
            if(list_param[i].startsWith('index=')) {
                param_index = list_param[i].split('index=')[1];
            }
        }
        console.log('下一个index：' + (Number(param_index) + 1));
        window.location.href = 'http://localhost:8080/crawler/UAC.html' + '?index=' + (Number(param_index) + 1);
    //}
})();