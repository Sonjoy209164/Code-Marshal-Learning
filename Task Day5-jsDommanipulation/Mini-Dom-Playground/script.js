// Element references
const elementType = document.getElementById("elementType");
const elementText = document.getElementById("elementText");
const parentSelect = document.getElementById("parentSelect");
const addElementBtn = document.getElementById("addElementBtn");
const removeLastBtn = document.getElementById("removeLastBtn");
const clearCanvasBtn = document.getElementById("clearCanvasBtn");
const canvas = document.getElementById("canvas");
const structureList = document.getElementById("structureList");

// Style controls
const bgColor = document.getElementById("bgColor");
const textColor = document.getElementById("textColor");
const paddingRange = document.getElementById("paddingRange");
const radiusRange = document.getElementById("radiusRange");
const fontSizeRange = document.getElementById("fontSizeRange");
const paddingValue = document.getElementById("paddingValue");
const radiusValue = document.getElementById("radiusValue");
const fontSizeValue = document.getElementById("fontSizeValue");
const applyStylesBtn = document.getElementById("applyStylesBtn");

// Sync range value display
[paddingRange, radiusRange, fontSizeRange].forEach(range => {
  range.addEventListener("input", () => {
    if (range === paddingRange) paddingValue.textContent = range.value;
    if (range === radiusRange) radiusValue.textContent = range.value;
    if (range === fontSizeRange) fontSizeValue.textContent = range.value;
  });
});

// Add element dynamically
addElementBtn.addEventListener("click", () => {
  const type = elementType.value;
  const content = elementText.value.trim();
  const parentId = parentSelect.value;
  const parent = parentId === "canvas" ? canvas : document.getElementById(parentId);

  const newEl = document.createElement(type);

  // Assign id and basic style
  const uniqueId = `${type}-${Date.now()}`;
  newEl.id = uniqueId;
  newEl.classList.add("hoverable");
  newEl.style.padding = paddingRange.value + "px";
  newEl.style.borderRadius = radiusRange.value + "px";
  newEl.style.fontSize = fontSizeRange.value + "px";
  newEl.style.background = bgColor.value || "rgba(255,255,255,0.05)";
  newEl.style.color = textColor.value || "#fff";
  newEl.style.cursor = "pointer";

  // Set content
  if (type === "img") {
    newEl.src = content || "https://placekitten.com/200/200";
    newEl.alt = "Dynamic Image";
    newEl.style.width = "150px";
    newEl.style.height = "150px";
    newEl.style.objectFit = "cover";
  } else {
    newEl.textContent = content || `New ${type}`;
  }

  // Add event listener
  newEl.addEventListener("click", (e) => {
    e.stopPropagation();
    alert(`Element: <${type}> | ID: ${newEl.id}`);
  });

  // Append to parent
  parent.appendChild(newEl);

  // Update dropdown and structure
  updateParentDropdown();
  updateTreeView();
});

// Remove last element
removeLastBtn.addEventListener("click", () => {
  const lastChild = canvas.lastElementChild;
  if (lastChild) {
    lastChild.remove();
    updateParentDropdown();
    updateTreeView();
  }
});

// Clear canvas
clearCanvasBtn.addEventListener("click", () => {
  canvas.innerHTML = "";
  updateParentDropdown();
  updateTreeView();
});

// Apply styles to selected parent
applyStylesBtn.addEventListener("click", () => {
  const parentId = parentSelect.value;
  const parent = parentId === "canvas" ? canvas : document.getElementById(parentId);
  if (!parent) return;
  parent.style.background = bgColor.value;
  parent.style.color = textColor.value;
  parent.style.padding = paddingRange.value + "px";
  parent.style.borderRadius = radiusRange.value + "px";
  parent.style.fontSize = fontSizeRange.value + "px";
});

// Update parent dropdown
function updateParentDropdown() {
  const allEls = canvas.querySelectorAll("*");
  parentSelect.innerHTML = `<option value="canvas">Main Canvas</option>`;
  allEls.forEach((el) => {
    parentSelect.innerHTML += `<option value="${el.id}">${el.tagName.toLowerCase()} (${el.id})</option>`;
  });
}

// Display DOM tree
function updateTreeView() {
  structureList.innerHTML = "";
  generateTree(canvas, structureList);
}

function generateTree(node, listEl) {
  const children = node.children;
  for (let child of children) {
    const li = document.createElement("li");
    li.textContent = `<${child.tagName.toLowerCase()}> id="${child.id}"`;
    listEl.appendChild(li);
    if (child.children.length > 0) {
      const nestedUl = document.createElement("ul");
      li.appendChild(nestedUl);
      generateTree(child, nestedUl);
    }
  }
}

// Initialize on load
updateParentDropdown();
updateTreeView();
//hello