function jTable(arr){
    "use strict";
   let html = '<table>\n';

   for(let i = 0; i < arr.length; i++){
        let parsed = JSON.parse(arr[i]);
        html += `    <tr>\n`;


       html += `       <td>${escapeDanger(parsed.name)}</td>\n`;
            html += `       <td>${escapeDanger(parsed.position)}</td>\n`
            html += `       <td>${parsed.salary}</td>\n`;


        html += `<tr>\n`;
    }

     html += '</table>';
     console.log(html);



    function escapeDanger(text){
        let map = { '"': '&quot;', '&': '&amp;',
            "'": '&#39;', '<': '&lt;', '>': '&gt;' };
        return text.replace(/[\"&'<>]/g, ch => map[ch]);
     }



}

jTable(
    [
        '{"name":"Pesho","position":"Promenliva","salary":100000}',
        '{"name":"Teo","position":"Lecturer","salary":1000}',
        '{"name":"Georgi","position":"Lecturer","salary":1000}'

    ]
);
