const fs = require('fs');
let name_s = process.argv[2];
let name_t = process.argv[3];
let S = fs.readFileSync(name_s, "utf8");
let T = fs.readFileSync(name_t, "utf8");
let n = S.length;
let m = T.length;
let flag = true;
let ind_arr = new Array();
console.time();

for (let i = 0; i < n - m + 1; i++){
    let k = i;
    for (let j = 0; j < m; j++){
        if (S[k] != T[j]) {
            flag = false;
            break;
        };
        k ++;
    };
    if (flag) ind_arr.push(i + 1);
    flag = true;
};
console.timeEnd();
console.log(ind_arr);
console.log(ind_arr.length);
