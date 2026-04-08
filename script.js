const features = [
  {
    title: "Expérience immersive",
    text: "Une interface pensée comme une invitation au voyage, entre narration, visuels et interactions fluides."
  },
  {
    title: "Conseiller IA",
    text: "Un agent conversationnel guide chaque visiteur selon ses envies, son budget et son niveau d'aventure."
  },
  {
    title: "Réservation simplifiée",
    text: "Un parcours clair pour configurer, planifier et réserver un séjour temporel personnalisé."
  }
];

const faqs = [
  {
    q: "Quel voyage choisir pour une première expérience ?",
    a: "Paris 1889 ou Florence 1504 sont idéales pour débuter grâce à leur richesse culturelle et leur niveau de risque modéré."
  },
  {
    q: "Le voyage est-il personnalisable ?",
    a: "Oui, la durée, le style d'expérience, le niveau de confort et plusieurs préférences peuvent être adaptés."
  },
  {
    q: "L'agent IA répond à quoi ?",
    a: "Il peut conseiller une destination, expliquer une époque, rassurer sur le déroulé du voyage et répondre aux questions fréquentes."
  }
];

const featuresGrid = document.getElementById("featuresGrid");
const destinationsGrid = document.getElementById("destinationsGrid");
const faqGrid = document.getElementById("faqGrid");

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

const bookingForm = document.getElementById("bookingForm");
const destinationSelect = document.getElementById("destinationSelect");
const travelersInput = document.getElementById("travelersInput");
const experienceSelect = document.getElementById("experienceSelect");

const previewImage = document.getElementById("previewImage");
const previewTitle = document.getElementById("previewTitle");
const previewDescription = document.getElementById("previewDescription");
const previewDuration = document.getElementById("previewDuration");
const previewLevel = document.getElementById("previewLevel");
const previewTravelers = document.getElementById("previewTravelers");
const previewExperience = document.getElementById("previewExperience");
const previewBudget = document.getElementById("previewBudget");

function renderFeatures() {
  featuresGrid.innerHTML = features
    .map(
      (item) => `
        <div class="feature-card">
          <p class="feature-title">${item.title}</p>
          <p class="feature-text">${item.text}</p>
        </div>
      `
    )
    .join("");
}

