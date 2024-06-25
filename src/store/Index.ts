import { create } from 'zustand'
import { VideoInfo } from '@/utils/types'
import { persist } from 'zustand/middleware'
import { getRandomNumber } from '@/utils/randomUtil'

type VideoStore = {
    paused: boolean,
    playlist: VideoInfo[],
    videoIndex: number,
    setPlaylist: (data: VideoInfo[]) => void,
    setVideoIndex: (i: number) => void,
    switchPaused: () => void,
    setPaused: (arg: boolean) => void,
    reverseList: () => void,
    prevVideo: () => void,
    nextVideo: () => void,
    randomVideo: () => void,
    resetStore: () => void,
    showlist: boolean,
    showMenu: boolean,
    switchShowlist: () => void,
    switchShowMenu: () => void,
}

const useVideoStore = create<VideoStore>()(persist((set) => ({
    paused: true,
    playlist: [],
    videoIndex: -1,
    setPlaylist: (data) => set(() => ({ playlist: data })),
    setVideoIndex: (i) => set(() => ({ videoIndex: i })),
    reverseList: () => set((state) => ({
        playlist: state.playlist.reverse(),
        videoIndex: state.playlist.length - state.videoIndex - 1
    })),
    prevVideo: () => set((state) => ({ videoIndex: state.videoIndex - 1 })),
    nextVideo: () => set((state) => ({
        videoIndex:
            state.videoIndex === state.playlist.length - 1 ? 0 : state.videoIndex + 1
    })),
    randomVideo: () => set((state) => ({ videoIndex: getRandomNumber(state.playlist.length - 1) })),
    switchPaused: () => set((state) => ({ paused: !state.paused })),
    setPaused: (arg) => set({ paused: arg }),
    resetStore: () => set(() => ({
        videoIndex: -1,
        pageSize: 30,
        currentShow: 30
    })),
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
    setViewlist: (data:VideoInfo[]) => void,
    currentShow: number,
    showMore: () => void,
    pageSize: number,
    setPageSize: (arg0: number) => void,
}
const usePlayerStore = create<PlayerStore>()((set) => ({
    videoRef: null,
    viewlist: [],
    currentShow: 30,
    setVideoRef: (ref) => set({ videoRef: ref }),
    setViewlist: (data) => set(() => ({ viewlist: data })),
    showMore: () => set((state) => ({ currentShow: state.currentShow + state.pageSize })),
    pageSize: 30,
    setPageSize: (size) => set(() => ({ pageSize: size })),
}))

export { useVideoStore, usePlayerStore }