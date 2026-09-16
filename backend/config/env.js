import "dotenv/config";
function getEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Variável de ambiente ${name} não definida`);
    }
    return value;
}
export const env = {
    port: Number(getEnv("PORT")),
    dbHost: getEnv("DB_HOST"),
    dbPort: Number(getEnv("DB_PORT")),
    dbUser: getEnv("DB_USER"),
    dbPassword: getEnv("DB_PASSWORD"),
    dbName: getEnv("DB_NAME"),
    jwtSecret: getEnv("JWT_SECRET"),
};
//# sourceMappingURL=env.js.map