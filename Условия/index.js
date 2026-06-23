// Задание 1
const number = 10;
if (number % 2 === 0) {
	console.log("Число чётное");
} else {
	console.log("Число не чётное");
}

// Задание 2
const age = 28;
const discount = age < 18 ? "10%" : age <= 65 ? "20%" : "30%";
console.log(discount);

// Задание 2 на Switch Case
const myAge = 28;
switch (myAge) {
	case myAge < 18:
		console.log("10%");
		break;
	case myAge <= 65:
		console.log("20%");
		break;
	default:
		console.log("30%");
}

// Задание 3
const username = prompt("Введите имя пользователя");
const password = prompt("Введите пароль");

if ((username === "admin" || username === "user") && password === "123456") {
	console.log("Доступ разрешен");
} else {
	console.log("Доступ запрещен");
}

// Задание 4
const weight = Number(prompt("Введите вес посылки в кг"));
const typeDelivery = prompt(
	"Введите тип доставки: Стандарт, Экспресс или Премиум",
);

let basePrice;
let coefficient;

if (weight <= 0) {
	alert("Некорректный вес посылки");
} else if (weight < 1) {
	basePrice = 5;
} else if (weight >= 1 && weight <= 5) {
	basePrice = 10;
} else {
	basePrice = 15;
}

switch (typeDelivery) {
	case "Стандарт":
		coefficient = 1;
		break;
	case "Экспресс":
		coefficient = 1.5;
		break;
	case "Премиум":
		coefficient = 2;
		break;
	default:
		alert("Неверный тип доставки");
}

const totalPrice = basePrice * coefficient;

if (totalPrice !== undefined) {
	alert(`Итоговая стоимость доставки: ${totalPrice}$`);
}
