"use strict";

// =====================================================
// 1. SUPABASE CONFIGURATION
// =====================================================

const SUPABASE_URL = "https://mqjmbydeduuakltbejeh.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_Dswj8LMhWvc8Rr_728BMHg_A7Gwc-li";

let supabaseClient = null;

function initializeSupabase() {
  if (
    !window.supabase ||
    typeof window.supabase.createClient !== "function"
  ) {
    console.error(
      "Supabase library has not loaded. Check index.html."
    );
    return;
  }

  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );

  console.log("Supabase client initialized.");
}

// =====================================================
// 2. ARTICLE DATA
// =====================================================

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

// =====================================================
// 3. HTML ELEMENTS
// =====================================================

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

// =====================================================
// 4. SAVED ARTICLES AND CLOUD STATE
// =====================================================

// Guest bookmarks are stored locally.
// Bookmarks belonging to a signed-in user are stored in Supabase.

function loadSavedArticles() {
  try {
    const stored = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    if (!Array.isArray(stored)) return [];

    return [...new Set(
      stored.filter(id =>
        Object.prototype.hasOwnProperty.call(articles, id)
      )
    )];
  } catch (error) {
    console.warn("Could not load saved articles:", error);
    return [];
  }
}

function persistGuestSavedArticles(list) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(list)
    );

    return true;
  } catch (error) {
    console.error("Could not save guest articles:", error);

    alert(
      "Your browser could not save this change. Please check your browser storage settings."
    );

    return false;
  }
}

let guestSavedArticles = loadSavedArticles();

// The list currently displayed on the page.
let savedArticles = [...guestSavedArticles];

// Current signed-in user, if any.
let currentUser = null;

// True only after the current user's cloud bookmarks have loaded.
let cloudSyncReady = false;

// Used to ignore results from an older login or logout request.
let authVersion = 0;
let activeUserId = null;
let syncingUserId = null;

// Prevents repeated clicks from sending overlapping requests for one article.
const pendingSaveIds = new Set();

// =====================================================
// 5. SAVED ARTICLE BUTTONS AND RENDERING
// =====================================================

function updateSaveButtons() {
  document.querySelectorAll("[data-save-article]").forEach(button => {
    const id = button.dataset.saveArticle;
    const isSaved = savedArticles.includes(id);

    if (button.dataset.savedCopy === "true") {
      button.textContent = "Remove from saved";
    } else {
      button.textContent = isSaved
        ? "Saved ✓"
        : "Save article";
    }

    button.setAttribute("aria-pressed", String(isSaved));
    button.disabled = pendingSaveIds.has(id);
  });
}

function renderSavedArticles() {
  if (!savedGrid || !savedEmpty || !articleGrid) return;

  savedGrid.replaceChildren();

  savedArticles.forEach(id => {
    const readButton = articleGrid.querySelector(
      '[data-article="' + id + '"]'
    );

    const originalCard = readButton
      ? readButton.closest(".article-card")
      : null;

    if (!originalCard) return;

    const card = originalCard.cloneNode(true);
    card.hidden = false;
    card.dataset.savedCopy = "true";

    card.querySelectorAll("[data-save-article]").forEach(button => {
      button.dataset.savedCopy = "true";
    });

    savedGrid.appendChild(card);
  });

  savedEmpty.hidden = savedArticles.length !== 0;

  updateSaveButtons();
}

function addSaveButtons() {
  if (!articleGrid) return;

  articleGrid.querySelectorAll(".article-card").forEach(card => {
    const readButton = card.querySelector("[data-article]");
    const content = card.querySelector(".card-content");

    if (
      !readButton ||
      !content ||
      content.querySelector("[data-save-article]")
    ) {
      return;
    }

    const button = document.createElement("button");

    button.type = "button";
    button.className = "save-button";
    button.dataset.saveArticle = readButton.dataset.article;
    button.textContent = "Save article";

    content.appendChild(button);
  });

  updateSaveButtons();
}

// =====================================================
// 6. CLOUD BOOKMARK SYNCHRONISATION
// =====================================================

function getValidArticleIds(ids) {
  return [...new Set(
    ids.filter(id =>
      typeof id === "string" &&
      Object.prototype.hasOwnProperty.call(articles, id)
    )
  )];
}

