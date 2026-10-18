
"use strict";

// -----------------------------------------------
// 0. SUPABASE CONFIGURATION
// -----------------------------------------------

const SUPABASE_URL = "PASTE_YOUR_PROJECT_URL_HERE";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_Dswj8LMhWvc8Rr_728BMHg_A7Gwc-li";

let supabaseClient = null;

function initializeSupabase() {
  if (
    !SUPABASE_URL.startsWith("https://") ||
    SUPABASE_URL === "PASTE_YOUR_PROJECT_URL_HERE"
  ) {
    console.warn(
      "Supabase is not configured yet. Local article saving remains available."
    );
    return;
  }

  if (!window.supabase?.createClient) {
    console.error("Supabase library has not loaded.");
    return;
  }

  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );

  console.log("Supabase client initialized.");
}

initializeSupabase();

// -----------------------------------------------
// EXISTING ARTICLE CODE CONTINUES BELOW
// -----------------------------------------------

// -----------------------------------------------
// 1. ARTICLE DATA
// -----------------------------------------------

const articles = {
  dna: {
    category: "DNA & FORENSIC BIOLOGY",
    title: "DNA: The Science of Identification",
    sections: [
      {
        heading: "What is forensic DNA analysis?",
        text: "DNA carries genetic information in the cells of living organisms. Forensic DNA analysis examines selected regions of DNA to help assess whether biological material may be associated with a particular person. The method can support an investigation, but results must always be interpreted in context."
      },
      {
        heading: "How does profiling work?",
        text: "A laboratory may extract DNA from a suitable biological sample, measure its quantity and quality, and analyse selected genetic markers. The resulting profile can be compared with a reference profile when this is appropriate and legally authorised."
      },
      {
        heading: "What can the results tell us?",
        text: "A comparison may provide statistical evidence about whether profiles could have originated from the same person or from different people. A match does not automatically prove when, how, or why biological material was deposited."
      },
      {
        heading: "Limitations and responsible interpretation",
        text: "Samples can contain DNA from multiple people, be degraded, or become contaminated. Identical twins can also share highly similar DNA profiles using many conventional methods. Conclusions require validated procedures, appropriate statistics, and expert interpretation."
      }
    ],
    keywords: "DNA genetics biological samples identification profiling"
  },

  scene: {
    category: "CRIME SCENE INVESTIGATION",
    title: "From Scene to Evidence",
    sections: [
      {
        heading: "Why is scene documentation important?",
        text: "A crime scene may contain physical, biological, digital, or trace evidence. Investigators document relevant observations before items are moved, helping preserve information about their original locations and relationships."
      },
      {
        heading: "Collection and preservation",
        text: "Evidence collection methods depend on the material and the question being investigated. Suitable packaging, protective equipment, clear labelling, and separation of items can help reduce contamination and preserve sample integrity."
      },
      {
        heading: "What is chain of custody?",
        text: "Chain of custody is the documented record of how evidence is collected, transferred, stored, examined, and handled. It helps establish accountability and allows others to assess whether the material was properly controlled."
      },
      {
        heading: "Evidence is not a complete story",
        text: "An observation can support more than one explanation. Investigators should consider alternative hypotheses, document uncertainty, and avoid treating a single finding as proof of an entire sequence of events."
      }
    ],
    keywords: "crime scene evidence collection contamination documentation"
  },

  toxicology: {
    category: "FORENSIC TOXICOLOGY",
    title: "What Toxicology Can Reveal",
    sections: [
      {
        heading: "What is forensic toxicology?",
        text: "Forensic toxicology applies chemical and biological analysis to investigate the presence and possible effects of substances in samples. It may contribute to medical, legal, or public-safety investigations."
      },
      {
        heading: "From sample to result",
        text: "Laboratories select analytical methods according to the sample and the substances being investigated. Screening tests may indicate that a substance is present, while confirmatory methods can provide more specific identification."
      },
      {
        heading: "Why interpretation matters",
        text: "Detecting a substance does not by itself establish impairment, the timing of exposure, or the cause of an event. Interpretation may depend on the sample type, concentration, metabolism, medical history, and circumstances."
      },
      {
        heading: "Quality and limitations",
        text: "Reliable analysis requires validated methods, suitable controls, calibrated instruments, and careful reporting. Detection limits and possible interferences should be considered when drawing conclusions."
      }
    ],
    keywords: "toxicology chemicals laboratory analysis samples substances"
  },

  ballistics: {
    category: "FORENSIC BALLISTICS",
    title: "Understanding Ballistics",
    sections: [
      {
        heading: "What does forensic ballistics examine?",
        text: "Forensic firearm examination may involve studying ammunition components, firearm-related marks, trajectories, and other physical evidence. The exact examination depends on the questions raised by an investigation."
      },
      {
        heading: "Comparing physical marks",
        text: "Examiners may compare marks on recovered items with marks produced under controlled conditions. The value of a comparison depends on the quality of the material, the method used, and the strength of the observed similarities and differences."
      },
      {
        heading: "What can a conclusion establish?",
        text: "A forensic comparison may support an association between items, but the strength and wording of a conclusion depend on the discipline and the available evidence. Findings should not be presented with more certainty than the method justifies."
      },
      {
        heading: "Scientific caution",
        text: "Firearm-related evidence should be examined by qualified professionals using validated procedures. Reporting should explain relevant limitations and distinguish observations from interpretations."
      }
    ],
    keywords: "ballistics firearms ammunition toolmarks comparison"
  },

  technology: {
    category: "METHODS & TECHNOLOGY",
    title: "Tools Behind the Analysis",
    sections: [
      {
        heading: "Technology supports scientific questions",
        text: "Forensic laboratories use a range of tools, including microscopes, chemical instruments, imaging systems, and digital analysis software. Each tool is selected to answer a specific scientific question."
      },
      {
        heading: "Measurement and validation",
        text: "An instrument produces measurements or observations, not automatic certainty. Laboratories need suitable calibration, quality controls, documented procedures, and trained staff to interpret results responsibly."
      },
      {
        heading: "Digital technology",
        text: "Digital imaging and specialised software can help document, compare, or visualise evidence. Digital files should be handled with appropriate safeguards so that their integrity and relevant metadata can be assessed."
      },
      {
        heading: "Technology has limitations",
        text: "Results may be affected by sample quality, instrument limitations, software assumptions, or operator decisions. A clear report explains the method, relevant uncertainty, and the limits of any conclusion."
      }
    ],
    keywords: "forensic technology imaging microscopy instruments digital analysis"
  },

  history: {
    category: "HISTORY & INTERESTING CASES",
    title: "How Forensic Science Evolved",
    sections: [
      {
        heading: "From observation to systematic methods",
        text: "Forensic science developed through contributions from medicine, chemistry, biology, anthropology, and other fields. Over time, systematic documentation and laboratory methods expanded the kinds of evidence that could be examined."
      },
      {
        heading: "The rise of laboratory analysis",
        text: "Advances in microscopy, chemical testing, fingerprint examination, and later DNA analysis changed the way investigators could evaluate physical evidence. Each technique developed through research, practical application, and debate about reliability."
      },
      {
        heading: "Lessons from historical cases",
        text: "Historical cases can illustrate both the usefulness and the risks of forensic evidence. A responsible case study should distinguish verified facts from later retellings and explain what the evidence could and could not establish."
      },
      {
        heading: "Science keeps changing",
        text: "Methods that were once widely accepted may be revised when stronger research becomes available. Modern forensic practice therefore depends on validation, transparent reporting, and continuing evaluation of scientific claims."
      }
    ],
    keywords: "history forensic science cases scientific methods development"
  }
};

