const budgetInput = document.getElementById("budget");
const totalElement = document.getElementById("total");
const remainingElement = document.getElementById("remaining");
const partialTotalMessage = document.getElementById("partial-total-message");
const progressBar = document.getElementById("progress-bar");
const budgetMessage = document.getElementById("budget-message");

const productForm = document.getElementById("product-form");
const nameInput = document.getElementById("product-name");
const priceInput = document.getElementById("product-price");
const quantityInput = document.getElementById("product-quantity");
const supermarketInput = document.getElementById("product-supermarket");
const priceObservedDateInput = document.getElementById("price-observed-date");
const priceTypeInput = document.getElementById("price-type");

const productList = document.getElementById("product-list");
const emptyState = document.getElementById("empty-state");
const itemCount = document.getElementById("item-count");
const clearButton = document.getElementById("clear-button");
const shoppingModeToggle = document.getElementById("shopping-mode");
const purchaseProgress = document.getElementById("purchase-progress");
const purchaseProgressMessage = document.getElementById("purchase-progress-message");
const saveLastPurchaseButton = document.getElementById("save-last-purchase");
const repeatLastPurchaseButton = document.getElementById("repeat-last-purchase");
const purchaseTemplateStatus = document.getElementById("purchase-template-status");
const favoriteList = document.getElementById("favorite-list");
const favoritesEmpty = document.getElementById("favorites-empty");
const favoritesCount = document.getElementById("favorites-count");
const supermarketSummary = document.getElementById("supermarket-summary");
const supermarketTotals = document.getElementById("supermarket-totals");
const supermarketEmpty = document.getElementById("supermarket-empty");
const supermarketPending = document.getElementById("supermarket-pending");
const cameraView = document.getElementById("camera-view");
const cameraPreview = document.getElementById("camera-preview");
const barcodeFrame = document.getElementById("barcode-frame");
const barcodeFrameMessage = document.getElementById("barcode-frame-message");
const labelFrame = document.getElementById("label-frame");
const cancelScanButton = document.getElementById("cancel-scan");
const scanAgainButton = document.getElementById("scan-again");
const productLoading = document.getElementById("product-loading");
const scanResult = document.getElementById("scan-result");
const scanProduct = document.getElementById("scan-product");
const scanImage = document.getElementById("scan-image");
const scanBrand = document.getElementById("scan-brand");
const scanQuantity = document.getElementById("scan-quantity");
const scanCategory = document.getElementById("scan-category");
const scanBarcodeValue = document.getElementById("scan-barcode-value");
const scanPrice = document.getElementById("scan-price");
const quantityLabel = document.getElementById("quantity-label");
const barcodeInput = document.getElementById("barcode-code");
const lookupBarcodeButton = document.getElementById("lookup-barcode");
const scanBarcodeButton = document.getElementById("scan-barcode");
const barcodeStatus = document.getElementById("barcode-status");
const capturePriceLabelButton = document.getElementById("capture-price-label");
const labelCameraActions = document.getElementById("label-camera-actions");
const takePricePhotoButton = document.getElementById("take-price-photo");
const cancelPriceCameraButton = document.getElementById("cancel-price-camera");
const toggleTorchButton = document.getElementById("toggle-torch");
const pricePhotoCanvas = document.getElementById("price-photo-canvas");
const pricePhotoReview = document.getElementById("price-photo-review");
const priceCropEditor = document.getElementById("price-crop-editor");
const pricePhotoPreview = document.getElementById("price-photo-preview");
const priceCropSelection = document.getElementById("price-crop-selection");
const resetPriceCropButton = document.getElementById("reset-price-crop");
const readLabelCodeButton = document.getElementById("read-label-code");
const readPriceLabelButton = document.getElementById("read-price-label");
const retakePricePhotoButton = document.getElementById("retake-price-photo");
const discardPricePhotoButton = document.getElementById("discard-price-photo");
const priceOcrStatus = document.getElementById("price-ocr-status");
const priceCandidates = document.getElementById("price-candidates");
const recognizedLabelDetails = document.getElementById("recognized-label-details");
const recognizedLabelText = document.getElementById("recognized-label-text");
const welcomeScreen = document.getElementById("welcome-screen");
const enterAppButton = document.getElementById("enter-app");
const appShell = document.getElementById("app-shell");
const menuToggle = document.getElementById("menu-toggle");
const appMenu = document.getElementById("app-menu");
const themeToggle = document.getElementById("theme-toggle");
const openTutorialButton = document.getElementById("open-tutorial");
const tutorialDialog = document.getElementById("tutorial-dialog");
const tutorialCloseButton = document.getElementById("tutorial-close");
const tutorialBackButton = document.getElementById("tutorial-back");
const tutorialNextButton = document.getElementById("tutorial-next");
const tutorialSkipButton = document.getElementById("tutorial-skip");
const tutorialStepCount = document.getElementById("tutorial-step-count");
const tutorialDemoIndex = document.getElementById("tutorial-demo-index");
const tutorialDemo = document.getElementById("tutorial-demo");
const tutorialDemoBudget = document.getElementById("tutorial-demo-budget-value");
const tutorialDemoProductName = document.getElementById("tutorial-demo-product-name");
const tutorialDemoProductDetail = document.getElementById("tutorial-demo-product-detail");
const tutorialDemoProductPrice = document.getElementById("tutorial-demo-product-price");
const tutorialDemoCheck = document.getElementById("tutorial-demo-check");
const tutorialDemoFocus = document.getElementById("tutorial-demo-focus");
const tutorialKicker = document.getElementById("tutorial-kicker");
const tutorialTitle = document.getElementById("tutorial-title");
const tutorialDescription = document.getElementById("tutorial-description");
const tutorialProgress = tutorialDialog.querySelector(".tutorial-progress");
const tutorialProgressBar = document.getElementById("tutorial-progress-bar");
const basketView = document.getElementById("basket-view");
const forumView = document.getElementById("forum-view");
const policiesView = document.getElementById("policies-view");
const forumForm = document.getElementById("forum-form");
const forumProductInput = document.getElementById("forum-product");
const forumSupermarketInput = document.getElementById("forum-supermarket");
const forumPriceInput = document.getElementById("forum-price");
const forumNoteInput = document.getElementById("forum-note");
const forumObservedDateInput = document.getElementById("forum-observed-date");
const forumSourceInput = document.getElementById("forum-source");
const forumLocationInput = document.getElementById("forum-location");
const forumPhotoInput = document.getElementById("forum-photo");
const forumPhotoPreview = document.getElementById("forum-photo-preview");
const forumStatus = document.getElementById("forum-status");
const forumSort = document.getElementById("forum-sort");
const forumComparisons = document.getElementById("forum-comparisons");
const forumEmpty = document.getElementById("forum-empty");
const forumList = document.getElementById("forum-list");

let barcodeControls = null;
let barcodeReadActive = false;
let barcodeCameraActive = false;
let scannerSession = 0;
let scannedProduct = null;
let labelCameraStream = null;
let priceLabelUsingScannerCamera = false;
let capturedPricePhoto = "";
let priceCropSelectionRect = null;
let cropDragStart = null;
let torchTrack = null;
let torchEnabled = false;
let ocrWorker = null;
let ocrWorkerPromise = null;
let ocrSuggestedPrice = null;
let priceFromLabel = false;
let forumPreviewUrl = "";
let tutorialStepIndex = 0;
let activeTheme = "light";

const tutorialSteps = [
  {
    kicker: "PASO 1 · ORGANIZA",
    title: "Define tu presupuesto",
    description: "Pon un límite de gasto y consulta el subtotal mientras preparas la cesta.",
    demoClass: "step-budget",
    budget: "50 €",
    name: "Tu límite de gasto",
    detail: "Lo puedes cambiar cuando quieras",
    price: "50 €",
    checked: false,
    focus: "01"
  },
  {
    kicker: "PASO 2 · AÑADE",
    title: "Añade productos en segundos",
    description: "Escribe el nombre y la cantidad. El precio y el supermercado son opcionales; también puedes escanear un código.",
    demoClass: "step-add",
    budget: "48,75 €",
    name: "Leche semidesnatada",
    detail: "2 unidades · Precio opcional",
    price: "1,25 €",
    checked: false,
    focus: "02"
  },
  {
    kicker: "PASO 3 · COMPRA",
    title: "Controla lo que ya llevas",
    description: "Activa Modo compra para agrupar la lista, marcar artículos y ver el subtotal comprado.",
    demoClass: "step-shop",
    budget: "46,25 €",
    name: "Leche semidesnatada",
    detail: "Añadida a la cesta",
    price: "✓",
    checked: true,
    focus: "03"
  }
];

const priceSourceLabels = {
  label: "Etiqueta de tienda",
  receipt: "Ticket de compra",
  user: "Indicado por una persona",
  estimate: "Estimación",
};

function loadSavedValue(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved === null ? fallback : JSON.parse(saved);
  } catch {
    return fallback;
  }
}

let forumPosts = loadSavedValue("cesta-forum-posts-v1", []);
if (!Array.isArray(forumPosts)) forumPosts = [];
forumPosts = forumPosts.filter(post =>
  post &&
  typeof post.id === "string" &&
  typeof post.product === "string" &&
  typeof post.supermarket === "string" &&
  Number.isFinite(post.price) &&
  post.price >= 0 &&
  typeof post.note === "string" &&
  (!post.photo || (typeof post.photo === "string" && post.photo.startsWith("data:image/")))
).slice(0, 20);
forumObservedDateInput.value = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

let budget = loadSavedValue(
  "cesta-budget",
  loadSavedValue("cesta-clara-budget-v1", 50)
);
let products = loadSavedValue(
  "cesta-products",
  loadSavedValue("cesta-clara-products-v1", [])
);

if (!Number.isFinite(budget) || budget < 0) {
  budget = 50;
}

