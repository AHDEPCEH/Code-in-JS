var fs = require('fs');
var readline = require('readline-sync'); 
const name = process.argv[2];
var array = fs.readFileSync(name).toString().split("\n");
let mem = new Array();
let str = "";
for(i in array) {
    str += array[i] + ' ';
};
str += "exit";
mem = str.split(' ');
let ip = 0;
for (i in mem){
    mem[i] = mem[i].split('\r')[0];
};
while (mem[ip] != 'exit'){
    switch (mem[ip]){
        case 'input':
            mem[mem[ip + 1]] = readline.question("Enter: ") * 1;
            ip += 2;
            break;
        case 'output':
            console.log(mem[mem[ip + 1]])
            ip += 2;
            break;
        case 'add':
            mem[mem[ip + 3]] = mem[mem[ip + 1]] + mem[mem[ip + 2]];
            ip += 4;
            break;
        case 'sub':
            mem[mem[ip + 3]] = mem[mem[ip + 1]] - mem[mem[ip + 2]];
            ip += 4;
            break;
        case 'mlt':
            mem[mem[ip + 3]] = mem[mem[ip + 1]] * mem[mem[ip + 2]];
            ip += 4;
            break;
        case 'div':
            mem[mem[ip + 3]] = mem[mem[ip + 1]] / mem[mem[ip + 2]];
            ip += 4;
            break;
        case 'set':
            mem[mem[ip + 1]] = mem[ip + 2] * 1;
            ip += 3;
            break;
        case 'cmp':
            if (mem[mem[ip + 1]] < mem[mem[ip + 2]]) ip = mem[ip + 3] * 1
            else ip += 4;
            break;
        case 'jmp':
            ip = mem[ip + 1] * 1;
            break;
        default:
            console.log("Compilation error");
            break;
    };
};