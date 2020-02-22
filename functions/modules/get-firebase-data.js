
var admin = require("firebase-admin");

var serviceAccount = {
    "type": "service_account",
    "project_id": "jalbat-fae7c",
    "private_key_id": "fae5d4e27de448e9a7b23169930b1eafe5ac341a",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC8OyfBDe15G9YE\nrnUE1yShTDpBeJQ2KRNIAtlR3jd+kFPqLKVXL9gLcH6eLur4fggsQ+/3ia/XrX40\nyTXbcayZm49eN1aliYTUeL0Pe8L2oZ7bEbnFGOTrLkQDQA0JPzIQMJu+iznhpB74\nav9A5YGYiraOweqT1mojWCyjeP3txbpfN+SHGxrzVOae4vy2cutgmrLNxchtLFuP\nUP5dGL1KXUEzCskkBk+ZZwhkLflvEKnwzE1DDvmSxNtKeVjvBOf6qIJRYAWqJoL2\nsqhZVzwE2o2pQajKCoekY8f8mGuS+mTsQnnQV0x8cuOaXRw2BCUGHJGe5dJ1O6o+\nvj88SvPvAgMBAAECggEAG15ajGZzBe33M10OZLLHf7ButABNRIa6Z/kKEi5GUV+4\n4860B7ZMKnWj42oc/h6NH6qNJKffanOuawxqiUrA9uC4etF/Bri1GJOpoau0EFo1\nl9K++RqChnOGrhZNDvAiXlpC+vSRaO6NFj+wd4YnTr+0hZNKgU5mxlbWvroj6cNb\nNKsN2ULB/sG3Kp584Dkook7dljhaIeCJp6HtltE+S/CrwQ8Yog1QbiTxS28Tx+Wt\n5uff8jX0Q7cnSzBM/Az+DxJz6RBMnkCSbpgZnA/URxGbTyJVxblSBO7Bdtu+la/i\naHGikaPWQw/qf/xL5uvG60Q3Bg+0hzySLkw1Wxf7SQKBgQDrfIqWXmdwqWhi8Ibe\n1x0UHdtzteZMd2Zc8UMvSU5Dj8LvORh8/8GAf76IguxF/OfnJCYCdSfUSrTOMYXv\nJNFnGajLJl/OlKNequFDFeCKHZbIxhEK3bKFOF6tkaw5vJsGoc+ZPXEtfD9P1Ceg\nqVgE7rGx54fnuOIexCIkN5k4YwKBgQDMoMvPevlfuTweVgJK4TAnEK74CDZNt/cQ\nNaqW0/19YK9x0a3oEHGNwFkFHzmb1PwJFyBYcxnGKP6/53LpXS6jSqxoD/7ahJ9O\nHv4DcUHeV2dh5USiU9qAXCYHiqwAXd5pfB8jOCnnsA6tDqS1Td6p1Dk+63BwLXNF\nSIW1ii3eBQKBgG/wPqyl6YPbc5x8e5AYL2Fto/DICdZVd5o8sVQcA5EIGIDA4kwh\nAymDD94yZgAK7W2peEv4xtsaPAI79k+sb8ITp3ISJr67V0Fb90J9dsQQtqlvxZAl\nvIOpPRBCy9ySNBsd9eIBG/ikNDBNSB0OAqItmNhZl/floc9AKn6O003DAoGALDmE\nUu8s/jc2ewfzruNEWO0OI6UCt4FO8D3pBHgEjRhcUqkSgNks8Ynks2qwNLGvVvec\nkgEuTNmHVUpcV3tAHSKCaGsslWWcWHHyTCQqLDePrGS0lLCyxJMl1PNvgRTIgNvG\njwIQbHZsdZJ4noaZ3PJ0/Ng9kMEB7LNj0nxutVECgYEAhd2eekyyiSLeT5d5nAdy\nwOPIhqqKU+dp+bYeaEJzei9JOTBwk26SMYtZbJg5mFliyZbfww1mRU8ZtCu7GWof\nlXkU8ixHiAPur6j/m7eK4qwx/Muvvs0hg+5g/YsIZ/49g5Zas6vJudyFOkfcOlG3\nI8Q1vrB1YktwuwCf86OIpi0=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-bq8x3@jalbat-fae7c.iam.gserviceaccount.com",
    "client_id": "110576691806620361029",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bq8x3%40jalbat-fae7c.iam.gserviceaccount.com"
  }

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jalbat-fae7c.firebaseio.com"
});

var db = admin.database();
var ph = db.ref("health_dependencies/pH");
var tur = db.ref("/health_dependencies/turbidity");
var temp = db.ref("/health_dependencies/temp");
var ls = db.ref("/vol_dependencies/ls");
var vol = db.ref("/vol_dependencies/total");

var resData = {
    ph: 0,
    tur: 0,
    temp: 0,
    ls: 0,
    vol: 0
}

var getData = {
    get: function(){
        ph.once("value", function(snapshot) {
            resData.ph = snapshot.val();
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
        
          tur.once("value", function(snapshot) {
        
            resData.tur = snapshot.val();
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
        
          temp.once("value", function(snapshot) {
            resData.temp = snapshot.val();
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
        
          vol.once("value", function(snapshot) {
        
            resData.vol = snapshot.val();
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
        
          ls.once("value", function(snapshot) {
            resData.ls = snapshot.val();
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          })
    },
    data : resData
}

  module.exports = getData;