if (!Array.isArray(products)) {
  products = [];
}

products = products.filter(product =>
  product &&
  typeof product.name === "string" &&
  (product.price == null || (Number.isFinite(product.price) && product.price >= 0)) &&
  Number.isSafeInteger(product.quantity) &&
  product.quantity >= 1
);
products.forEach(product => {
  product.purchased = Boolean(product.purchased);
  if (!["regular", "offer", "loyalty"].includes(product.priceType)) product.priceType = "regular";
});

let shoppingMode = loadSavedValue("cesta-shopping-mode", false) === true;
let favorites = loadSavedValue("cesta-favorites", []);
if (!Array.isArray(favorites)) favorites = [];
favorites = favorites.filter(product => product && typeof product.name === "string");
let lastPurchase = loadSavedValue("cesta-last-purchase", []);
if (!Array.isArray(lastPurchase)) lastPurchase = [];
lastPurchase = lastPurchase.filter(product => product && typeof product.name === "string");

budgetInput.value = budget;
priceObservedDateInput.value = "";
shoppingModeToggle.checked = shoppingMode;
activeTheme = loadSavedValue("cesta-theme", "light");
if (activeTheme !== "dark") activeTheme = "light";
applyTheme(activeTheme, false);

function money(value) {
  return value.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR"
  });
}

function formatObservedDate(value) {
  if (!value) return "Fecha no indicada";
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? "Fecha no indicada" : date.toLocaleDateString("es-ES");
}

function getLocalDateString() {
  return new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function applyTheme(theme, persist = true) {
  activeTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = activeTheme;
  themeToggle.checked = activeTheme === "dark";
  themeToggle.setAttribute("aria-label", activeTheme === "dark" ? "Activar modo claro" : "Activar modo oscuro");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  themeColor.content = activeTheme === "dark" ? "#111713" : "#087b4e";
  if (persist) {
    try {
      localStorage.setItem("cesta-theme", JSON.stringify(activeTheme));
    } catch {
      purchaseTemplateStatus.textContent = "El tema se aplicará solo durante esta sesión.";
    }
  }
}

function renderTutorialStep() {
  const step = tutorialSteps[tutorialStepIndex];
  const stepNumber = String(tutorialStepIndex + 1).padStart(2, "0");
  tutorialStepCount.textContent = `${stepNumber} / 03`;
  tutorialDemoIndex.textContent = `${stepNumber} / 03`;
  tutorialDemo.className = `tutorial-demo ${step.demoClass}`;
  tutorialDemoBudget.textContent = step.budget;
  tutorialDemoProductName.textContent = step.name;
  tutorialDemoProductDetail.textContent = step.detail;
  tutorialDemoProductPrice.textContent = step.price;
  tutorialDemoCheck.textContent = step.checked ? "✓" : "";
  tutorialDemoFocus.textContent = step.focus;
  tutorialKicker.textContent = step.kicker;
  tutorialTitle.textContent = step.title;
  tutorialDescription.textContent = step.description;
  tutorialBackButton.disabled = tutorialStepIndex === 0;
  tutorialNextButton.textContent = tutorialStepIndex === tutorialSteps.length - 1 ? "Empezar" : "Siguiente";
  tutorialProgress.setAttribute("aria-valuenow", String(tutorialStepIndex + 1));
  tutorialProgressBar.style.width = `${((tutorialStepIndex + 1) / tutorialSteps.length) * 100}%`;
}

function hasCompletedTutorial() {
  return loadSavedValue("cesta-tutorial-completed-v1", false) === true;
}

function openTutorial() {
  tutorialStepIndex = 0;
  renderTutorialStep();
  if (!tutorialDialog.open) tutorialDialog.showModal();
}

function finishTutorial() {
  try {
    localStorage.setItem("cesta-tutorial-completed-v1", JSON.stringify(true));
  } catch {
    // The tutorial can still close if storage is unavailable.
  }
  if (tutorialDialog.open) tutorialDialog.close();
}

function getPriceSourceLabel(source) {
  return priceSourceLabels[source] || "Origen no indicado";
}

function getPriceTypeLabel(type) {
  return type === "offer" ? "Oferta" : type === "loyalty" ? "Con tarjeta" : "Precio normal";
}

function getProductCategory(product) {
  const text = `${product.category || ""} ${product.name || ""}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
  if (/limpieza|cleaning|deterg|laundry|lavavaj|dishwash|lejia|bleach|suavizante|multiusos|household/.test(text)) return "Limpieza";
  if (/cosmet|beauty|makeup|perfume|fragrance|desodorante|deodorant|skincare|crema facial|serum|labial/.test(text)) return "Cosmética";
  if (/higiene|hygiene|toiletr|bano|bath|ducha|shower|champu|shampoo|toothpaste|pasta dental|cepillo|toothbrush|papel hig|compresa|tampon/.test(text)) return "Higiene y baño";
  if (/aliment|food|beverage|drink|lacte|dairy|fruit|veget|meat|fish|bakery|conserva|snack/.test(text)) return "Alimentación";
  return "Otros";
}

function favoriteIdentity(product) {
  return product.barcode
    ? `barcode:${product.barcode}`
    : `${product.name.trim().toLocaleLowerCase("es")}::${(product.supermarket || "").trim().toLocaleLowerCase("es")}`;
}

function saveFavorites() {
  try {
    localStorage.setItem("cesta-favorites", JSON.stringify(favorites));
  } catch {
    purchaseTemplateStatus.textContent = "No se pudieron guardar los favoritos en este navegador.";
  }
}

function saveData() {
  try {
    localStorage.setItem("cesta-budget", JSON.stringify(budget));
    localStorage.setItem("cesta-products", JSON.stringify(products));
    localStorage.setItem("cesta-shopping-mode", JSON.stringify(shoppingMode));
  } catch {
    budgetMessage.textContent =
      "No se ha podido guardar la información en este navegador.";
  }
}

function saveForumPosts() {
  try {
    localStorage.setItem("cesta-forum-posts-v1", JSON.stringify(forumPosts));
    return true;
  } catch {
    forumStatus.textContent = "No se pudo guardar la publicación. Prueba con una foto más pequeña o elimina alguna publicación.";
    return false;
  }
}

function showView(viewName) {
  basketView.hidden = viewName !== "basket";
  forumView.hidden = viewName !== "forum";
  policiesView.hidden = viewName !== "policies";
  appMenu.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
  if (viewName !== "basket") stopCamera();
  window.scrollTo(0, 0);
}

function enterApp() {
  welcomeScreen.hidden = true;
  appShell.hidden = false;
  try {
    sessionStorage.setItem("cesta-clara-entered", "true");
  } catch {
    // La navegación continúa aunque el navegador bloquee el almacenamiento de sesión.
  }
  if (!hasCompletedTutorial()) openTutorial();
}

async function compressForumPhoto(file) {
  if (!file.type.startsWith("image/")) throw new Error("El archivo seleccionado no es una imagen.");
  if (file.size > 12 * 1024 * 1024) throw new Error("La foto supera 12 MB. Elige una imagen más pequeña.");

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 900 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.72);
}

function renderForum() {
  const orderedPosts = [...forumPosts].sort((first, second) =>
    forumSort.value === "recent"
      ? new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
      : first.price - second.price
  );
  forumEmpty.hidden = orderedPosts.length > 0;
  forumComparisons.replaceChildren();
  forumList.replaceChildren();

  const groups = new Map();
  for (const post of forumPosts) {
    const key = post.product.trim().toLocaleLowerCase("es");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(post);
  }

  for (const posts of groups.values()) {
    const group = document.createElement("div");
    group.className = "forum-comparison-group";
    const title = document.createElement("h3");
    title.textContent = posts[0].product;
    group.append(title);

    const sortedPrices = [...posts].sort((first, second) => first.price - second.price);
    sortedPrices.forEach((post, index) => {
      const row = document.createElement("div");
      row.className = `forum-price-row${index === 0 ? " best-price" : ""}`;
      const store = document.createElement("span");
      store.textContent = post.supermarket;
      const price = document.createElement("strong");
      price.textContent = money(post.price);
      row.append(store, price);
      group.append(row);
      const metadata = document.createElement("p");
      metadata.className = "forum-price-meta";
      metadata.textContent = `${getPriceSourceLabel(post.source)} · ${formatObservedDate(post.observedDate)}${post.location ? ` · ${post.location}` : ""}`;
      group.append(metadata);
    });
    forumComparisons.append(group);
  }

  for (const post of orderedPosts) {
    const item = document.createElement("li");
    item.className = "forum-post";
    const info = document.createElement("div");
    info.className = "forum-post-main";
    const title = document.createElement("h3");
    title.textContent = post.product;
    const store = document.createElement("p");
    store.textContent = post.supermarket;
    const note = document.createElement("p");
    note.textContent = post.note || "Sin detalles adicionales.";
    const date = document.createElement("p");
    date.textContent = `Visto: ${formatObservedDate(post.observedDate)} · ${getPriceSourceLabel(post.source)}` +
      (post.location ? ` · ${post.location}` : "");
    const price = document.createElement("strong");
    price.className = "forum-post-price";
    price.textContent = money(post.price);
    info.append(title, store, note, date);
    item.append(info, price);

    if (post.photo) {
      const image = document.createElement("img");
      image.className = "forum-post-photo";
      image.src = post.photo;
      image.alt = `Foto compartida de ${post.product}`;
      image.loading = "lazy";
      item.append(image);
    }

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "forum-delete";
    remove.textContent = "Eliminar publicación";
    remove.setAttribute("aria-label", `Eliminar publicación de ${post.product} en ${post.supermarket}`);
    remove.addEventListener("click", () => {
      forumPosts = forumPosts.filter(savedPost => savedPost.id !== post.id);
      saveForumPosts();
      renderForum();
    });
    item.append(remove);
    forumList.append(item);
  }
}

function configureTorch(track) {
  torchTrack = track || null;
  torchEnabled = false;
  const supportsTorch = Boolean(torchTrack?.getCapabilities?.().torch);
  toggleTorchButton.hidden = !supportsTorch;
  toggleTorchButton.disabled = false;
  toggleTorchButton.textContent = "Encender linterna";
  toggleTorchButton.setAttribute("aria-pressed", "false");
}

function resetTorchControl() {
  if (torchEnabled && torchTrack) {
    torchTrack.applyConstraints({ advanced: [{ torch: false }] }).catch(() => {});
  }
  torchEnabled = false;
  torchTrack = null;
  toggleTorchButton.hidden = true;
  toggleTorchButton.textContent = "Encender linterna";
  toggleTorchButton.setAttribute("aria-pressed", "false");
}

function stopCamera() {
  resetTorchControl();
  scannerSession += 1;
  if (barcodeControls) {
    barcodeControls.stop();
    barcodeControls = null;
  }
  if (labelCameraStream) {
    labelCameraStream.getTracks().forEach(track => track.stop());
    labelCameraStream = null;
  }
  barcodeReadActive = false;
  barcodeCameraActive = false;
  priceLabelUsingScannerCamera = false;
  cameraPreview.srcObject = null;
  cameraView.hidden = true;
  cameraView.classList.remove("reviewing-label");
  barcodeFrame.hidden = false;
  labelFrame.hidden = true;
  labelCameraActions.hidden = true;
  barcodeFrame.classList.remove("is-detected");
  barcodeFrame.classList.add("is-searching");
  barcodeFrameMessage.textContent = "Alinea el código dentro del marco";
  cancelScanButton.hidden = true;
  cancelScanButton.textContent = "Cancelar escaneo";
  scanBarcodeButton.hidden = false;
  scanBarcodeButton.disabled = false;
}

function resumeBarcodeScanning(message = "Cámara activa. Enfoca el siguiente producto.", hideResult = true) {
  if (!barcodeCameraActive || !barcodeControls) return;
  resetTorchControl();
  priceLabelUsingScannerCamera = false;
  barcodeReadActive = true;
  cameraView.hidden = false;
  cameraView.classList.remove("reviewing-label");
  barcodeFrame.hidden = false;
  labelFrame.hidden = true;
  barcodeFrame.classList.remove("is-detected");
  barcodeFrame.classList.add("is-searching");
  barcodeFrameMessage.textContent = "Alinea el código dentro del marco";
  labelCameraActions.hidden = true;
  if (hideResult) scanResult.hidden = true;
  scanBarcodeButton.disabled = true;
  cancelScanButton.hidden = false;
  cancelScanButton.textContent = "Detener cámara";
  setBarcodeStatus(message);
}

function setBarcodeStatus(message, isError = false) {
  barcodeStatus.textContent = message;
  barcodeStatus.classList.toggle("error", isError);
}

async function lookupBarcode(code = barcodeInput.value.trim(), isShelfLabelCode = false) {
  if (!/^(?:\d{8}|\d{12,14})$/.test(code)) {
    setBarcodeStatus("Introduce un código EAN/UPC válido de 8 a 14 cifras.", true);
    barcodeInput.focus();
    return;
  }

  barcodeInput.value = code;
  lookupBarcodeButton.disabled = true;
  productLoading.hidden = false;
  scanResult.hidden = true;
  scannedProduct = { barcode: code };
  nameInput.value = "";
  priceInput.value = "";
  supermarketInput.value = "";
  quantityInput.value = "1";
  quantityLabel.textContent = "Unidades";
  setBarcodeStatus("Buscando el producto en los catálogos públicos…");
  const fields = "code,product_name,product_name_es,brands,quantity,categories,image_front_url";
  const catalogs = [
    { name: "Open Food Facts", host: "world.openfoodfacts.org" },
    { name: "Open Beauty Facts", host: "world.openbeautyfacts.org" },
    { name: "Open Products Facts", host: "world.openproductsfacts.org" }
  ];
  let catalogResult = null;
  let hadCatalogResponse = false;
  let connectionErrorCount = 0;
  try {
    for (const catalog of catalogs) {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), isShelfLabelCode ? 1600 : 8000);
      try {
        const url = `https://${catalog.host}/api/v2/product/${encodeURIComponent(code)}.json?fields=${encodeURIComponent(fields)}`;
        const response = await fetch(url, { signal: controller.signal });
        if (response.status === 404) {
          hadCatalogResponse = true;
          continue;
        }
        if (!response.ok) {
          hadCatalogResponse = true;
          if (response.status >= 500) connectionErrorCount += 1;
          continue;
        }

        const result = await response.json();
        hadCatalogResponse = true;
        if (result.status === 1 && result.product && typeof result.product === "object") {
          catalogResult = { catalog, product: result.product };
          break;
        }
      } catch (error) {
        connectionErrorCount += 1;
        if (error.name === "AbortError") continue;
      } finally {
        window.clearTimeout(timeoutId);
      }
    }

    if (!catalogResult) {
      scannedProduct = { barcode: code };
      nameInput.value = "";
      priceInput.value = "";
      supermarketInput.value = "";
      quantityInput.value = "1";
      quantityLabel.textContent = "Unidades";
      setBarcodeStatus(connectionErrorCount === catalogs.length && !hadCatalogResponse
        ? "No pudimos conectar con los catálogos. Comprueba tu conexión o introduce el producto manualmente."
        : "No encontramos ese producto en los catálogos consultados. Puedes introducirlo manualmente.", true);
      nameInput.focus();
      return;
    }

    const { catalog, product } = catalogResult;
    const productName = product.product_name_es || product.product_name || "";
    scannedProduct = {
      barcode: product.code || code,
      brand: product.brands || "",
      quantityDescription: product.quantity || "",
      category: product.categories || "",
      imageUrl: typeof product.image_front_url === "string" && /^https:\/\//i.test(product.image_front_url)
        ? product.image_front_url
        : ""
    };
    nameInput.value = productName;
    priceInput.value = "";
    supermarketInput.value = "";
    quantityInput.value = "1";
    quantityLabel.textContent = "Unidades";

    scanProduct.textContent = productName || "Producto sin nombre en el catálogo";
    scanBrand.textContent = product.brands ? `Marca: ${product.brands}` : "";
    scanBrand.hidden = !product.brands;
    scanQuantity.textContent = product.quantity ? `Contenido: ${product.quantity}` : "";
    scanQuantity.hidden = !product.quantity;
    scanCategory.textContent = product.categories ? `Categoría: ${product.categories}` : "";
    scanCategory.hidden = !product.categories;
    scanBarcodeValue.textContent = `Código: ${scannedProduct.barcode}`;
    scanPrice.textContent = "Precio pendiente";
    if (scannedProduct.imageUrl) {
      scanImage.onerror = () => {
        scanImage.hidden = true;
        scanImage.removeAttribute("src");
      };
      scanImage.src = scannedProduct.imageUrl;
      scanImage.alt = productName ? `Imagen de ${productName}` : "Imagen del producto";
      scanImage.hidden = false;
    } else {
      scanImage.removeAttribute("src");
      scanImage.hidden = true;
    }
    scanResult.hidden = false;
    setBarcodeStatus(productName
      ? `Producto encontrado en ${catalog.name}. Revisa la ficha, indica el supermercado y añade el precio manualmente.`
      : `Código encontrado en ${catalog.name}, pero falta el nombre. Complétalo manualmente.`);
    if (productName) priceInput.focus();
    else nameInput.focus();
    productForm.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch {
    scannedProduct = { barcode: code };
    setBarcodeStatus("No pudimos consultar los catálogos. Comprueba tu conexión o introduce el producto manualmente.", true);
  } finally {
    productLoading.hidden = true;
    lookupBarcodeButton.disabled = false;
  }
}

