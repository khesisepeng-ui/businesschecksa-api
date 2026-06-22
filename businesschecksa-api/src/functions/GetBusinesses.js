const { app } = require('@azure/functions');
const sql = require('mssql');

app.http('GetBusinesses', {
    methods: ['GET'],
    authLevel: 'anonymous',

    handler: async (request, context) => {

        try {

            await sql.connect(process.env.SqlConnectionString);

            const result = await sql.query(`
                SELECT *
                FROM Businesses
            `);

            return {
                status: 200,
                jsonBody: result.recordset
            };

        } catch (error) {

            context.error(error);

            return {
                status: 500,
                body: error.message
            };
        }
    }
});