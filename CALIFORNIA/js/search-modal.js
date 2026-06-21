export default class SearchModal {
	constructor(settings) {
		this._settings = settings;

		this._searchBtn = document.querySelector(`.${settings.SEARCH_BTN}`);
		this._modal = document.querySelector(`.${settings.MODAL}`);

		if (!this._searchBtn || !this._modal) {
			throw new Error("SearchModal: search button or modal not found");
		}

		this._form = this._modal.querySelector(`.${settings.FORM}`);
		this._input = this._modal.querySelector(`.${settings.INPUT}`);
		this._body = document.querySelector(`.${settings.PAGE_BODY}`);

		this._onSearchBtnClick = this._onSearchBtnClick.bind(this);
		this._onModalClick = this._onModalClick.bind(this);
		this._onKeyDown = this._onKeyDown.bind(this);
		this._onSubmit = this._onSubmit.bind(this);

		this._init();
	}

	_init() {
		this._searchBtn.addEventListener("click", this._onSearchBtnClick);
		this._modal.addEventListener("click", this._onModalClick);
		document.addEventListener("keydown", this._onKeyDown);

		if (this._form) {
			this._form.addEventListener("submit", this._onSubmit);
		}
	}

	open() {
		this._modal.classList.add(this._settings.MODAL_OPEN);
		this._modal.setAttribute("aria-hidden", "false");

		if (this._body) {
			this._body.classList.add(this._settings.PAGE_BODY_NO_SCROLL);
		}

		setTimeout(() => this._input && this._input.focus(), 100);
	}

	close() {
		this._modal.classList.remove(this._settings.MODAL_OPEN);
		this._modal.setAttribute("aria-hidden", "true");

		if (this._body) {
			this._body.classList.remove(this._settings.PAGE_BODY_NO_SCROLL);
		}
	}

	_isOpen() {
		return this._modal.classList.contains(this._settings.MODAL_OPEN);
	}

	_onSearchBtnClick() {
		this.open();
	}

	_onModalClick(evt) {
		if (evt.target.closest(`[${this._settings.CLOSE_ATTR}]`)) {
			this.close();
		}
	}

	_onKeyDown(evt) {
		if (evt.key === "Escape" && this._isOpen()) {
			this.close();
		}
	}

	_onSubmit(evt) {
		evt.preventDefault();

		const query = this._input ? this._input.value.trim() : "";

		if (query) {
			console.log("Поиск:", query);
		}
	}

	destroy() {
		this._searchBtn.removeEventListener("click", this._onSearchBtnClick);
		this._modal.removeEventListener("click", this._onModalClick);
		document.removeEventListener("keydown", this._onKeyDown);

		if (this._form) {
			this._form.removeEventListener("submit", this._onSubmit);
		}
	}
}
