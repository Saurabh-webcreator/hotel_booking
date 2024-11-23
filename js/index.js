// // all global variables declirations 
// let alluserinfo = [];
// let regform = document.querySelector(".reg-form");
// let loginform = document.querySelector(".login-form");
// let allinput = regform.querySelectorAll("input");
// let alllogininput = loginform.querySelectorAll("input");
// let regbtn = regform.querySelector("botton");
// let loginbtn = loginform.querySelector("botton");

// // getting data from localstorage 
// if (localStorage.getitem("alluserinfo") != null) {
//     alluserinfo = JSON.parse(localStorage.getItem("alluserinfo"))
// }
// console.log(alluserinfo);

// //registration coding
// regform.onsubmit = (e) => {
//     e.preventDefault()
//     let checkemail = alluserinfo.find((data) => {
//         return data.email[4].value
//     })
//     if (checkemail == undefined) {
//         let data = {};
//         for (let el of allinput) {
//             let key = el.name;
//             data[key] = el.value
//         }
//         regbtn.innertext = "proccessing..."
//         setTimeout(() => {
//             regbtn.innertext = "Resgister"
//             alluserinfo.push(data);
//             localStorage.setItem("alluserinfo", JSON.stringify(alluserinfo))
//             swal("Good Job !", 'Registration Success !', 'success');
//         }, 2000);
//     } else {
//         swal("Failed !", 'Email Already Registered !', 'warning');
//     }
// }

// // login coding

// loginform.onsubmit = (e) => {
//     e.preventDefault();
//     if (alllogininput[0].value != "") {
//         let checkemail = alluserinfo.find((data) => {
//             return data.email == alllogininput[0].value
//         });
//         if (checkemail != undefined) {
//             //match password
//             if (checkemail.password == alllogininput[1].value) {
//                 loginbtn.innertext = "please wait....";
//                 setTimeout(() => {
//                     loginbtn.innertext = "login";
//                 }, 2000)
//             } else {
//                 swal("warning", "wrong password !", 'warning')
//             }
//         } else {
//             swal("warning", "wrong email !", 'warning')
//         }
//     } else {
//         swal("warning", "email is emptyn !", 'warning')
//     }
// }


// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector("#signup form");
    const loginForm = document.querySelector(".login-form");

    // Signup functionality
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get the input values
        const fullName = signupForm.fullname.value.trim();
        const hotelName = signupForm.hotelname.value.trim();
        const totalRooms = signupForm.totalRoom.value.trim();
        const mobile = signupForm.mobile.value.trim();
        const email = signupForm.email.value.trim();
        const password = signupForm.password.value.trim();

        // Retrieve existing users from local storage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if the email already exists
        const userExists = users.some((user) => user.email === email);

        if (userExists) {
            swal("Error", "User already exists!", "error");
        } else {
            // Add new user to the array
            users.push({
                fullName,
                hotelName,
                totalRooms,
                mobile,
                email,
                password,
            });

            // Save updated user list to local storage
            localStorage.setItem("users", JSON.stringify(users));

            swal("Success", "Welcome, new user!", "success");
            signupForm.reset();
        }
    });

    // Login functionality
    // loginForm.addEventListener("submit", (event) => {
    //     event.preventDefault();

    //     // Get the input values
    //     const email = loginForm.querySelector("input[type='email']").value.trim();
    //     const password = loginForm.querySelector("input[type='password']").value.trim();

    //     // Retrieve existing users from local storage
    //     const users = JSON.parse(localStorage.getItem("users")) || [];

    //     // Check if the user exists and password matches
    //     const user = users.find((user) => user.email === email);

    //     if (user) {
    //         if (user.password === password) {
    //             swal("Welcome", `Hello, ${user.fullName}!`, "success").then(() => {
    //                 // setTimeout(() => {
    //                 window.location.href = "dashboard.html"; // Navigate to home.html after 2 seconds
    //                 // }, 2000); // 2000 milliseconds = 2 seconds
    //             });
    //         } else {
    //             swal("Error", "Incorrect password!", "error");
    //         }
    //     } else {
    //         swal("Error", "User does not exist!", "error");
    //     }
    // });


    // Login functionality
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get the input values
        const email = loginForm.querySelector("input[type='email']").value.trim();
        const password = loginForm.querySelector("input[type='password']").value.trim();

        // Retrieve existing users from local storage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if the user exists
        const user = users.find((user) => user.email === email);

        if (user) {
            if (user.password === password) {
                if (email === "admin@gmail.com") {
                    swal("Welcome Admin", "Redirecting to Dashboard...", "success").then(() => {
                        window.location.href = "dashboard.html"; // Redirect admin to dashboard
                    });
                } else {
                    swal("Welcome", `Hello, ${user.fullName}!`, "success").then(() => {
                        window.location.href = "home.html"; // Redirect other users to home
                    });
                }
            } else {
                swal("Error", "Incorrect password!", "error");
            }
        } else {
            swal("Error", "User does not exist!", "error");
        }
    });

});