function renderDestinations() {
  destinationsGrid.innerHTML = destinations
    .map(
      (destination) => `
        <article class="destination-card">
          <div class="destination-media">
            <img src="${destination.image}" alt="${destination.era}">
            <div class="destination-gradient ${destination.gradientClass}"></div>
            <div class="destination-tag">${destination.tag}</div>
          </div>

          <div class="destination-content">
            <h3 class="destination-title">${destination.era}</h3>
            <p class="destination-subtitle">${destination.subtitle}</p>
            <p class="destination-description">${destination.description}</p>

            <div class="destination-actions">
              <button class="destination-button-light" data-destination="${destination.era}">
                ${destination.cta}
              </button>
              <button class="destination-button-outline" data-destination="${destination.era}">
                Voir détails
              </button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-destination]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedEra = button.getAttribute("data-destination");
      destinationSelect.value = selectedEra;
      updatePreview();
      document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function renderFaqs() {
  faqGrid.innerHTML = faqs
    .map(
      (faq) => `
        <div class="faq-card">
          <p class="faq-question">${faq.q}</p>
          <p class="faq-answer">${faq.a}</p>
        </div>
      `
    )
    .join("");
}

function getSelectedDestination() {
  return destinations.find((item) => item.era === destinationSelect.value);
}

function updatePreview() {
  const destination = getSelectedDestination();
  if (!destination) return;

  previewImage.src = destination.image;
  previewImage.alt = destination.era;
  previewTitle.textContent = destination.previewTitle;
  previewDescription.textContent = destination.previewDescription;
  previewDuration.textContent = destination.duration;
  previewLevel.textContent = destination.level;
  previewTravelers.textContent = travelersInput.value || "1";
  previewExperience.textContent = experienceSelect.value;
  previewBudget.textContent = destination.budget;
}

const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotWindow = document.getElementById("chatbotWindow");
const chatbotClose = document.getElementById("chatbotClose");
const chatbotForm = document.getElementById("chatbotForm");
const chatbotInput = document.getElementById("chatbotInput");
const chatbotMessages = document.getElementById("chatbotMessages");

chatbotToggle.addEventListener("click", () => {
  chatbotWindow.classList.toggle("open");
});

chatbotClose.addEventListener("click", () => {
  chatbotWindow.classList.remove("open");
});

function addChatbotMessage(text, type = "bot") {
  const message = document.createElement("div");
  message.className = `chatbot-message ${type}`;
  message.innerHTML = text;
  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getTimeTravelReply(input) {
  const text = input.toLowerCase();

  // destinations
  if (text.includes("paris")) {
    return "Paris 1889 est parfaite si vous aimez l'élégance, la Belle Époque, l'Exposition Universelle et l'atmosphère d'une capitale en pleine effervescence. C'est aussi l'une de nos destinations les plus accessibles pour un premier voyage temporel.";
  }

  if (text.includes("florence")) {
    return "Florence 1504 est une destination idéale pour les voyageurs passionnés d'art, d'architecture et de Renaissance. Vous y retrouverez une ambiance raffinée, culturelle et profondément inspirante, dans la ville de Michel-Ange.";
  }

  if (
    text.includes("crétacé") ||
    text.includes("cretace") ||
    text.includes("dinosaure") ||
    text.includes("préhistoire")
  ) {
    return "Le Crétacé -65M s'adresse davantage aux amateurs d'expériences spectaculaires. C'est notre destination la plus immersive et la plus aventureuse, au cœur d'une nature préhistorique dominée par les dinosaures.";
  }

  // prix
  if (
    text.includes("prix") ||
    text.includes("tarif") ||
    text.includes("coût") ||
    text.includes("combien")
  ) {
    return "Voici nos tarifs indicatifs : <br><br><strong>Paris 1889</strong> : à partir de 1 490 €<br><strong>Florence 1504</strong> : à partir de 1 690 €<br><strong>Crétacé -65M</strong> : à partir de 2 490 €<br><br>Ces tarifs varient selon la durée, le niveau de confort et les options choisies.";
  }

  // conseil choix
  if (
    text.includes("quelle destination") ||
    text.includes("quelle époque") ||
    text.includes("que choisir") ||
    text.includes("me conseiller") ||
    text.includes("conseil")
  ) {
    return "Avec plaisir. Si vous recherchez une première expérience élégante et accessible, je vous recommande <strong>Paris 1889</strong>. Pour une immersion artistique et culturelle, <strong>Florence 1504</strong> est remarquable. Enfin, pour une aventure hors du commun, le <strong>Crétacé -65M</strong> est la destination la plus spectaculaire.";
  }

  // intérêts utilisateur
  if (
    text.includes("art") ||
    text.includes("culture") ||
    text.includes("renaissance") ||
    text.includes("michel-ange")
  ) {
    return "Dans ce cas, Florence 1504 serait sans doute votre meilleure option. C'est une époque idéale pour les voyageurs sensibles à l'art, à la pensée et à la beauté architecturale.";
  }

  if (
    text.includes("aventure") ||
    text.includes("extrême") ||
    text.includes("sensations")
  ) {
    return "Je vous orienterais vers le Crétacé -65M. C'est la destination la plus intense de notre catalogue, conçue pour les voyageurs à la recherche d'une expérience préhistorique saisissante.";
  }

  if (
    text.includes("romantique") ||
    text.includes("couple") ||
    text.includes("élégant")
  ) {
    return "Paris 1889 conviendrait parfaitement. L'atmosphère y est raffinée, spectaculaire et très propice à une expérience en duo.";
  }

  // faq agence
  if (
    text.includes("sécurité") ||
    text.includes("dangereux") ||
    text.includes("risque")
  ) {
    return "Tous nos voyages sont encadrés par les protocoles de sécurité de TimeTravel Agency. Le niveau de risque varie selon l'époque choisie, mais chaque séjour est préparé avec un accompagnement personnalisé.";
  }

  if (
    text.includes("réserver") ||
    text.includes("reservation") ||
    text.includes("réservation")
  ) {
    return "Vous pouvez commencer votre réservation directement depuis la section dédiée sur le site. Nous proposons ensuite une personnalisation du voyage selon la destination, le nombre de voyageurs et le niveau d'expérience souhaité.";
  }

  if (
    text.includes("durée") ||
    text.includes("combien de temps")
  ) {
    return "La plupart de nos séjours s'étendent de 3 à 5 jours. Paris 1889 est souvent choisi sur 3 jours, Florence 1504 sur 4 jours, et le Crétacé sur 5 jours pour une immersion plus complète.";
  }

  if (
    text.includes("bonjour") ||
    text.includes("salut") ||
    text.includes("bonsoir")
  ) {
    return "Bonjour, et bienvenue chez TimeTravel Agency. Je serais ravi de vous guider parmi nos destinations temporelles d'exception.";
  }

  return "Je peux vous renseigner sur nos destinations, les tarifs, le choix de l'époque idéale ou le fonctionnement de notre agence de voyage temporel. N'hésitez pas à me dire ce que vous recherchez.";
}

chatbotForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userText = chatbotInput.value.trim();
  if (!userText) return;

  addChatbotMessage(userText, "user");
  chatbotInput.value = "";

  setTimeout(() => {
    const reply = getTimeTravelReply(userText);
    addChatbotMessage(reply, "bot");
  }, 450);
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updatePreview();
});

destinationSelect.addEventListener("change", updatePreview);
travelersInput.addEventListener("input", updatePreview);
experienceSelect.addEventListener("change", updatePreview);

renderFeatures();
renderDestinations();
renderFaqs();
updatePreview();
