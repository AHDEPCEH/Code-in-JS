s = "aananasnaaananasnanaananasananassananananasasanananasanaananassnanasaananasnas"; //Исходная строка
n = s.length;
t = 'ananas'; //Шаблон
m = t.length;
alph = new Array(); //Алфавит из букв шаблона
for (let i = 0; i < m; i++){
	alph[t.charAt(i)] = 0;
}; //Заполняем алфавит
del = new Array(m+1); //Таблица для конечного детерминированного автомата
for (let j = 0; j <= m; j++){
	del[j] = new Array();
};
for (i in alph){
	del[0][i] = 0;
};


for (let j = 0; j < m; j++){
	prev = del[j][t.charAt(j)];
	del[j][t.charAt(j)] = j + 1;
	for (i in alph)
		del[j+1][i] = del[prev][i]
}; //Заполняем табличку
state = 0; //Количество совпавших символов с шаблоном
positions = new Array(); //Массив позиций вхождения шаблона
for (i = 0; i < n; i++){
	if (s.charAt(i) in alph)
		state = del[state][s.charAt(i)]
	else 
		state = 0;
	if (state == m) positions.push(i - m  + 1);
};
console.log(positions);
