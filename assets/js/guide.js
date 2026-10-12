(function () {
  var content = document.querySelector(".content");
  var toc = document.getElementById("toc");
  if (!content || !toc) return;

  // 1. Build the sidebar from the h2 headings (Kramdown gives each one an id)
  var themeBtn = document.getElementById("themeBtn");
  var headings = Array.prototype.slice.call(content.querySelectorAll("h2[id]"));
  var linkById = {};
  headings.forEach(function (h) {
    var a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent;
    toc.insertBefore(a, themeBtn);
    linkById[h.id] = a;
  });

  // 2. Add a title bar and Copy button to every code block
  content.querySelectorAll("div.highlighter-rouge").forEach(function (block) {
    var pre = block.querySelector("pre");
    if (!pre) return;
    var langMatch = block.className.match(/language-([\w+-]+)/);
    var bar = document.createElement("div");
    bar.className = "bar";
    var label = document.createElement("span");
    label.textContent = langMatch ? langMatch[1] : "code";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Copy";
    bar.appendChild(label);
    bar.appendChild(btn);
    block.insertBefore(bar, block.firstChild);

    function done(ok) {
      btn.textContent = ok ? "Copied" : "Press Ctrl+C";
      setTimeout(function () { btn.textContent = "Copy"; }, 1600);
    }
    function fallback() {
      try {
        var r = document.createRange(); r.selectNodeContents(pre);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        done(document.execCommand("copy"));
      } catch (e) { done(false); }
    }
    btn.addEventListener("click", function () {
      try { navigator.clipboard.writeText(pre.textContent).then(function () { done(true); }, fallback); }
      catch (e) { fallback(); }
    });
  });

  // 3. Let wide tables scroll sideways inside their own box
  content.querySelectorAll("table").forEach(function (t) {
    var wrap = document.createElement("div");
    wrap.className = "tablewrap";
    t.parentNode.insertBefore(wrap, t);
    wrap.appendChild(t);
  });

  // 4. Dark / light toggle
  var root = document.documentElement;
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var dark = root.getAttribute("data-theme") === "dark" ||
        (!root.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
      root.setAttribute("data-theme", dark ? "light" : "dark");
    });
  }

  // 5. Highlight the current section in the sidebar
  if ("IntersectionObserver" in window && headings.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          Object.keys(linkById).forEach(function (k) { linkById[k].classList.remove("active"); });
          if (linkById[e.target.id]) linkById[e.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    headings.forEach(function (h) { io.observe(h); });
  }
})();
