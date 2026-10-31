
async function loadHTML(elementId, file, cssFile) {
  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Tiedostoa ei löytynyt: ${file}`);
    }

    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;

    const lang = localStorage.getItem("language") ?? "fi";
    await setLanguage(lang);

    if(cssFile) {
      const link = document.createElement("link");
      link.rel = "stylesheet"
      link.href = cssFile

      document.head.appendChild(link)
    }

  } catch(error) {
    console.error(error)
    document.getElementById(elementId).innerHTML =
    '<p>Failed to load this section!<p>'
  }
}

loadHTML("inspiraatio-showcase", "showcases/inspiraatio.html", "css/inspiraatio.css")
loadHTML("mevalo-showcase", "showcases/mevalo.html", "css/mevalo.css")