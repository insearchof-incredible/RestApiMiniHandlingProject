const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');
const app = express();
const port = 3000;


// Routes

app.get('/api/users', (req, res) => {
  return res.json(users);
});

app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
  </ul>
  `;

  return res.send(html);
});

//Dynamic path parameter

// app.get('/api/users/:id', (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find(user => user.id === id);
//   return res.json(user);
// });


// app.post('/api/users', (req, res) => {
//   return res.json({status : "pending"});
// });

app.use(express.urlencoded({ extended: false })); //Middleware to parse URL-encoded bodies

app.route('/api/users/:id')
  .get((req, res) => {
    const id = Number(req.params.id);
  const user = users.find(user => user.id === id);
  return res.json(user);
}).patch((req, res) => { //Edit user with id
  return res.json({status : "pending"});
 }).put((req, res) => {// update user with id
  return res.json({status : "pending"});
 }).
 delete((req, res) => {// delete user with id
  return res.json({status : "success"});
 });


app.post("/api/users", (req, res) => {

  const body = req.body;
  users.push({...body, id: users.length + 1});
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) =>{
 return res.json({status : "success",id: users.length+1});
  }
  );
}
);











app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
