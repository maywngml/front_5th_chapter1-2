const eventMap = {};

export function setupEventListeners(root) {
  Object.entries(eventMap).forEach(([eventType, events], index) => {
    eventMap[eventType][index].root = root;
    root.addEventListener(eventType, (e) => {
      events.forEach(({ element, handler }) => {
        if (e.target === element) {
          handler();
        }
      });
    });
  });
}

export function addEvent(element, eventType, handler) {
  eventMap[eventType] = eventMap[eventType] ?? [];
  eventMap[eventType].push({ element, handler });
}

export function removeEvent(element, eventType, handler) {
  const index = eventMap[eventType].findIndex(
    ({ element: currentElement, handler: currentHandler }) =>
      currentElement.isSameNode(element) &&
      currentHandler.toString() === handler.toString(),
  );

  if (index >= 0) {
    if (eventMap[eventType][index].root) {
      eventMap[eventType][index].root.removeEventListener(eventType, handler);
    }
    eventMap[eventType].splice(index, 1);
  }
}
