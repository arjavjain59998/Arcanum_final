var butt = document.querySelector("#button1");
var finished = false;
var qno = 1;
var exist;
var mydiv = document.querySelector(".search-box");
var atag = document.createElement("a");
var password = "hi";
atag.setAttribute("href", "./riddle_q2.html");
atag.setAttribute("style", "margin-right: 100px;");

atag.innerHTML = "proceed to question 2..";
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
        var decrypted = CryptoJS.AES.decrypt(correctAns, password);
        // console.log();
        finished = true;
        if (finished) {
            if (user) {
                console.log(
                    user.displayName + "signed in. Tujhse nahi hoga, TWSS"
                );
                // var date = newdate();
                // console.log("ubmission" + submission);
                // console.log("correct ans =" + correctAns);
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

                    db.once("value").then(async snapshot => {
                        await snapshot.forEach(element => {
                            usr = element.val();
                            if (usr.uid === user.uid) {
                                questions.push(usr.questionNumber);
                                console.log(usr.questionNumber);
                                if (usr.questionNumber === qno) {
                                    console.log("caught");
                                    exist = true;
                                    flag = 1;
                                } else {
                                    if (flag !== 1) {
                                        console.log("here2");
                                        exist = false;
                                    }
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
