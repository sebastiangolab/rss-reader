export const sanitizeHtml = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, "text/html");

  doc.body.querySelectorAll("h1").forEach((el) => el.remove());

  doc.body.querySelectorAll(".social-icons").forEach((el) => el.remove());

  const elements = doc.body.querySelectorAll("*");
  elements.forEach((el) => {
    el.removeAttribute("class");
    el.removeAttribute("style");
  });

  return doc.body.innerHTML;
};
