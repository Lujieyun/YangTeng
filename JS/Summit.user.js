// ==UserScript==
// @name         Summit
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://www.summitracing.com/search?*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
        window.onload = function() {
        window.scrollTo(0, document.body.scrollHeight);

        // 输出内容
        let list_name = document.getElementsByClassName('columns medium-17 large-18 show-for-medium');
        let list_part_number = document.getElementsByClassName('item-part-number');
        //for(let i=0; i<list_part_number.length; i++) {
           // array_part_number.push(list_part_number[i].innerText.split('Part Number: ')[1]);
        //}
        let list_href = document.getElementsByClassName('columns small-11 medium-7 large-6 item-image-column');
        let list_description = document.getElementsByClassName('item-description')
        let array_content = new Array();
        for(let i=0; i<list_name.length; i++) {
            array_content[i] = {};
            array_content[i]['Name'] = list_name[i].innerText;
            array_content[i]['Description'] = list_description[i].innerText;
            array_content[i]['Part_Number'] = list_part_number[i].innerText;
            array_content[i]['Url'] = 'https://www.summitracing.com/' + list_href[i].getElementsByTagName('a')[0].getAttribute('href');
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
        document.getElementsByClassName('next-page')[0].getElementsByTagName('a')[0].click();
    }
})();