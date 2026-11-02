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

const productList = document.getElementById("product-list");
const emptyState = document.getElementById("empty-state");
const itemCount = document.getElementById("item-count");
const clearButton = document.getElementById("clear-button");
const supermarketSummary = document.getElementById("supermarket-summary");
const supermarketTotals = document.getElementById("supermarket-totals");
const supermarketEmpty = document.getElementById("supermarket-empty");
const supermarketPending = document.getElementById("supermarket-pending");
const cameraView = document.getElementById("camera-view");
const cameraPreview = document.getElementById("camera-preview");
const barcodeFrame = document.getElementById("barcode-frame");
const barcodeFrameMessage = document.getElementById("barcode-frame-message");
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
const pricePhotoCanvas = document.getElementById("price-photo-canvas");
const pricePhotoReview = document.getElementById("price-photo-review");
const pricePhotoPreview = document.getElementById("price-photo-preview");
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
let ocrWorker = null;
let ocrWorkerPromise = null;
let ocrSuggestedPrice = null;
let priceFromLabel = false;
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
  (product.price == null || (Number.isFinite(product.price) && product.price >= 0)) &&
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

function stopCamera() {
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
  priceLabelUsingScannerCamera = false;
  barcodeReadActive = true;
  cameraView.hidden = false;
  cameraView.classList.remove("reviewing-label");
  barcodeFrame.hidden = false;
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

async function lookupBarcode(code = barcodeInput.value.trim()) {
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
      const timeoutId = window.setTimeout(() => controller.abort(), 8000);
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
    cameraView.hidden = false;
    cameraView.classList.remove("reviewing-label");
    barcodeFrame.hidden = true;
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
      video: { facingMode: { ideal: "environment" } }
    });
    if (session !== scannerSession) {
      stream.getTracks().forEach(track => track.stop());
      return;
    }

    labelCameraStream = stream;
    cameraPreview.srcObject = stream;
    cameraView.hidden = false;
    barcodeFrame.hidden = true;
    labelCameraActions.hidden = false;
    await cameraPreview.play();
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
  pricePhotoPreview.src = capturedPricePhoto;
  pricePhotoReview.hidden = false;
  priceCandidates.replaceChildren();
  recognizedLabelDetails.hidden = true;
  priceOcrStatus.textContent = "Foto capturada. La imagen se analizará en el dispositivo.";
  labelCameraActions.hidden = true;
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
    const before = text.slice(Math.max(0, start - 12), start);
    const after = text.slice(start + match[0].length, start + match[0].length + 8);
    const unitContext = `${before} ${after}`;
    const context = text.slice(Math.max(0, start - 8), Math.min(text.length, start + match[0].length + 8));
    if (/\/\s*(?:kg|100\s*g|100g|l|ud)\b|\bpor\s+(?:kg|litro|unidad)|\b(?:kg|100g)\s*\//i.test(unitContext)) continue;

    const value = Number(match[1].replace(",", "."));
    if (!Number.isFinite(value) || value < 0 || value > 9999) continue;
    if (candidates.some(candidate => candidate.value === value)) continue;
    candidates.push({ value, context: context.replace(/\s+/g, " ").trim() });
  }
  return candidates;
}

function chooseLabelPrice(value) {
  priceInput.value = value.toFixed(2);
  ocrSuggestedPrice = value;
  priceFromLabel = true;
  scanPrice.textContent = `Lectura OCR: ${money(value)} · confirma el importe`;
  priceOcrStatus.textContent = `Lectura orientativa: ${money(value)}. Revisa que sea el precio del producto y elige el supermercado.`;
  priceInput.focus();
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
    const { data } = await worker.recognize(capturedPricePhoto);
    const text = typeof data.text === "string" ? data.text.trim() : "";
    recognizedLabelText.textContent = text || "No se reconoció texto legible.";
    recognizedLabelDetails.hidden = !text;

    const candidates = extractLabelPriceCandidates(text);
    if (candidates.length === 0) {
      priceOcrStatus.textContent = "No detectamos un precio claro. Puedes escribirlo manualmente.";
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

function discardPriceLabelPhoto() {
  const resumeScanner = priceLabelUsingScannerCamera && barcodeCameraActive;
  if (priceFromLabel && Number(priceInput.value) === ocrSuggestedPrice) {
    priceInput.value = "";
    scanPrice.textContent = "Precio pendiente";
  }
  capturedPricePhoto = "";
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

  for (const group of groups.values()) {
    const item = document.createElement("li");
    item.className = "supermarket-total-row";

    const details = document.createElement("div");
    details.className = "supermarket-total-details";
    const name = document.createElement("strong");
    name.className = "supermarket-total-name";
    name.textContent = group.name;
    details.append(name);

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

  const units = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  itemCount.textContent =
    units + (units === 1 ? " unidad" : " unidades");

  products.forEach((product, index) => {
    const item = document.createElement("li");
    item.className = `product-item${product.imageUrl ? " has-image" : ""}`;

    const info = document.createElement("div");
    info.className = "product-info";

    if (product.imageUrl) {
      const image = document.createElement("img");
      image.className = "product-thumbnail";
      image.src = product.imageUrl;
      image.alt = product.name ? `Imagen de ${product.name}` : "Imagen del producto";
      image.loading = "lazy";
      image.addEventListener("error", () => image.remove(), { once: true });
      item.append(image);
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
    }
    detail.textContent = detailParts.join(" · ");

    const subtotal = document.createElement("span");
    subtotal.className = "product-total";
    subtotal.textContent = hasPrice ? money(product.price * product.quantity) : "";

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

  renderSupermarketSummary();
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
  const price = priceInput.value.trim() === "" ? null : priceInput.valueAsNumber;
  const quantity = quantityInput.valueAsNumber;
  const supermarket = supermarketInput.value.trim();

  if (!name || (price !== null && (!Number.isFinite(price) || price < 0))) {
    alert("Introduce un nombre y, si conoces el precio, un importe válido.");
    return;
  }

  if (!supermarket) {
    supermarketInput.focus();
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
cancelPriceCameraButton.addEventListener("click", () => {
  if (priceLabelUsingScannerCamera && barcodeCameraActive) {
    labelCameraActions.hidden = true;
    cameraView.classList.remove("reviewing-label");
    barcodeFrame.hidden = false;
    priceLabelUsingScannerCamera = false;
    resumeBarcodeScanning("Foto cancelada. Cámara activa; puedes seguir escaneando.", false);
  } else {
    stopCamera();
    priceOcrStatus.textContent = "Cámara cerrada. La foto no se guardó.";
  }
});
readPriceLabelButton.addEventListener("click", readPriceLabel);
retakePricePhotoButton.addEventListener("click", () => {
  capturedPricePhoto = "";
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

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

try {
  const hasEntered = sessionStorage.getItem("cesta-clara-entered") === "true";
  welcomeScreen.hidden = hasEntered;
  appShell.hidden = !hasEntered;
} catch {
  welcomeScreen.hidden = false;
  appShell.hidden = true;
}