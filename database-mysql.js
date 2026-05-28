import {randomUUID} from "node:crypto";
import {sql} from "./db.js";

export class DatabaseMYSQL {

    async list(search) {
        let users;

        if (search) {
            [users] = await sql.execute(
                'SELECT * FROM users WHERE title LIKE ?'
                [`%${search}%`]
            );
        } else {
            [users] = await sql.execute('SELECT * FROM users');
        }
        return users;
    }
    async create(users) {
        const usersID = randomUUID();
        const {name, email, password} = users;

        await sql.execute(
            'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
            [usersID, name, email, password]
        );
    }
    
    async update (id, users) {
        const { name, email, password} = users;
        await sql.execute(
            'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
            [name, email, password, id]
        );
    }
    async delete (id) {
        await sql.execute ('DELETE FROM users WHERE id = ?', [id]);
        
    }
}