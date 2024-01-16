const mongoose = require('mongoose');

const mongodbConnection = (data) => {
    const {
        db_url,
        db_name,
        env
    } = data;
    if (env !== "production")
        mongoose.set("debug", true);

    return new Promise((resolve, reject) => {
        mongoose.connect(db_url, { dbName: db_name })
            //.connect('mongodb://localhost:27017')
            .then((res) => {
                console.log(
                    "Connected to the Host: " +  mongoose.connection.host + " and Database : " + mongoose.connection.db.databaseName
                );
                resolve(res);
            })
            .catch((err) => {
                console.log("error");
                console.log(err);
                reject(err);
            });
    })

}

module.exports = {
    mongodbConnection
}