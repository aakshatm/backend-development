const express = require('express')
const app = express()
const port = 3000

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]

app.get('/signup', (req, res)=> {
  res.send(`
    <form method="post" action="/signup">
      <input type="text" name="username" placeholder="Username">
      <input type="password" name="password" placeholder="Password">  
      <label for="isAdmin">Are you an admin?</label>
    <input type="checkbox" id="isAdmin" name="isAdmin"><br><br>
      <button type="submit">Sign Up</button>
    </form>
  `);
})

app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const username = req.body.username;
  const password = req.body.password;
  const isadmin = req.body.isAdmin === 'on'; 
  console.log(isadmin);

  // Do something with the username and password (e.g., store in a database)

 


  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
  const userDetail = {username: username, password: password, isAdmin: isadmin};
  USERS.push(userDetail);

  res.status(200).send(`User ${username} signed up successfully.`);
  // return back 200 status code to the client

})


app.get('/login', (req, res)=> {
  res.send(`
    <form method="post" action="/login">
      <input type="text" name="username" placeholder="Username">
      <input type="password" name="password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
  `);
})

app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password


  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same
  


  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client


  const { username, password } = req.body;

  // Check if the user exists in the array
  const user = USERS.find((user) => user.username === username && user.password === password);

  if (user) {
    // User is authenticated
    res.send('Login successful');
  } else {
    // User is not authenticated
    res.status(401).send('Unauthorized - Invalid username or password');
  }
})

app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
  res.json(QUESTIONS);
})

app.get("/questions/:id/submission", function(req, res) {
   // return the users submissions for this problem
   const questionId = parseInt(req.params.id, 10); // Parse the question ID from the URL parameter

  // Filter submissions for the specified question ID
  const questionSubmissions = SUBMISSION.filter((submission) => submission.questionId === questionId);

  if (questionSubmissions.length === 0) {
    res.status(404).json({ error: 'Question not found or has no submissions' });
  } else {
    res.json(questionSubmissions);
  }

  res.send("Hello World from route 4!")
});

app.get('/submission', (req, res) => {
  res.sendFile(__dirname + '/questionSubmissionForm.html'); // Serve the HTML form
});


app.post("/submission", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
  const questionId = parseInt(req.body.questionId, 10);
  const submission = req.body.submission;
   // Store the submission in the SUBMISSION array above
   const subobj = {questionId: questionId, submission: submission};
   SUBMISSION.push(subobj);

   res.json(subobj);
  
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})