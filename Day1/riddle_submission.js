var butt = document.querySelector("#button1");
var finished = false;
var qno = 2;
var exist = false;
var mydiv = document.querySelector(".search-box");
var atag = document.createElement("a");
var password = "hi";
atag.setAttribute("href", "./ip.html");
atag.setAttribute("style", "margin-right: 100px;");
atag.innerHTML = "proceed to question 3";
butt.onclick = function() {
    var submission = document
        .querySelector("#answer_submission")
        .value.toLowerCase();

    console.log("hi");
    ansDb = firebase.database().ref("answers");
    var correctAns = "hello";
    ansDb.on("value", function(snapshot) {
        correctAns = snapshot.val()[qno];
        // console.log(correctAns);
        finished = true;
        if (finished) {
            if (user) {
                console.log("hi");
                // var date = newdate();
                // console.log("ubmission" + submission);
                // console.log("correct ans =" + correctAns);

                var decrypted = CryptoJS.AES.decrypt(correctAns, password);
                if (submission === decrypted.toString(CryptoJS.enc.Utf8)) {
                    alert("Correct");
                    var data = {
                        uid: user.uid,
                        time: new Date().getTime(),
                        status: true,
                        name: user.displayName,
                        questionNumber: qno
                    };
                    var ok = 0;
                    var questions = [];
                    var usr;
                    var itemsProcessed = 0;
                    db = firebase.database().ref("responses");
                    var flag = 0;
                    // db.orderByChild("questionNumber")
                    //     .equalTo(2)
                    //     .once("value", function(e) {
                    //         if (e.exists()) {
                    //             alert("no resubmissions");
                    //         }
                    //         console.log("val" + e.val());
                    //         console.log(e.key);
                    //         // if (e.key) {
                    //         //     console.log("no resubmissions");
                    //         // } else {
                    //         //     db.push(data);
                    //         // }
                    //         if (e.val() === null) {
                    //             db.push(data);
                    //         }
                    //     });

                    db.once("value").then(async snapshot => {
                        await snapshot.forEach(element => {
                            usr = element.val();
                            if (usr.uid === user.uid) {
                                questions.push(usr.questionNumber);
                                // console.log(usr.questionNumber);
                                if (usr.questionNumber === qno) {
                                    console.log("Zyaada smart mat ban");
                                    exist = true;
                                    flag = 1;
                                }
                            }

                            // console.log(element.val().uid);
                            // console.log(element.val().questionNumber);
                            // console.log(element.val().status);
                        });
                        console.log(exist);
                        if (exist === true) {
                            alert("sorry no resubmissions");
                            mydiv.appendChild(atag);
                            butt.setAttribute("style", "display: none");
                        } else if (exist === false) {
                            db.push(data);
                            console.log("here");
                            mydiv.appendChild(atag);
                            butt.setAttribute("style", "display: none");
                        }
                        if (questions.length === 0) {
                            console.log("lol");
                            db.push(data);
                            mydiv.appendChild(atag);
                            butt.setAttribute("style", "display: none");
                        }
                    });
                } else {
                    alert("Wrong answer");
                }
            } else {
                alert("Sign in");
            }
        }
    });
};