// -----------------------------------------------
// 2. FIND THE HTML ELEMENTS
// -----------------------------------------------

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const articleGrid = document.getElementById("articleGrid");
const resultsCount = document.getElementById("resultsCount");
const emptyMessage = document.getElementById("emptyMessage");

const articleDialog = document.getElementById("articleDialog");
const closeDialogButton = document.getElementById("closeDialog");
const dialogCategory = document.getElementById("dialogCategory");
const dialogTitle = document.getElementById("dialogTitle");
const dialogBody = document.getElementById("dialogBody");

const savedGrid = document.getElementById("savedGrid");
const savedEmpty = document.getElementById("savedEmpty");

const STORAGE_KEY = "forensicScienceSavedArticles";

// -----------------------------------------------
// 3. LOAD SAVED ARTICLES
// -----------------------------------------------

function loadSavedArticles() {
  try {
    const stored = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    if (!Array.isArray(stored)) {
      return [];
    }

    return [...new Set(
      stored.filter(function (id) {
        return Object.prototype.hasOwnProperty.call(articles, id);
      })
    )];
  } catch (error) {
    console.warn("Could not load saved articles:", error);
    return [];
  }
}

let savedArticles = loadSavedArticles();

// -----------------------------------------------
// 4. SEARCH AND CATEGORY FILTER
// -----------------------------------------------

function filterArticles() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const cards = articleGrid.querySelectorAll(".article-card");
  let visibleCount = 0;

  cards.forEach(function (card) {
    const searchableText = [
      card.dataset.search || "",
      card.textContent || "",
      articles[card.querySelector("[data-article]")?.dataset.article]
        ?.keywords || ""
    ].join(" ").toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm);
    const matchesCategory =
      selectedCategory === "all" ||
      card.dataset.category === selectedCategory;

    const shouldShow = matchesSearch && matchesCategory;

    card.hidden = !shouldShow;

    if (shouldShow) {
      visibleCount += 1;
    }
  });

  resultsCount.textContent =
    visibleCount + (visibleCount === 1 ? " article" : " articles");

  emptyMessage.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterArticles);
