const budgetInput = document.getElementById("budget");
const totalElement = document.getElementById("total");
const remainingElement = document.getElementById("remaining");
const progressBar = document.getElementById("progress-bar");
const budgetMessage = document.getElementById("budget-message");

const productForm = document.getElementById("product-form");
const nameInput = document.getElementById("product-name");
const priceInput = document.getElementById("product-price");
const quantityInput = document.getElementById("product-quantity");

const productList = document.getElementById("product-list");
const emptyState = document.getElementById("empty-state");
const itemCount = document.getElementById("item-count");
const clearButton = document.getElementById("clear-button");
const apiKeyInput = document.getElementById("gemini-api-key");
const startCameraButton = document.getElementById("start-camera");
const cameraView = document.getElementById("camera-view");
const cameraPreview = document.getElementById("camera-preview");
const capturePhotoButton = document.getElementById("capture-photo");
const stopCameraButton = document.getElementById("stop-camera");
const photoReview = document.getElementById("photo-review");
const photoPreview = document.getElementById("photo-preview");
const photoCanvas = document.getElementById("photo-canvas");
const analyzePhotoButton = document.getElementById("analyze-photo");
const retakePhotoButton = document.getElementById("retake-photo");
const cameraStatus = document.getElementById("camera-status");
const scanResult = document.getElementById("scan-result");
const scanProduct = document.getElementById("scan-product");
const scanSupermarket = document.getElementById("scan-supermarket");
const scanEvidence = document.getElementById("scan-evidence");
const scanConfidence = document.getElementById("scan-confidence");
const quantityLabel = document.getElementById("quantity-label");
const barcodeInput = document.getElementById("barcode-code");
const lookupBarcodeButton = document.getElementById("lookup-barcode");
const scanBarcodeButton = document.getElementById("scan-barcode");
const barcodeStatus = document.getElementById("barcode-status");
const welcomeScreen = document.getElementById("welcome-screen");
const enterAppButton = document.getElementById("enter-app");
const appShell = document.getElementById("app-shell");
const menuToggle = document.getElementById("menu-toggle");
const appMenu = document.getElementById("app-menu");
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

let cameraStream = null;
let barcodeControls = null;
let barcodeReadActive = false;
let capturedImage = null;
let detectedSupermarket = "";
let detectedPriceSource = "user";
let forumPreviewUrl = "";

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
  Number.isFinite(product.price) &&
  product.price >= 0 &&
  Number.isSafeInteger(product.quantity) &&
  product.quantity >= 1
);

budgetInput.value = budget;

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

function getPriceSourceLabel(source) {
  return priceSourceLabels[source] || "Origen no indicado";
}

function saveData() {
  try {
    localStorage.setItem("cesta-budget", JSON.stringify(budget));
    localStorage.setItem("cesta-products", JSON.stringify(products));
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

function setCameraStatus(message, isError = false) {
  cameraStatus.textContent = message;
  cameraStatus.classList.toggle("error", isError);
}

function stopCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }

  if (barcodeControls) {
    barcodeControls.stop();
    barcodeControls = null;
  }
  barcodeReadActive = false;

  cameraPreview.srcObject = null;
  cameraView.hidden = true;
  startCameraButton.hidden = false;
  capturePhotoButton.hidden = false;
}

async function startCamera() {
  if (!window.confirm("¿Das permiso para activar la cámara? No se tomará ni enviará ninguna foto hasta que tú lo indiques.")) {
    setCameraStatus("La cámara no se ha activado.");
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    setCameraStatus("Este navegador no permite acceder a la cámara desde esta página.", true);
    return;
  }

  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false
    });
    cameraPreview.srcObject = cameraStream;
    cameraView.hidden = false;
    photoReview.hidden = true;
    startCameraButton.hidden = true;
    setCameraStatus("Cámara activa. Encuadra el producto y haz la foto.");
    await cameraPreview.play();
  } catch (error) {
    stopCamera();
    setCameraStatus(
      error.name === "NotAllowedError"
        ? "No se concedió permiso para usar la cámara. Puedes añadir el producto manualmente."
        : "No se pudo iniciar la cámara. Comprueba los permisos del navegador.",
      true
    );
  }
}

