function scroll_to() {
  const regex = /[^#]*#.*:~:selector\(type=CssSelector,value=(.*)\)$/;
  const entry = performance.getEntriesByType("navigation")[0];
  const match = entry.name.match(regex);
  if (!match || match.length != 2)
    return;
  let matchStr = decodeURIComponent(match[1]);
  const elem = document.querySelector(matchStr);
  if (!elem) {
    console.error('Failed to select element from selector: ' + matchStr);
    return;
  }
  // Need to wait for the load event to ensure the scroll does not get
  // undone by the browsers anchor link scroll behavior.
  window.addEventListener('load', () => {
    elem.scrollIntoView();
  });
}
scroll_to();
