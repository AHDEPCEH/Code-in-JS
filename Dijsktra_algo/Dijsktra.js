const fs = require('fs');
let name_imp = process.argv[2];
let name_out = process.argv[3];

let exampl = fs.readFileSync(name_imp, "utf8");
exampl = del_space(exampl);


function del_space(str){ //Метод для удаления всех пробелов из исходного примера
    let new_str = "";
    for (let i = 0; i < str.length; i++) if (str[i] != " ") new_str += str[i];
    return new_str;
};


function exp(str){ //Метод для замены ^ на **, для eval
    let new_str = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] == "^") new_str += "**";
        else new_str += str[i];
    };
    return new_str;
};


function rewrite(str){ //Запись исходного вывражения в Польскую заапись 
    let stack = "";
    let number = "";
    let out = "";
    let imp = new Array(); //Массив приоритетности разных выражений для формирования правильного порядка математических действий.
    imp["("] = 0;
    imp["+"] = 1;
    imp["-"] = 1;
    imp["/"] = 2;
    imp["*"] = 2;
    imp["^"] = 3;
    for (let i = 0; i < str.length; i++){
        let n = stack.length;
        let c = str[i];
        if (imp[c] == undefined && c != ")") {
            if (c.charCodeAt(0) > 47 && c.charCodeAt(0) < 58) number += str[i]; // Запись чисел из строки
            else return "Error, incorrect arithmetic expression!" + i; // Обработка ошибки неправильных символов в выражении
        }
        else {
            if (number.length > 0){ // Вывод числа в итоговую строку через пробел
                out += number + " ";
                number = "";
            };
            if (c == ")") {
                let k = stack.length - 1;
                while (stack[k] != "("){ // Освобождаем стек пока не встретим открывающуюся скобку, при наличии закрывающей.
                    out += stack[k] + " ";
                    stack = stack.slice(0, -1);
                    k --;
                    if (k < 0) {
                        return "Error, incorrect arithmetic expression!" + i; // Обработка ошибки: отсутствие открывающейся скобки, при наличии закрыывающей
                    };
                };
                stack = stack.slice(0, -1);
            }
            else {
                if (n == 0 || imp[c] > imp[stack[n - 1]] || imp[c] == 3 || c == "(") stack += c; // Условия приоритетностей операций
                else {
                    let m = 1;
                    while (!(imp[stack[n - m]] == "(" || imp[c] > imp[stack[n - m]])) { // Освобождаем стек пока на будет найдена операция ниже по приоритету или скобка
                        out += stack[n - m] + " ";
                        stack = stack.slice(0, -1);
                        m++;
                        if (m > n) break;
                    };
                    stack += c;
                };
            };
        };
    };
    if (number.length > 0) out += number + " ";
    while (stack.length > 0) { // Выгружаем остатки стека в выходную строку
        if (stack[stack.length - 1] == "(") return "Error, incorrect arithmetic expression!" //Обработка ошибки отсутствия закрывающейся скобки
        out += stack[stack.length - 1] + " ";
        stack = stack.slice(0, -1);
    };
    return out.slice(0, -1); // В итоговой строке все операнды и операции разделены друг от друга пробелами, для дальнейшего анализа
};


function operators(num1, num2, oper){ //Вычисление некоторого значения, простейшие действия с числами 
    switch (oper){
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        default:
            return num1 ** num2;
    };
};


function calc(str){ //Вычисление значения по Польской записи.
    let number = "";
    let val = 0;
    let c = "";
    let stack = new Array();
    for (let i = 0; i < str.length; i ++) {
        c = str[i];
        if (c != " " && c.charCodeAt(0) > 47 && c.charCodeAt(0) < 58){ //Собираем счисловой массив - stack
            number += c;
        }
        else{
            if (number.length > 0) stack.push(Number(number));
            if (c != " ") { // При встречи операнта считаем новое число по последним двум из стека.
                if (stack.length < 2) return "Error, incorrect arithmetic expression!" // Обработка нехватки чисел для всех операций
                val = operators(stack[stack.length - 2], stack[stack.length - 1], c)
                stack.splice(stack.length - 2, 2);
                stack.push(val);
            };
            number = "";
        };
    };
    if (stack.length > 1) return "Error, incorrect arithmetic expression!" //Проблема избытка чисел над всеми операциями
    return stack[0]; //Итоговое значение выражения хранится в первом элементе стека
};

let pw = rewrite(exampl);
let pw_eval = exp(exampl)
if (pw[0] != "E"){ // Если первый элемент число, то функция отработала без ошибок 
    pw = calc(pw);
    if (pw[0] != "E"){
        fs.writeFileSync(name_out, "Calc: "+pw); //Создаём файл и записываем туда результат работы алгоритма
        fs.appendFileSync(name_out, `\n${"Eval: "+eval(pw_eval)}`) //Дописываем в тот же файл результат работы eval для дальнешего сравнеия результатов
    }
    else console.log(pw);
}
else console.log(pw) //Вывод ошибок, если таковые есть
