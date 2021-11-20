import { sequelize } from './src/db';
import app from './src/app';
const initializeModule = require('./init');
const dataInitializer = initializeModule();

sequelize.sync({
    force: true
}).then(
    async () => {
        let { message } = await dataInitializer.loadTemperaments();
        console.log(message);
        message = await dataInitializer.loadDogs();
        console.log(message.message);
        console.log('¬¬ Database Connected');
        app.listen(3001, function(){
            console.log('¬¬ Server Working on port 3001');
        })
    }
).catch((error) => {
    console.log(error);
})




