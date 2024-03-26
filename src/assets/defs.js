const styleEl = document.createElement("style");
document.head.appendChild(styleEl);
const styleSheet = styleEl.sheet;

document.querySelector("body").addEventListener("mouseover", (evt) => {
  const name = getName(evt.target);

  if (name !== null) {
      styleSheet.insertRule(`[data-ref=${name}] { color: yellow; }`);
      styleSheet.insertRule(`#${name} { color: orange; }`);

    evt.target.addEventListener("mouseleave", () => {
      while (styleSheet.cssRules.length > 0) {
        styleSheet.deleteRule(0);
      }
    });
  }
});

function getName(ele) {
  if (ele.dataset && ele.dataset.ref) {
    return ele.dataset.ref;
  } else if (ele.tagName === "A" && ele.parentNode.tagName === "DFN") {
    return ele.parentNode.id;
  } else {
    return null;
  }
}
