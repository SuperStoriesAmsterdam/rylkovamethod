/*
 * annotate.js — in-browser review annotation tool (SuperStories canonical)
 *
 * Floating pencil toggles annotation mode. In that mode, clicking the page drops
 * a numbered pin and prompts for a note. Notes are stored in localStorage, scoped
 * per page, and tagged with the page name + the section (nearest [data-section] /
 * [id] / <section>). "Copy notes" copies readable text to the clipboard (textarea
 * fallback). "Export" downloads JSON. The count is always visible. Clicking an
 * existing pin offers to delete it.
 *
 * Review tool only — remove before final production deployment.
 */
(function () {
  'use strict';

  var PAGE = (document.body.getAttribute('data-page') ||
    (location.pathname.split('/').pop() || 'index').replace(/\.html?$/, '') ||
    'index');
  var STORAGE_KEY = 'rm-annotations:' + PAGE;

  var active = false;
  var notes = load();

  // ---- storage -------------------------------------------------------------
  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (e) { return []; }
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); }
    catch (e) { /* private mode — ignore */ }
  }

  // ---- section detection ---------------------------------------------------
  function sectionFor(el) {
    var node = el;
    while (node && node !== document.body) {
      if (node.getAttribute && node.getAttribute('data-section')) {
        return node.getAttribute('data-section');
      }
      if (node.id) return node.id;
      if (node.tagName === 'SECTION') {
        var h = node.querySelector('h1,h2,h3');
        if (h) return h.textContent.trim().slice(0, 40);
      }
      node = node.parentNode;
    }
    return 'page';
  }

  // ---- UI scaffold ---------------------------------------------------------
  var ui = document.createElement('div');
  ui.className = 'annotate-ui';
  ui.innerHTML =
    '<div class="annotate-bar" hidden>' +
      '<span class="annotate-count">0 notes</span>' +
      '<button type="button" class="annotate-copy">Copy notes</button>' +
      '<button type="button" class="annotate-export">Export</button>' +
    '</div>' +
    '<button type="button" class="annotate-toggle" aria-pressed="false" ' +
      'title="Toggle annotation mode">✎</button>';
  document.body.appendChild(ui);

  var toggleBtn = ui.querySelector('.annotate-toggle');
  var bar = ui.querySelector('.annotate-bar');
  var countEl = ui.querySelector('.annotate-count');

  toggleBtn.addEventListener('click', function () {
    active = !active;
    document.body.classList.toggle('annotate-active', active);
    toggleBtn.setAttribute('aria-pressed', String(active));
    toggleBtn.classList.toggle('is-active', active);
  });
  ui.querySelector('.annotate-copy').addEventListener('click', copyNotes);
  ui.querySelector('.annotate-export').addEventListener('click', exportNotes);

  // ---- pin placement -------------------------------------------------------
  document.addEventListener('click', function (e) {
    if (!active) return;
    if (ui.contains(e.target)) return;            // ignore clicks on our own UI
    if (e.target.closest('.annotate-pin')) return; // pin handles its own click
    e.preventDefault();
    e.stopPropagation();

    var note = window.prompt('Note for this spot:');
    if (!note) return;

    notes.push({
      n: notes.length + 1,
      note: note,
      page: PAGE,
      section: sectionFor(e.target),
      x: +(e.pageX / document.documentElement.scrollWidth).toFixed(4),
      y: +(e.pageY / document.documentElement.scrollHeight).toFixed(4)
    });
    save();
    render();
  }, true);

  // ---- render pins ---------------------------------------------------------
  function render() {
    Array.prototype.forEach.call(
      document.querySelectorAll('.annotate-pin'),
      function (p) { p.remove(); }
    );
    notes.forEach(function (item, i) {
      var pin = document.createElement('button');
      pin.type = 'button';
      pin.className = 'annotate-pin';
      pin.textContent = i + 1;
      pin.style.left = (item.x * 100) + '%';
      pin.style.top = (item.y * 100) + '%';
      pin.title = '[' + item.section + '] ' + item.note;
      pin.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm('Delete note ' + (i + 1) + '?\n\n"' + item.note + '"')) {
          notes.splice(i, 1);
          notes.forEach(function (it, j) { it.n = j + 1; });
          save();
          render();
        }
      });
      document.body.appendChild(pin);
    });
    countEl.textContent = notes.length + (notes.length === 1 ? ' note' : ' notes');
    bar.hidden = notes.length === 0;
  }

  // ---- copy / export -------------------------------------------------------
  function asText() {
    var lines = ['Annotations — ' + PAGE + ' (' + notes.length + ')', ''];
    notes.forEach(function (it, i) {
      lines.push((i + 1) + '. [' + it.section + '] ' + it.note);
    });
    return lines.join('\n');
  }

  function copyNotes() {
    var text = asText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(flash, function () { fallbackCopy(text); });
    } else {
      fallbackCopy(text);
    }
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); flash(); } catch (e) { /* noop */ }
    ta.remove();
  }
  function flash() {
    var b = ui.querySelector('.annotate-copy');
    var prev = b.textContent;
    b.textContent = 'Copied ✓';
    window.setTimeout(function () { b.textContent = prev; }, 1400);
  }

  function exportNotes() {
    var blob = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'rylkova-annotations-' + PAGE + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  render();
})();
