
export interface User {
    login: string;
    password: string;
}

export class Record {

    id: number;

    type: string;

    record_date: string;

    text: string;

    record_value: number;

    author: string;

    constructor(id: number, type: string, record_date: string, text: string, record_value: number, author: string) {
        this.id = id;
        this.type = type;
        this.record_date = record_date;
        this.text = text;
        this.author = author;
        this.record_value = record_value;
    }

}

// Класс для работы с сервером
class DataService {
    private static DB_URL = "http://localhost:4000";

    public currentUser: User | null;

    constructor() {
        this.currentUser = null;
    }

    /**
     * Авторизован ли пользователь?
     */
    public isUserAuthorized() {
        return this.currentUser != null;
    }

    /**
     * Авторизация
     * @param userLogin логин
     * @param password пароль
     */
    public async login(userLogin: string, password: string) {
        let userResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/user`);

        let response: Response = await userResponsePromise;

        let jsonPromise: Promise<User[]> = (response).json();

        let users: User[] = await jsonPromise;

        let foundUsers = users.filter(value => {
            return value.login === userLogin;
        });

        if (foundUsers.length === 0) {
            this.currentUser = null;
            return;
        }

        let foundUser = foundUsers[0];

        if (foundUser.password === password) {
            this.currentUser = foundUser;
            return;
        }
        this.currentUser = null;
    }

    /**
     * Получить все Record'ы пользователя
     */
    public async getRecords(type: string): Promise<Record[]> {
        if (this.currentUser == null) {
            return Promise.reject("User is not authorized");
        }

        let RecordResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/record?author=${this.currentUser.login}&type=${type}`);

        let response: Response = await RecordResponsePromise;

        let jsonPromise: Promise<Record[]> = (response).json();

        return await jsonPromise;
    }

    /**
     * Добавить новый Record на сервер
     * @param newRecord новый Record
     */
    public async saveRecord(newRecord: Record): Promise<Record> {
        if (this.currentUser == null) {
            return Promise.reject("User is not authorized");
        }

        delete newRecord.id;
        newRecord.author = this.currentUser.login;

        console.log(newRecord);

        let postPromise = fetch(`${DataService.DB_URL}/record`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newRecord)
        });
        return await (await postPromise).json();
    }

    /**
     * Удалить Record
     * @param id идентификатор record
     * @returns true, если получилось удалить
     */
    public async deleteRecord(id: number): Promise<boolean> {
        if (this.currentUser == null) {
            return Promise.reject("User is not authorized");
        }

        let deletePromise = fetch(`${DataService.DB_URL}/record/${id}`, {
            method: "DELETE"
        });

        return (await deletePromise).ok;
    }

    
    /**
     * Получить totalsum
     */

    public async getTotal(): Promise<number> {
        if (this.currentUser == null) {
            return Promise.reject("User is not authorized");
        }

        let TotalResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/record?author=${this.currentUser.login}`);

        let response: Response = await TotalResponsePromise;

        let jsonlist: Record[] = await(response).json();

        let totalsum: number = jsonlist.reduce((sum: number, elem: Record) => sum + elem.record_value, 0);

        return totalsum;
    }
}

let dataService = new DataService();
export default dataService;