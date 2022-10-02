const fs = require("fs")
let name1 = process.argv[2];//Имя читаемого файла
let name2 = process.argv[3];//Имя записываемого файла
let str = fs.readFileSync(name1, "utf8"); //Чтение строки из файла

function Node(letter, freq, used, father, code) { //Функция создания объектов
 //this = {}; 
    this.letter = letter; 
    this.freq = freq; 
    this.used = used; 
    this.father = father; 
    this.code = code; 
 //return this 
};
function choice(mas){ //Функция выбора двух элементов с минимальной частотой
  min1 = ""; //Первый мин.элемент
  min2 = ""; //Второй мин.элемент
  last_c = -1; //Значение частоты предыдущего элемента
  for (i in mas){
    if ((mas[i] <= last_c) || (last_c == -1)){
      last_c = mas[i];
      min1 = i;
    };
  };
  last_c = -1;
  for (i in mas){
    if (((mas[i] <= last_c) || (last_c == -1)) && !(i == min1)){
      last_c = mas[i];
      min2 = i;
    };
  };
  loc_m = [min1, min2];
  return loc_m;
};
function code(str, ind_arr){ //Кодирование заданной строки
	new_str = ""; //Новая строка
	for (let i = 0; i < str.length; i ++){
		new_str += tree[ind_arr[str[i]]].code;
	};
	return new_str;
}; 
function decode(str, code_arr){//Декодирование заданной строки
	loc_str = ""; //Подстрока, которую декодируют в символ
	new_str = ""; //Новая строка
	for (let i = 0; i < str.length; i ++){
		loc_str += str[i];
		if (code_arr[loc_str] != undefined){
			new_str += code_arr[loc_str];
			loc_str = "";
		}; 
	};
	return new_str; //Раскодированная строка
};
 
let code_arr = new Array(); //Массив, где ключи - код, а значение - символ
let alph = new Array(); //Массив использованных символов, код - символ, значение - частота встреч
let father_arr = new Array(); //Массив связей между объектами, ключ - индекс отца, значение - массив из индексов детей
let ind_arr = new Array(); //Массив связи между alph и tree, ключ - символ, значение - индекс в tree 
var tree = new Array(); //Создаём массив из объектов
let lens = 0; //Количества односимвольных элементов в tree

//Далее заполняем массив alph
for (let i = 0; i < str.length; i++) { 
    alph[str.charAt(i)] = 0;
} 
for (let i = 0; i < str.length; i++) { 
  alph[str.charAt(i)] += 1; 
}

let loc_arr = choice(alph); //Первые два минимальных элемента
let name = loc_arr[0] + loc_arr[1]; //Имя нового элемента

//Заполняем массив первыми простыми объектами 
for (i in alph){ 
  let n = new Node(i, alph[i], 0, null, ''); 
  tree.push(n);
  lens ++;
  ind_arr[i] = tree.indexOf(n);
};

//Генерируем новые объекты для tree 
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

//Создаём связи между отцами и детьми среди объектов
for (i in alph){
	if (father_arr[tree[ind_arr[i]].father] == undefined){
		father_arr[tree[ind_arr[i]].father] = new Array();
		father_arr[tree[ind_arr[i]].father].push(ind_arr[i])
	}
	else father_arr[tree[ind_arr[i]].father].push(ind_arr[i]);
}; 

for (let index = tree.length - 1; index >= lens; index --){ //Генерируем код для каждого символа опираясь на массив father_arr 
	tree[father_arr[index][0]].code = tree[index].code + "0";
	tree[father_arr[index][1]].code = tree[index].code + "1";
};
 
for (let i = 0; i < lens; i ++) code_arr[tree[i].code] = tree[i].letter; //Заполняем массив где ключ - код, а значение - символ

let code_str = code(str, ind_arr); //Получившаяся строка 
let decode_str = decode(code_str, code_arr); //Декодируем полученную строку 
console.log(tree);
fs.writeFileSync(name2, code_str); //Записываем в файл получившийся код
fs.writeFileSync("decode.txt", decode_str); //Записываем раскодированную строку в файл
