export default class BurgerMenu {
	constructor(config, headerFixedInstance = null) {
		this.config = config;
		this.burgerButton = document.querySelector(`.${this.config.BURGER}`);
		this.burgerMenu = document.querySelector(`.${this.config.HEADER_MENU}`);
		this.body = document.querySelector(`.${this.config.PAGE_BODY}`);
		this.headerFixedInstance = headerFixedInstance;
		this.main = document.querySelector(`.${this.config.MAIN}`);

		if (!this.burgerButton || !this.burgerMenu || !this.body) {
			throw new Error("Required DOM elements are missing.");
		}

		this.swipeThreshold = this.config.SWIPE_THRESHOLD ?? 70;

		this.isMobileView = window.innerWidth <= this.config.BREAKPOINT;
		this.touchStartX = 0;
		this.touchStartY = 0;

		this.onBurgerClick = this.onBurgerClick.bind(this);
		this.onBodyClick = this.onBodyClick.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);

		this.manageEvents();
		window.addEventListener("resize", this.onWindowResize);
	}

	manageEvents() {
		if (this.isMobileView) {
			this.initEvents();
		} else {
			this.removeEvents();
			this.hideBurgerMenu();
		}
	}

	initEvents() {
		this.burgerButton.addEventListener("click", this.onBurgerClick);
		this.body.addEventListener("click", this.onBodyClick);
		document.addEventListener("keydown", this.onKeyDown);

		this.burgerMenu.addEventListener("touchstart", this.handleTouchStart, {
			passive: true,
		});
		this.burgerMenu.addEventListener("touchmove", this.handleTouchMove, {
			passive: false,
		});
		this.burgerMenu.addEventListener("touchend", this.handleTouchEnd);
	}

	removeEvents() {
		this.burgerButton.removeEventListener("click", this.onBurgerClick);
		this.body.removeEventListener("click", this.onBodyClick);
		document.removeEventListener("keydown", this.onKeyDown);

		this.burgerMenu.removeEventListener("touchstart", this.handleTouchStart);
		this.burgerMenu.removeEventListener("touchmove", this.handleTouchMove);
		this.burgerMenu.removeEventListener("touchend", this.handleTouchEnd);
	}

	onWindowResize() {
		const isNowMobileView = window.innerWidth <= this.config.BREAKPOINT;

		if (this.isMobileView !== isNowMobileView) {
			this.isMobileView = isNowMobileView;
			this.manageEvents();
		}
	}

	onBurgerClick() {
		const isOpen = this.burgerButton.classList.toggle(this.config.BURGER_OPEN);
		this.burgerButton.ariaLabel = isOpen
			? this.config.LABEL.CLOSE
			: this.config.LABEL.OPEN;
		this.burgerButton.ariaExpanded = String(isOpen);
		this.burgerMenu.classList.toggle(this.config.HEADER_MENU_OPEN, isOpen);
		this.body.classList.toggle(this.config.PAGE_BODY_NO_SCROLL, isOpen);

		if (this.main) {
			this.main.style.pointerEvents = isOpen ? "none" : "";
		}

		if (this.headerFixedInstance) {
			if (isOpen) {
				this.headerFixedInstance.removeFixedClass();
			} else {
				this.headerFixedInstance.updateFixedClass();
			}
		}

		this.logMenuListeners(isOpen ? "open" : "close");
	}

	hideBurgerMenu() {
		const wasOpen = this.isBurgerMenuOpen();
		this.burgerButton.classList.remove(this.config.BURGER_OPEN);
		this.burgerButton.ariaLabel = this.config.LABEL.OPEN;
		this.burgerButton.ariaExpanded = "false";
		this.burgerMenu.classList.remove(this.config.HEADER_MENU_OPEN);
		this.body.classList.remove(this.config.PAGE_BODY_NO_SCROLL);

		if (this.main) {
			this.main.style.pointerEvents = "";
		}

		if (wasOpen && this.headerFixedInstance) {
			this.headerFixedInstance.updateFixedClass();
		}

		if (wasOpen) {
			this.logMenuListeners("close");
		}
	}

	logMenuListeners(action) {
		const listeners = {
			touchstart: this.handleTouchStart,
			touchmove: this.handleTouchMove,
			touchend: this.handleTouchEnd,
		};

		console.groupCollapsed(
			`%cBurgerMenu: меню ${action === "open" ? "открыто" : "закрыто"}`,
			"color:#fff; background:#4caf50; padding:2px 6px; border-radius:3px;",
		);
		console.log("Элемент (панель меню):", this.burgerMenu);
		console.table(
			Object.entries(listeners).map(([event, handler]) => ({
				event,
				handler: handler.name,
			})),
		);
		if (typeof getEventListeners === "function") {
			console.log("getEventListeners:", getEventListeners(this.burgerMenu));
		}
		console.groupEnd();
	}

	isBurgerMenuOpen() {
		return this.burgerMenu.classList.contains(this.config.HEADER_MENU_OPEN);
	}

	onBodyClick(event) {
		const target = event.target;
		const isLinkInMenu = target.classList.contains(this.config.MENU_LINK);
		const isMenuOpen = this.isBurgerMenuOpen();
		const isClickOutsideMenu =
			!target.closest(`.${this.config.HEADER_MENU}`) &&
			!target.closest(`.${this.config.BURGER}`);

		if (
			(isLinkInMenu && window.innerWidth <= this.config.BREAKPOINT) ||
			(isMenuOpen && isClickOutsideMenu)
		) {
			this.hideBurgerMenu();
		}
	}

	onKeyDown(event) {
		if (event.key === "Escape" && this.isBurgerMenuOpen()) {
			this.hideBurgerMenu();
			this.burgerButton.focus();
		}
	}

	handleTouchStart(event) {
		if (!this.isBurgerMenuOpen()) return;
		this.touchStartX = event.changedTouches[0].screenX;
		this.touchStartY = event.changedTouches[0].screenY;
		this.burgerMenu.style.transition = "none";
	}

	handleTouchMove(event) {
		if (!this.isBurgerMenuOpen()) return;

		const currentX = event.changedTouches[0].screenX;
		const currentY = event.changedTouches[0].screenY;
		const deltaX = currentX - this.touchStartX;
		const deltaY = currentY - this.touchStartY;

		const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

		if (isHorizontalSwipe && event.cancelable) {
			event.preventDefault();
		}

		const translateX = Math.max(0, deltaX);
		this.burgerMenu.style.right = `-${translateX}px`;
	}

	handleTouchEnd(event) {
		if (!this.isBurgerMenuOpen()) return;
		const touchEndX = event.changedTouches[0].screenX;
		const swipeDistance = touchEndX - this.touchStartX;

		this.burgerMenu.style.transition = "";
		this.burgerMenu.style.right = "";

		if (swipeDistance > this.swipeThreshold) {
			this.hideBurgerMenu();
		}
	}

	destroy() {
		this.removeEvents();
		window.removeEventListener("resize", this.onWindowResize);
		this.hideBurgerMenu();
	}
}
