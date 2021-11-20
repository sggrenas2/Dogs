
const { Temperament } = require('./src/models/Temperament');
const { Dog } = require("./src/models/Dog");
import { Op } from 'sequelize';
const nodeFetch = require('node-fetch');
const { API_KEY } = process.env;



const dataInitialize = ( ():Object => {
    
    let publicFunctions = {
        loadTemperaments(){},
        loadDogs(){},
    };

    publicFunctions.loadTemperaments = async ():Promise<Object> => {
        let temperaments = await nodeFetch('https://api.thedogapi.com/v1/breeds',{
            headers:{
                'x-api-key':API_KEY
            }
        })
        let allTemperaments: String | String[] = "";
        let auxTemperaments: Set<String>;

        temperaments = await temperaments.json();
        
        temperaments.forEach( (dog:any) => allTemperaments += dog.temperament+', ');
        allTemperaments = allTemperaments.split(', ');
        auxTemperaments = new Set(allTemperaments);
        allTemperaments = [...auxTemperaments];
        allTemperaments.forEach( (temperament:String) => Temperament.create({
            name: temperament
        }
        ));

        return {message: `¬¬ ${allTemperaments.length} temperaments loaded succesfully`};
    },
    publicFunctions.loadDogs = async ():Promise<Object> => {
        let dogs : Array<object> | typeof Dog = [{
            name: 'Taquito',
            minHeight: 15,
            maxHeight: 20,
            minWeight: 15,
            maxWeight: 20,
            lifeSpan: 15,
            img: null
        },{
            name: 'Burrito',
            minHeight: 20,
            maxHeight: 25,
            minWeight: 30,
            maxWeight: 45,
            lifeSpan: 15,
            img: null
        },{
            name: 'Quesadilla',
            minHeight: 5,
            maxHeight: 10,
            minWeight: 10,
            maxWeight: 12,
            lifeSpan: 15,
            img: null
        }];
        
        for(let i:number = 0; i < dogs.length; i++){
            dogs[i] = await Dog.create(dogs[i]);
            let temp1:number = Math.trunc(Math.random()*(126-1)+1);
            let temp2:number = Math.trunc(Math.random()*(126-1)+1);
            let temp3:number = Math.trunc(Math.random()*(126-1)+1);
            let dogTemperaments:Array<object> = await Temperament.findAll({
                where: {
                    id: {
                        [Op.or]: [temp1, temp2, temp3],
                    }
                }
            });
            await dogs[i].setTemperaments(dogTemperaments);
        }
        

        return {message: `¬¬ ${dogs.length} dogs charged`};
    }

    return publicFunctions;
})

module.exports = dataInitialize;