export class Transaction {
  constructor(public id: number, public user_id: number, public date: Date, public category_id: string, public amount: number) { }
}