async function startBarcodeScan() {
  if (barcodeCameraActive && barcodeControls) {
    resumeBarcodeScanning();
    return;
  }
  if (barcodeReadActive) return;
  if (!window.confirm("¿Permites activar la cámara para leer un código de barras?")) {
    setBarcodeStatus("No se activó la cámara. Puedes escribir el código manualmente.");
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    setBarcodeStatus("Este navegador no permite usar la cámara. Puedes escribir el código manualmente.", true);
    return;
  }

  stopCamera();
  const session = scannerSession;
  scanBarcodeButton.disabled = true;
  cancelScanButton.hidden = false;
  cancelScanButton.textContent = "Cancelar escaneo";
  setBarcodeStatus("Cargando lector de códigos…");
  try {
    const { BrowserMultiFormatReader } = await import("https://cdn.jsdelivr.net/npm/@zxing/browser@0.2.1/+esm");
    if (session !== scannerSession) return;
    scanBarcodeButton.disabled = true;
    cancelScanButton.hidden = false;
    cameraView.hidden = false;
    barcodeFrame.classList.remove("is-detected");
    barcodeFrame.classList.add("is-searching");
    barcodeFrameMessage.textContent = "Alinea el código dentro del marco";
    barcodeReadActive = true;
    barcodeCameraActive = true;
    const reader = new BrowserMultiFormatReader();
    setBarcodeStatus("Enfoca el código de barras dentro de la imagen.");
    const controls = await reader.decodeFromConstraints(
      {
        audio: false,
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30, max: 60 }
        }
      },
      cameraPreview,
      (result, error, activeControls) => {
      if (!barcodeReadActive) return;
      if (!result) {
        barcodeFrame.classList.add("is-searching");
        barcodeFrameMessage.textContent = "Ajusta el código dentro del marco rojo";
        return;
      }
      const code = result.getText().trim();
      if (!/^(?:\d{8}|\d{12,14})$/.test(code)) return;

      barcodeReadActive = false;
      barcodeFrame.classList.remove("is-searching");
      barcodeFrame.classList.add("is-detected");
      barcodeFrameMessage.textContent = "Código bien encuadrado";
      setBarcodeStatus("Código detectado. Cámara activa; revisa el producto antes de continuar.");
      window.setTimeout(() => {
        if (session !== scannerSession) return;
        barcodeInput.value = code;
        lookupBarcode(code);
      }, 650);
      }
    );
    if (session === scannerSession) {
      barcodeControls = controls;
      barcodeCameraActive = true;
      cancelScanButton.textContent = "Detener cámara";
      const videoTrack = cameraPreview.srcObject?.getVideoTracks?.()[0];
      const focusModes = videoTrack?.getCapabilities?.().focusMode;
      if (Array.isArray(focusModes) && focusModes.includes("continuous")) {
        videoTrack.applyConstraints({ advanced: [{ focusMode: "continuous" }] }).catch(() => {});
      }
    } else {
      controls.stop();
    }
  } catch {
    stopCamera();
    scanBarcodeButton.disabled = false;
    cancelScanButton.hidden = true;
    setBarcodeStatus("No se pudo acceder a la cámara. Revisa los permisos o escribe el código manualmente.", true);
  }
}

