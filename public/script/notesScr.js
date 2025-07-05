const noteContainers = document.querySelectorAll(".noteContainer");
noteContainers.forEach((container) => {
  container.addEventListener("mouseover", () => {
    const overlay = container.querySelector(".overlay");
    overlay.classList.add("visible");
    const createdAt = container.querySelector(".createdAt");
    createdAt.classList.add("visible");
    const id = container.querySelector(".id");
    id.classList.add("brighterColor");
  });
  container.addEventListener("mouseout", () => {
    const overlay = container.querySelector(".overlay");
    overlay.classList.remove("visible");
    const createdAt = container.querySelector(".createdAt");
    createdAt.classList.remove("visible");
    const id = container.querySelector(".id");
    id.classList.remove("brighterColor");
  });
});
