process.loadEnvFile();
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index');
const db = require('./models/index');
const app = express();

const setupAndStartServer = async () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    const  PORT  = process.env.PORT;

    app.use('/api', apiRoutes);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    if(process.env.DB_SYNC) {
        db.sequelize.sync({ alter : true })
    }
}

setupAndStartServer();