async function startPriceLabelCamera() {
  const reuseScannerCamera = barcodeCameraActive && Boolean(barcodeControls);
  if (!reuseScannerCamera && !window.confirm("¿Permites usar la cámara para fotografiar la etiqueta del precio? La foto se leerá en este dispositivo y no se enviará.")) {
    priceOcrStatus.textContent = "No se activó la cámara. Puedes introducir el precio manualmente.";
    return;
  }
  if (!reuseScannerCamera && !navigator.mediaDevices?.getUserMedia) {
    priceOcrStatus.textContent = "Este navegador no permite usar la cámara. Puedes introducir el precio manualmente.";
    return;
  }

  pricePhotoReview.hidden = true;
  if (reuseScannerCamera) {
    barcodeReadActive = false;
    priceLabelUsingScannerCamera = true;
    configureTorch(cameraPreview.srcObject?.getVideoTracks?.()[0]);
    cameraView.hidden = false;
    cameraView.classList.remove("reviewing-label");
    barcodeFrame.hidden = true;
    labelFrame.hidden = false;
    labelCameraActions.hidden = false;
    priceOcrStatus.textContent = "Cámara activa. Centra el nombre y la etiqueta del precio.";
    return;
  }

  stopCamera();
  const session = scannerSession;
  priceOcrStatus.textContent = "Activando cámara…";
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: { ideal: "environment" },
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      }
    });
    if (session !== scannerSession) {
      stream.getTracks().forEach(track => track.stop());
      return;
    }

    labelCameraStream = stream;
    cameraPreview.srcObject = stream;
    cameraView.hidden = false;
    barcodeFrame.hidden = true;
    labelFrame.hidden = false;
    labelCameraActions.hidden = false;
    await cameraPreview.play();
    const videoTrack = stream.getVideoTracks()[0];
    configureTorch(videoTrack);
    const capabilities = videoTrack?.getCapabilities?.();
    const advanced = [];
    if (capabilities?.focusMode?.includes("continuous")) advanced.push({ focusMode: "continuous" });
    if (capabilities?.exposureMode?.includes("continuous")) advanced.push({ exposureMode: "continuous" });
    if (advanced.length > 0) videoTrack.applyConstraints({ advanced }).catch(() => {});
    priceOcrStatus.textContent = "Centra el nombre y la etiqueta del precio en la foto.";
  } catch (error) {
    stopCamera();
    priceOcrStatus.textContent = error.name === "NotAllowedError"
      ? "No se concedió permiso para la cámara. Puedes introducir el precio manualmente."
      : "No se pudo abrir la cámara. Comprueba los permisos o introduce el precio manualmente.";
  }
}

function capturePriceLabelPhoto() {
  const width = cameraPreview.videoWidth;
  const height = cameraPreview.videoHeight;
  if (!width || !height) {
    priceOcrStatus.textContent = "La cámara aún se está iniciando. Inténtalo otra vez.";
    return;
  }

  const scale = Math.min(1, 1600 / Math.max(width, height));
  pricePhotoCanvas.width = Math.round(width * scale);
  pricePhotoCanvas.height = Math.round(height * scale);
  pricePhotoCanvas.getContext("2d").drawImage(cameraPreview, 0, 0, pricePhotoCanvas.width, pricePhotoCanvas.height);
  capturedPricePhoto = pricePhotoCanvas.toDataURL("image/jpeg", 0.9);
  priceCropSelectionRect = null;
  pricePhotoPreview.src = capturedPricePhoto;
  updatePriceCropSelection();
  pricePhotoReview.hidden = false;
  priceCandidates.replaceChildren();
  recognizedLabelDetails.hidden = true;
  priceOcrStatus.textContent = "Foto capturada. La imagen se analizará en el dispositivo.";
  labelCameraActions.hidden = true;
  labelFrame.hidden = true;
  resetTorchControl();
  if (priceLabelUsingScannerCamera && barcodeCameraActive) {
    cameraView.hidden = false;
    cameraView.classList.add("reviewing-label");
    barcodeFrame.hidden = true;
    setBarcodeStatus("Cámara activa. Revisa la etiqueta; al añadir el producto seguirá el escaneo.");
  } else {
    stopCamera();
  }
}

async function getOcrWorker() {
  if (!ocrWorkerPromise) {
    ocrWorkerPromise = (async () => {
      const { createWorker } = await import("https://cdn.jsdelivr.net/npm/tesseract.js@6.0.1/+esm");
      ocrWorker = await createWorker("spa+eng", 1, {
        logger: progress => {
          if (progress.status === "recognizing text") {
            const percent = Math.round((progress.progress || 0) * 100);
            priceOcrStatus.textContent = `Leyendo la etiqueta en este dispositivo… ${percent}%`;
          } else if (progress.status?.includes("traineddata")) {
            priceOcrStatus.textContent = "Preparando lectura en español e inglés…";
          }
        }
      });
      return ocrWorker;
    })().catch(error => {
      ocrWorkerPromise = null;
      throw error;
    });
  }
  return ocrWorkerPromise;
}

function extractLabelPriceCandidates(text) {
  const candidates = [];
  const expression = /(\d{1,4}[,.]\d{2})\s*(?:€|EUR)?/giu;
  for (const match of text.matchAll(expression)) {
    const start = match.index || 0;
    const before = text.slice(Math.max(0, start - 36), start);
    const after = text.slice(start + match[0].length, start + match[0].length + 16);
    const isUnitPrice = /(?:\b1?\s*(?:kg|kilo|g|100\s*g|100g|l|litro|ml)\s*[:=]\s*|\b(?:por|\/)\s*(?:kg|kilo|g|100\s*g|100g|l|litro|ml|unidad)\s*|€\s*\/\s*(?:kg|l|unidad)\s*)$/i.test(before) ||
      /^\s*(?:€|eur)?\s*\/\s*(?:kg|kilo|l|litro|unidad)\b/i.test(after);
    const context = text.slice(Math.max(0, start - 12), Math.min(text.length, start + match[0].length + 16));
    if (isUnitPrice) continue;

    const value = Number(match[1].replace(",", "."));
    if (!Number.isFinite(value) || value < 0 || value > 9999) continue;
    if (candidates.some(candidate => candidate.value === value)) continue;
    candidates.push({ value, context: context.replace(/\s+/g, " ").trim() });
  }
  return candidates;
}

function extractLabelProductName(text) {
  const ignoredLine = /^(?:\d+(?:[,.]\d+)?\s*(?:kg|kilo|g|mg|l|litro|ml|cl|ud|unidades?)\b|\d+\s*\+\s*(?:mes(?:es)?|anos?)\b|\d+\s*(?:mes(?:es)?|anos?)\b|(?:1\s*)?(?:kg|kilo|l|litro)\s*[:=]|\d{6,}|(?:precio|pvp|oferta|promo(?:cion)?|eur\s*\/\s*(?:kg|l))\b)/i;
  const lines = text.split(/[\r\n]+/)
    .map(line => line.replace(/[|_]+/g, " ")
      .replace(/\b\d+(?:[,.]\d+)?\s*(?:kg|kilo|g|mg|l|litro|ml|cl|ud|unidades?)\b/gi, " ")
      .replace(/\s+/g, " ").trim())
    .filter(line => line.length >= 2 && line.length <= 60)
    .filter(line => !ignoredLine.test(line.normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
    .filter(line => !/\d{1,4}[,.]\d{2}\s*(?:€|EUR)?/i.test(line));
  return lines.slice(0, 3).join(" ").replace(/\s+/g, " ").trim().slice(0, 80);
}

function chooseLabelPrice(value) {
  priceInput.value = value.toFixed(2);
  ocrSuggestedPrice = value;
  priceFromLabel = true;
  scanPrice.textContent = `Lectura OCR: ${money(value)} · confirma el importe`;
  priceOcrStatus.textContent = `Lectura orientativa: ${money(value)}. Revisa que sea el precio del producto y elige el supermercado.`;
  priceInput.focus();
}

async function enhancePriceLabelImage(source) {
  const image = new Image();
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = source;
  });

  const scale = Math.min(1, 2000 / Math.max(image.naturalWidth, image.naturalHeight));
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("No se pudo procesar la foto.");

  context.drawImage(image, 0, 0, width, height);
  const imageData = context.getImageData(0, 0, width, height);
  const pixels = imageData.data;
  const stride = width + 1;
  const integral = new Uint32Array(stride * (height + 1));

  for (let y = 0; y < height; y += 1) {
    let rowTotal = 0;
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      const gray = Math.round(pixels[offset] * 0.299 + pixels[offset + 1] * 0.587 + pixels[offset + 2] * 0.114);
      pixels[offset] = gray;
      pixels[offset + 1] = gray;
      pixels[offset + 2] = gray;
      rowTotal += gray;
      integral[(y + 1) * stride + x + 1] = integral[y * stride + x + 1] + rowTotal;
    }
  }

  const radius = Math.max(10, Math.round(Math.min(width, height) * 0.035));
  for (let y = 0; y < height; y += 1) {
    const top = Math.max(0, y - radius);
    const bottom = Math.min(height - 1, y + radius);
    for (let x = 0; x < width; x += 1) {
      const left = Math.max(0, x - radius);
      const right = Math.min(width - 1, x + radius);
      const area = (right - left + 1) * (bottom - top + 1);
      const sum = integral[(bottom + 1) * stride + right + 1]
        - integral[top * stride + right + 1]
        - integral[(bottom + 1) * stride + left]
        + integral[top * stride + left];
      const localLight = Math.max(45, sum / area);
      const offset = (y * width + x) * 4;
      const corrected = Math.min(255, Math.round(pixels[offset] * 210 / localLight));
      pixels[offset] = corrected;
      pixels[offset + 1] = corrected;
      pixels[offset + 2] = corrected;
    }
  }

  context.putImageData(imageData, 0, 0);
  return canvas.toDataURL("image/png");
}