async function syncUserSavedArticles(user, version) {
  if (!supabaseClient || !user) return;

  console.log("Loading cloud bookmarks for the signed-in user.");

  try {
    // 1. Load bookmarks belonging to this user only.
    const { data, error } = await supabaseClient
      .from("saved_articles")
      .select("article_id")
      .eq("user_id", user.id);

    if (error) throw error;

    // If the user signed out or changed accounts while loading,
    // ignore this result.
    if (
      version !== authVersion ||
      activeUserId !== user.id
    ) {
      return;
    }

    const cloudIds = getValidArticleIds(
      (data || []).map(row => row.article_id)
    );

    // 2. Collect guest bookmarks for migration into this account.
    const guestIds = [...guestSavedArticles];

    // 3. Copy guest bookmarks into Supabase.
    // The unique index prevents duplicate user/article pairs.
    if (guestIds.length > 0) {
      const rowsToInsert = guestIds.map(articleId => ({
        user_id: user.id,
        article_id: articleId
      }));

      const { error: migrationError } = await supabaseClient
        .from("saved_articles")
        .upsert(rowsToInsert, {
          onConflict: "user_id,article_id",
          ignoreDuplicates: true
        });

      if (migrationError) throw migrationError;
    }

    // Make sure this is still the same login session.
    if (
      version !== authVersion ||
      activeUserId !== user.id
    ) {
      return;
    }

    // 4. Combine cloud bookmarks with successfully migrated guest ones.
    savedArticles = getValidArticleIds([
      ...cloudIds,
      ...guestIds
    ]);

    // 5. Clear the guest list only after migration succeeded.
    // The cloud account now owns the migrated bookmarks.
    if (guestIds.length > 0) {
      const cleared = persistGuestSavedArticles([]);

      if (cleared) {
        guestSavedArticles = [];
      } else {
        console.warn(
          "Cloud migration succeeded, but local guest bookmarks could not be cleared."
        );
      }
    }

    cloudSyncReady = true;

    renderSavedArticles();

    console.log(
      "Cloud bookmarks loaded:",
      savedArticles.length
    );
  } catch (error) {
    console.error("Could not synchronise saved articles:", error);

    if (
      version !== authVersion ||
      activeUserId !== user.id
    ) {
      return;
    }

    cloudSyncReady = false;

    // If cloud loading failed, do not pretend that the local guest
    // list is the user's cloud list.
    savedArticles = [...guestSavedArticles];

    renderSavedArticles();

    alert(
      "You are signed in, but your cloud bookmarks could not be loaded. Your guest bookmarks have been kept. Please check your connection and refresh the page."
    );
  }
}

// =====================================================
// 7. ADDING AND REMOVING BOOKMARKS
// =====================================================

async function toggleSavedArticle(id) {
  if (!Object.prototype.hasOwnProperty.call(articles, id)) {
    return;
  }

  if (pendingSaveIds.has(id)) return;

  const isCurrentlySaved = savedArticles.includes(id);

  // ---------------------------------------------------
  // SIGNED-IN USER: update Supabase
  // ---------------------------------------------------

  if (currentUser) {
    if (!cloudSyncReady) {
      alert(
        "Your cloud bookmarks are still loading or could not be synchronised. Please wait or refresh the page before changing bookmarks."
      );

      return;
    }

    pendingSaveIds.add(id);
    updateSaveButtons();

    try {
      if (isCurrentlySaved) {
        // Remove this bookmark from the current user's account.
        const { error } = await supabaseClient
          .from("saved_articles")
          .delete()
          .eq("user_id", currentUser.id)
          .eq("article_id", id);

        if (error) throw error;

        savedArticles = savedArticles.filter(
          savedId => savedId !== id
        );
      } else {
        // Add this bookmark to the current user's account.
        const { error } = await supabaseClient
          .from("saved_articles")
          .upsert(
            {
              user_id: currentUser.id,
              article_id: id
            },
            {
              onConflict: "user_id,article_id",
              ignoreDuplicates: true
            }
          );

        if (error) throw error;

        if (!savedArticles.includes(id)) {
          savedArticles.push(id);
        }
      }

      renderSavedArticles();
    } catch (error) {
      console.error("Could not update cloud bookmark:", error);

      alert(
        "The bookmark could not be updated in your account. Please check your connection and try again."
      );
    } finally {
      pendingSaveIds.delete(id);
      updateSaveButtons();
    }

    return;
  }

  // ---------------------------------------------------
  // GUEST: update localStorage
  // ---------------------------------------------------

  const previousGuestArticles = [...guestSavedArticles];

  if (isCurrentlySaved) {
    guestSavedArticles = guestSavedArticles.filter(
      savedId => savedId !== id
    );
  } else {
    guestSavedArticles.push(id);
  }

  if (!persistGuestSavedArticles(guestSavedArticles)) {
    guestSavedArticles = previousGuestArticles;
    savedArticles = [...guestSavedArticles];

    renderSavedArticles();
    return;
  }

  savedArticles = [...guestSavedArticles];

  renderSavedArticles();
}

