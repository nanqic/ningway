import React, { useEffect, useState, useRef } from 'react';
import styles from './subtitle-player.module.css';

interface Subtitle {
    index: string;
    startTime: string;
    endTime: string;
    text: string;
}

const VideoFull: React.FC = () => {
    const videoSrc = 'https://stream.ziguijia.com/stream?lng=chs&format=mp4&width=480&code=10570';

    const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
    const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState<number>(-1);
    const [TimeLine, setTimeLine] = useState<boolean>(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        fetch(`/store/10570.srt`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                parseSRT(data);
            });

        const parseSRT = (data: string) => {
            const subtitlesArray: Subtitle[] = [];
            const subtitleLines = data.trim().split(new RegExp('\r?\n\r?\n'));
            subtitleLines.forEach((line) => {
                const parts = line.trim().split(new RegExp('\r?\n'));
                const index = parts[0];
                const time = parts[1].split(' --> ');
                const text = parts.slice(2).join('\n');
                subtitlesArray.push({ index, startTime: time[0], endTime: time[1], text });
            });
            setSubtitles(subtitlesArray);
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        const handleTimeUpdate = () => {
            const currentTime = video?.currentTime;
            if (currentTime) {
                const currentSubtitleIndex = subtitles.findIndex(subtitle =>
                    currentTime >= parseTime(subtitle.startTime) && currentTime <= parseTime(subtitle.endTime)
                );
                if (currentSubtitleIndex !== -1) {
                    setCurrentSubtitleIndex(currentSubtitleIndex);
                    scrollSubtitleToView(currentSubtitleIndex);
                }
            }
        };
        video?.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            video?.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [subtitles]);

    const parseTime = (timeString: string): number => {
        const parts = timeString.split(':');
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        const seconds = parseFloat(parts[2].replace(',', '.'));
        return hours * 3600 + minutes * 60 + seconds;
    };

    const copyTextToClipboard = (text: string): boolean => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textArea);
        return success;
    };

    const scrollSubtitleToView = (index: number) => {
        const subtitleElement = document.getElementById(`subtitle-${index}`);
        const parentElement = subtitleElement && subtitleElement.parentElement;

        if (subtitleElement && parentElement) {
            parentElement.scroll({
                top: subtitleElement.offsetTop - (parentElement.clientHeight - subtitleElement.clientHeight) / 2
            });
        }
    };


    return (
        <div className={styles['subtitle-container']}>
            <div className={styles.item}>
                <video ref={videoRef} width={'100%'} controls>
                    <source src={`${videoSrc}`} type="video/mp4" />
                </video>
            </div>
            {subtitles.length > 0 &&
                <div className={`${styles['subtitle-box']} ${styles.item}`}>
                    <ul onDoubleClick={() => {
                        videoRef.current?.paused ? videoRef.current.play() : videoRef?.current?.pause()
                    }}>
                        <label className={styles['subtitle-switch']}>
                            <input type="checkbox"
                                checked={TimeLine}
                                onChange={() => setTimeLine(value => !value)} />
                            <span> 显示时间</span>
                        </label>
                        {subtitles.map((subtitle, index) => (
                            <li key={index} id={`subtitle-${index}`} className={styles['subtitle-line']}>
                                {TimeLine && <span title='双击复制' className={styles.timeline}
                                    onDoubleClick={(e) => {
                                        e.stopPropagation();
                                        const msgEl = document.querySelector(`.${styles['subtitle-switch']}`);
                                        let ok = copyTextToClipboard(`${window.location.href.split('#t=')[0]}#t=${parseTime(subtitle.startTime)}`);
                                        ok && msgEl?.classList.add(`${styles['show-copied']}`);
                                        setTimeout(() => msgEl?.classList.remove(`${styles['show-copied']}`), 1500)
                                    }}
                                >{subtitle.startTime.split(',')[0]}</span>}
                                <span className={`${styles['subtitle-text']} ${index === currentSubtitleIndex && styles['current-line']}`}
                                    title='双击暂停/播放'
                                    onClick={() => videoRef.current!.currentTime = parseTime(subtitle.startTime)}>
                                    {subtitle.text}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>}
        </div>
    );
};


interface SubtitlePlayerProps {
    src?: string;
}

const SubtitlePlayer: React.FC<SubtitlePlayerProps> = ({ src = '' }) => {
    return (
        <VideoFull />
    );
};

export default SubtitlePlayer;
