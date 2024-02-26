export const searchHead = `<!DOCTYPE html><head><link rel="stylesheet" href="https://static.ziguijia.cn/stylesheets/basics.css?0zk"/><link rel="stylesheet" href="https://static.ziguijia.cn/stylesheets/layout.css?2qw"/><link rel="stylesheet" href="https://static.ziguijia.cn/stylesheets/search-list.css?pk8"/><link rel="stylesheet" href="https://static.ziguijia.cn/stylesheets/search-block.css?pk8"/></head><body><div id="MF"><main id="search-list">`

// 暂不启用，搜索后无 css
export const searchFrom = (keywords?: string) => `<form method="POST" id="search-block" action="https://query.ningway.com/index.php?q=aHR0cHM6Ly96aWd1aWppYS5jb20vc2VhcmNo"><input type="hidden" name="convertGET" value="1"><s id="sInput"><input type="search" name="keywords" placeholder="请输入搜索关键字" value="${keywords}"/><button type="submit">搜索</button></s><s id="sOption"><select class="select-regular" name="cat"><option value="null">全站视频</option><option value="sutraFahua">法华经讲义</option><option value="sutraJingang">金刚经讲义</option><option value="sutraWuliangshou">佛说无量寿经讲义</option><option value="lessonHistory">佛教介绍</option><option value="lessonLearn">学习佛法</option><option value="lessonPractice">佛法修证</option><option value="chatRegular">聊天室</option><option value="chatBairitan">百日谈</option><option value="chatFojiaoshi">佛教史略讲</option></select><select class="select-regular" name="type"><option value="title">标题</option><option value="subtitle" selected="selected">内容</option><option value="code">编号</option></select><select class="select-regular" name="sort"><option value="appears" selected="selected">出现次数优先</option><option value="relevance">内容相关优先</option><option value="dateRelease">近期发布优先</option><option value="dateShoot-">近期拍摄优先</option><option value="dateShoot+">早期拍摄优先</option></select></s></form>`


export const createSrc = (htmlContent: string) => {
    // 创建Blob对象
    const blob = new Blob([htmlContent], { type: "text/html" });
    // 返回下载链接
    return URL.createObjectURL(blob);
}