function updatePriceCropSelection() {
  priceCropSelection.hidden = !priceCropSelectionRect;
  if (!priceCropSelectionRect) return;
  const bounds = pricePhotoPreview.getBoundingClientRect();
  const imageRatio = pricePhotoPreview.naturalWidth / pricePhotoPreview.naturalHeight;
  const boundsRatio = bounds.width / bounds.height;
  let offsetX = 0;
  let offsetY = 0;
  let imageWidth = bounds.width;
  let imageHeight = bounds.height;
  if (imageRatio < boundsRatio) {
    imageWidth = bounds.height * imageRatio;
    offsetX = (bounds.width - imageWidth) / 2;
  } else {
    imageHeight = bounds.width / imageRatio;
    offsetY = (bounds.height - imageHeight) / 2;
  }
  priceCropSelection.style.left = `${(offsetX + priceCropSelectionRect.left * imageWidth) / bounds.width * 100}%`;
  priceCropSelection.style.top = `${(offsetY + priceCropSelectionRect.top * imageHeight) / bounds.height * 100}%`;
  priceCropSelection.style.width = `${priceCropSelectionRect.width * imageWidth / bounds.width * 100}%`;
  priceCropSelection.style.height = `${priceCropSelectionRect.height * imageHeight / bounds.height * 100}%`;
}

function getCropPoint(event) {
  const bounds = pricePhotoPreview.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return { x: 0, y: 0 };
  const imageRatio = pricePhotoPreview.naturalWidth / pricePhotoPreview.naturalHeight;
  const boundsRatio = bounds.width / bounds.height;
  let offsetX = 0;
  let offsetY = 0;
  let imageWidth = bounds.width;
  let imageHeight = bounds.height;
  if (imageRatio < boundsRatio) {
    imageWidth = bounds.height * imageRatio;
    offsetX = (bounds.width - imageWidth) / 2;
  } else {
    imageHeight = bounds.width / imageRatio;
    offsetY = (bounds.height - imageHeight) / 2;
  }
  return {
    x: Math.max(0, Math.min(1, (event.clientX - bounds.left - offsetX) / imageWidth)),
    y: Math.max(0, Math.min(1, (event.clientY - bounds.top - offsetY) / imageHeight))
  };
}

function setPriceCrop(start, end) {
  const left = Math.min(start.x, end.x);
  const top = Math.min(start.y, end.y);
  const width = Math.abs(end.x - start.x);
  const height = Math.abs(end.y - start.y);
  priceCropSelectionRect = width >= 0.06 && height >= 0.06
    ? { left, top, width, height }
    : null;
  updatePriceCropSelection();
}

async function getPricePhotoForOcr() {
  if (!priceCropSelectionRect) return capturedPricePhoto;
  const image = new Image();
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = capturedPricePhoto;
  });
  const crop = priceCropSelectionRect;
  const sourceX = Math.round(crop.left * image.naturalWidth);
  const sourceY = Math.round(crop.top * image.naturalHeight);
  const sourceWidth = Math.max(1, Math.round(crop.width * image.naturalWidth));
  const sourceHeight = Math.max(1, Math.round(crop.height * image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = sourceWidth;
  canvas.height = sourceHeight;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("No se pudo recortar la foto.");
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);
  return canvas.toDataURL("image/png");
}

async function readPriceLabel() {
  if (!capturedPricePhoto) {
    priceOcrStatus.textContent = "Toma una foto de la etiqueta primero.";
    return;
  }

  readPriceLabelButton.disabled = true;
  retakePricePhotoButton.disabled = true;
  discardPricePhotoButton.disabled = true;
  priceCandidates.replaceChildren();
  priceOcrStatus.textContent = "Preparando OCR en el dispositivo…";
  try {
    const worker = await getOcrWorker();
    const photoForOcr = await getPricePhotoForOcr();
    let { data } = await worker.recognize(photoForOcr);
    let candidates = extractLabelPriceCandidates(data.text || "");
    if (data.confidence < 78 || candidates.length === 0) {
      priceOcrStatus.textContent = "Mejorando contraste e iluminación para revisar la lectura…";
      try {
        const enhancedPhoto = await enhancePriceLabelImage(photoForOcr);
        const enhancedData = (await worker.recognize(enhancedPhoto)).data;
        const enhancedCandidates = extractLabelPriceCandidates(enhancedData.text || "");
        if (enhancedCandidates.length > candidates.length ||
          (enhancedCandidates.length === candidates.length && enhancedData.confidence > data.confidence)) {
          data = enhancedData;
          candidates = enhancedCandidates;
        }
      } catch {
        priceOcrStatus.textContent = "No se pudo mejorar la imagen; se mantiene la lectura de la foto original.";
      }
    }

    const text = typeof data.text === "string" ? data.text.trim() : "";
    const productName = extractLabelProductName(text);
    if (productName && !nameInput.value.trim()) {
      nameInput.value = productName;
      if (scannedProduct) scannedProduct.labelName = productName;
    }
    recognizedLabelText.textContent = text || "No se reconoció texto legible.";
    recognizedLabelDetails.hidden = !text;

    if (candidates.length === 0) {
      priceOcrStatus.textContent = productName
        ? `Nombre detectado: ${productName}. No encontramos un precio claro; puedes introducirlo manualmente.`
        : "No detectamos un precio claro. Puedes escribirlo manualmente.";
      return;
    }

    if (candidates.length === 1 && data.confidence >= 55) {
      chooseLabelPrice(candidates[0].value);
      return;
    }

    priceOcrStatus.textContent = "Encontramos varios importes o la lectura tiene poca confianza. Elige el precio del producto:";
    for (const candidate of candidates) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "price-candidate";
      button.textContent = `Usar ${money(candidate.value)}${candidate.context ? ` · ${candidate.context}` : ""}`;
      button.addEventListener("click", () => chooseLabelPrice(candidate.value));
      priceCandidates.append(button);
    }
  } catch {
    priceOcrStatus.textContent = "No se pudo leer la foto. Inténtalo con más luz o introduce el precio manualmente.";
  } finally {
    readPriceLabelButton.disabled = false;
    retakePricePhotoButton.disabled = false;
    discardPricePhotoButton.disabled = false;
  }
}

function parseLabelQrPayload(value) {
  const text = value.trim();
  const extractCode = candidate => {
    const source = String(candidate || "").trim();
    const pathCode = source.match(/\/01\/(\d{14})(?=\/|$)/i);
    const aiCode = source.match(/(?:^|[^\d])01\s*(\d{14})(?=[^\d]|$)/);
    const queryCode = source.match(/[?&](?:gtin|ean|barcode)=(\d{8,14})\b/i);
    if (pathCode || aiCode || queryCode) return (pathCode || aiCode || queryCode)[1];
    const digits = source.replace(/\D/g, "");
    return /^(?:\d{8}|\d{12,14})$/.test(digits) ? digits : "";
  };
  try {
    const data = JSON.parse(text);
    if (!data || typeof data !== "object") return { code: extractCode(text) };
    const code = extractCode(data.gtin || data.ean || data.barcode || data.product_code || data.code);
    const name = String(data.product_name || data.product || data.name || data.description || "").trim();
    const rawPrice = data.price ?? data.current_price ?? data.sale_price;
    const priceText = typeof rawPrice === "string" ? rawPrice.replace(/[^\d,.]/g, "").replace(",", ".") : rawPrice;
    const price = priceText === undefined || priceText === null || priceText === "" ? null : Number(priceText);
    return { code, name, price: Number.isFinite(price) && price >= 0 ? price : null };
  } catch {
    return { code: extractCode(text) };
  }
}

async function readLabelCode() {
  if (!capturedPricePhoto) {
    priceOcrStatus.textContent = "Toma una foto de la etiqueta primero.";
    return;
  }

  readLabelCodeButton.disabled = true;
  let payload = { code: "", name: "", price: null };
  try {
    priceOcrStatus.textContent = "Buscando un código de barras o QR en la foto…";
    const { BrowserMultiFormatReader } = await import("https://cdn.jsdelivr.net/npm/@zxing/browser@0.2.1/+esm");
    const reader = new BrowserMultiFormatReader();
    const result = await reader.decodeFromImageUrl(capturedPricePhoto);
    payload = parseLabelQrPayload(result.getText());
    payload.code = payload.code.replace(/\D/g, "");
  } catch {
    barcodeStatus.textContent = "No encontramos un código legible; continuamos con el nombre y el precio de la etiqueta.";
  }

  if (/^(?:\d{8}|\d{12,14})$/.test(payload.code)) {
    barcodeInput.value = payload.code;
    await lookupBarcode(payload.code, true);
  } else if (payload.code) {
    barcodeStatus.textContent = "Código de etiqueta detectado; no parece un EAN/UPC de catálogo. Continuamos con OCR.";
  }

  if (payload.name && !nameInput.value.trim()) {
    nameInput.value = payload.name.slice(0, 80);
  }
  if (Number.isFinite(payload.price)) chooseLabelPrice(payload.price);
  if (!payload.code && !payload.name && !Number.isFinite(payload.price)) {
    barcodeStatus.textContent = "No encontramos un código QR/EAN legible; continuamos con la lectura visual.";
  }
  await readPriceLabel();
  readLabelCodeButton.disabled = false;
}