function handleArticleGridClick(event) {
  const target = event.target;

  if (!(target instanceof Element)) return;

  const saveButton = target.closest("[data-save-article]");

  if (saveButton) {
    toggleSavedArticle(saveButton.dataset.saveArticle);
    return;
  }

  const readButton = target.closest("[data-article]");

  if (readButton) {
    openArticle(readButton.dataset.article);
  }
}

// =====================================================
// 8. SEARCH AND CATEGORY FILTER
// =====================================================

function filterArticles() {
  if (
    !searchInput ||
    !categoryFilter ||
    !articleGrid ||
    !resultsCount
  ) {
    return;
  }

  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;

  let visibleCount = 0;

  articleGrid.querySelectorAll(".article-card").forEach(card => {
    const readButton = card.querySelector("[data-article]");
    const articleId = readButton?.dataset.article;
    const articleKeywords = articles[articleId]?.keywords || "";

    const searchableText = [
      card.dataset.search || "",
      card.textContent || "",
      articleKeywords
    ].join(" ").toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm);

    const matchesCategory =
      selectedCategory === "all" ||
      card.dataset.category === selectedCategory;

    const shouldShow = matchesSearch && matchesCategory;

    card.hidden = !shouldShow;

    if (shouldShow) visibleCount++;
  });

  resultsCount.textContent =
    visibleCount + (visibleCount === 1 ? " article" : " articles");

  if (emptyMessage) {
    emptyMessage.hidden = visibleCount !== 0;
  }
}

// =====================================================
// 9. ARTICLE DIALOG
// =====================================================

function openArticle(articleId) {
  const article = articles[articleId];

  if (
    !article ||
    !articleDialog ||
    !dialogCategory ||
    !dialogTitle ||
    !dialogBody
  ) {
    console.error("Article or dialog element not found:", articleId);
    return;
  }

  dialogCategory.textContent = article.category;
  dialogTitle.textContent = article.title;

  dialogBody.replaceChildren();

  article.sections.forEach(section => {
    const heading = document.createElement("h3");
    heading.textContent = section.heading;

    const paragraph = document.createElement("p");
    paragraph.textContent = section.text;

    dialogBody.append(heading, paragraph);
  });

  const saveButton = document.createElement("button");

  saveButton.type = "button";
  saveButton.className = "save-button";
  saveButton.dataset.saveArticle = articleId;

  saveButton.textContent = savedArticles.includes(articleId)
    ? "Saved ✓"
    : "Save article";

  saveButton.setAttribute(
    "aria-pressed",
    String(savedArticles.includes(articleId))
  );

  dialogBody.appendChild(saveButton);

  if (typeof articleDialog.showModal === "function") {
    articleDialog.showModal();
  } else {
    alert(
      article.title + "\n\n" +
      article.sections.map(section =>
        section.heading + "\n" + section.text
      ).join("\n\n")
    );
  }
}

if (closeDialogButton && articleDialog) {
  closeDialogButton.addEventListener("click", () => {
    articleDialog.close();
  });

  articleDialog.addEventListener("click", event => {
    if (event.target === articleDialog) {
      articleDialog.close();
    }

    const target = event.target;

    if (!(target instanceof Element)) return;

    const saveButton = target.closest("[data-save-article]");

    if (saveButton) {
      toggleSavedArticle(saveButton.dataset.saveArticle);
    }
  });
}

// =====================================================
// 10. AUTHENTICATION STYLES
// =====================================================

