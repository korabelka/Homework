export function searchTags() {
	const tags = document.querySelectorAll(".search-section__tag");
	const input = document.querySelector(".search-section__input");

	if (!tags.length || !input) return;

	tags.forEach((tag) => {
		tag.addEventListener("click", (event) => {
			event.preventDefault();

			tags.forEach((t) => t.classList.remove("search-section__tag--active"));

			tag.classList.add("search-section__tag--active");

			input.value = tag.textContent;
		});
	});

	input.addEventListener("input", () => {
		tags.forEach((t) => t.classList.remove("search-section__tag--active"));
	});
}
