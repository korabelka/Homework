import HeaderFixed from "./header.js";
import BurgerMenu from "./burger.js";
import { heroSlider } from "./hero-slider.js";
import { searchTags } from "./search.js";
import SearchModal from "./search-modal.js";

try {
	const headerFixed = new HeaderFixed({
		HEADER: "header",
		HEADER_FIXED: "header--fixed",
	});

	new BurgerMenu(
		{
			BURGER: "burger",
			BURGER_OPEN: "burger--open",
			HEADER_MENU: "header__menu",
			HEADER_MENU_OPEN: "header__menu--open",
			lABEL: {
				OPEN: "Open menu",
				CLOSE: "Close menu",
			},
			PAGE_BODY: "page__body",
			PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
			MENU_LINK: "menu__link",
			BREAKPOINT: 768,
		},
		headerFixed,
	);

	new SearchModal({
		SEARCH_BTN: "header__icon-search-btn",
		MODAL: "search-modal",
		MODAL_OPEN: "search-modal--open",
		FORM: "search-modal__form",
		INPUT: "search-modal__input",
		CLOSE_ATTR: "data-close",
		PAGE_BODY: "page__body",
		PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
	});

	heroSlider();
	searchTags();
} catch (error) {
	console.error(error);
}