function addAuthStyles() {
  if (document.getElementById("supabase-auth-styles")) return;

  const style = document.createElement("style");

  style.id = "supabase-auth-styles";

  style.textContent = `
    .fsp-auth-controls {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      flex-wrap: wrap;
      margin-left: 12px;
    }

    .fsp-auth-button {
      cursor: pointer;
      font: inherit;
    }

    .fsp-auth-user {
      font-size: .85rem;
      opacity: .85;
      max-width: 220px;
      overflow-wrap: anywhere;
    }

    .fsp-auth-dialog {
      width: min(92vw, 460px);
      border: 1px solid rgba(130,145,160,.35);
      border-radius: 16px;
      padding: 0;
      color: #17202a;
      background: #fff;
      box-shadow: 0 24px 80px rgba(0,0,0,.28);
    }

    .fsp-auth-dialog::backdrop {
      background: rgba(8,15,25,.65);
      backdrop-filter: blur(3px);
    }

    .fsp-auth-inner {
      padding: 26px;
    }

    .fsp-auth-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
    }

    .fsp-auth-top h2 {
      margin: 0 0 8px;
      font-size: 1.5rem;
    }

    .fsp-auth-close {
      border: 0;
      background: transparent;
      color: inherit;
      font-size: 1.6rem;
      cursor: pointer;
      line-height: 1;
    }

    .fsp-auth-form {
      display: grid;
      gap: 13px;
      margin-top: 20px;
    }

    .fsp-auth-form label {
      display: grid;
      gap: 6px;
      font-size: .9rem;
    }

    .fsp-auth-form input {
      width: 100%;
      box-sizing: border-box;
      padding: 12px;
      border: 1px solid #aab3bd;
      border-radius: 8px;
      font: inherit;
      color: #17202a;
      background: #fff;
    }

    .fsp-auth-primary,
    .fsp-auth-switch {
      cursor: pointer;
      border-radius: 8px;
      padding: 11px 14px;
      font: inherit;
    }

    .fsp-auth-primary {
      border: 0;
      background: #183f4b;
      color: #fff;
    }

    .fsp-auth-primary:disabled {
      opacity: .6;
      cursor: wait;
    }

    .fsp-auth-switch {
      border: 1px solid #183f4b;
      background: transparent;
      color: #183f4b;
    }

    .fsp-auth-message {
      min-height: 1.4em;
      font-size: .9rem;
      line-height: 1.5;
      overflow-wrap: anywhere;
    }

    .fsp-auth-message[data-kind="error"] {
      color: #b42318;
    }

    .fsp-auth-message[data-kind="success"] {
      color: #16803c;
    }

    @media (max-width: 600px) {
      .fsp-auth-controls {
        margin: 10px 0 0;
        justify-content: flex-start;
      }

      .fsp-auth-user {
        max-width: 100%;
      }

      .fsp-auth-inner {
        padding: 20px;
      }
    }
  `;

  document.head.appendChild(style);
}

// =====================================================
// 11. CREATE LOGIN AND REGISTRATION UI
// =====================================================

