(function () {
  'use strict';

  var KEY = 'dailyExpenses_v1';
  var KEY_P = 'dailyExpenses_personal_v1';
  var THEME_KEY = 'dailyExpenses_theme';
  var DAYS = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  var P = {
    gear: '<circle cx="12" cy="12" r="3"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"/>',
    moon: '<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M3 12h1M12 3v1M20 12h1M12 20v1M5.6 5.6l.7 .7M18.4 5.6l-.7 .7M17.7 17.7l.7 .7M6.3 17.7l-.7 .7"/>',
    up: '<path d="M6 15l6 -6l6 6"/>',
    down: '<path d="M6 9l6 6l6 -6"/>',
    trash: '<path d="M4 7l16 0M10 11l0 6M14 11l0 6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/>',
    edit: '<path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"/><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"/><path d="M16 5l3 3"/>',
    check: '<path d="M5 12l5 5l10 -10"/>',
    plus: '<path d="M12 5l0 14M5 12l14 0"/>',
    back: '<path d="M5 12l14 0M13 18l6 -6M13 6l6 6"/>',
    copy: '<path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666"/><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"/>',
    cal: '<path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"/><path d="M16 3v4M8 3v4M4 11h16"/>'
  };
  P.print = '<path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2"/><path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4"/><path d="M7 15a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2l0 -4"/>';
  P.qr = '<path d="M4 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"/><path d="M14 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"/><path d="M4 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"/><path d="M7 7l0 .01M17 7l0 .01M7 17l0 .01M14 14l3 0M20 14l0 .01M14 14l0 3M14 20l3 0M17 17l3 0M20 17l0 3"/>';
  function ic(n) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + P[n] + '</svg>';
  }

  function $(id) { return document.getElementById(id); }
  var el = {};
  ['btnBack', 'ttl', 'btnTheme', 'btnSet', 'viewMain', 'viewSet', 'p1', 'p2', 'dDateTxt', 'btnDate', 'dDateIn',
    'dBal', 'dPlace', 'dTasks', 'iAmt', 'iReason', 'btnAdd', 'btnCancelEdit', 'items', 'tot', 'btnSaveDay',
    'cards', 'btnCopy', 'impCode', 'btnImport', 'toast', 'btnPrintSel', 'btnQr', 'qrBox', 'qrCv', 'qrMsg', 'btnScan', 'scanner', 'scVideo', 'btnScClose', 'printArea', 'viewGate', 'app', 'btnGate', 'gateWork', 'gatePers', 'lblPlace', 'tasksBox', 'impCards', 'btnImpCards'].forEach(function (id) { el[id] = $(id); });
  ['expPrev', 'expCnt', 'tabExpTtl', 'tabPrev', 'tabCnt', 'btnCopyTab', 'lblCopyTab', 'btnQrTab', 'tqrBox', 'tqrCv', 'tqrMsg', 'impTab', 'btnImpTab', 'btnScanTab'].forEach(function (id) { el[id] = $(id); });

  function p2(n) { return n < 10 ? '0' + n : '' + n; }
  function todayStr() { var d = new Date(); return d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()); }
  function parseD(s) { var a = String(s).split('-'); return new Date(+a[0], +a[1] - 1, +a[2]); }
  function fmtDate(s) { var d = parseD(s); return p2(d.getDate()) + '/' + p2(d.getMonth() + 1) + '/' + d.getFullYear(); }
  function dayName(s) { return DAYS[parseD(s).getDay()]; }
  function num(v) { var n = parseFloat(String(v).replace(',', '.')); return isFinite(n) ? n : 0; }
  function fmt(n) { return String(Math.round(n * 100) / 100); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function totalOf(items) { var s = 0; for (var i = 0; i < items.length; i++) s += num(items[i].amt); return s; }
  function hasVal(v) { return v !== '' && v !== null && v !== undefined && isFinite(parseFloat(v)); }

  var state = { days: [], draft: null };
  var ui = { tab: 1, open: null, edit: null, editingIdx: -1, selMode: false, sel: {} };
  var sec = 'work';

  function newDraft() { return { date: todayStr(), balance: '', place: '', tasks: '', items: [] }; }
  function draftBlank(d) { return d.balance === '' && !d.place && !d.tasks && !d.items.length; }

  function secKey(n) { return n === 'personal' ? KEY_P : KEY; }
  function readSec(n) {
    var r = { days: [], draft: newDraft() };
    try {
      var raw = localStorage.getItem(secKey(n));
      if (raw) {
        var o = JSON.parse(raw);
        if (o && Array.isArray(o.days)) r.days = o.days;
        if (o && o.draft && Array.isArray(o.draft.items)) r.draft = o.draft;
      }
    } catch (e) { }
    if (!r.draft.date) r.draft.date = todayStr();
    return r;
  }
  function writeSec(n, o) { try { localStorage.setItem(secKey(n), JSON.stringify({ days: o.days, draft: o.draft })); } catch (e) { } }
  function load() { var r = readSec(sec); state.days = r.days; state.draft = r.draft; refreshDateIfBlank(); }
  function save() { writeSec(sec, state); }

  function refreshDateIfBlank() {
    if (draftBlank(state.draft) && state.draft.date !== todayStr()) {
      state.draft.date = todayStr();
      save();
      return true;
    }
    return false;
  }

  var toastT;
  function toast(msg) {
    el.toast.textContent = msg;
    el.toast.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(function () { el.toast.classList.remove('show'); }, 2200);
  }

  function sorted() {
    return state.days.slice().sort(function (a, b) {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return (b.id || 0) - (a.id || 0);
    });
  }

  /* ---------- theme ---------- */
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    el.btnTheme.innerHTML = ic(t === 'dark' ? 'sun' : 'moon');
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', t === 'dark' ? '#0e1621' : '#eef3f8');
    try { localStorage.setItem(THEME_KEY, t); } catch (e) { }
  }
  function initTheme() {
    var t = 'dark';
    try { t = localStorage.getItem(THEME_KEY) || 'dark'; } catch (e) { }
    applyTheme(t === 'light' ? 'light' : 'dark');
  }

  /* ---------- tab 1 ---------- */
  function fillDraftFields() {
    var d = state.draft;
    el.dDateTxt.textContent = dayName(d.date) + ' - ' + fmtDate(d.date);
    el.dDateIn.value = d.date;
    el.dBal.value = d.balance;
    el.dPlace.value = d.place;
    el.dTasks.value = d.tasks;
  }

  function renderItems() {
    var d = state.draft, h = '';
    if (!d.items.length) {
      h = '<div class="empty">ما فيش مصاريف لسه. اكتب أول مبلغ فوق واضغط حفظ.</div>';
    } else {
      h += '<div class="rw t"><span>م</span><span>المبلغ</span><span>سبب الصرف</span><span></span></div>';
      d.items.forEach(function (it, i) {
        h += '<div class="rw' + (ui.editingIdx === i ? ' ed' : '') + '">' +
          '<span class="n">' + (i + 1) + '</span>' +
          '<span class="a">' + esc(fmt(num(it.amt))) + '</span>' +
          '<span>' + esc(it.reason) + '</span>' +
          '<span class="acts2">' +
          '<button class="ib sm" data-act="ei" data-i="' + i + '" aria-label="تعديل البند">' + ic('edit') + '</button>' +
          '<button class="ib sm" data-act="di" data-i="' + i + '" aria-label="حذف البند">' + ic('trash') + '</button>' +
          '</span></div>';
      });
    }
    el.items.innerHTML = h;
    el.tot.innerHTML = totalsHtml(d.items, d.balance);
  }

  function totalsHtml(items, balance) {
    var t = totalOf(items);
    var h = '<div class="tot"><span>إجمالي المصاريف</span><span>' + esc(fmt(t)) + '</span></div>';
    if (hasVal(balance)) {
      var r = num(balance) - t;
      h += '<div class="rem' + (r < 0 ? ' neg' : '') + '"><span>المتبقي من الرصيد</span><span>' + esc(fmt(r)) + '</span></div>';
    }
    return h;
  }

  function setAddBtn() {
    var editing = ui.editingIdx >= 0;
    el.btnAdd.innerHTML = ic(editing ? 'check' : 'plus') + (editing ? 'تحديث البند' : 'حفظ');
    el.btnCancelEdit.hidden = !editing;
  }

  function addItem() {
    var a = el.iAmt.value.trim(), r = el.iReason.value.trim();
    if (!hasVal(a)) { toast('اكتب المبلغ الأول'); el.iAmt.focus(); return; }
    var it = { amt: num(a), reason: r };
    if (ui.editingIdx >= 0) { state.draft.items[ui.editingIdx] = it; ui.editingIdx = -1; }
    else state.draft.items.push(it);
    el.iAmt.value = '';
    el.iReason.value = '';
    save(); renderItems(); setAddBtn();
    el.iAmt.focus();
  }

  function cancelItemEdit() {
    ui.editingIdx = -1;
    el.iAmt.value = '';
    el.iReason.value = '';
    renderItems(); setAddBtn();
  }

  el.items.addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]');
    if (!b) return;
    var i = +b.getAttribute('data-i');
    if (b.getAttribute('data-act') === 'di') {
      if (!confirm('حذف البند رقم ' + (i + 1) + '؟')) return;
      state.draft.items.splice(i, 1);
      if (ui.editingIdx === i) { ui.editingIdx = -1; el.iAmt.value = ''; el.iReason.value = ''; }
      else if (ui.editingIdx > i) ui.editingIdx--;
      save(); renderItems(); setAddBtn();
    } else if (b.getAttribute('data-act') === 'ei') {
      var it = state.draft.items[i];
      ui.editingIdx = i;
      el.iAmt.value = it.amt;
      el.iReason.value = it.reason;
      renderItems(); setAddBtn();
      el.iAmt.focus();
      el.iAmt.scrollIntoView({ block: 'center' });
    }
  });

  function saveDay() {
    var d = state.draft;
    if (ui.editingIdx < 0 && hasVal(el.iAmt.value)) {
      if (!confirm('فيه مبلغ مكتوب ولسه ما اتحفظش كبند. تكمل حفظ اليوم من غيره؟')) return;
    }
    if (!d.items.length && !d.place.trim() && !d.tasks.trim() && d.balance === '') {
      toast('ما فيش بيانات تتحفظ'); return;
    }
    var dup = state.days.some(function (x) { return x.date === d.date; });
    if (dup && !confirm('فيه كارت محفوظ بنفس التاريخ (' + fmtDate(d.date) + '). تحفظ برضه؟')) return;
    state.days.push({
      id: Date.now(), date: d.date, balance: d.balance,
      place: d.place.trim(), tasks: sec === 'work' ? d.tasks.trim() : '',
      items: d.items.map(function (i) { return { amt: num(i.amt), reason: i.reason }; })
    });
    state.draft = newDraft();
    ui.editingIdx = -1;
    el.iAmt.value = ''; el.iReason.value = '';
    save(); fillDraftFields(); renderItems(); setAddBtn(); renderCards();
    window.scrollTo(0, 0);
    toast('تم حفظ اليوم في المحفوظ');
  }

  el.dBal.addEventListener('input', function () { state.draft.balance = el.dBal.value.trim(); save(); el.tot.innerHTML = totalsHtml(state.draft.items, state.draft.balance); });
  el.dPlace.addEventListener('input', function () { state.draft.place = el.dPlace.value; save(); });
  el.dTasks.addEventListener('input', function () { state.draft.tasks = el.dTasks.value; save(); });
  el.btnDate.addEventListener('click', function () {
    try { el.dDateIn.showPicker(); } catch (e) { el.dDateIn.focus(); el.dDateIn.click(); }
  });
  el.dDateIn.addEventListener('change', function () {
    if (!el.dDateIn.value) return;
    state.draft.date = el.dDateIn.value;
    el.dDateTxt.textContent = dayName(state.draft.date) + ' - ' + fmtDate(state.draft.date);
    save();
  });
  el.btnAdd.addEventListener('click', addItem);
  el.btnCancelEdit.addEventListener('click', cancelItemEdit);
  el.btnSaveDay.addEventListener('click', saveDay);

  function enterTo(from, to) {
    from.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      if (from.tagName === 'TEXTAREA' && e.shiftKey) return;
      e.preventDefault();
      if (typeof to === 'function') to(); else to.focus();
    });
  }
  enterTo(el.dBal, el.dPlace);
  enterTo(el.dPlace, function () { (sec === 'work' ? el.dTasks : el.iAmt).focus(); });
  enterTo(el.dTasks, el.iAmt);
  enterTo(el.iAmt, el.iReason);
  enterTo(el.iReason, addItem);

  /* ---------- tab 2 (cards) ---------- */
  function renderCards() {
    var list = sorted();
    if (!list.length) {
      el.cards.innerHTML = '<div class="card"><div class="empty"><b>ما فيش أيام محفوظة</b>اكتب بيانات يوم في تبويب الإدخال واضغط "حفظ اليوم" هتلاقيه هنا.</div></div>';
      return;
    }
    el.cards.innerHTML = list.map(function (d, i) { return cardHtml(d, i + 1); }).join('') + selBar();
  }

  function cardHtml(d, n) {
    var sm = ui.selMode, on = !!(sm && ui.sel[d.id]), open = ui.open === d.id && !sm;
    var editing = !!(ui.edit && ui.edit.id === d.id);
    var h = '<div class="card vc' + (open ? ' open' : '') + (on ? ' sel' : '') + '" data-id="' + d.id + '">';
    h += '<div class="chead" data-act="' + (sm ? 'pick' : 'toggle') + '">' + (sm ? '<input type="checkbox" tabindex="-1"' + (on ? ' checked' : '') + '>' : '') + '<span class="ctl"><span class="ctitle">' + n + '- ' + esc(dayName(d.date)) + ' ' + fmtDate(d.date) + '</span>' +
      (d.place ? '<span class="cplace">' + esc(d.place) + '</span>' : '') + '</span>' +
      (sm ? '' : '<span class="chev">' + ic(open ? 'up' : 'down') + '</span>') + '</div>';
    if (open) h += '<div class="cbody">' + (editing ? editBody(ui.edit) : viewBody(d)) + '</div>';
    return h + '</div>';
  }

  function itemsViewHtml(items) {
    if (!items.length) return '<div class="empty">ما فيش بنود في اليوم ده.</div>';
    var h = '<div class="rw v t"><span>م</span><span>المبلغ</span><span>سبب الصرف</span></div>';
    items.forEach(function (it, i) {
      h += '<div class="rw v"><span class="n">' + (i + 1) + '</span><span class="a">' + esc(fmt(num(it.amt))) + '</span><span>' + esc(it.reason) + '</span></div>';
    });
    return h;
  }

  function viewBody(d) {
    var h = '';
    if (hasVal(d.balance)) h += '<div class="line"><span>رصيد اليوم</span><span>' + esc(fmt(num(d.balance))) + '</span></div>';
    if (d.tasks && sec === 'work') h += '<div class="tasks"><i>المهام: </i>' + esc(d.tasks) + '</div>';
    h += itemsViewHtml(d.items);
    h += '<div id="ct">' + totalsHtml(d.items, d.balance) + '</div>';
    h += '<div class="cbtns"><div class="row"><button class="btn w" data-act="edit">' + ic('edit') + 'تعديل</button><button class="ib" data-act="print1" aria-label="طباعة الكارت">' + ic('print') + '</button><button class="ib" data-act="copy1" aria-label="نسخ كود الكارت">' + ic('copy') + '</button></div></div>';
    return h;
  }

  function editBody(e) {
    var h = '<div class="grid2"><div><label>التاريخ</label><input type="date" data-f="date" value="' + esc(e.date) + '"></div>' +
      '<div><label>رصيد اليوم</label><input type="number" step="1" inputmode="decimal" data-f="balance" value="' + esc(e.balance) + '"></div></div>';
    h += '<label>' + placeLbl() + '</label><input type="text" data-f="place" value="' + esc(e.place) + '" style="margin-bottom:' + (sec === 'work' ? '8' : '10') + 'px">';
    if (sec === 'work') h += '<label>مهام اليوم</label><textarea rows="2" data-f="tasks" style="margin-bottom:10px">' + esc(e.tasks) + '</textarea>';
    if (e.items.length) h += '<div class="rw t"><span>م</span><span>المبلغ</span><span>سبب الصرف</span><span></span></div>';
    e.items.forEach(function (it, i) {
      h += '<div class="rw"><span class="n">' + (i + 1) + '</span>' +
        '<input type="number" step="1" inputmode="decimal" data-f="ia" data-i="' + i + '" value="' + esc(it.amt) + '">' +
        '<input type="text" data-f="ir" data-i="' + i + '" value="' + esc(it.reason) + '">' +
        '<span class="acts2"><button class="ib sm" data-act="delitem" data-i="' + i + '" aria-label="حذف البند">' + ic('trash') + '</button></span></div>';
    });
    h += '<div class="rw nr"><span class="n">+</span>' +
      '<input type="number" step="1" inputmode="decimal" placeholder="المبلغ" data-f="na" value="' + esc(e.na) + '">' +
      '<input type="text" placeholder="سبب الصرف" data-f="nr" value="' + esc(e.nr) + '">' +
      '<span class="acts2"><button class="ib sm" data-act="additem" aria-label="إضافة بند">' + ic('plus') + '</button></span></div>';
    h += '<div id="ct">' + totalsHtml(e.items, e.balance) + '</div>';
    h += '<div class="cbtns"><div class="row"><button class="btn primary w" data-act="save">' + ic('check') + 'حفظ</button>' +
      '<button class="btn sm" data-act="cancel">إلغاء</button><button class="btn sm dng" data-act="delcard">' + ic('trash') + 'حذف الكارت</button></div></div>';
    return h;
  }

  function findDay(id) { for (var i = 0; i < state.days.length; i++) if (state.days[i].id === id) return state.days[i]; return null; }

  function startEdit(d) {
    ui.edit = {
      id: d.id, date: d.date, balance: d.balance, place: d.place, tasks: d.tasks, na: '', nr: '',
      items: d.items.map(function (i) { return { amt: String(i.amt), reason: i.reason }; })
    };
  }

  function addEditItem(card) {
    var e = ui.edit;
    if (!hasVal(e.na)) { toast('اكتب المبلغ الأول'); focusIn(card, 'na'); return false; }
    e.items.push({ amt: String(num(e.na)), reason: (e.nr || '').trim() });
    e.na = ''; e.nr = '';
    renderCards();
    focusIn(document.querySelector('.vc[data-id="' + e.id + '"]'), 'na');
    return true;
  }

  function focusIn(card, f) {
    if (!card) return;
    var x = card.querySelector('[data-f="' + f + '"]');
    if (x) x.focus();
  }

  function saveEdit() {
    var e = ui.edit, d = findDay(e.id);
    if (!d) { ui.edit = null; renderCards(); return; }
    if (!e.date) { toast('اختار التاريخ'); return; }
    if (hasVal(e.na)) {
      if (!confirm('فيه مبلغ مكتوب ولسه ما اتضافش كبند. تكمل الحفظ من غيره؟')) return;
    }
    d.date = e.date;
    d.balance = (e.balance === null || e.balance === undefined) ? '' : String(e.balance).trim();
    d.place = e.place.trim();
    d.tasks = e.tasks.trim();
    d.items = e.items.map(function (i) { return { amt: num(i.amt), reason: i.reason.trim() }; });
    ui.edit = null;
    save(); renderCards();
    toast('تم حفظ التعديل');
  }

  el.cards.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-act]');
    if (!b) return;
    var card = b.closest('.vc');
    var id = card ? +card.getAttribute('data-id') : 0;
    var act = b.getAttribute('data-act');
    if (act === 'toggle') {
      if (ui.edit && ui.edit.id === id) return;
      ui.open = (ui.open === id) ? null : id;
      renderCards();
    } else if (act === 'edit') {
      if (ui.edit) { toast('خلّص تعديل الكارت المفتوح أو ألغيه الأول'); return; }
      var d = findDay(id);
      if (d) { startEdit(d); renderCards(); }
    } else if (act === 'save') {
      saveEdit();
    } else if (act === 'cancel') {
      ui.edit = null; renderCards();
    } else if (act === 'delcard') {
      if (!confirm('حذف الكارت ده نهائيًا؟')) return;
      state.days = state.days.filter(function (x) { return x.id !== id; });
      ui.edit = null; ui.open = null;
      save(); renderCards();
      toast('تم حذف الكارت');
    } else if (act === 'delitem') {
      var i = +b.getAttribute('data-i');
      if (!confirm('حذف البند رقم ' + (i + 1) + '؟')) return;
      ui.edit.items.splice(i, 1);
      renderCards();
    } else if (act === 'additem') {
      addEditItem(card);
    } else if (act === 'pick') {
      if (ui.sel[id]) delete ui.sel[id]; else ui.sel[id] = true;
      renderCards();
    } else if (act === 'selall') {
      var cnt = Object.keys(ui.sel).length, all = state.days.length;
      ui.sel = {};
      if (cnt < all) state.days.forEach(function (x) { ui.sel[x.id] = true; });
      renderCards();
    } else if (act === 'selcancel') {
      exitSel();
    } else if (act === 'print1') {
      var d1 = findDay(id); if (d1) printDays([d1]);
    } else if (act === 'printsel') {
      var arr = sorted().filter(function (x) { return ui.sel[x.id]; });
      if (arr.length) printDays(arr);
    } else if (act === 'copysel') {
      var arr2 = sorted().filter(function (x) { return ui.sel[x.id]; });
      if (arr2.length) exportCards(arr2);
    } else if (act === 'copy1') {
      var d2 = findDay(id); if (d2) exportCards([d2]);
    }
  });

  el.cards.addEventListener('input', function (ev) {
    var t = ev.target, f = t.getAttribute('data-f');
    if (!f || !ui.edit) return;
    var e = ui.edit, i = +t.getAttribute('data-i');
    if (f === 'ia') e.items[i].amt = t.value;
    else if (f === 'ir') e.items[i].reason = t.value;
    else e[f] = t.value;
    if (f === 'ia' || f === 'balance') {
      var ct = el.cards.querySelector('.vc[data-id="' + e.id + '"] #ct');
      if (ct) ct.innerHTML = totalsHtml(e.items, e.balance);
    }
  });

  el.cards.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Enter') return;
    var t = ev.target, f = t.getAttribute && t.getAttribute('data-f');
    if (!f || !ui.edit) return;
    if (t.tagName === 'TEXTAREA' && ev.shiftKey) return;
    ev.preventDefault();
    var card = t.closest('.vc');
    if (f === 'nr') { addEditItem(card); return; }
    var all = Array.prototype.slice.call(card.querySelectorAll('input[data-f],textarea[data-f]'));
    var k = all.indexOf(t);
    if (k >= 0 && k < all.length - 1) all[k + 1].focus();
  });

  /* ---------- sections + gate ---------- */
  function secTitle() { return sec === 'personal' ? 'مصاريف شخصية' : 'مصاريف العمل'; }
  function secName(x) { return (x || sec) === 'personal' ? 'الشخصي' : 'العمل'; }
  function placeLbl() { return sec === 'personal' ? 'أماكن الشراء' : 'مكان العمل'; }
  function applySection() {
    el.lblPlace.textContent = placeLbl();
    el.dPlace.placeholder = sec === 'personal' ? 'مثال: سوبر ماركت، صيدلية' : 'مثال: محكمة شمال القاهرة';
    el.tasksBox.hidden = sec === 'personal';
    el.ttl.textContent = secTitle();
  }
  function enterSection(n) {
    sec = n;
    ui.open = null; ui.edit = null; ui.editingIdx = -1; ui.selMode = false; ui.sel = {};
    load();
    el.iAmt.value = ''; el.iReason.value = '';
    applySection(); fillDraftFields(); renderItems(); setAddBtn(); renderCards();
    el.viewGate.hidden = true; el.app.hidden = false;
    showSettings(false);
    setTab(1);
  }
  function showGate() {
    stopScan();
    el.app.hidden = true; el.viewGate.hidden = false;
    window.scrollTo(0, 0);
  }

  /* ---------- select mode + printing ---------- */
  function selBar() {
    if (!ui.selMode) return '';
    var n = Object.keys(ui.sel).length;
    return '<div class="selbar"><button class="btn" data-act="selall">تحديد الكل</button>' +
      '<button class="btn primary" data-act="printsel"' + (n ? '' : ' disabled') + '>' + ic('print') + 'طباعة (' + n + ')</button>' +
      '<button class="btn" data-act="copysel"' + (n ? '' : ' disabled') + '>' + ic('copy') + 'نسخ كود</button>' +
      '<button class="btn" data-act="selcancel">إلغاء</button></div>';
  }
  function syncHdr() { el.btnPrintSel.hidden = !el.viewSet.hidden || ui.tab !== 2; }
  function exitSel() { ui.selMode = false; ui.sel = {}; renderCards(); }
  el.btnPrintSel.addEventListener('click', function () {
    if (ui.selMode) { exitSel(); return; }
    if (!state.days.length) { toast('ما فيش كروت للطباعة'); return; }
    if (ui.edit) { toast('خلّص تعديل الكارت أو ألغيه الأول'); return; }
    ui.selMode = true; ui.sel = {}; renderCards();
  });

  function printCard(d) {
    var t = totalOf(d.items);
    var h = '<div class="pcard"><div class="pt"><b>' + esc(dayName(d.date)) + ' ' + fmtDate(d.date) + '</b>' + (d.place ? '<span>' + esc(d.place) + '</span>' : '') + '</div>';
    if (hasVal(d.balance)) h += '<div class="pl"><span>رصيد اليوم:</span> ' + esc(fmt(num(d.balance))) + '</div>';
    if (d.tasks && sec === 'work') h += '<div class="pl"><span>المهام:</span> ' + esc(d.tasks).replace(/\n/g, '<br>') + '</div>';
    if (d.items.length) {
      h += '<table><tr><th>م</th><th>المبلغ</th><th>سبب الصرف</th></tr>';
      d.items.forEach(function (it, i) { h += '<tr><td>' + (i + 1) + '</td><td class="am">' + esc(fmt(num(it.amt))) + '</td><td>' + esc(it.reason) + '</td></tr>'; });
      h += '</table>';
    }
    h += '<div class="pl pt2"><span>إجمالي المصاريف:</span> <b>' + esc(fmt(t)) + '</b>';
    if (hasVal(d.balance)) h += ' &nbsp;&nbsp; <span>المتبقي من الرصيد:</span> <b>' + esc(fmt(num(d.balance) - t)) + '</b>';
    return h + '</div></div>';
  }
  function printDays(list) {
    var now = new Date(), pd = p2(now.getDate()) + '/' + p2(now.getMonth() + 1) + '/' + now.getFullYear(), h = '';
    for (var i = 0; i < list.length; i += 2) {
      h += '<div class="ppage"><div class="phead"><b>' + secTitle() + '</b><span>تاريخ الطباعة: ' + pd + '</span></div>';
      for (var j = i; j < Math.min(i + 2, list.length); j++) h += printCard(list[j]);
      h += '</div>';
    }
    el.printArea.innerHTML = h;
    setTimeout(function () { window.print(); }, 60);
  }

  /* ---------- settings: export / import / QR ---------- */
  function b64e(bytes) { var bin = ''; for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]); return btoa(bin); }
  function b64d(t) { var bin = atob(t), b = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) b[i] = bin.charCodeAt(i); return b; }
  function pipe(stream, data) {
    var w = stream.writable.getWriter(); w.write(data); w.close();
    return new Response(stream.readable).arrayBuffer().then(function (x) { return new Uint8Array(x); });
  }
  function encodeCode(obj, pf) {
    var raw = new TextEncoder().encode(JSON.stringify(obj)), c1 = pf + '1:' + b64e(raw);
    if (typeof CompressionStream === 'undefined') return Promise.resolve(c1);
    return pipe(new CompressionStream('deflate'), raw).then(function (z) {
      var c2 = pf + '2:' + b64e(z); return c2.length < c1.length ? c2 : c1;
    }, function () { return c1; });
  }
  function exportCode() { return encodeCode({ v: 2, work: readSec('work'), personal: readSec('personal') }, 'DX'); }
  function decodeCode(raw) {
    var k = raw.charAt(2), body = raw.slice(4);
    if (k === '1') return JSON.parse(new TextDecoder().decode(b64d(body)));
    if (k === '2' && typeof DecompressionStream !== 'undefined')
      return pipe(new DecompressionStream('deflate'), b64d(body)).then(function (u) { return JSON.parse(new TextDecoder().decode(u)); });
    throw new Error('bad');
  }
  function exportTabCode() { return encodeCode({ v: 1, kind: 'tab', section: sec, data: readSec(sec) }, 'DT'); }
  var codes = { full: '', tab: '' };
  function preview(c) { return c.length <= 24 ? c : c.slice(0, 8) + '......' + c.slice(-7); }
  function cntTxt(c) { return 'عدد الحروف: ' + c.length.toLocaleString('en-US') + ' حرف'; }
  function refreshCode() {
    return Promise.all([exportCode(), exportTabCode()]).then(function (r) {
      codes.full = r[0]; codes.tab = r[1];
      el.expPrev.value = preview(r[0]); el.expCnt.textContent = cntTxt(r[0]);
      el.tabPrev.value = preview(r[1]); el.tabCnt.textContent = cntTxt(r[1]);
      el.tabExpTtl.textContent = 'تصدير ' + secTitle() + ' فقط';
      el.lblCopyTab.textContent = 'نسخ كود ' + secTitle();
      return r[0];
    });
  }

  function showSettings(on) {
    stopScan();
    el.viewMain.hidden = on;
    el.viewSet.hidden = !on;
    el.btnBack.hidden = !on;
    el.btnGate.hidden = on;
    el.btnSet.hidden = on;
    el.ttl.textContent = on ? 'الإعدادات' : secTitle();
    el.qrBox.hidden = true; el.tqrBox.hidden = true;
    syncHdr();
    if (on) { codes.full = ''; codes.tab = ''; el.expPrev.value = ''; el.tabPrev.value = ''; el.expCnt.textContent = ''; el.tabCnt.textContent = ''; el.impCode.value = ''; el.impTab.value = ''; el.impCards.value = ''; refreshCode(); }
    window.scrollTo(0, 0);
  }

  function showQr(which) {
    var tab = which === 'tab';
    var box = tab ? el.tqrBox : el.qrBox, cv = tab ? el.tqrCv : el.qrCv, msg = tab ? el.tqrMsg : el.qrMsg;
    if (!box.hidden) { box.hidden = true; return; }
    refreshCode().then(function () {
      var c = tab ? codes.tab : codes.full;
      box.hidden = false;
      try {
        var q = qrcode(0, 'L'); q.addData(c); q.make();
        var n = q.getModuleCount(), cell = Math.max(3, Math.floor(900 / (n + 8))), sz = (n + 8) * cell;
        cv.width = sz; cv.height = sz;
        var g = cv.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, sz, sz); g.fillStyle = '#000';
        for (var r = 0; r < n; r++) for (var k = 0; k < n; k++) if (q.isDark(r, k)) g.fillRect((k + 4) * cell, (r + 4) * cell, cell, cell);
        cv.hidden = false;
        msg.textContent = tab ? 'اقرأه من جهاز تاني بزر "مسح QR" في خانة استيراد التبويب، أو ببرنامج QR خارجي وانسخ النص.' : 'اقرأه من جهاز تاني بزر "مسح QR"، أو ببرنامج QR خارجي وانسخ النص.';
      } catch (e) {
        cv.hidden = true;
        msg.textContent = 'البيانات أكبر من إن QR واحد يشيلها. استخدم زر النسخ.';
      }
    });
  }

  var scan = { stream: null, timer: null, target: 'full' };
  function stopScan() {
    clearInterval(scan.timer); scan.timer = null;
    if (scan.stream) { scan.stream.getTracks().forEach(function (t) { t.stop(); }); scan.stream = null; }
    el.scVideo.srcObject = null;
    el.scanner.hidden = true;
  }
  function onScanned(t) {
    t = String(t || '').trim();
    var tab = scan.target === 'tab';
    if (!(tab ? /^DT[12]:/ : /^DX[12]:/).test(t.replace(/\s+/g, ''))) { toast(tab ? 'الـ QR ده مش كود تبويب' : 'الـ QR ده مش من التطبيق'); return; }
    if (tab) { el.impTab.value = t; importTab(); }
    else { el.impCode.value = t; importCode(); }
  }
  function startScan(target) {
    scan.target = target === 'tab' ? 'tab' : 'full';
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { toast('الكاميرا مش متاحة في المتصفح ده'); return; }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false }).then(function (st) {
      scan.stream = st;
      el.scanner.hidden = false;
      el.scVideo.srcObject = st;
      var pl = el.scVideo.play(); if (pl && pl.catch) pl.catch(function () { });
      var det = null;
      if ('BarcodeDetector' in window) { try { det = new BarcodeDetector({ formats: ['qr_code'] }); } catch (e) { det = null; } }
      var cv = document.createElement('canvas'), ctx = cv.getContext('2d', { willReadFrequently: true }), busy = false;
      scan.timer = setInterval(function () {
        var v = el.scVideo;
        if (busy || v.readyState < 2 || !v.videoWidth) return;
        busy = true;
        var done = function (t) { busy = false; if (t) { stopScan(); onScanned(t); } };
        var viaJs = function () {
          if (!window.jsQR) return null;
          cv.width = v.videoWidth; cv.height = v.videoHeight;
          ctx.drawImage(v, 0, 0, cv.width, cv.height);
          var id = ctx.getImageData(0, 0, cv.width, cv.height), c = jsQR(id.data, cv.width, cv.height, { inversionAttempts: 'dontInvert' });
          return c ? c.data : null;
        };
        if (det) {
          det.detect(v).then(function (r) { done(r && r.length ? r[0].rawValue : null); }, function () { det = null; done(null); });
        } else {
          try { done(viaJs()); } catch (e) { done(null); }
        }
      }, 300);
    }, function () { toast('لازم تسمح بالوصول للكاميرا'); });
  }

  function cleanDays(arr) {
    var out = [];
    for (var i = 0; i < arr.length; i++) {
      var x = arr[i];
      if (!x || !/^\d{4}-\d{2}-\d{2}$/.test(String(x.date)) || !Array.isArray(x.items)) return null;
      out.push({
        id: x.id || (Date.now() + i), date: x.date,
        balance: (x.balance === null || x.balance === undefined) ? '' : String(x.balance),
        place: String(x.place || ''), tasks: String(x.tasks || ''),
        items: x.items.map(function (it) { return { amt: num(it.amt), reason: String(it.reason || '') }; })
      });
    }
    return out;
  }
  function cleanDraft(dr) {
    return (dr && Array.isArray(dr.items) && /^\d{4}-\d{2}-\d{2}$/.test(String(dr.date))) ? {
      date: dr.date, balance: dr.balance === undefined || dr.balance === null ? '' : String(dr.balance),
      place: String(dr.place || ''), tasks: String(dr.tasks || ''),
      items: dr.items.map(function (it) { return { amt: num(it.amt), reason: String(it.reason || '') }; })
    } : newDraft();
  }
  function secFrom(x) {
    if (!x || !Array.isArray(x.days)) return null;
    var d = cleanDays(x.days);
    return d ? { days: d, draft: cleanDraft(x.draft) } : null;
  }

  function applyImport(o) {
    var w = null, p = null, msg;
    if (o && o.v === 2 && o.work && o.personal) {
      w = secFrom(o.work); p = secFrom(o.personal);
      if (!w || !p) { toast('الكود فيه بيانات تالفة'); return; }
      msg = 'هيتم استبدال كل بيانات القسمين: العمل (' + w.days.length + ' كارت) والشخصي (' + p.days.length + ' كارت). تكمل؟';
    } else if (o && o.v === 1 && Array.isArray(o.days)) {
      w = secFrom(o);
      if (!w) { toast('الكود فيه بيانات تالفة'); return; }
      msg = 'ده كود قديم لقسم العمل. هيتم استبدال كروت العمل (' + w.days.length + ' كارت) وقسم الشخصي مش هيتغير. تكمل؟';
    } else { toast('الكود ده مش صحيح'); return; }
    if (!confirm(msg)) return;
    if (w) writeSec('work', w);
    if (p) writeSec('personal', p);
    ui.open = null; ui.edit = null; ui.editingIdx = -1; ui.selMode = false; ui.sel = {};
    load();
    el.iAmt.value = ''; el.iReason.value = '';
    fillDraftFields(); renderItems(); setAddBtn(); renderCards();
    el.impCode.value = '';
    el.qrBox.hidden = true; el.tqrBox.hidden = true;
    refreshCode();
    toast('تم الاستيراد');
  }

  function importCode() {
    var raw = el.impCode.value.replace(/\s+/g, '');
    if (!raw) { toast('الصق الكود الأول'); return; }
    if (/^DC[12]:/.test(raw)) { toast('ده كود كروت فردية. استخدم خانة استيراد الكروت الفردية'); return; }
    if (/^DT[12]:/.test(raw)) { toast('ده كود تبويب. استخدم خانة استيراد التبويب'); return; }
    if (!/^DX[12]:/.test(raw)) { toast('الكود ده مش صحيح'); return; }
    Promise.resolve().then(function () { return decodeCode(raw); }).then(applyImport, function () { toast('الكود ده مش صحيح أو ناقص'); });
  }

  function cardsObj(list) {
    return {
      v: 1, kind: 'cards', section: sec,
      cards: list.map(function (d) { return { id: d.id, date: d.date, balance: d.balance, place: d.place, tasks: d.tasks, items: d.items }; })
    };
  }
  function exportCards(list) {
    encodeCode(cardsObj(list), 'DC').then(function (c) {
      copyText(c, list.length > 1 ? 'تم نسخ كود ' + list.length + ' كروت' : 'تم نسخ كود الكارت');
    });
  }

  function applyCards(o) {
    if (!o || o.kind !== 'cards' || !Array.isArray(o.cards) || !o.cards.length) { toast('الكود ده مش صحيح'); return; }
    var list = cleanDays(o.cards);
    if (!list) { toast('الكود فيه بيانات تالفة'); return; }
    var dup = list.filter(function (c) { return findDay(c.id); }).length;
    var sameDate = list.filter(function (c) { return !findDay(c.id) && state.days.some(function (x) { return x.date === c.date; }); }).length;
    var msg = 'هتضيف ' + list.length + ' كارت على كروت ' + secName() + ':\n' +
      list.slice(0, 3).map(function (c) { return '- ' + dayName(c.date) + ' ' + fmtDate(c.date) + (c.place ? ' (' + c.place + ')' : ''); }).join('\n') +
      (list.length > 3 ? '\n...' : '');
    if (o.section && o.section !== sec) msg += '\n\nالكروت دي من قسم ' + secName(o.section) + '.';
    if (sameDate) msg += '\n\nفيه ' + sameDate + ' منهم بنفس تاريخ كروت عندك وهيتضافوا برضه.';
    if (!confirm(msg + '\n\nتكمل؟')) return;
    var replace = dup > 0 && confirm(dup + ' كارت موجود عندك بالفعل. موافق = استبدالهم بالجديد، إلغاء = تجاهلهم.');
    var added = 0, rep = 0;
    list.forEach(function (c) {
      var ex = findDay(c.id);
      if (ex) { if (replace) { state.days[state.days.indexOf(ex)] = c; rep++; } }
      else { state.days.push(c); added++; }
    });
    save(); renderCards();
    el.impCards.value = '';
    refreshCode();
    toast('اتضاف ' + added + (rep ? ' واتستبدل ' + rep : '') + ' كارت');
  }

  function importCards() {
    var raw = el.impCards.value.replace(/\s+/g, '');
    if (!raw) { toast('الصق الكود الأول'); return; }
    if (/^DX[12]:/.test(raw)) { toast('ده كود نسخة احتياطية كاملة. استخدم خانة الاستيراد العام'); return; }
    if (/^DT[12]:/.test(raw)) { toast('ده كود تبويب. استخدم خانة استيراد التبويب'); return; }
    if (!/^DC[12]:/.test(raw)) { toast('الكود ده مش صحيح'); return; }
    Promise.resolve().then(function () { return decodeCode(raw); }).then(applyCards, function () { toast('الكود ده مش صحيح أو ناقص'); });
  }

  function applyTab(o) {
    if (!o || o.kind !== 'tab' || (o.section !== 'work' && o.section !== 'personal')) { toast('الكود ده مش صحيح'); return; }
    var s = secFrom(o.data);
    if (!s) { toast('الكود فيه بيانات تالفة'); return; }
    var nm = secName(o.section);
    if (!confirm('هيتم استبدال قسم ' + nm + ' بالكامل (' + s.days.length + ' كارت) والمسودة الحالية فيه. القسم التاني مش هيتغير. تكمل؟')) return;
    writeSec(o.section, s);
    ui.open = null; ui.edit = null; ui.editingIdx = -1; ui.selMode = false; ui.sel = {};
    load();
    el.iAmt.value = ''; el.iReason.value = '';
    fillDraftFields(); renderItems(); setAddBtn(); renderCards();
    el.impTab.value = '';
    el.qrBox.hidden = true; el.tqrBox.hidden = true;
    refreshCode();
    toast('تم استيراد قسم ' + nm);
  }

  function importTab() {
    var raw = el.impTab.value.replace(/\s+/g, '');
    if (!raw) { toast('الصق الكود الأول'); return; }
    if (/^DX[12]:/.test(raw)) { toast('ده كود نسخة كاملة. استخدم خانة الاستيراد العام'); return; }
    if (/^DC[12]:/.test(raw)) { toast('ده كود كروت فردية. استخدم خانة استيراد الكروت الفردية'); return; }
    if (!/^DT[12]:/.test(raw)) { toast('الكود ده مش صحيح'); return; }
    Promise.resolve().then(function () { return decodeCode(raw); }).then(applyTab, function () { toast('الكود ده مش صحيح أو ناقص'); });
  }

  function copyText(t, ok) {
    function fb() {
      var ta = document.createElement('textarea');
      ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.focus(); ta.select();
      var r = false;
      try { r = document.execCommand('copy'); } catch (e) { }
      document.body.removeChild(ta);
      toast(r ? ok : 'تعذّر النسخ');
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(function () { toast(ok); }, fb);
    else fb();
  }
  function copyCode(which) {
    var c = which === 'tab' ? codes.tab : codes.full;
    if (!c) { toast('استنى لحظة وحاول تاني'); return; }
    copyText(c, which === 'tab' ? 'تم نسخ كود ' + secTitle() : 'تم نسخ الكود العام');
  }

  el.btnSet.addEventListener('click', function () { showSettings(true); });
  el.btnBack.addEventListener('click', function () { showSettings(false); });
  el.btnCopy.addEventListener('click', function () { copyCode('full'); });
  el.btnQr.addEventListener('click', function () { showQr('full'); });
  el.btnCopyTab.addEventListener('click', function () { copyCode('tab'); });
  el.btnQrTab.addEventListener('click', function () { showQr('tab'); });
  el.btnImport.addEventListener('click', importCode);
  el.btnScan.addEventListener('click', function () { startScan('full'); });
  el.btnImpTab.addEventListener('click', importTab);
  el.btnScanTab.addEventListener('click', function () { startScan('tab'); });
  el.btnScClose.addEventListener('click', stopScan);
  el.btnImpCards.addEventListener('click', importCards);
  el.btnGate.addEventListener('click', showGate);
  el.gateWork.addEventListener('click', function () { enterSection('work'); });
  el.gatePers.addEventListener('click', function () { enterSection('personal'); });
  el.btnTheme.addEventListener('click', function () {
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
  document.addEventListener('wheel', function (e) {
    var t = e.target; if (t && t.type === 'number' && document.activeElement === t) t.blur();
  }, { passive: true });

  /* ---------- tabs ---------- */
  function setTab(n) {
    ui.tab = n;
    el.p1.hidden = n !== 1;
    el.p2.hidden = n !== 2;
    if (n !== 2 && ui.selMode) { ui.selMode = false; ui.sel = {}; renderCards(); }
    syncHdr();
    var tabs = document.querySelectorAll('.tab');
    for (var i = 0; i < tabs.length; i++) tabs[i].classList.toggle('on', +tabs[i].getAttribute('data-tab') === n);
    window.scrollTo(0, 0);
  }
  document.querySelector('.tabs').addEventListener('click', function (e) {
    var b = e.target.closest('.tab');
    if (b) setTab(+b.getAttribute('data-tab'));
  });

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && refreshDateIfBlank()) fillDraftFields();
  });

  /* ---------- init ---------- */
  el.btnBack.innerHTML = ic('back');
  el.btnGate.innerHTML = ic('back');
  el.btnSet.innerHTML = ic('gear');
  el.btnDate.innerHTML = ic('cal');
  el.btnPrintSel.innerHTML = ic('print');
  var icEls = document.querySelectorAll('[data-ic]');
  for (var q = 0; q < icEls.length; q++) icEls[q].insertAdjacentHTML('afterbegin', ic(icEls[q].getAttribute('data-ic')));
  initTheme();
  load();
  fillDraftFields();
  renderItems();
  setAddBtn();
  renderCards();
  syncHdr();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () { }); });
  }
})();
