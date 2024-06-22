import { create } from 'zustand'

type VideoStore = {
    videoIndex: number,
    pageSize: number,
    currentShow: number,
    setVideoIndex: (i: number) => void,
    nextVideo: () => void,
    showMore: () => void,
    setPageSize: (arg0: number) => void,
    reset: () => void,

}
const useVideoStore = create<VideoStore>()((set) => ({
    videoIndex: -1,
    pageSize: 30,
    currentShow: 30,
    setVideoIndex: (i) => set(() => ({ videoIndex: i })),
    nextVideo: () => set((state) => ({ videoIndex: state.videoIndex + 1 })),
    showMore: () => set((state) => ({ currentShow: state.currentShow + state.pageSize })),
    setPageSize: (size) => set(() => ({ pageSize: size })),
    reset: () => set(() => ({
        videoIndex: -1,
        pageSize: 30,
        currentShow: 30
    })),
}))

export { useVideoStore }