function setBarcodeStatus(message, isError = false) {
  barcodeStatus.textContent = message;
  barcodeStatus.classList.toggle("error", isError);
}

async function lookupBarcode() {
  const code = barcodeInput.value.trim();
  if (!/^\d{8,14}$/.test(code)) {
    setBarcodeStatus("Introduce un código EAN/UPC válido de 8 a 14 cifras.", true);
    barcodeInput.focus();
    return;
  }

  lookupBarcodeButton.disabled = true;
  setBarcodeStatus("Buscando producto en Open Food Facts…");
  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(code)}.json?fields=product_name,product_name_es,brands,quantity`);
    if (!response.ok) throw new Error("No se pudo consultar Open Food Facts.");
    const result = await response.json();
    const product = result.product;
    const productName = product?.product_name_es || product?.product_name;
    if (result.status !== 1 || !productName) {
      throw new Error("No se encontró el producto. Puedes introducirlo manualmente.");
    }

    nameInput.value = productName;
    priceInput.value = "";
    quantityInput.value = "1";
    quantityLabel.textContent = "¿Cuántas unidades quieres?";
    const details = [product.brands, product.quantity].filter(Boolean).join(" · ");
    setBarcodeStatus(`Producto encontrado${details ? `: ${details}` : ""}. La base no proporciona un precio actual; añádelo manualmente.`);
    nameInput.focus();
    productForm.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (error) {
    setBarcodeStatus(error.message || "No se pudo consultar Open Food Facts. Comprueba la conexión o introduce el producto manualmente.", true);
  } finally {
    lookupBarcodeButton.disabled = false;
  }
}

async function startBarcodeScan() {
  if (!window.confirm("¿Das permiso para activar la cámara y leer un código de barras?")) {
    setBarcodeStatus("La cámara no se ha activado.");
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    setBarcodeStatus("Este navegador no permite usar la cámara. Puedes escribir el código manualmente.", true);
    return;
  }

  setBarcodeStatus("Cargando lector de códigos…");
  try {
    const { BrowserMultiFormatReader } = await import("https://cdn.jsdelivr.net/npm/@zxing/browser@0.2.1/+esm");
    stopCamera();
    cameraView.hidden = false;
    photoReview.hidden = true;
    startCameraButton.hidden = true;
    capturePhotoButton.hidden = true;
    barcodeReadActive = true;
    const reader = new BrowserMultiFormatReader();
    setBarcodeStatus("Enfoca el código de barras dentro de la imagen.");
    const controls = await reader.decodeFromVideoDevice(undefined, cameraPreview, (result, error, activeControls) => {
      if (!result || !barcodeReadActive) return;
      const code = result.getText().trim();
      if (!/^\d{8,14}$/.test(code)) return;

      barcodeReadActive = false;
      activeControls?.stop();
      barcodeControls = null;
      cameraPreview.srcObject = null;
      cameraView.hidden = true;
      startCameraButton.hidden = false;
      capturePhotoButton.hidden = false;
      barcodeInput.value = code;
      setBarcodeStatus(`Código leído: ${code}. Buscando producto…`);
      lookupBarcode();
    });
    if (barcodeReadActive) barcodeControls = controls;
    else controls.stop();
  } catch {
    stopCamera();
    setBarcodeStatus("No se pudo iniciar el lector. Escribe el código manualmente o comprueba la conexión.", true);
  }
}

function capturePhoto() {
  const sourceWidth = cameraPreview.videoWidth;
  const sourceHeight = cameraPreview.videoHeight;
  if (!sourceWidth || !sourceHeight) {
    setCameraStatus("La cámara todavía se está iniciando. Inténtalo de nuevo en un momento.", true);
    return;
  }

  const scale = Math.min(1, 1280 / Math.max(sourceWidth, sourceHeight));
  photoCanvas.width = Math.round(sourceWidth * scale);
  photoCanvas.height = Math.round(sourceHeight * scale);
  photoCanvas.getContext("2d").drawImage(cameraPreview, 0, 0, photoCanvas.width, photoCanvas.height);
  capturedImage = photoCanvas.toDataURL("image/jpeg", 0.84);
  photoPreview.src = capturedImage;
  photoReview.hidden = false;
  stopCamera();
  setCameraStatus("Foto lista. La imagen solo se enviará a Gemini si pulsas «Analizar foto».");
}

function getInteractionText(responseData) {
  if (typeof responseData.output_text === "string") return responseData.output_text;

  const content = (responseData.steps || []).flatMap(step => step.content || []);
  return content
    .filter(part => typeof part.text === "string")
    .map(part => part.text)
    .join("\n");
}

function parseAnalysis(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("La IA no devolvió un resultado legible.");
  return JSON.parse(text.slice(start, end + 1));
}

async function analyzePhoto() {
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    setCameraStatus("Pega primero tu clave API de Gemini para analizar la foto.", true);
    apiKeyInput.focus();
    return;
  }
  if (!capturedImage) {
    setCameraStatus("Haz una foto antes de iniciar el análisis.", true);
    return;
  }

  analyzePhotoButton.disabled = true;
  setCameraStatus("Analizando producto, etiqueta y señales visibles del supermercado…");

  try {
    const [metadata, imageData] = capturedImage.split(",");
    const mimeType = metadata.match(/data:(.*?);base64/)?.[1] || "image/jpeg";
    const prompt = [
      "Analiza la foto de un producto de supermercado. Devuelve solo un objeto JSON válido, sin Markdown, con estas claves:",
      '"product_name" (nombre específico legible del producto o cadena vacía),',
      '"brand" (marca del producto visible o cadena vacía),',
      '"supermarket" (nombre de la cadena solo si hay evidencia visible clara; si no, null),',
      '"price_eur" (número solo si un precio de venta aparece claramente en una etiqueta visible; de lo contrario null),',
      '"price_evidence" (breve descripción de dónde se leyó el precio o por qué no está disponible),',
      '"confidence" ("alta", "media" o "baja").',
      "No inventes precios, tiendas ni datos ilegibles. No confundas la marca del producto con el supermercado. El precio debe ser el precio unitario en euros, no un precio por kilo salvo que no haya otro, en cuyo caso explica esto en price_evidence."
    ].join(" ");

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        model: "gemini-flash-latest",
        store: false,
        input: [
          { type: "text", text: prompt },
          { type: "image", data: imageData, mime_type: mimeType }
        ]
      })
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.error?.message || "Gemini no pudo analizar la imagen.");
    }

    const result = parseAnalysis(getInteractionText(responseData));
    const productName = typeof result.product_name === "string" ? result.product_name.trim() : "";
    if (!productName) throw new Error("No se pudo identificar el producto. Prueba con una foto más clara.");

    nameInput.value = productName;
    detectedSupermarket = typeof result.supermarket === "string" ? result.supermarket.trim() : "";
    const price = result.price_eur;
    const numericPrice = typeof price === "number"
      ? price
      : typeof price === "string" ? Number(price.replace(",", ".")) : NaN;
    priceInput.value = Number.isFinite(numericPrice) && numericPrice >= 0 ? numericPrice.toFixed(2) : "";
    quantityInput.value = "1";
    quantityLabel.textContent = "¿Cuántas unidades quieres?";

    scanProduct.textContent = `${productName}${result.brand ? ` · ${result.brand}` : ""}`;
    scanSupermarket.textContent = detectedSupermarket
      ? `Supermercado detectado: ${detectedSupermarket}`
      : "No se pudo identificar el supermercado con certeza.";
    scanEvidence.textContent = result.price_evidence || "Revisa el precio reconocido antes de añadir el producto.";
    scanConfidence.textContent = `Confianza estimada por IA: ${result.confidence || "no indicada"}. Verifica el dato.`;
    scanResult.hidden = false;

    setCameraStatus("Revisa los datos y confirma las unidades antes de añadir el producto.");
    (priceInput.value ? quantityInput : priceInput).focus();
    productForm.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (error) {
    setCameraStatus(error.message || "No se pudo contactar con Gemini. Comprueba tu conexión y la clave API.", true);
  } finally {
    analyzePhotoButton.disabled = false;
  }
}

function calculateTotal() {
  return products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
}

function render() {
  const total = calculateTotal();
  const remaining = budget - total;
  const isOver = total > budget;

  totalElement.textContent = money(total);
  remainingElement.textContent = money(remaining);

  remainingElement.style.color = isOver ? "#b91c1c" : "#15803d";

  const percentage = budget > 0
    ? Math.min((total / budget) * 100, 100)
    : total > 0 ? 100 : 0;

  progressBar.style.width = percentage + "%";
  progressBar.classList.toggle("over", isOver);
  budgetMessage.classList.toggle("over", isOver);

  if (isOver) {
    budgetMessage.textContent =
      "Has superado tu presupuesto en " + money(total - budget) + ".";
  } else if (budget === 0 && total === 0) {
    budgetMessage.textContent =
      "Establece un presupuesto para controlar tu compra.";
  } else {
    budgetMessage.textContent =
      "Tu compra está dentro del presupuesto.";
  }

  productList.replaceChildren();
  emptyState.hidden = products.length > 0;

  const units = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  itemCount.textContent =
    units + (units === 1 ? " unidad" : " unidades");

  products.forEach((product, index) => {
    const item = document.createElement("li");
    item.className = "product-item";

    const info = document.createElement("div");
    info.className = "product-info";

    const name = document.createElement("strong");
    name.textContent = product.name;

    const detail = document.createElement("span");
    detail.textContent =
      money(product.price) + " × " + product.quantity + " unidad(es)" +
      (product.supermarket ? " · " + product.supermarket : "");

    const subtotal = document.createElement("span");
    subtotal.className = "product-total";
    subtotal.textContent = money(product.price * product.quantity);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-button";
    remove.textContent = "Eliminar";
    remove.setAttribute(
      "aria-label",
      "Eliminar " + product.name
    );

    remove.addEventListener("click", () => {
      products.splice(index, 1);
      saveData();
      render();
    });

    info.append(name, detail);
    item.append(info, subtotal, remove);
    productList.append(item);
  });

  clearButton.hidden = products.length === 0;
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
  const price = priceInput.valueAsNumber;
  const quantity = quantityInput.valueAsNumber;

  if (!name || !Number.isFinite(price) || price < 0) {
    alert("Introduce un nombre y un precio válido.");
    return;
  }

  if (!Number.isSafeInteger(quantity) || quantity < 1) {
    alert("Las unidades deben ser un número entero mayor que cero.");
    return;
  }

  products.push({
    name,
    price: Math.round(price * 100) / 100,
    quantity,
    supermarket: detectedSupermarket
  });

  saveData();
  render();

  productForm.reset();
  quantityInput.value = 1;
  quantityLabel.textContent = "Unidades";
  detectedSupermarket = "";
  scanResult.hidden = true;
  nameInput.focus();
});

startCameraButton.addEventListener("click", startCamera);
capturePhotoButton.addEventListener("click", capturePhoto);
stopCameraButton.addEventListener("click", () => {
  stopCamera();
  setCameraStatus("Cámara cerrada.");
});
analyzePhotoButton.addEventListener("click", analyzePhoto);
retakePhotoButton.addEventListener("click", startCamera);
lookupBarcodeButton.addEventListener("click", lookupBarcode);
scanBarcodeButton.addEventListener("click", startBarcodeScan);
window.addEventListener("pagehide", stopCamera);

clearButton.addEventListener("click", () => {
  if (!confirm("¿Quieres vaciar toda la cesta?")) {
    return;
  }

  products = [];
  saveData();
  render();
});

enterAppButton.addEventListener("click", enterApp);
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

try {
  const hasEntered = sessionStorage.getItem("cesta-clara-entered") === "true";
  welcomeScreen.hidden = hasEntered;
  appShell.hidden = !hasEntered;
} catch {
  welcomeScreen.hidden = false;
  appShell.hidden = true;
}