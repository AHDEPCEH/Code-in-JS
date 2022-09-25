const fs = require("fs")
let name = process.argv[2];
let s = fs.readFileSync(name, "utf8");
let len_s = s.length;
let pow = 0;
let H = 0;

alph = new Array();

for(i = 0; i < len_s; i ++){
	if (alph[s.charAt(i)])
		alph[s.charAt(i)]++
	else {
		alph[s.charAt(i)] = 1;
        pow ++;
    }
}

for(i in alph){
	H -= alph[i] * Math.log(alph[i] / len_s) / len_s;		
}
 
console.log(H / Math.log(pow))
