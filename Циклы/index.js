// Задача 1
for (let i = 1; i <= 20; i++) {
	if (i % 4 === 0) {
		continue;
	}
	console.log(i);
}

// Задача 2
const number = +prompt("Введите число для вычисления факториала:");

if (isNaN(number) || number < 0) {
	alert("Пожалуйста, введите целое неотрицательное число!");
} else {
	let factorial = 1;
	for (let i = 1; i <= number; i++) {
		factorial *= i;
	}

	alert(`Факториал числа ${number} равен ${factorial}`);
	console.log(`${number}! = ${factorial}`);
}

// Задача 3
let board = "";

for (let i = 0; i < 8; i++) {
	for (let j = 0; j < 8; j++) {
		board += (i + j) % 2 === 0 ? "X " : "O ";
	}
	board += "\n";
}
console.log(board);
