
async function setLanguage(lang) {
    const response = await fetch(`locales/${lang}.json`);
    const translations = await response.json();

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        element.textContent = translations[key] ?? key;
    });

    localStorage.setItem("language", lang);

    // languageListeners.forEach(callback => callback(lang));
}

// export function onLanguageChange(callback) {
//   languageListeners.add(callback);

//   return () => languageListeners.delete(callback);
// }

function toggleLanguage() {
  if (localStorage.getItem("language") == "fi") {
    setLanguage("en")
  } else {
    setLanguage("fi")
  }
}

const savedLanguage = localStorage.getItem("language") ?? "fi";
setLanguage(savedLanguage);
