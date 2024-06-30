import { create } from 'zustand'
import { VideoInfo } from '@/utils/types'
import { persist } from 'zustand/middleware'
import { getRandomNum, getRandomNumber } from '@/utils/randomUtil'
import { findTitleByIds, findVideoByIndex, getTitleList } from '@/utils/dbUtil'

interface PlayerConfig {
    speed?: number;
    skipIntro?: boolean;
    quality?: string;
    mode?: string;
    orderReverse?: boolean;
}

type VideoStore = {
    config: PlayerConfig,
    setConfig: (conf?: PlayerConfig) => void,
    paused: boolean,
    playlist: VideoInfo[],
    videoIndex: number,
    setPlaylist: (data: VideoInfo[]) => void,
    setVideoIndex: (i: number) => void,
    switchPaused: () => void,
    setPaused: (arg: boolean) => void,
    prevVideo: () => void,
    nextVideo: () => void,
    randomVideo: () => void,
    showlist: boolean,
    showMenu: boolean,
    switchShowlist: () => void,
    switchShowMenu: () => void,
}

const useVideoStore = create<VideoStore>()(persist((set, get) => ({
    config: { speed: 1, skipIntro: false, quality: '480', mode: 'order', orderReverse: false },
    setConfig: (conf) => {
        if (conf?.orderReverse != undefined) {
            set((state) => ({
                playlist: state.playlist.reverse(),
                videoIndex: state.playlist.length - state.videoIndex - 1
            }))
        }
        set(state => ({ config: { ...state.config, ...conf } }))
    },
    paused: true,
    playlist: [],
    videoIndex: -1,
    setPlaylist: (data) => set(() => ({ playlist: data })),
    setVideoIndex: (i) => set(() => ({ videoIndex: i })),
    prevVideo: async () => {
        if (get().playlist.length > 1) {
            set((state) => ({ videoIndex: state.videoIndex - 1 }))
        } else {
            const list = await getTitleList()
            const code = get().playlist[get().videoIndex]?.no === 'A0001' ? 'KC015' : get().playlist[get().videoIndex - 1]?.no
            set({ playlist: findTitleByIds(list, [code]) })
        }
    },
    nextVideo: async () => {
        if (get().playlist.length > 1) {
            set((state) => ({
                videoIndex:
                    state.videoIndex === state.playlist.length - 1 ? 0 : state.videoIndex + 1
            }))
        } else {
            const list = await getTitleList()
            const code = get().playlist[get().videoIndex]?.no === 'KC015' ? 'A0001' : get().playlist[get().videoIndex + 1]?.no
            set({ playlist: findTitleByIds(list, [code]) })
        }
    }
    ,
    randomVideo: async () => {
        if (get().playlist.length > 1) {
            set((state) => ({ videoIndex: getRandomNumber(state.playlist.length - 1) }))
        } else {
            const list = await getTitleList()
            set({ playlist: findVideoByIndex(list, getRandomNum(9206)) })
        }
    },
    switchPaused: () => set((state) => ({ paused: !state.paused })),
    setPaused: (arg) => set({ paused: arg }),
    showlist: true,
    showMenu: true,
    switchShowlist: () => set((state) => ({ showlist: !state.showlist })),
    switchShowMenu: () => set((state) => ({ showMenu: !state.showMenu })),
}),
    { name: 'vplayer-playstat' },
))

type PlayerStore = {
    videoRef: React.RefObject<HTMLVideoElement> | null,
    setVideoRef: (ref: React.MutableRefObject<any>) => void,
    viewlist: VideoInfo[],
    setViewlist: (data: VideoInfo[]) => void,
    currentShow: number,
    setCurrentShow: (index?: number) => void,
}

const usePlayerStore = create<PlayerStore>()((set) => ({
    videoRef: null,
    viewlist: [],
    currentShow: 25,
    setVideoRef: (ref) => set({ videoRef: ref }),
    setViewlist: (data) => set(() => ({ viewlist: data })),
    setCurrentShow: (size) => set((state) => ({ currentShow: size || state.currentShow + 25 })),
}))

export { useVideoStore, usePlayerStore }