categoryFilter.addEventListener("change", filterArticles);

// -----------------------------------------------
// 5. SAVED ARTICLES
// -----------------------------------------------

function persistSavedArticles() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(savedArticles)
    );
    return true;
  } catch (error) {
    console.error("Could not save articles:", error);
    alert("Your browser could not save this change.");
    return false;
  }
}

function updateSaveButtons() {
  document.querySelectorAll("[data-save-article]").forEach(
    function (button) {
      const articleId = button.dataset.saveArticle;
      const isSaved = savedArticles.includes(articleId);
      const isSavedCopy = button.dataset.savedCopy === "true";

      button.textContent = isSavedCopy
        ? "Remove from saved"
        : isSaved
          ? "Saved ✓"
          : "Save article";

      button.setAttribute("aria-pressed", String(isSaved));
    }
  );
}

function renderSavedArticles() {
  savedGrid.replaceChildren();

  savedArticles.forEach(function (articleId) {
    const originalButton = articleGrid.querySelector(
      '[data-article="' + articleId + '"]'
    );

    const originalCard = originalButton
      ? originalButton.closest(".article-card")
      : null;

    if (!originalCard) {
      return;
    }

    const card = originalCard.cloneNode(true);
    card.hidden = false;
    card.dataset.savedCopy = "true";

    card.querySelectorAll("[data-save-article]").forEach(
      function (button) {
        button.dataset.savedCopy = "true";
      }
    );

    savedGrid.appendChild(card);
  });

  savedEmpty.hidden = savedArticles.length !== 0;
  updateSaveButtons();
}

function addSaveButtons() {
  articleGrid.querySelectorAll(".article-card").forEach(
    function (card) {
      const readButton = card.querySelector("[data-article]");
      const content = card.querySelector(".card-content");

      if (!readButton || !content) {
        return;
      }

      if (content.querySelector("[data-save-article]")) {
        return;
      }

      const button = document.createElement("button");
      button.type = "button";
      button.className = "save-button";
      button.dataset.saveArticle = readButton.dataset.article;
      button.textContent = "Save article";

      content.appendChild(button);
    }
  );

  updateSaveButtons();
}

function toggleSavedArticle(articleId) {
  const previousSavedArticles = [...savedArticles];

  if (savedArticles.includes(articleId)) {
    savedArticles = savedArticles.filter(function (id) {
      return id !== articleId;
    });
  } else {
    savedArticles.push(articleId);
  }

  if (!persistSavedArticles()) {
    savedArticles = previousSavedArticles;
    return;
  }

  renderSavedArticles();
}

function handleArticleGridClick(event) {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  const saveButton = target.closest("[data-save-article]");

  if (saveButton) {
    const articleId = saveButton.dataset.saveArticle;

    if (saveButton.dataset.savedCopy === "true") {
      // Remove the saved article when clicked in Saved Articles.
      savedArticles = savedArticles.filter(function (id) {
        return id !== articleId;
      });

      if (!persistSavedArticles()) {
        savedArticles = loadSavedArticles();
      }

      renderSavedArticles();
    } else {
      toggleSavedArticle(articleId);
    }

    return;
  }

  const readButton = target.closest("[data-article]");

  if (readButton) {
    openArticle(readButton.dataset.article);
  }
}

// -----------------------------------------------
// 6. OPEN AN ARTICLE
// -----------------------------------------------

function openArticle(articleId) {
  const article = articles[articleId];

  if (!article) {
    console.error("Article not found:", articleId);
    return;
  }

  dialogCategory.textContent = article.category;
  dialogTitle.textContent = article.title;
  dialogBody.replaceChildren();

  article.sections.forEach(function (section) {
    const heading = document.createElement("h3");
    heading.textContent = section.heading;

    const paragraph = document.createElement("p");
    paragraph.textContent = section.text;

    dialogBody.append(heading, paragraph);
  });

  if (typeof articleDialog.showModal === "function") {
    articleDialog.showModal();
  } else {
    alert(
      article.title + "\n\n" +
      article.sections.map(function (section) {
        return section.heading + "\n" + section.text;
      }).join("\n\n")
    );
  }
}

// -----------------------------------------------
// 7. CLOSE THE ARTICLE DIALOG
// -----------------------------------------------

closeDialogButton.addEventListener("click", function () {
  articleDialog.close();
});

articleDialog.addEventListener("click", function (event) {
  if (event.target === articleDialog) {
    articleDialog.close();
  }
});

// -----------------------------------------------
// 8. INITIALISE THE PAGE
// -----------------------------------------------

addSaveButtons();

articleGrid.addEventListener("click", handleArticleGridClick);
savedGrid.addEventListener("click", handleArticleGridClick);

renderSavedArticles();
filterArticles();

console.log("Forensic Science Portal loaded successfully.");
console.log("Available articles:", Object.keys(articles).length);
