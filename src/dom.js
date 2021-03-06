export function getOffsetScroll(_window) {
    const body = _window.document.body;
    const scrollReference = _window.getComputedStyle(body).position === "static"
            ? body.parentNode : body;
    return scrollReference.getBoundingClientRect();
}

let matchFunc;
export function matches(element, selector) {
    if (!matchFunc) matchFunc = getMatchFunctionName(element);
    return element[matchFunc](selector);
}

export function closest(element, selector) {
    let target = element;
    while (target && (target.nodeType !== 1 /* === Node.ELEMENT_NODE */ || !matches(target, selector))) {
        target = target.parentNode;
    }

    return target;
}

// `contains` in IE doesn't work with text nodes
export function contains(ancestor, target) {
    const comparedPositions = ancestor.compareDocumentPosition(target);
    // eslint-disable-next-line no-bitwise
    return !comparedPositions || (comparedPositions & 16 /* === Node.DOCUMENT_POSITION_CONTAINED_BY */) > 0;
}

// eslint-disable-next-line consistent-return
function getMatchFunctionName(element) {
    const suffix = "atchesSelector";
    for (const name of [ "matches", `m${suffix}`, `webkitM${suffix}`, `mozM${suffix}`, `msM${suffix}`, `oM${suffix}` ]) {
        if (element[name]) return name;
    }
}
