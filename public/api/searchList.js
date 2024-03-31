"use strict";
function formatUnixTime(unixTimestamp) {
    var date = new Date(unixTimestamp * 1000);
    var minutes = date.getUTCMinutes().toString().padStart(2, '0');
    var seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return minutes + ':' + seconds;
}
var sResult = document.querySelector("#sResult");
var keywords = sResult.dataset.keywords;
async function searchDetail(e) { e.innerText = "+ 数据载入中."; var t = e.parentNode.parentNode.dataset.code; let n = "https://proxys.ningway.com/api/q?json=".concat(JSON.stringify({ code: t, keywords: keywords, token: e.dataset.token })); fetch(n).then((function (e) { return e.json() })).then((function (e) { buildDetail(e) })).catch((e => console.error(e))) } function buildDetail(e) { var t = $("dd", $("dl[data-code='".concat(e.code, "']"), sResult)); t.innerHTML = "", t.appendChild(getDetailNodes(e.code, e.lines, !0)), 1 == e.omitted && t.appendChild(be("button", { innerText: "! 匹配内容过多，请优化搜索关键词", className: "omitted" }, { onclick: '$(\'input[type="search"]\', $("#searchBlock")).focus()' })) } function getDetailNodes(e, t, n) { var o = []; return t.forEach((function (r, s) { let a = be("a", { href: "/video/".concat(btoa('=' + e), "?t=").concat(r.s - 3), target: e, rel: "noopener norefferrer" }), i = be("u", { innerText: formatUnixTime(1e3 * r.s) }), d = be("s", { innerHTML: r.t }); o.push(appendChildren(a, [i, d])), n && s != t.length - 1 && r.i != t[s + 1].i - 1 && o.push(be("p", { innerText: "···" })) })), appendChildren(document.createDocumentFragment(), o) } function addDots(e) { var t = setInterval((function () { e ? e.innerText = /\.{6}/.test(e.innerText) ? e.innerText.replace(/\.{6}/, "") : e.innerText + "." : clearInterval(t) }), 750) } 
