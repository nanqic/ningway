import excerptList from "@/store/excerpt"


export function getRandomExcerpt(): string {
    const prev_index = localStorage.getItem('excerpt_index')
    const index = Math.trunc(Math.random() * excerptList.length)
    
    if (prev_index == index+''){
       return getRandomExcerpt()
    }
    localStorage.setItem('excerpt_index', index+'')
    return excerptList[index]
}