"use strict";

(function() {
  var pageHeader = document.querySelector(".page-header");
  var openButton = pageHeader.querySelector(".js-open-menu");
  var closeButton = pageHeader.querySelector(".js-close-menu");
  var menuToggles = pageHeader.querySelectorAll(".main-nav__button");
  var innerMenuToggles = pageHeader.querySelectorAll(".main-nav__inner-button");
  var openSearchButton = pageHeader.querySelector(".js-search-open");
  var closeSearchButton = pageHeader.querySelector(".js-close-search-field");
  var menuTop = pageHeader.querySelector(".page-header__menu-top");
  var searchInput = pageHeader.querySelector(".search__input");
  var openLanguageMenu = pageHeader.querySelector(".js-open-language-menu");
  var languageMenu = pageHeader.querySelector(".language__wrap");
  var languageVariants = pageHeader.querySelectorAll(".language__item");
  var languageVariantsButtons = pageHeader.querySelectorAll(
    ".language__variant-button"
  );
  var currentLanguageName = pageHeader.querySelector(".language__name");
  var currentLanguageFlag = pageHeader.querySelector(".language__current-flag");

  var closeLanguageMenu = function() {
    if (menuTop.classList.contains("page-header__menu-top--language-opened")) {
      menuTop.classList.remove("page-header__menu-top--language-opened");
      languageMenu.classList.add("language__wrap--hidden");
    }
  };

  var resetSearchField = function() {
    if (menuTop.classList.contains("page-header__menu-top--search-opened")) {
      menuTop.classList.remove("page-header__menu-top--search-opened");
      menuTop.classList.add("page-header__menu-top--search-closed");

      searchInput.value = "";
    }
  };

  var resetActiveButtons = function(arr, activeClass) {
    arr.forEach(function(toggle) {
      if (toggle.classList.contains(activeClass)) {
        toggle.classList.remove(activeClass);

        var pannel = toggle.nextElementSibling;
        pannel.style.maxHeight = "";
      }
    });
  };

  openButton.addEventListener("click", function() {
    if (pageHeader.classList.contains("page-header--menu-closed")) {
      pageHeader.classList.remove("page-header--menu-closed");
      pageHeader.classList.add("page-header--menu-opened");
    }
  });

  closeButton.addEventListener("click", function() {
    if (pageHeader.classList.contains("page-header--menu-opened")) {
      pageHeader.classList.remove("page-header--menu-opened");
      pageHeader.classList.add("page-header--menu-closed");

      resetSearchField();
      closeLanguageMenu();
      resetActiveButtons(menuToggles, "main-nav__button--active");
      resetActiveButtons(innerMenuToggles, "main-nav__inner-button--active");
    }
  });

  var changeAccordionHeight = function(button, activeClass) {
    button.addEventListener("click", function() {
      button.classList.toggle(activeClass);
      var panels = button.nextElementSibling;
      if (panels.style.maxHeight) {
        panels.style.maxHeight = null;
      } else {
        panels.style.maxHeight = panels.scrollHeight + 400 + "px";
      }
    });
  };

  menuToggles.forEach(function(toggle) {
    changeAccordionHeight(toggle, "main-nav__button--active");
  });

  innerMenuToggles.forEach(function(toggle) {
    changeAccordionHeight(toggle, "main-nav__inner-button--active");
  });

  openSearchButton.addEventListener("click", function() {
    closeLanguageMenu();

    if (menuTop.classList.contains("page-header__menu-top--search-closed")) {
      menuTop.classList.remove("page-header__menu-top--search-closed");
      menuTop.classList.add("page-header__menu-top--search-opened");
    }
  });

  closeSearchButton.addEventListener("click", function() {
    resetSearchField();
  });

  openLanguageMenu.addEventListener("click", function() {
    languageMenu.classList.toggle("language__wrap--hidden");
    menuTop.classList.toggle("page-header__menu-top--language-opened");
  });

  languageVariantsButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      var parent = event.target.closest(".language__item");
      languageVariants.forEach(function(variant) {
        if (variant.classList.contains("language__item--current")) {
          variant.classList.remove("language__item--current");
        }
      });

      parent.classList.add("language__item--current");
      var id = button.id;
      currentLanguageName.textContent = id;
      currentLanguageFlag.src = "./img/icons/icon-flag-" + id + ".svg";
      closeLanguageMenu();
    });
  });
})();
