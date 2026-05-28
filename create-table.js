import { sql } from "./db.js";

const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);
`;

sql.query(createTableQuery)
    .then(() => {
        console.log("Tabela 'users' criada ou já existente com sucesso no MySQL");
    })
    .catch((err) => {
        console.error("Erro ao criar a tabela no MySQL:");
        console.error(err.message);
    });