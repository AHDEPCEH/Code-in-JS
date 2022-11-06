const fs = require('fs');
const { arrayBuffer } = require('stream/consumers');
let name_s = process.argv[2];
let name_t = process.argv[3];
let S = fs.readFileSync(name_s, "utf8");
let T = fs.readFileSync(name_t, "utf8");
let n = S.length;
let m = T.length;
let flag = true;
let sum_t = 0;
let sums_hash = new Array;
let ind_arr = new Array;
let last_sum = 0;

console.time()
for (let i = 0; i < m; i++) {
    last_sum += S[i].charCodeAt(0) ** 2;
    sum_t += T[i].charCodeAt(0) ** 2;
};
if (sum_t == last_sum) sums_hash[0] = last_sum;
for (let i = 0; i < n - m; i++) {
    last_sum += S[i + m].charCodeAt(0) ** 2;
    last_sum -= S[i].charCodeAt(0) ** 2;
    if (last_sum == sum_t) sums_hash[i + 1] = last_sum;
};
for (i in sums_hash) {
    flag = true;
    i *= 1;
    for (let j = 0; j < m; j++) {
        if (S[j + i] != T[j]) {
            flag = false;
            break;
        };
    };
    if (flag) ind_arr.push(i + 1);
};
console.timeEnd();
console.log(ind_arr);
console.log(ind_arr.length);