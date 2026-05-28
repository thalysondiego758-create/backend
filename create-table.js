import {sql} from "./db.js";


const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR (255) PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    duration INT
);
`;

sql.query(createTableQuery)
    .then(() => {
        console.log("tabela 'users' criada ou ja existente com sucesso no MySQL")
    })
    .catch((err) => {
        console.error("Erro ao criar a tabela no MySQL:");
        console.error(err.message);

    });