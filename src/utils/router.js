import { ROUTE_EVENT_NAME } from "../constants/eventName.js";

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });

  window.addEventListener("popstate", () => {
    onRoute();
  });
};

export const push = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_EVENT_NAME, {
      detail: {
        nextUrl,
      },
    })
  );
};
