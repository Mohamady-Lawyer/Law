(function () {
  'use strict';

  var KEY = 'dailyExpenses_v1';
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
  function ic(n) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + P[n] + '</svg>';
  }

  function $(id) { return document.getElementById(id); }
  var el = {};
  ['btnBack', 'ttl', 'btnTheme', 'btnSet', 'viewMain', 'viewSet', 'p1', 'p2', 'dDateTxt', 'btnDate', 'dDateIn',
    'dBal', 'dPlace', 'dTasks', 'iAmt', 'iReason', 'btnAdd', 'btnCancelEdit', 'items', 'tot', 'btnSaveDay',
    'cards', 'expCode', 'btnCopy', 'impCode', 'btnImport', 'toast'].forEach(function (id) { el[id] = $(id); });

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
  var ui = { tab: 1, open: null, edit: null, editingIdx: -1 };

  function newDraft() { return { date: todayStr(), balance: '', place: '', tasks: '', items: [] }; }
  function draftBlank(d) { return d.balance === '' && !d.place && !d.tasks && !d.items.length; }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var o = JSON.parse(raw);
        if (o && Array.isArray(o.days)) state.days = o.days;
        if (o && o.draft && typeof o.draft === 'object') state.draft = o.draft;
      }
    } catch (e) { }
    if (!state.draft || !Array.isArray(state.draft.items)) state.draft = newDraft();
    if (!state.draft.date) state.draft.date = todayStr();
    refreshDateIfBlank();
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { } }

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
      place: d.place.trim(), tasks: d.tasks.trim(),
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
  enterTo(el.dPlace, el.dTasks);
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
    el.cards.innerHTML = list.map(function (d, i) { return cardHtml(d, i + 1); }).join('');
  }

  function cardHtml(d, n) {
    var open = ui.open === d.id;
    var editing = !!(ui.edit && ui.edit.id === d.id);
    var h = '<div class="card vc' + (open ? ' open' : '') + '" data-id="' + d.id + '">';
    h += '<div class="chead" data-act="toggle"><span class="ctl"><span class="ctitle">' + n + '- ' + esc(dayName(d.date)) + ' ' + fmtDate(d.date) + '</span>' +
      (d.place ? '<span class="cplace">' + esc(d.place) + '</span>' : '') + '</span>' +
      '<span class="chev">' + ic(open ? 'up' : 'down') + '</span></div>';
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
    if (d.tasks) h += '<div class="tasks"><i>المهام: </i>' + esc(d.tasks) + '</div>';
    h += itemsViewHtml(d.items);
    h += '<div id="ct">' + totalsHtml(d.items, d.balance) + '</div>';
    h += '<div class="cbtns"><button class="btn" data-act="edit">' + ic('edit') + 'تعديل</button></div>';
    return h;
  }

  function editBody(e) {
    var h = '<div class="grid2"><div><label>التاريخ</label><input type="date" data-f="date" value="' + esc(e.date) + '"></div>' +
      '<div><label>رصيد اليوم</label><input type="number" step="1" inputmode="decimal" data-f="balance" value="' + esc(e.balance) + '"></div></div>';
    h += '<label>مكان العمل</label><input type="text" data-f="place" value="' + esc(e.place) + '" style="margin-bottom:8px">';
    h += '<label>مهام اليوم</label><textarea rows="2" data-f="tasks" style="margin-bottom:10px">' + esc(e.tasks) + '</textarea>';
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
    h += '<div class="cbtns"><button class="btn primary" data-act="save">' + ic('check') + 'حفظ</button>' +
      '<div class="two"><button class="btn sm" data-act="cancel">إلغاء</button><button class="btn sm dng" data-act="delcard">' + ic('trash') + 'حذف الكارت</button></div></div>';
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

  /* ---------- settings ---------- */
  function b64e(s) {
    var b = new TextEncoder().encode(s), bin = '';
    for (var i = 0; i < b.length; i++) bin += String.fromCharCode(b[i]);
    return btoa(bin);
  }
  function b64d(t) {
    var bin = atob(t), b = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) b[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(b);
  }
  function exportCode() { return 'DX1:' + b64e(JSON.stringify({ v: 1, days: state.days, draft: state.draft })); }

  function showSettings(on) {
    el.viewMain.hidden = on;
    el.viewSet.hidden = !on;
    el.btnBack.hidden = !on;
    el.btnSet.hidden = on;
    el.ttl.textContent = on ? 'الإعدادات' : 'مصاريف اليوم';
    if (on) { el.expCode.value = exportCode(); el.impCode.value = ''; }
    window.scrollTo(0, 0);
  }

  function importCode() {
    var raw = el.impCode.value.replace(/\s+/g, '');
    if (!raw) { toast('الصق الكود الأول'); return; }
    if (raw.indexOf('DX1:') !== 0) { toast('الكود ده مش صحيح'); return; }
    var o;
    try { o = JSON.parse(b64d(raw.slice(4))); } catch (e) { toast('الكود ده مش صحيح أو ناقص'); return; }
    if (!o || o.v !== 1 || !Array.isArray(o.days)) { toast('الكود ده مش صحيح'); return; }
    var days = [];
    for (var i = 0; i < o.days.length; i++) {
      var x = o.days[i];
      if (!x || !/^\d{4}-\d{2}-\d{2}$/.test(String(x.date)) || !Array.isArray(x.items)) { toast('الكود فيه بيانات تالفة'); return; }
      days.push({
        id: x.id || (Date.now() + i), date: x.date,
        balance: (x.balance === null || x.balance === undefined) ? '' : String(x.balance),
        place: String(x.place || ''), tasks: String(x.tasks || ''),
        items: x.items.map(function (it) { return { amt: num(it.amt), reason: String(it.reason || '') }; })
      });
    }
    if (!confirm('هيتم استبدال كل البيانات الحالية بـ ' + days.length + ' كارت من الكود. تكمل؟')) return;
    state.days = days;
    var dr = o.draft;
    state.draft = (dr && Array.isArray(dr.items) && /^\d{4}-\d{2}-\d{2}$/.test(String(dr.date))) ? {
      date: dr.date, balance: dr.balance === undefined || dr.balance === null ? '' : String(dr.balance),
      place: String(dr.place || ''), tasks: String(dr.tasks || ''),
      items: dr.items.map(function (it) { return { amt: num(it.amt), reason: String(it.reason || '') }; })
    } : newDraft();
    ui.open = null; ui.edit = null; ui.editingIdx = -1;
    save(); fillDraftFields(); renderItems(); setAddBtn(); renderCards();
    el.impCode.value = '';
    el.expCode.value = exportCode();
    toast('تم الاستيراد: ' + days.length + ' كارت');
  }

  function copyCode() {
    var t = el.expCode.value;
    function fallback() {
      el.expCode.focus(); el.expCode.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { }
      toast(ok ? 'تم نسخ الكود' : 'انسخ الكود يدويًا من الخانة');
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).then(function () { toast('تم نسخ الكود'); }, fallback);
    } else fallback();
  }

  el.btnSet.addEventListener('click', function () { showSettings(true); });
  el.btnBack.addEventListener('click', function () { showSettings(false); });
  el.btnCopy.addEventListener('click', copyCode);
  el.btnImport.addEventListener('click', importCode);
  el.btnTheme.addEventListener('click', function () {
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* ---------- tabs ---------- */
  function setTab(n) {
    ui.tab = n;
    el.p1.hidden = n !== 1;
    el.p2.hidden = n !== 2;
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
  el.btnSet.innerHTML = ic('gear');
  el.btnDate.innerHTML = ic('cal');
  var icEls = document.querySelectorAll('[data-ic]');
  for (var q = 0; q < icEls.length; q++) icEls[q].insertAdjacentHTML('afterbegin', ic(icEls[q].getAttribute('data-ic')));
  initTheme();
  load();
  fillDraftFields();
  renderItems();
  setAddBtn();
  renderCards();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () { }); });
  }
})();
