$(document).ready(function(){
	// console.log("hello there");
  $('.coating-systems-slick-slider').slick({
    fade: true,
    asNavFor: '.coating-systems-slick-slider-nav',
    draggable: false,
    swipe: false,
    speed: 50,
  });

  $('.coating-systems-slick-slider-nav').slick({
    slidesToShow: 16,
    asNavFor: '.coating-systems-slick-slider',
    arrows: false,
    infinite: false,
  	focusOnSelect: true,
  	draggable: false,
  	swipe: false,
  	variableWidth: 55,
  	centerMode: true,
  });
});

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 400;

if (popupLinks.length > 0) {
	for (let i = 0; i < popupLinks.length; i++) {
		const popupLink = popupLinks[i];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');

if (popupCloseIcon.length > 0) {
	for (let i = 0; i < popupCloseIcon.length; i++){
		const el = popupCloseIcon[i];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		}
		else {
			bodyLock();
		}
		currentPopup.classList.add('open');
		currentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock) {
	if(doUnlock === undefined) {
		doUnlock = true;
	}
	if (unlock) {
		jQuery("iframe").each(function() {
			jQuery(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
		});
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	if (lockPadding.length > 0){
		for (let i = 0; i < lockPadding.length; i++) {
			const el = lockPadding[i];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function () {
		if (lockPadding.length > 0){
			for (let i = 0; i < lockPadding.length; i++) {
				const el = lockPadding[i];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function(e) {
	if (e.which == 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();

(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector || 
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();