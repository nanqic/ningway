import React, { useEffect, useRef } from 'react';
import {
    type WalineInstance,
    type WalineInitOptions,
    init,
} from '@waline/client';

import '@waline/client/style';
import { isEmpty } from '@/utils/randomUtil';
import { useLocation } from 'react-router-dom';

export type WalineOptions = Omit<WalineInitOptions, 'el'>;

export default function (props: WalineOptions | any) {
    const walineInstanceRef = useRef<WalineInstance | null>(null);
    const containerRef = React.createRef<HTMLDivElement>();
    const location = useLocation();

    useEffect(() => {
        const defaultOptions: WalineOptions = {
            serverURL: import.meta.env.VITE_WL_SERVER,
            pageview: true,
            copyright: false,
            /**
             * reaction: [
                'https://unpkg.com/@waline/emojis@1.2.0/tieba/tieba_agree.png',
                'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_smile.png',
                'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_yum.png',
                'https://unpkg.com/@waline/emojis@1.2.0/tieba/tieba_sleep.png',
                'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_sob.png',
            ],
            */
            locale: {
                /** 
                reactionTitle: '观后感受',
                reaction0: '赞同',
                reaction1: '满意',
                reaction2: '调皮',
                reaction3: '困意',
                reaction4: '流泪',
                */
                placeholder: "不登录也可以留言。(填写邮箱可在被回复时收到邮件提醒)",
                level0: '布施',
                level1: '持戒',
                level2: '忍辱',
                level3: '精进',
                level4: '禅定',
                level5: '智慧',
                comment: "留言",
                sofa: '请留下触动的话~'
            },
            dark: 'auto',
        }

        walineInstanceRef.current = init({
            ...(isEmpty(props) ? defaultOptions : props),
            el: containerRef.current,
        });

        try {
            const siteEl = document.querySelectorAll('.wl-header-item')[2];
            //@ts-ignore
            siteEl && (siteEl.style.display = 'none')
            const actionsEl = document.querySelectorAll('.wl-action');
            if (actionsEl) {
                //@ts-ignore
                actionsEl[0].style.display = 'none';
                //@ts-ignore
                actionsEl[3].style.display = 'none';
                //@ts-ignore
                actionsEl[4].style.display = 'none';
            }
        } catch (error) {
            console.error(error)
        }

        return () => walineInstanceRef.current?.destroy();
    }, [location.pathname]);

    useEffect(() => {
        walineInstanceRef.current?.update(props);
    }, [props]);

    return <div ref={containerRef} />
};
