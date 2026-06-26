// задача 1
function calculateFinalPrice(basePrice, discountPercent, taxRate) {
	const priceAfterDiscount = basePrice - (basePrice * discountPercent) / 100;
	const finalPrice = priceAfterDiscount + priceAfterDiscount * taxRate;
	return finalPrice;
}
console.log(calculateFinalPrice(100, 10, 0.2));
console.log(calculateFinalPrice(100, 10, 0));

// Задача 2
function checkAccess(username, password) {
	if (username === "admin" && password === "123456") {
		return "Доступ разрешен";
	} else {
		return "Доступ запрещен";
	}
}
console.log(checkAccess("admin", "123456")); // Доступ разрешен
console.log(checkAccess("user", "123456")); // Доступ запрещен

// Задача 3
function getTimeOfDay(hour) {
	if (hour < 0 || hour > 23) return "Некорректное время";
	if (hour <= 5) return "Ночь";
	if (hour <= 11) return "Утро";
	if (hour <= 17) return "День";
	return "Вечер";
}
console.log(getTimeOfDay(3)); // "Ночь"
console.log(getTimeOfDay(11)); // "Утро"
console.log(getTimeOfDay(15)); // "День"
console.log(getTimeOfDay(21)); // "Ночь"
console.log(getTimeOfDay(24)); // "Некорректное время"

// Задача 4
function findFirstEven(start, end) {
	for (let i = start; i <= end; i++) {
		if (i % 2 === 0) {
			return i;
		}
	}
	return "Чётных чисел нет";
}
console.log(findFirstEven(3, 10)); // 4
console.log(findFirstEven(5, 5)); // "Чётных чисел нет"
