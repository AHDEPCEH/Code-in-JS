function Node(letter, freq, used, father, code) { 
 //this = {}; 
    this.letter = letter; 
    this.freq = freq; 
    this.used = used; 
    this.father = father; 
    this.code = code; 
 //return this 
};
function choice(mas){
	min1 = "";
	min2 = "";
	last_c = -1;
	for (i in mas){
		if ((mas[i] <= last_c) || (last_c == -1)){
			last_c = mas[i];
			min1 = i;
		};
	};
	last_c = -1;
	for (i in mas){
		if (((mas[i] <= last_c) || (last_c == -1)) && !(i == min1)){
			last_c = mas[i]
			min2 = i
		};
	};
	loc_m = [min1, min2];
	return loc_m;
}; 
 
let inpStr = 'abrakadabraajshfalaljsddlajsdjdiwijjajjjajjaaalsldkdoslaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkjdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddjjjj'; 
let alph = new Array(); 
let lens = 0;
let ind_arr = new Array();

for (let i = 0; i < inpStr.length; i++) { 
    alph[inpStr.charAt(i)] = 0;
} 
for (let i = 0; i < inpStr.length; i++) { 
	alph[inpStr.charAt(i)] += 1; 
}

let loc_arr = choice(alph);
let name = loc_arr[0] + loc_arr[1];
let tree = new Array(); 
 
for (i in alph){ 
	let n = new Node(i, alph[i], 0, null, ''); 
	tree.push(n);
	lens ++;
	ind_arr[i] = tree.indexOf(n);
};

let len = ind_arr.length;

while (name.length <= lens){
	alph[name] = alph[loc_arr[0]] + alph[loc_arr[1]];
	alph[loc_arr[0]] = Infinity;
	alph[loc_arr[1]] = Infinity;
	let n = new Node(name, alph[name], 0, null, '');
	tree.push(n);
	ind_arr[name] = tree.indexOf(n);
	tree[ind_arr[loc_arr[0]]].used = 1;
	tree[ind_arr[loc_arr[0]]].father = tree.indexOf(n);
	tree[ind_arr[loc_arr[1]]].used = 1;
	tree[ind_arr[loc_arr[1]]].father = tree.indexOf(n);
	loc_arr = choice(alph);
	name = loc_arr[0] + loc_arr[1];
};

let index = tree.length - 1
while (index >= len){
	count = 0
	for (i in tree){
		if (tree[i].father == index){
			if (count == 0){
				tree[i].code = tree[index].code + "0";
				count ++;
			}
			else tree[i].code = tree[index].code + "1";
		};
	};
	index --;
};

console.log(tree); 

str = "barak";
new_str = "";
for (c in str){
	new_str += tree[ind_arr[str[c]]].code;
};
console.log(new_str);