function discardPriceLabelPhoto() {
  const resumeScanner = priceLabelUsingScannerCamera && barcodeCameraActive;
  if (priceFromLabel && Number(priceInput.value) === ocrSuggestedPrice) {
    priceInput.value = "";
    scanPrice.textContent = "Precio pendiente";
  }
  capturedPricePhoto = "";
  priceCropSelectionRect = null;
  updatePriceCropSelection();
  ocrSuggestedPrice = null;
  priceFromLabel = false;
  pricePhotoPreview.removeAttribute("src");
  pricePhotoReview.hidden = true;
  priceCandidates.replaceChildren();
  recognizedLabelText.textContent = "";
  recognizedLabelDetails.hidden = true;
  priceOcrStatus.textContent = "";
  priceLabelUsingScannerCamera = false;
  cameraView.classList.remove("reviewing-label");
  if (resumeScanner) resumeBarcodeScanning("Foto descartada. Cámara activa; puedes continuar el escaneo.", false);
}

function calculateTotal() {
  return products.reduce(
    (sum, product) => sum + (Number.isFinite(product.price) ? product.price * product.quantity : 0),
    0
  );
}

function renderSupermarketSummary() {
  supermarketSummary.hidden = false;
  supermarketEmpty.hidden = products.length > 0;
  supermarketTotals.replaceChildren();
  const groups = new Map();
  let pendingCount = 0;

  for (const product of products) {
    const supermarket = product.supermarket?.trim() || "Sin supermercado";
    const key = supermarket.toLocaleLowerCase("es");
    if (!groups.has(key)) {
      groups.set(key, { name: supermarket, total: 0, knownCount: 0, pendingCount: 0 });
    }

    const group = groups.get(key);
    if (Number.isFinite(product.price)) {
      group.total += product.price * product.quantity;
      group.knownCount += 1;
    } else {
      group.pendingCount += 1;
      pendingCount += 1;
    }
  }

  for (const [groupKey, group] of groups) {
    const item = document.createElement("li");
    item.className = "supermarket-total-row";

    const details = document.createElement("div");
    details.className = "supermarket-total-details";
    const nameLine = document.createElement("div");
    nameLine.className = "supermarket-total-name-line";
    const name = document.createElement("strong");
    name.className = "supermarket-total-name";
    name.textContent = group.name;
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "supermarket-name-edit";
    editButton.textContent = "Editar";
    editButton.setAttribute("aria-label", `Editar supermercado ${group.name}`);
    nameLine.append(name, editButton);
    details.append(nameLine);

    const editForm = document.createElement("div");
    editForm.className = "supermarket-name-editor";
    editForm.hidden = true;
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.maxLength = 60;
    nameInput.value = group.name === "Sin supermercado" ? "" : group.name;
    nameInput.placeholder = "Nombre del supermercado";
    nameInput.setAttribute("aria-label", `Nombre del supermercado para ${group.name}`);
    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.className = "supermarket-name-save";
    saveButton.textContent = "Guardar";
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.className = "supermarket-name-cancel";
    cancelButton.textContent = "Cancelar";
    const saveName = () => {
      const updatedName = nameInput.value.trim();
      if (!updatedName) {
        nameInput.focus();
        return;
      }
      for (const product of products) {
        const currentName = product.supermarket?.trim() || "Sin supermercado";
        if (currentName.toLocaleLowerCase("es") === groupKey) product.supermarket = updatedName;
      }
      saveData();
      render();
    };
    editButton.addEventListener("click", () => {
      editForm.hidden = !editForm.hidden;
      editButton.setAttribute("aria-expanded", String(!editForm.hidden));
      if (!editForm.hidden) nameInput.focus();
    });
    saveButton.addEventListener("click", saveName);
    cancelButton.addEventListener("click", () => {
      editForm.hidden = true;
      editButton.setAttribute("aria-expanded", "false");
    });
    nameInput.addEventListener("keydown", event => {
      if (event.key === "Enter") saveName();
      if (event.key === "Escape") cancelButton.click();
    });
    editForm.append(nameInput, saveButton, cancelButton);
    details.append(editForm);

    if (group.pendingCount > 0) {
      const pending = document.createElement("span");
      pending.className = "supermarket-total-pending";
      pending.textContent = `${group.pendingCount} ${group.pendingCount === 1 ? "producto" : "productos"} con precio pendiente`;
      details.append(pending);
    }

    const amount = document.createElement("strong");
    amount.className = "supermarket-total-amount";
    amount.textContent = group.knownCount > 0 ? money(group.total) : "Pendiente";
    item.append(details, amount);
    supermarketTotals.append(item);
  }

  supermarketPending.hidden = pendingCount === 0;
  supermarketPending.textContent = pendingCount > 0
    ? `${pendingCount} ${pendingCount === 1 ? "producto tiene" : "productos tienen"} un precio pendiente y no está incluido en los importes conocidos.`
    : "";
}

function renderFavorites() {
  favoritesCount.textContent = String(favorites.length);
  favoritesEmpty.hidden = favorites.length > 0;
  favoriteList.replaceChildren();

  for (const favorite of favorites) {
    const item = document.createElement("li");
    item.className = "favorite-item";
    const details = document.createElement("div");
    details.className = "favorite-details";
    const name = document.createElement("strong");
    name.textContent = favorite.name;
    const note = document.createElement("span");
    const priceText = Number.isFinite(favorite.price) ? money(favorite.price) : "Precio pendiente";
    note.textContent = `${priceText} · ${favorite.supermarket || "Sin supermercado"}`;
    details.append(name, note);

    const actions = document.createElement("div");
    actions.className = "favorite-actions";
    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "favorite-add-button";
    addButton.textContent = "Añadir";
    addButton.setAttribute("aria-label", `Añadir ${favorite.name} a la cesta`);
    addButton.addEventListener("click", () => {
      products.push({ ...favorite, purchased: false });
      saveData();
      render();
    });

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "favorite-remove-button";
    removeButton.textContent = "Quitar";
    removeButton.setAttribute("aria-label", `Quitar ${favorite.name} de favoritos`);
    removeButton.addEventListener("click", () => {
      favorites = favorites.filter(item => favoriteIdentity(item) !== favoriteIdentity(favorite));
      saveFavorites();
      renderFavorites();
      render();
    });
    actions.append(addButton, removeButton);
    item.append(details, actions);
    favoriteList.append(item);
  }
}

function toggleFavorite(product) {
  const identity = favoriteIdentity(product);
  const existingIndex = favorites.findIndex(item => favoriteIdentity(item) === identity);
  if (existingIndex >= 0) {
    favorites.splice(existingIndex, 1);
  } else {
    favorites.push({ ...product, purchased: false });
  }
  saveFavorites();
  render();
}

