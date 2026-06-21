export function searchTags() {
	const tags = document.querySelectorAll(".search-section__tag");
	const input = document.querySelector(".search-section__input");

	// Если элементов нет на странице — выходим
	if (!tags.length || !input) return;

	tags.forEach((tag) => {
		tag.addEventListener("click", (event) => {
			event.preventDefault();

			// Убираем активный класс со всех тегов
			tags.forEach((t) => t.classList.remove("search-section__tag--active"));

			// Добавляем активный класс текущему тегу
			tag.classList.add("search-section__tag--active");

			// Подставляем текст в инпут
			input.value = tag.textContent;
		});
	});

	// Сбрасываем активный тег при ручном вводе
	input.addEventListener("input", () => {
		tags.forEach((t) => t.classList.remove("search-section__tag--active"));
	});
}
