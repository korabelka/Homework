// Задание 1

const users = [
	{ name: "Alex", age: 24, isAdmin: false },
	{ name: "Bob", age: 13, isAdmin: false },
	{ name: "John", age: 31, isAdmin: true },
	{ name: "Jane", age: 20, isAdmin: false },
];

users.push(
	{ name: "Ann", age: 19, isAdmin: false },
	{ name: "Jack", age: 43, isAdmin: true },
	{ name: "Alice", age: 36, isAdmin: false },
	{ name: "Ezio", age: 26, isAdmin: true },
);

console.log(users);

// Задание 2

function getUserAverageAge(users) {
	let totalAge = 0;
	users.forEach((user) => {
		totalAge += user.age;
	});
	return totalAge / users.length;
}

console.log(getUserAverageAge(users));

// Задание 3

function getAllAdmins(users) {
	return users.filter((user) => user.isAdmin);
}

console.log(getAllAdmins(users));

// Задание 4

function first(arr, n) {
	if (n === undefined) {
		return arr.slice(0, 1);
	}
	if (n > arr.length) {
		console.error("Ошибка: n больше длины массива");
		return;
	}
	return arr.slice(0, n);
}

// const numbers = [10, 20, 30, 40, 50];

// console.log(first(numbers, 3));
// console.log(first(numbers, 0));
// console.log(first(numbers));
// console.log(first(numbers, 100));