function render() {
  const total = calculateTotal();
  const pendingPriceCount = products.filter(product => !Number.isFinite(product.price)).length;
  const remaining = budget - total;
  const isOver = total > budget;

  totalElement.textContent = money(total);
  remainingElement.textContent = money(remaining);
  partialTotalMessage.hidden = pendingPriceCount === 0;
  partialTotalMessage.textContent = pendingPriceCount
    ? `Total parcial: faltan precios de ${pendingPriceCount} ${pendingPriceCount === 1 ? "producto" : "productos"}. El total final puede ser mayor.`
    : "";

  remainingElement.style.color = isOver ? "#b91c1c" : "#15803d";

  const percentage = budget > 0
    ? Math.min((total / budget) * 100, 100)
    : total > 0 ? 100 : 0;

  progressBar.style.width = percentage + "%";
  progressBar.classList.toggle("over", isOver);
  budgetMessage.classList.toggle("over", isOver);

  if (isOver) {
    budgetMessage.textContent =
      "Los productos con precio superan tu presupuesto en " + money(total - budget) + ".";
  } else if (pendingPriceCount > 0) {
    budgetMessage.textContent = "El subtotal conocido está dentro del presupuesto; el total final es parcial.";
  } else if (budget === 0 && total === 0) {
    budgetMessage.textContent =
      "Establece un presupuesto para controlar tu compra.";
  } else {
    budgetMessage.textContent =
      "Tu compra está dentro del presupuesto.";
  }

  productList.replaceChildren();
  emptyState.hidden = products.length > 0;
  const purchasedUnits = products.reduce((sum, product) => sum + (product.purchased ? product.quantity : 0), 0);
  const purchasedTotal = products.reduce((sum, product) =>
    sum + (product.purchased && Number.isFinite(product.price) ? product.price * product.quantity : 0), 0);
  const purchasedPending = products.filter(product => product.purchased && !Number.isFinite(product.price)).length;
  purchaseProgress.hidden = !shoppingMode || products.length === 0;

  const units = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  purchaseProgressMessage.textContent = shoppingMode
    ? `${purchasedUnits} de ${units} unidades marcadas · Subtotal marcado: ${money(purchasedTotal)}` +
      (purchasedPending ? ` · ${purchasedPending} con precio pendiente` : "")
    : "";

  itemCount.textContent =
    units + (units === 1 ? " unidad" : " unidades");

  const groupedProducts = new Map();
  products.forEach((product, index) => {
    const category = shoppingMode ? getProductCategory(product) : "";
    if (!groupedProducts.has(category)) groupedProducts.set(category, []);
    groupedProducts.get(category).push({ product, index });
  });

  for (const [category, entries] of groupedProducts) {
    if (shoppingMode) {
      const heading = document.createElement("li");
      heading.className = "product-category-heading";
      heading.textContent = category;
      productList.append(heading);
    }

    for (const { product, index } of entries) {
    const item = document.createElement("li");
    item.className = `product-item${product.imageUrl ? " has-image" : ""}${shoppingMode && product.purchased ? " is-purchased" : ""}`;

    const topLine = document.createElement("div");
    topLine.className = "product-topline";

    if (shoppingMode) {
      const purchasedLabel = document.createElement("label");
      purchasedLabel.className = "purchased-control";
      const purchasedInput = document.createElement("input");
      purchasedInput.type = "checkbox";
      purchasedInput.checked = product.purchased;
      purchasedInput.setAttribute("aria-label", `Marcar ${product.name} como comprado`);
      purchasedInput.addEventListener("change", () => {
        product.purchased = purchasedInput.checked;
        saveData();
        render();
      });
      purchasedLabel.append(purchasedInput, document.createTextNode("Comprado"));
      topLine.append(purchasedLabel);
    }

    const topActions = document.createElement("div");
    topActions.className = "product-actions";
    const favoriteButton = document.createElement("button");
    favoriteButton.type = "button";
    favoriteButton.className = "favorite-toggle";
    const isFavorite = favorites.some(favorite => favoriteIdentity(favorite) === favoriteIdentity(product));
    favoriteButton.textContent = isFavorite ? "★" : "☆";
    favoriteButton.title = isFavorite ? "Quitar de favoritos" : "Guardar en favoritos";
    favoriteButton.setAttribute("aria-label", `${isFavorite ? "Quitar" : "Guardar"} ${product.name} ${isFavorite ? "de" : "en"} favoritos`);
    favoriteButton.setAttribute("aria-pressed", String(isFavorite));
    favoriteButton.addEventListener("click", () => toggleFavorite(product));
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "product-edit-button";
    editButton.textContent = "Editar";
    editButton.setAttribute("aria-expanded", "false");

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-button";
    remove.textContent = "Eliminar";
    remove.setAttribute("aria-label", `Eliminar ${product.name}`);
    remove.addEventListener("click", () => {
      products.splice(index, 1);
      saveData();
      render();
    });
    topActions.append(favoriteButton, editButton, remove);
    topLine.append(topActions);

    const main = document.createElement("div");
    main.className = "product-main";

    const info = document.createElement("div");
    info.className = "product-info";

    if (product.imageUrl) {
      const image = document.createElement("img");
      image.className = "product-thumbnail";
      image.src = product.imageUrl;
      image.alt = product.name ? `Imagen de ${product.name}` : "Imagen del producto";
      image.loading = "lazy";
      image.addEventListener("error", () => image.remove(), { once: true });
      main.append(image);
    }

    const name = document.createElement("strong");
    name.textContent = product.name;

    const detail = document.createElement("span");
    const hasPrice = Number.isFinite(product.price);
    const detailParts = [hasPrice
      ? `${product.quantity} × ${money(product.price)} por unidad`
      : `${product.quantity} unidad(es) · Precio pendiente`];
    if (product.brand) detailParts.push(product.brand);
    if (product.netQuantity) detailParts.push(product.netQuantity);
    if (product.barcode) detailParts.push(`EAN/UPC ${product.barcode}`);
    if (product.supermarket) detailParts.push(`En ${product.supermarket}`);
    if (hasPrice) {
      detailParts.push(product.priceSource === "label"
        ? "Lectura OCR de etiqueta · revisada"
        : product.priceSource === "verified" ? "Precio verificado" : "Precio introducido por ti");
      detailParts.push(getPriceTypeLabel(product.priceType));
      if (product.priceObservedDate) detailParts.push(`Visto el ${formatObservedDate(product.priceObservedDate)}`);
    }
    detail.textContent = detailParts.join(" · ");

    const subtotal = document.createElement("span");
    subtotal.className = "product-total";
    subtotal.textContent = hasPrice ? money(product.price * product.quantity) : "";

    info.append(name, detail);
    main.append(info, subtotal);

    const editPanel = document.createElement("div");
    editPanel.className = "product-edit-controls";
    editPanel.hidden = true;
    const editFields = document.createElement("div");
    editFields.className = "product-edit-fields";
    const makeField = (labelText, inputType, value) => {
      const label = document.createElement("label");
      label.textContent = labelText;
      const input = document.createElement("input");
      input.type = inputType;
      input.value = value;
      if (inputType === "number") {
        input.min = inputType === "number" && labelText === "Cantidad" ? "1" : "0";
        input.step = labelText === "Cantidad" ? "1" : "0.01";
      }
      label.append(input);
      editFields.append(label);
      return input;
    };
    const editQuantity = makeField("Cantidad", "number", String(product.quantity));
    const editPrice = makeField("Precio (€)", "number", Number.isFinite(product.price) ? String(product.price) : "");
    const editSupermarket = makeField("Supermercado", "text", product.supermarket || "");
    const editDate = makeField("Fecha del precio", "date", product.priceObservedDate || "");
    const dealLabel = document.createElement("label");
    dealLabel.textContent = "Tipo de precio";
    const editPriceType = document.createElement("select");
    for (const [value, text] of [["regular", "Normal"], ["offer", "Oferta"], ["loyalty", "Con tarjeta"]]) {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      editPriceType.append(option);
    }
    editPriceType.value = product.priceType || "regular";
    dealLabel.append(editPriceType);
    editFields.append(dealLabel);

    const editActions = document.createElement("div");
    editActions.className = "product-edit-actions";
    const saveEdit = document.createElement("button");
    saveEdit.type = "button";
    saveEdit.className = "secondary-action";
    saveEdit.textContent = "Guardar cambios";
    saveEdit.addEventListener("click", () => {
      const nextQuantity = editQuantity.valueAsNumber;
      const nextPrice = editPrice.value.trim() === "" ? null : editPrice.valueAsNumber;
      if (!Number.isSafeInteger(nextQuantity) || nextQuantity < 1 ||
        (nextPrice !== null && (!Number.isFinite(nextPrice) || nextPrice < 0))) {
        alert("Revisa la cantidad y el precio antes de guardar.");
        return;
      }
      const priceChanged = nextPrice !== product.price;
      product.quantity = nextQuantity;
      product.price = nextPrice === null ? null : Math.round(nextPrice * 100) / 100;
      product.supermarket = editSupermarket.value.trim();
      product.priceObservedDate = editDate.value;
      product.priceType = editPriceType.value;
      if (priceChanged) {
        product.priceSource = nextPrice === null ? "pending" : "user";
        product.priceUpdatedAt = nextPrice === null ? null : new Date().toISOString();
      }
      saveData();
      render();
    });
    const cancelEdit = document.createElement("button");
    cancelEdit.type = "button";
    cancelEdit.className = "text-button";
    cancelEdit.textContent = "Cancelar";
    cancelEdit.addEventListener("click", () => {
      editPanel.hidden = true;
      editButton.setAttribute("aria-expanded", "false");
    });
    editActions.append(saveEdit, cancelEdit);
    editPanel.append(editFields, editActions);
    editButton.addEventListener("click", () => {
      editPanel.hidden = !editPanel.hidden;
      editButton.setAttribute("aria-expanded", String(!editPanel.hidden));
    });

    item.append(topLine, main, editPanel);
    productList.append(item);
    }
  }

  renderSupermarketSummary();
  clearButton.hidden = products.length === 0;
  saveLastPurchaseButton.hidden = products.length === 0;
  repeatLastPurchaseButton.hidden = lastPurchase.length === 0;
  renderFavorites();
}

budgetInput.addEventListener("input", () => {
  const value = budgetInput.valueAsNumber;

  if (budgetInput.value === "" || !Number.isFinite(value) || value < 0) {
    return;
  }

  budget = Math.round(value * 100) / 100;
  saveData();
  render();
});

productForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const price = priceInput.value.trim() === "" ? null : priceInput.valueAsNumber;
  const quantity = quantityInput.valueAsNumber;
  const supermarket = supermarketInput.value.trim();

  if (!name || (price !== null && (!Number.isFinite(price) || price < 0))) {
    alert("Introduce un nombre y, si conoces el precio, un importe válido.");
    return;
  }

  if (!Number.isSafeInteger(quantity) || quantity < 1) {
    alert("Las unidades deben ser un número entero mayor que cero.");
    return;
  }

  const duplicate = scannedProduct?.barcode && products.some(product => product.barcode === scannedProduct.barcode);
  if (duplicate && !window.confirm("Este código ya está en la cesta. ¿Quieres añadir otra línea igualmente?")) return;

  products.push({
    name,
    price: price === null ? null : Math.round(price * 100) / 100,
    quantity,
    supermarket,
    priceObservedDate: price === null ? "" : priceObservedDateInput.value,
    priceType: priceTypeInput.value,
    purchased: false,
    barcode: scannedProduct?.barcode || "",
    brand: scannedProduct?.brand || "",
    netQuantity: scannedProduct?.quantityDescription || "",
    category: scannedProduct?.category || "",
    imageUrl: scannedProduct?.imageUrl || "",
    priceSource: price === null ? "pending" : priceFromLabel ? "label" : "user",
    priceUpdatedAt: price === null ? null : new Date().toISOString()
  });

  saveData();
  render();

  productForm.reset();
  quantityInput.value = 1;
  priceObservedDateInput.value = "";
  priceTypeInput.value = "regular";
  quantityLabel.textContent = "Unidades";
  scannedProduct = null;
  capturedPricePhoto = "";
  ocrSuggestedPrice = null;
  priceFromLabel = false;
  pricePhotoPreview.removeAttribute("src");
  pricePhotoReview.hidden = true;
  priceCandidates.replaceChildren();
  recognizedLabelText.textContent = "";
  recognizedLabelDetails.hidden = true;
  priceOcrStatus.textContent = "";
  scanImage.removeAttribute("src");
  scanImage.hidden = true;
  scanResult.hidden = true;
  nameInput.focus();
  resumeBarcodeScanning("Producto añadido. Cámara activa; enfoca el siguiente producto.");
});

