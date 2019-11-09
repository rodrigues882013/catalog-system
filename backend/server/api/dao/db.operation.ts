export default interface IOperation <T> {
    findAll(): Promise<T[]>
    create(elem: T): Promise<any>
    findById(id: number): Promise<T>
    update(id: number, elem: T): Promise<any>
    delete(id: number): Promise<any>
}
