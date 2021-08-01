import { sequelize } from './src/db';
import app from './src/app';

sequelize.sync({
    force: true,
    logging: false
}).then(
    () => {
        console.log('¬¬ Database Connected');
        app.listen(3001, function(){
            console.log('¬¬ Server Working on port 3001');
        })
    }
).catch((error) => {
    console.log(error);
})




