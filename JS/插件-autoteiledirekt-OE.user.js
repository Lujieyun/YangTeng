// ==UserScript==
// @name         插件-autoteiledirekt-OE
// @namespace    http://tampermonkey.net/
// @version      2024.01.31
// @description  try to take over the world!
// @author       Joanne
// @match        *://www.autoteiledirekt.de/*
// @icon         https://www.autoteiledirekt.de/assets/6feb4b/images/svg/logo/logo_de.svg
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //提取OE
    let list_item = document.querySelectorAll('div.product-oem__list>ul>li');
    let OE = '';
    for(let i=0; i<list_item.length; i++) {
        OE += list_item[0].innerText.replace(/^.*?OE-/, '').trim() + ';';
    }
    OE = OE.substring(0, OE.length-1);

    function copy() {
        const input = document.getElementById('copy-one').innerText;
        input.select(); // 选中内容
        document.execCommand('Copy'); // 执行浏览器复制命令
        alert("复制成功");
    }

    let content = '<a id="copy-one" style="position: fixed;right: 450px;bottom: 300px;z-index: 99;"><button onclick="copy()" style="font-size: 30px;background-color: #e9faff;">'+ OE +'</button></a>'

    document.querySelector(".product-oem__title").insertAdjacentHTML("afterend", content);

    // Your code here...
})();