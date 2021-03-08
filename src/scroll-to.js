function scroll_to() {
  const regex = /[^#]*#.*:~:selector\(type=CssSelector,value=(.*)\)$/;
  const entry = performance.getEntriesByType("navigation")[0];
  const match = entry.name.match(regex);
  if (!match || match.length != 2)
    return;
  const elem = document.querySelector(match[1]);
  if (!elem) {
    console.error('Failed to select element from selector: ' + match[1]);
    return;
  }
  // For some reason if we scroll too soon the scroll jumps back up to the top
  // of the page immediately after scrolling to the element.
  setTimeout(() => {
    elem.scrollIntoView();
  }, 500);
}
scroll_to();