scanBarcodeButton.addEventListener("click", startBarcodeScan);
lookupBarcodeButton.addEventListener("click", () => lookupBarcode());
cancelScanButton.addEventListener("click", () => {
  stopCamera();
  setBarcodeStatus("Escaneo cancelado. Puedes reintentar o escribir el código manualmente.");
});
scanAgainButton.addEventListener("click", () => {
  scannedProduct = null;
  scanResult.hidden = true;
  startBarcodeScan();
});
capturePriceLabelButton.addEventListener("click", startPriceLabelCamera);
takePricePhotoButton.addEventListener("click", capturePriceLabelPhoto);
toggleTorchButton.addEventListener("click", async () => {
  if (!torchTrack) return;
  const nextTorchState = !torchEnabled;
  toggleTorchButton.disabled = true;
  try {
    await torchTrack.applyConstraints({ advanced: [{ torch: nextTorchState }] });
    torchEnabled = nextTorchState;
    toggleTorchButton.textContent = torchEnabled ? "Apagar linterna" : "Encender linterna";
    toggleTorchButton.setAttribute("aria-pressed", String(torchEnabled));
    priceOcrStatus.textContent = torchEnabled ? "Linterna encendida." : "Linterna apagada.";
  } catch {
    priceOcrStatus.textContent = "Esta cámara no ha podido cambiar el estado de la linterna.";
  } finally {
    toggleTorchButton.disabled = false;
  }
});
priceCropEditor.addEventListener("pointerdown", event => {
  if (!capturedPricePhoto || pricePhotoReview.hidden || event.button > 0) return;
  cropDragStart = getCropPoint(event);
  priceCropEditor.setPointerCapture(event.pointerId);
  event.preventDefault();
});
priceCropEditor.addEventListener("pointermove", event => {
  if (cropDragStart) setPriceCrop(cropDragStart, getCropPoint(event));
});
priceCropEditor.addEventListener("pointerup", event => {
  if (!cropDragStart) return;
  setPriceCrop(cropDragStart, getCropPoint(event));
  cropDragStart = null;
});
priceCropEditor.addEventListener("pointercancel", () => { cropDragStart = null; });
resetPriceCropButton.addEventListener("click", () => {
  cropDragStart = null;
  priceCropSelectionRect = null;
  updatePriceCropSelection();
});
cancelPriceCameraButton.addEventListener("click", () => {
  if (priceLabelUsingScannerCamera && barcodeCameraActive) {
    labelCameraActions.hidden = true;
    cameraView.classList.remove("reviewing-label");
    barcodeFrame.hidden = false;
    labelFrame.hidden = true;
    priceLabelUsingScannerCamera = false;
    resumeBarcodeScanning("Foto cancelada. Cámara activa; puedes seguir escaneando.", false);
  } else {
    stopCamera();
    priceOcrStatus.textContent = "Cámara cerrada. La foto no se guardó.";
  }
});
readLabelCodeButton.addEventListener("click", readLabelCode);
readPriceLabelButton.addEventListener("click", readPriceLabel);
retakePricePhotoButton.addEventListener("click", () => {
  capturedPricePhoto = "";
  priceCropSelectionRect = null;
  updatePriceCropSelection();
  pricePhotoReview.hidden = true;
  startPriceLabelCamera();
});
discardPricePhotoButton.addEventListener("click", discardPriceLabelPhoto);
priceInput.addEventListener("input", () => {
  if (priceFromLabel && Number(priceInput.value) !== ocrSuggestedPrice) {
    priceFromLabel = false;
    ocrSuggestedPrice = null;
  }
  const value = priceInput.valueAsNumber;
  scanPrice.textContent = priceInput.value === "" || !Number.isFinite(value)
    ? "Precio pendiente"
    : `${priceFromLabel ? "Lectura OCR" : "Precio introducido"}: ${money(value)}`;
});
window.addEventListener("pagehide", () => {
  stopCamera();
  if (ocrWorker) ocrWorker.terminate().catch(() => {});
});

clearButton.addEventListener("click", () => {
  if (!confirm("¿Quieres vaciar toda la cesta?")) {
    return;
  }

  products = [];
  saveData();
  render();
});

shoppingModeToggle.addEventListener("change", () => {
  shoppingMode = shoppingModeToggle.checked;
  saveData();
  render();
});

saveLastPurchaseButton.addEventListener("click", () => {
  if (products.length === 0) return;
  lastPurchase = products.map(product => ({ ...product, purchased: false }));
  try {
    localStorage.setItem("cesta-last-purchase", JSON.stringify(lastPurchase));
    purchaseTemplateStatus.textContent = "Compra guardada en este dispositivo.";
  } catch {
    purchaseTemplateStatus.textContent = "No se pudo guardar la compra en este navegador.";
  }
  render();
});

repeatLastPurchaseButton.addEventListener("click", () => {
  if (lastPurchase.length === 0) return;
  products.push(...lastPurchase.map(product => ({ ...product, purchased: false })));
  saveData();
  purchaseTemplateStatus.textContent = "Productos de la última compra añadidos a la cesta.";
  render();
});

enterAppButton.addEventListener("click", enterApp);
themeToggle.addEventListener("change", () => applyTheme(themeToggle.checked ? "dark" : "light"));
openTutorialButton.addEventListener("click", () => {
  appMenu.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
  openTutorial();
});
tutorialBackButton.addEventListener("click", () => {
  if (tutorialStepIndex === 0) return;
  tutorialStepIndex -= 1;
  renderTutorialStep();
});
tutorialNextButton.addEventListener("click", () => {
  if (tutorialStepIndex < tutorialSteps.length - 1) {
    tutorialStepIndex += 1;
    renderTutorialStep();
  } else {
    finishTutorial();
  }
});
tutorialSkipButton.addEventListener("click", finishTutorial);
tutorialCloseButton.addEventListener("click", finishTutorial);
tutorialDialog.addEventListener("cancel", event => {
  event.preventDefault();
  finishTutorial();
});
document.querySelector(".brand").addEventListener("click", event => {
  event.preventDefault();
  showView("basket");
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  appMenu.hidden = isOpen;
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
});

appMenu.addEventListener("click", event => {
  const button = event.target.closest("[data-view]");
  if (button) showView(button.dataset.view);
});

document.addEventListener("click", event => {
  if (!appMenu.hidden && !appMenu.contains(event.target) && !menuToggle.contains(event.target)) {
    appMenu.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !appMenu.hidden) {
    appMenu.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.focus();
  }
});

forumPhotoInput.addEventListener("change", () => {
  if (forumPreviewUrl) URL.revokeObjectURL(forumPreviewUrl);
  const file = forumPhotoInput.files[0];
  if (!file) {
    forumPhotoPreview.hidden = true;
    forumPhotoPreview.removeAttribute("src");
    forumPreviewUrl = "";
    return;
  }

  forumPreviewUrl = URL.createObjectURL(file);
  forumPhotoPreview.src = forumPreviewUrl;
  forumPhotoPreview.hidden = false;
});

forumForm.addEventListener("submit", async event => {
  event.preventDefault();
  const product = forumProductInput.value.trim();
  const supermarket = forumSupermarketInput.value.trim();
  const price = forumPriceInput.valueAsNumber;
  if (!product || !supermarket || !Number.isFinite(price) || price < 0) return;
  if (forumPosts.length >= 20) {
    forumStatus.textContent = "Has alcanzado el límite local de 20 publicaciones. Elimina alguna para continuar.";
    return;
  }

  const submitButton = forumForm.querySelector("button[type='submit']");
  submitButton.disabled = true;
  forumStatus.textContent = "Preparando publicación…";
  try {
    const photo = forumPhotoInput.files[0]
      ? await compressForumPhoto(forumPhotoInput.files[0])
      : "";
    const post = {
      id: crypto.randomUUID(),
      product,
      supermarket,
      price: Math.round(price * 100) / 100,
      note: forumNoteInput.value.trim(),
      observedDate: forumObservedDateInput.value,
      source: forumSourceInput.value,
      location: forumLocationInput.value.trim(),
      photo,
      createdAt: new Date().toISOString()
    };

    forumPosts.unshift(post);
    if (!saveForumPosts()) {
      forumPosts.shift();
      return;
    }

    forumForm.reset();
  forumObservedDateInput.value = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    if (forumPreviewUrl) URL.revokeObjectURL(forumPreviewUrl);
    forumPreviewUrl = "";
    forumPhotoPreview.hidden = true;
    forumPhotoPreview.removeAttribute("src");
    forumStatus.textContent = "Precio publicado en este navegador.";
    renderForum();
  } catch (error) {
    forumStatus.textContent = error.message || "No se pudo preparar la foto.";
  } finally {
    submitButton.disabled = false;
  }
});

forumSort.addEventListener("change", renderForum);
window.addEventListener("pagehide", () => {
  if (forumPreviewUrl) URL.revokeObjectURL(forumPreviewUrl);
});

render();
renderForum();

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

try {
  const hasEntered = sessionStorage.getItem("cesta-clara-entered") === "true";
  welcomeScreen.hidden = hasEntered;
  appShell.hidden = !hasEntered;
  if (hasEntered && !hasCompletedTutorial()) openTutorial();
} catch {
  welcomeScreen.hidden = false;
  appShell.hidden = true;
}