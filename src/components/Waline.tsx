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
        const defaultOptions: WalineOptions = { serverURL: 'https://line.ningway.com/.netlify/functions/comment/' }

        walineInstanceRef.current = init({
            ...(isEmpty(props) ? defaultOptions : props),
            el: containerRef.current,
        });

        const el = document.querySelector('.wl-power');
        if (el) el.innerHTML = ''

        return () => walineInstanceRef.current?.destroy();
    }, [location.pathname]);

    useEffect(() => {
        walineInstanceRef.current?.update(props);
    }, [props]);

    return <div ref={containerRef} />;
};
