"use strict"; var log = gS("wLog") || {}, sResult = $("#sResult"), keywords = sResult.dataset.keywords; for (var ele of $$('a[href*="/j?code="]:not([href*="start"])', main)) visitedMarker(ele, ele.href.slice(-5)); let sLog = gS("sLog") || [], i = sLog.findIndex((e => e.keywords == keywords)); async function searchDetail(e) { e.innerText = "+ 数据载入中."; var t = e.parentNode.parentNode.dataset.code; let n = "https://proxys.ningway.com/api/q?json=".concat(JSON.stringify({ code: t, keywords: keywords, token: e.dataset.token })); fetch(n).then((function (e) { return e.json() })).then((function (e) { buildDetail(e) })).catch((e => console.error(e))) } function buildDetail(e) { var t = $("dd", $("dl[data-code='".concat(e.code, "']"), $("#sResult"))); t.innerHTML = "", t.appendChild(getDetailNodes(e.code, e.lines, !0)), 1 == e.omitted && t.appendChild(be("button", { innerText: "! 匹配内容过多，请优化搜索关键词", className: "omitted" }, { onclick: '$(\'input[type="search"]\', $("#searchBlock")).focus()' })) } function getDetailNodes(e, t, n) { var o = []; return t.forEach((function (r, s) { let a = be("a", { href: "/j?code=".concat(e, "&start=").concat(r.s - 3), target: e, rel: "noopener norefferrer" }), i = be("u", { innerText: moment(1e3 * r.s).utc().format("mm:ss") }), d = be("s", { innerHTML: r.t }); o.push(appendChildren(a, [i, d])), n && s != t.length - 1 && r.i != t[s + 1].i - 1 && o.push(be("p", { innerText: "···" })) })), appendChildren(document.createDocumentFragment(), o) } function addDots(e) { var t = setInterval((function () { e ? e.innerText = /\.{6}/.test(e.innerText) ? e.innerText.replace(/\.{6}/, "") : e.innerText + "." : clearInterval(t) }), 750) } function visitedMarker(e, t) { e.dataset.visited = !!log[t] } -1 != i ? sLog[i].date = Date.now() : sLog.push({ keywords: keywords, date: Date.now() }), sLog = sLog.sort(((e, t) => e.date > t.date ? 1 : -1)).slice(-100), sS("sLog", sLog);
//# sourceMappingURL=../sourceMap/searchList.js.map