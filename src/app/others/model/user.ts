import { City } from './city'

export class User {
    public _id: number;
    public username: String;
    public password: String;
    public firstName: String;
    public lastName: String;
    public email: String;
    public role: String;
    public favorites: City[];

    constructor(username, password, firstName, lastName, email) { 
    	this.username = username;
    	this.password = password;
    	this.firstName = firstName;
    	this.lastName = lastName;
    	this.email = email;
        this.role = 'Normal user';
    }
}