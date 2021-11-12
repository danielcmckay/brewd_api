const app = require('./app');
const DEV_PORT = 8000;

app.listen(DEV_PORT, () => {
  console.log(`Server running on port ${DEV_PORT}`);
});