function createAuthUI() {
  addAuthStyles();

  const header =
    document.querySelector(".site-header") ||
    document.querySelector("header");

  if (!header) {
    console.warn("Header not found. Auth controls were not added.");
    return null;
  }

  const controls = document.createElement("div");

  controls.className = "fsp-auth-controls";
  controls.id = "fspAuthControls";

  const openButton = document.createElement("button");

  openButton.type = "button";
  openButton.id = "fspAuthOpen";
  openButton.className = "author-button fsp-auth-button";
  openButton.textContent = "Sign in / Register";

  const userLabel = document.createElement("span");

  userLabel.id = "fspAuthUser";
  userLabel.className = "fsp-auth-user";
  userLabel.hidden = true;

  const signOutButton = document.createElement("button");

  signOutButton.type = "button";
  signOutButton.id = "fspAuthSignOut";
  signOutButton.className = "author-button fsp-auth-button";
  signOutButton.textContent = "Sign out";
  signOutButton.hidden = true;

  controls.append(openButton, userLabel, signOutButton);

  const authorLink = header.querySelector(".author-button");

  if (authorLink && authorLink.parentElement) {
    authorLink.insertAdjacentElement("afterend", controls);
  } else {
    header.appendChild(controls);
  }

  const authDialog = document.createElement("dialog");

  authDialog.id = "fspAuthDialog";
  authDialog.className = "fsp-auth-dialog";
  authDialog.setAttribute("aria-labelledby", "fspAuthTitle");

  authDialog.innerHTML = `
    <div class="fsp-auth-inner">
      <div class="fsp-auth-top">
        <div>
          <p class="eyebrow">FORENSIC SCIENCE PORTAL</p>
          <h2 id="fspAuthTitle">Welcome back</h2>
          <p id="fspAuthIntro">Sign in with your email and password.</p>
        </div>

        <button
          type="button"
          id="fspAuthClose"
          class="fsp-auth-close"
          aria-label="Close"
        >×</button>
      </div>

      <form id="fspAuthForm" class="fsp-auth-form">
        <label for="fspAuthEmail">
          Email address
          <input
            id="fspAuthEmail"
            name="email"
            type="email"
            autocomplete="email"
            required
            maxlength="254"
          />
        </label>

        <label for="fspAuthPassword">
          Password
          <input
            id="fspAuthPassword"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            minlength="6"
          />
        </label>

        <button
          type="submit"
          id="fspAuthSubmit"
          class="fsp-auth-primary"
        >Sign in</button>

        <button
          type="button"
          id="fspAuthSwitch"
          class="fsp-auth-switch"
        >Need an account? Register</button>

        <p
          id="fspAuthMessage"
          class="fsp-auth-message"
          role="status"
          aria-live="polite"
        ></p>
      </form>
    </div>
  `;

  document.body.appendChild(authDialog);

  let authMode = "signin";

  const title = authDialog.querySelector("#fspAuthTitle");
  const intro = authDialog.querySelector("#fspAuthIntro");
  const form = authDialog.querySelector("#fspAuthForm");
  const emailInput = authDialog.querySelector("#fspAuthEmail");
  const passwordInput = authDialog.querySelector("#fspAuthPassword");
  const submitButton = authDialog.querySelector("#fspAuthSubmit");
  const switchButton = authDialog.querySelector("#fspAuthSwitch");
  const message = authDialog.querySelector("#fspAuthMessage");
  const closeButton = authDialog.querySelector("#fspAuthClose");

  function setMessage(text, kind) {
    message.textContent = text || "";

    if (kind) {
      message.dataset.kind = kind;
    } else {
      delete message.dataset.kind;
    }
  }

  function setMode(mode) {
    authMode = mode;

    const isSignIn = mode === "signin";

    title.textContent = isSignIn
      ? "Welcome back"
      : "Create your account";

    intro.textContent = isSignIn
      ? "Sign in with your email and password."
      : "Register with your email and a password of at least 6 characters.";

    submitButton.textContent = isSignIn
      ? "Sign in"
      : "Create account";

    switchButton.textContent = isSignIn
      ? "Need an account? Register"
      : "Already have an account? Sign in";

    passwordInput.autocomplete = isSignIn
      ? "current-password"
      : "new-password";

    setMessage("");
  }

  function updateAuthUI(user) {
    const isSignedIn = Boolean(user);

    openButton.hidden = isSignedIn;
    userLabel.hidden = !isSignedIn;
    signOutButton.hidden = !isSignedIn;

    userLabel.textContent = isSignedIn
      ? "Signed in: " + (user.email || "account")
      : "";
  }

  openButton.addEventListener("click", () => {
    setMode("signin");

    if (typeof authDialog.showModal === "function") {
      authDialog.showModal();
    } else {
      authDialog.setAttribute("open", "");
    }
  });

  closeButton.addEventListener("click", () => {
    authDialog.close();
  });

  authDialog.addEventListener("click", event => {
    if (event.target === authDialog) {
      authDialog.close();
    }
  });

  switchButton.addEventListener("click", () => {
    setMode(authMode === "signin" ? "signup" : "signin");
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();

    if (!supabaseClient) {
      setMessage(
        "Connection is unavailable. Refresh the page and try again.",
        "error"
      );

      return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const submittedMode = authMode;

    submitButton.disabled = true;
    switchButton.disabled = true;

    setMessage(
      submittedMode === "signin"
        ? "Signing in…"
        : "Creating your account…"
    );

    try {
      let result;

      if (submittedMode === "signin") {
        result = await supabaseClient.auth.signInWithPassword({
          email,
          password
        });
      } else {
        result = await supabaseClient.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo:
              window.location.origin + window.location.pathname
          }
        });
      }

      if (result.error) {
        throw result.error;
      }

      if (submittedMode === "signup" && !result.data.session) {
        setMessage(
          "Registration received. Check your email for a confirmation link. Then return here and sign in.",
          "success"
        );

        passwordInput.value = "";
      } else {
        const user =
          result.data.session?.user ||
          result.data.user ||
          null;

        updateAuthUI(result.data.session?.user || null);

        setMessage(
          submittedMode === "signin"
            ? "You are signed in."
            : "Your account has been created.",
          "success"
        );

        passwordInput.value = "";

        if (user && result.data.session) {
          window.setTimeout(() => {
            if (authDialog.open) {
              authDialog.close();
            }
          }, 700);
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);

      let friendlyMessage = error?.message ||
        "Something went wrong. Please try again.";

      if (/invalid login credentials/i.test(friendlyMessage)) {
        friendlyMessage = "Email or password is incorrect.";
      } else if (/user already registered/i.test(friendlyMessage)) {
        friendlyMessage =
          "An account with this email already exists. Try signing in.";
      } else if (/password should be at least/i.test(friendlyMessage)) {
        friendlyMessage =
          "Choose a password with at least 6 characters.";
      }

      setMessage(friendlyMessage, "error");
    } finally {
      submitButton.disabled = false;
      switchButton.disabled = false;
    }
  });

  signOutButton.addEventListener("click", async () => {
    if (!supabaseClient) return;

    signOutButton.disabled = true;

    try {
      const { error } = await supabaseClient.auth.signOut();

      if (error) throw error;

      updateAuthUI(null);
    } catch (error) {
      console.error("Sign-out error:", error);

      alert("Could not sign out right now. Please try again.");
    } finally {
      signOutButton.disabled = false;
    }
  });

  return { updateAuthUI };
}

