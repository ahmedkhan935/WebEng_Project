const admin = require('firebase-admin');
var serviceAccount = require("./firebase_key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://cleanslate-fbbb0.appspot.com"
});

var bucket = admin.storage().bucket();

module.exports = bucket;