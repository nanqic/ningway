const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST',
    'Cache-Control': 'public, max-age=604800'
};

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        if (url.pathname === '/apis/hot') {
            let siteurl = `https://ziguijia.com/search`
            const res = await fetch(siteurl)
            let text = await res.text()
            
            const regx = new RegExp(`<(script|style|footer|button)(.|\n)*?>(.|\n)*?</(script|style|footer|button)>|<!DOC(.|\n)*?<(hr/?)>`)
            text = text.replace(regx, '')

            let pattern = /<a.*?>(.*?)<\/a>/g;
            let match, words = [];
        
            while (match = pattern.exec(text)) {
                words.push(match[1]); // 匹配到的<a>标签内的内容
            }
            return new Response(words, {
                headers: headers
            });
        }
        // Otherwise, serve the static assets.
        // Without this, the Worker will error and no assets will be served.
        return env.ASSETS.fetch(request);
    },
}