export default interface IOperation <T> {
    findAll(): Promise<T[]>
    create(elem: T): Promise<T>
    findById(id: number): Promise<T>
    update(id: number, elem: T): Promise<T>
    delete(id: number): Promise<void>
}
