
(() => {
  const cards = Array.from(document.querySelectorAll("[data-card]"));
  if (!cards.length) return;

  const search = document.querySelector("#case-search");
  const buttons = Array.from(document.querySelectorAll("[data-filter]"));
  const count = document.querySelector("[data-result-count]");
  let activeTopic = "all";

  const normalize = (value) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const applyFilters = () => {
    const query = normalize(search ? search.value : "");
    let visible = 0;

    cards.forEach((card) => {
      const topic = card.getAttribute("data-topic") || "";
      const text = normalize(card.getAttribute("data-search") || "");
      const topicMatch = activeTopic === "all" || topic === activeTopic;
      const searchMatch = !query || text.includes(query);
      const show = topicMatch && searchMatch;
      card.hidden = !show;
      if (show) visible += 1;
    });

    if (count) count.textContent = String(visible);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      activeTopic = button.getAttribute("data-filter") || "all";
      buttons.forEach((item) => item.classList.toggle("is-active", item === button));
      applyFilters();
    });
  });

  if (search) search.addEventListener("input", applyFilters);
})();
