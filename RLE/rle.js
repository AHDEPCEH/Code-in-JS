const fs = require("fs")
let name = process.argv[2];
let arg_func = process.argv[3];
let str = fs.readFileSync(name, "utf8");


function coding(str){
	let loc_str = str[0];
	let i = 1;
	let new_str = "";
	let len = str.length;
	while (i <= len) {
		if (str[i] == str[i - 1] & i < len & loc_str.length < 255) loc_str += str[i]; 
		else {
			if (loc_str.length < 4) new_str += loc_str;
			else new_str += "#" + String.fromCharCode(loc_str.length) + loc_str[0];
			loc_str = str[i];
		}
		i ++;
	}
	return new_str;	
}


function decoding(str){
    let new_str = "";
    let i = 0;
    let len = str.length;
    while (i < len){
        if (str[i] == "#"){
            i ++;
            for (j = 0; j < str.charCodeAt(i); j ++) new_str += str[i + 1];
            i += 1;
        }
        else new_str += str[i];
        i ++;
    }
    return new_str;
}


if (arg_func.toLowerCase() == "coding"){
    let content = coding(str)
    const data = fs.writeFileSync("rleout.txt", content);
}
else {
    let content = decoding(str)
    const data = fs.writeFileSync("rleout.txt", content);
}
