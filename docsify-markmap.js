// docsify-markmap.js
(function () {
  function renderMarkmap(el) {
    const codeBlocks = el ? el.querySelectorAll("pre[data-lang='markmap']") : document.querySelectorAll("pre[data-lang='markmap']");
    codeBlocks.forEach((codeBlock) => {
      const code = codeBlock.textContent.trim();
      const container = document.createElement("div");
      container.className = "markmap"; // Add the markmap class to the container
      container.textContent = code; // Set the content of the container to the code
      codeBlock.parentNode.replaceChild(container, codeBlock);

      // Render markmap in the container
      window.markmap.autoLoader.render(container);
    });
  }

  // Docsify plugin initialization
  function init(hook, vm) {
    // Trigger rendering on page load
    renderMarkmap();

    // Trigger rendering on each page change
    hook.doneEach(renderMarkmap);

    // Trigger rendering when page content is updated
    hook.mounted(() => {
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === "childList") {
            renderMarkmap(mutation.target);
          }
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  $docsify.plugins = [].concat(init, $docsify.plugins);
})();
