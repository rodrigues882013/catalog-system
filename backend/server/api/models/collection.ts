import Disc from "./disc";

export default interface Collection {
    id: number
    title: string
    description: string
    discs: Disc[]
}
