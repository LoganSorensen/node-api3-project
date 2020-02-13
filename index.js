// code away!
require('dotenv').config();

const server = require('./server.js');

const port = process.env.PORT || 5001;
server.listen(port, () => {
    console.log(`\n* Server running on http://localhost:${port} *\n`)
})