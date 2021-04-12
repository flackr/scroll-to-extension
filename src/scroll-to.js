function scroll_to() {
  const regex = /[^#]*#.*:~:selector\(type=CssSelector,value=(.*)\)$/;
  // Scroll to image only supports a simple or compound selector selecting on
  // type, id, class and attribute selectors with a specific list of allowed
  // attribute names to select on. See
  // https://github.com/WICG/scroll-to-text-fragment/blob/main/EXTENSIONS.md#css-selector-restrictions
  // for details.
  const validSelector = /^([#.]?[-_a-zA-Z0-9]+(\[ *(alt|href|poster|src|srcset|style) *([$^*|~]?= *("[^"]*"|'[^']*'|[^\] ]*))? *\])*)+$/;
  const entry = performance.getEntriesByType("navigation")[0];
  const match = entry.name.match(regex);
  if (!match || match.length != 2)
    return;
  let matchStr = decodeURIComponent(match[1]).trim();
  if (!matchStr.match(validSelector)) {
    console.error('Invalid selector specified, see selector limitations at https://github.com/WICG/scroll-to-text-fragment/blob/main/EXTENSIONS.md#css-selector-restrictions', matchStr);
    return;
  }
  const elem = document.querySelector(matchStr);
  if (!elem) {
    console.error('Failed to select element from selector: ' + matchStr);
    return;
  }
  const previousOutline = elem.style.outline;
  elem.style.outline = 'Highlight solid 3px';
  // Need to wait for the load event to ensure the scroll does not get
  // undone by the browsers anchor link scroll behavior.
  window.addEventListener('load', () => {
    // Wait until the second frame after the load to scroll the element into
    // view. Scrolling immediately seems to sometimes fail.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        elem.scrollIntoView();
        // Wait until the element is scrolled into view to add a listener to
        // cancel the highlight.
        requestAnimationFrame(() => {
          window.addEventListener('scroll', () => elem.style.outline = previousOutline, {once: true});
        });
      });
    });
  });
}
scroll_to();