// =====================================================
// 12. HANDLE LOGIN, LOGOUT, AND SESSION RESTORATION
// =====================================================

async function handleAuthSession(session, authUI) {
  const user = session?.user || null;
  const nextUserId = user?.id || null;

  authUI.updateAuthUI(user);

  // Ignore duplicate auth events for a user whose bookmarks
  // have already loaded or are currently loading.
  if (
    nextUserId === activeUserId &&
    (
      cloudSyncReady ||
      syncingUserId === nextUserId
    )
  ) {
    return;
  }

  activeUserId = nextUserId;

  // Invalidate any request belonging to an older session.
  const version = ++authVersion;

  if (!user) {
    currentUser = null;
    cloudSyncReady = false;
    syncingUserId = null;

    // Restore the guest list instead of displaying another
    // user's cloud bookmarks after sign-out.
    savedArticles = [...guestSavedArticles];

    renderSavedArticles();

    console.log("Signed out. Showing guest bookmarks.");

    return;
  }

  currentUser = user;
  cloudSyncReady = false;
  syncingUserId = user.id;

  // Prevent bookmark changes until this user's cloud list loads.
  savedArticles = [...guestSavedArticles];

  renderSavedArticles();

  try {
    await syncUserSavedArticles(user, version);
  } finally {
    if (syncingUserId === user.id) {
      syncingUserId = null;
    }
  }
}

// =====================================================
// 13. INITIALISE THE PAGE
// =====================================================

function initializePage() {
  if (searchInput) {
    searchInput.addEventListener("input", filterArticles);
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", filterArticles);
  }

  if (articleGrid) {
    articleGrid.addEventListener("click", handleArticleGridClick);
  }

  if (savedGrid) {
    savedGrid.addEventListener("click", handleArticleGridClick);
  }

  addSaveButtons();
  renderSavedArticles();
  filterArticles();

  // Keep the existing login and registration interface.
  const authUI = createAuthUI();

  // Connect to Supabase.
  initializeSupabase();

  if (supabaseClient && authUI) {
    // Restore the current session when the page opens.
    supabaseClient.auth.getSession()
      .then(({ data, error }) => {
        if (error) throw error;

        return handleAuthSession(data.session, authUI);
      })
      .catch(error => {
        console.error("Could not restore session:", error);
      });

    // Supabase reports login, logout, and session changes.
    // setTimeout keeps cloud requests outside the auth callback.
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      window.setTimeout(() => {
        handleAuthSession(session, authUI).catch(error => {
          console.error("Could not handle auth session:", error);
        });
      }, 0);
    });
  }

  console.log("Forensic Science Portal loaded successfully.");
  console.log("Available articles:", Object.keys(articles).length);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePage);
} else {
  initializePage();
}

// =====================================================
// 14. EXISTING AUTH BUTTON COLOURS
// =====================================================

const authButtonStyles = document.createElement("style");

authButtonStyles.textContent = `
  .author-button,
  #authControls button,
  .auth-button {
    background-color: #071a35 !important;
    color: #69d9ff !important;
    border: 1px solid #69d9ff !important;
    border-radius: 8px !important;
    transition: all 0.25s ease !important;
  }

  .author-button:hover,
  #authControls button:hover,
  .auth-button:hover {
    background-color: #102c50 !important;
    color: #b5efff !important;
    box-shadow: 0 0 12px rgba(105, 217, 255, 0.3);
  }
`;

document.head.appendChild(authButtonStyles);
