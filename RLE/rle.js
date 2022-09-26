//Мельниченко Андрей
//КНМО-101
const fs = require("fs")
let arg_func = process.argv[2]; //Берём аргумент code/decode
let name1 = process.argv[3];//Имя читаемого файла
let name2 = process.argv[4];//Имя записываемого файла
let str = fs.readFileSync(name1, "utf8"); //Чтение строки из файла


function coding(str){ //Функция кодировки строки
	let loc_str = str[0];//Подстроки главной строки
	let i = 1;
	let new_str = "";// Новая строка
	let len = str.length;
	while (i <= len) { //Перебираем символы строки и собираем новую
		if (str[i] == str[i - 1] & i < len & loc_str.length < 255) loc_str += str[i]; 
		else {
			if (loc_str.length < 4 & loc_str[0] != "#") new_str += loc_str;
			else new_str += "#" + String.fromCharCode(loc_str.length) + loc_str[0];
			loc_str = str[i];
		}
		i ++;
	}
	return new_str;	
}


function decoding(str){ // Функция декодирования строки
    let new_str = "";
    let i = 0;
    let len = str.length;
    while (i < len){ //Проверяем каждый символ, если встретим # то расшифровываем его 
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


if (arg_func.toLowerCase() == "code"){ //Проверям тип операции на code
    let content = coding(str); //Получившаяся строка 
    const data = fs.writeFileSync(name2, content); //Записываем в файл
    console.log(str.length / content.length); //Выводим коэффицент сжатия 
}
if (arg_func.toLowerCase() == "decode"){ //Проверям тип операции на decode
    let content = decoding(str); //Получившаяся строка
    const data = fs.writeFileSync(name2, content); //Записываем в файл
}
