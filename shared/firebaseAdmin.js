var admin = require("firebase-admin");
var serviceAccount = require("../config/serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://html307-project-ivorychang.firebaseio.com"
});

var settings = {
    timestampInSnapshots: true
};

var db = admin.firestore();
db.settings(settings);

module.exports = {
    admin: admin,
    db: db
};