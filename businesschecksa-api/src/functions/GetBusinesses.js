const sql = require('mssql');

module.exports = async function (context, req) {

    try {

        await sql.connect(
            process.env.SqlConnectionString
        );

        const result = await sql.query(`
            SELECT *
            FROM Businesses
        `);

        context.res = {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: result.recordset
        };

    } catch (error) {

        context.log(error);

        context.res = {
            status: 500,
            body: error.message
        };
    }
};