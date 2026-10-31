
function selectTab(selected) {
  document.querySelectorAll(".segmented button")
    .forEach(button => button.classList.remove("active"))

  selected.classList.add("active")

  if (selected.dataset.tab === "projects") {
    loadProjects();
  } else if (selected.dataset.tab === "experiences") {
    loadExperiences();
  } else {
    loadSkills();
  }
}

let projects = [];
let experiences = [];
let skills = [];

// import onLanguageChange from "i18n.js";

// onLanguageChange(renderCurrent);

function renderCurrent() {
  if (selected.dataset.tab === "projects") {
    renderProjects();
  } else if (selected.dataset.tab === "experiences") {
    renderExperiences();
  } else {
    renderSkills();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector("#content");
  // loadProjects()
});

async function showLoading(text) {
  content.replaceChildren();
  loading = document.createElement("h1");
  loading.id = "loading";
  loading.dataset.i18n = text;

  content.append(loading);

  const lang = localStorage.getItem("language") ?? "fi";
  await setLanguage(lang);
}

async function loadProjects() {
  showLoading("loading");

  try {
    const response = await fetch(
      `https://kudekube.fi/graniitti/api/portfolioprojects`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    projects = await response.json();

    renderProjects(); 
  } catch (error) {
    showLoading("loading.failed");
    console.error(error);
  }
}

function renderProjects() {
  const lang = localStorage.getItem("language") ?? "fi";
  content.replaceChildren();

  for (const item of projects) {
    card = document.createElement("div");
    card.classList.add("card");

    title = document.createElement("h1");
    title.classList.add("card_title");
    subtitle = document.createElement("h2");
    subtitle.classList.add("card_subtitle");

    description = document.createElement("p");
    description.classList.add("card_paragraph");

    title.textContent = lang == "fi" ? item.titleFI : item.titleEN;
    subtitle.textContent = lang == "fi" ? item.shortDescriptionFI : item.shortDescriptionEN;
    description.textContent = lang == "fi" ? item.descriptionFI : item.descriptionEN;

    card.append(title, subtitle, description);

    for (const link of item.links.links) {
      linkElem = document.createElement("a");
      linkElem.textContent = link.name;
      linkElem.href = link.url
      linkElem.classList.add("card_link");
      card.append(linkElem);
    }

    aiUsage = document.createElement("p");
    aiUsage.textContent = "AI Usage: " + item.aiUsage;
    aiUsage.classList.add("card_paragraph");

    progress = document.createElement("p");
    progress.textContent = "Progress: " + item.progress;
    progress.classList.add("card_paragraph");

    for (const technology of item.technologies.content) {
      technologyElem = document.createElement("li");
      technologyElem.textContent = lang == "fi" ? technology.titleFI : technology.titleEN;
      technologyElem.classList.add("card_paragraph");
      card.append(technologyElem);
    }

    organization = document.createElement("p");
    organization.textContent = "Organization: " + item.organization;
    organization.classList.add("card_paragraph");

    card.append(aiUsage, progress, organization);
    content.append(card);
  }
}

async function loadExperiences() {
  showLoading("loading");
  const lang = localStorage.getItem("language") ?? "fi";

  try {
    const response = await fetch(
      `https://kudekube.fi/graniitti/api/portfolioexperiences`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    experiences = await response.json();

    renderExperiences();
  } catch (error) {
    showLoading("loading.failed");
    console.error(error);
  }
}

function renderExperiences() {
  const lang = localStorage.getItem("language") ?? "fi";
  content.replaceChildren();

  for (const item of experiences) {
    card = document.createElement("div");
    card.classList.add("card");

    title = document.createElement("h1");
    title.classList.add("card_title");
    subtitle = document.createElement("h2");
    subtitle.classList.add("card_subtitle");

    description = document.createElement("p");
    description.classList.add("card_paragraph");

    title.textContent = lang == "fi" ? item.titleFI : item.titleEN;
    subtitle.textContent = lang == "fi" ? item.shortDescriptionFI : item.shortDescriptionEN;
    description.textContent = lang == "fi" ? item.descriptionFI : item.descriptionEN;

    card.append(title, subtitle, description);

    for (const link of item.links.links) {
      linkElem = document.createElement("a");
      linkElem.textContent = link.name;
      linkElem.href = link.url
      linkElem.classList.add("card_link");
      card.append(linkElem);
    }

    organization = document.createElement("p");
    organization.textContent = "Organization: " + item.organization;
    organization.classList.add("card_paragraph");

    card.append(organization);

    content.append(card);
  }
}

async function loadSkills() {
  showLoading("loading");
  const lang = localStorage.getItem("language") ?? "fi";

  try {
    const response = await fetch(
      `https://kudekube.fi/graniitti/api/portfolioskills`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    skills = await response.json();

    renderSkills();
  } catch (error) {
    showLoading("loading.failed");
    console.error(error);
  }
}

function renderSkills() {
  const lang = localStorage.getItem("language") ?? "fi";
  content.replaceChildren();

  for (const item of skills) {
      card = document.createElement("div");
      card.classList.add("card");

      title = document.createElement("h1");
      title.classList.add("card_title");

      description = document.createElement("p");
      description.classList.add("card_paragraph");

      skillLevel = document.createElement("p");
      skillLevel.classList.add("card_paragraph");

      skillCategory = document.createElement("p");
      skillCategory.classList.add("card_paragraph");
      skillCategory.textContent = "Category: " + item.skillCategory;

      title.textContent = lang == "fi" ? item.titleFI : item.titleEN;
      description.textContent = lang == "fi" ? item.descriptionFI : item.descriptionEN;
      skillLevel.textContent = lang == "fi" ? item.skillLevelFI: item.skillLevelEN;

      card.append(title, description, skillLevel, skillCategory);

      for (const link of item.links.links) {
        linkElem = document.createElement("a");
        linkElem.textContent = link.name;
        linkElem.href = link.url
        linkElem.classList.add("card_link");
        card.append(linkElem);
      }

      content.append(card);
    }
}