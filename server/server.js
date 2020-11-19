const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const dotenv  = require('dotenv');
const routeUrl = require('./routes/routes');
const cors = require('cors');

dotenv.config();


mongoose.connect(process.env.DATABASE_ACCESS, {useNewUrlParser: true, useUnifiedTopology:true})
.then(async ()=> {
    console.log('MonogDB connected...');
})
.catch(error => console.log(error));

app.use(express.json());
app.use(cors());
app.use('/app', routeUrl);
const port = process.env.PORT || 4000;
app.listen(4000, () => console.log(`Server is running on ${port} `));