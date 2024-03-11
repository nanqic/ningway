var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?528d4cc2b70515e286655f6b6689a7c0";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})()

// if (!location.hostname.includes('ningway.com')) { location.replace('https://m.ningway.com' + location.pathname) }

document.oncontextmenu = () => false
document.onkeydown = (e) => {
    if (e?.key === 'F12') return false
}