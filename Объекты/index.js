// Задача 1
const person = {
	firstName: "Антон",
	lastName: "Корабельников",
	age: 28,
	city: "Нижнекамск",
	profession: "Веб-разработчик",
	hobbies: ["программирование", "игры", "сериалы"],
};
console.log(person);

// Задача 2
function isEmpty(object) {
	return Object.keys(object).length === 0;
}
console.log(isEmpty({})); // true
console.log(isEmpty({ name: "Антон" })); // false

// Задача 3
const task = {
	title: "Изучение JS",
	description: "Освоить работу с объектами",
	isCompleted: false,
};

function cloneAndModify(object, modifications) {
	return { ...object, ...modifications };
}

const modifiedTask = cloneAndModify(task, {
	isCompleted: true,
	description: "Задача успешно выполнена!",
});

console.log("Свойства изменённого объекта:");
for (const key in modifiedTask) {
	console.log(`${key}: ${modifiedTask[key]}`);
}

console.log("\nИсходный объект (не изменён):");
for (const key in task) {
	console.log(`${key}: ${task[key]}`);
}

// Задача 4
function callAllMethods(object) {
	for (const key in object) {
		if (typeof object[key] === "function") {
			object[key]();
		}
	}
}
const myObject = {
	method1() {
		console.log("Метод 1 вызван");
	},
	method2() {
		console.log("Метод 2 вызван");
	},
	property: "Это не метод",
};
callAllMethods(myObject);
