const saveOptions = e => {
  e.preventDefault();

  browser.storage.local.set({
    links: document.querySelector("#links").checked,
    paths: document.querySelector("#paths").value.trim(),
    prompt: document.querySelector("#prompt").checked
  });

  browser.contextMenus.removeAll();
  browser.runtime.reload();
};

const restoreOptions = () => {
  browser.storage.local.get(["links", "paths", "prompt"]).then(result => {
    document.querySelector("#links").checked =
      typeof result.links === "undefined" ? true : result.links;
    document.querySelector("#prompt").checked =
      typeof result.prompt === "undefined" ? false : result.prompt;
    document.querySelector("#paths").value = result.paths || ".";
  });
};

const addHelp = el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    document.getElementById(el.dataset.helpFor).classList.toggle("show");
  });
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#options").addEventListener("submit", saveOptions);
document.querySelectorAll(".help").forEach(addHelp);
