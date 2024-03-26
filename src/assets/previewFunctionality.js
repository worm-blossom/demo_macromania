/*
Script to be run  on preview pages. Notifies parent page to spawn new previews.
*/

document.querySelector("body").addEventListener("mousemove", (e) => {
  window.parent.postMessage({
    mouse: {
      clientX: e.clientX,
      clientY: e.clientY,
    },
  }, "*");
});

// Counter to generate unique ids.
let i = 0;

document.querySelector("body").addEventListener("mouseover", (evt) => {
  const nameAndEle = getNameAndEle(evt.target);

  if (nameAndEle !== null) {
    const [name, ele] = nameAndEle;
    let id = ele.id;
    if (!id) {
      i += 1;
      id = `trmtimzukvsev${i}`;
      ele.id = id;

      evt.target.addEventListener("mouseleave", () => {
        ele.id = "";
        window.parent.postMessage({leftAnchor: {
            name
        }}, "*");
      });
    }

    const anchorRects = [];
    for (const rect of evt.target.getClientRects()) {
      anchorRects.push(rect);
    }

    window.parent.postMessage({
      spawnTooltip: {
        name,
        id,
        anchorRect: evt.target.getBoundingClientRect(),
        anchorRects,
      },
    }, "*");
  }
});

function getNameAndEle(ele) {
  if (ele.dataset && ele.dataset.ref) {
    return [ele.dataset.ref, ele];
  } else if (ele.tagName === "A" && ele.parentNode.tagName === "DFN") {
    return [ele.parentNode.id, ele.parentNode];
  } else {
    return null;
  }
}
