import { Dog } from "../models/Dog";
import { Temperament } from "../models/Temperament";
import { Op } from "sequelize";
import fetch from 'node-fetch';
import config from './../lib/config';

//definiendo los tipos de datos para el objeto formatDog del metodo formatData
interface formatDog {
    id: string,
    img: string,
    name: string,
    minHeight?: number,
    maxHeight?: number,
    minWeight?: number,
    maxWeight?: number,
    lifeSpan?: number | String,
    temperaments: Array<object>,
}

//definiendo los tipos de datos para el return de pagination()
export interface paginationResult {
    page: Array<Object>,
    pages: number
}

//clase de control de datos
class dataAndPagination {

    private dogsDbList : any | Array<object> = [];
    private dogsApiList : any | Array<object>;

    //metodo que obtiene los datos solicitados
    //name => solicitud de busqueda por nombre 
    //onlyHenry => solo retorna los datos de la db
    //onlyApi => solo devuelve los datos obtenidos de la api
    async getData(name:boolean|string = false, onlyHenry:boolean = false, onlyApi:boolean = false):Promise<Array<object>>{

        try{
            this.dogsApiList = await fetch('https://api.thedogapi.com/v1/breeds',{headers:{'x-api-key':config.API_KEY}});
            this.dogsApiList = await this.dogsApiList.json();
            if(name){
                this.dogsDbList = await Dog.findAll({
                    where: {
                        name: {[Op.iLike]: `%${name}%`}
                    },
                    include: {
                        model: Temperament
                    }
                });
                this.dogsApiList = this.dogsApiList.filter( (dog:any) => dog.name.toLowerCase().includes(String(name).toLowerCase()));
            }else{
                this.dogsDbList = await Dog.findAll({
                    include: {
                        model: Temperament
                    }
                });
                for(let i:number = 0; i < this.dogsDbList.length; i++){
                    this.dogsDbList[i] = this.dogsDbList[i].toJSON();
                }
            }
        }catch(error){
            console.log(error)
        }
        if(onlyHenry){
            return this.dogsDbList;
        }
        if(onlyApi){
            return this.dogsApiList;
        }

        return [...this.dogsDbList, ...this.dogsApiList];
    }

    //Elimina los datos innecesarios homogeneizando todos los datos
    formatData(data:Array<Object>, main:Boolean = false):Array<Object>{
        return data.map( (dog:any):any => {
            let formatDog: formatDog = {
                id: "",
                img: "",
                name: "",
                temperaments: [],
            };
        if(dog.hId){
            formatDog['id'] = dog.hId;
            formatDog['img'] = dog.img;
            formatDog['name'] = dog.name;
            formatDog['temperaments'] = dog.Temperaments.map( (temperament:any) => temperament.name);
            if(!main){
                formatDog['minHeight'] = dog.minHeight;
                formatDog['maxHeight'] = dog.maxHeight;
                formatDog['minWeight'] = dog.minWeight;
                formatDog['maxWeight'] = dog.maxWeight;
                formatDog['lifeSpan'] = dog.lifeSpan + ' years';
            }
        }else{
            let height:Array<String> = dog.height.metric.split(' - ');
            let weight:Array<String> = dog.weight.metric.split(' - ');
            formatDog['id'] = dog.id;
            formatDog['img'] = `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`;
            formatDog['name'] = dog.name;
            formatDog['temperaments'] = dog.temperament?.split(', ');
            if(!main){
                formatDog['minHeight'] = Number(height[0]);
                formatDog['maxHeight'] = Number(height[1]);
                formatDog['minWeight'] = Number(weight[0]);
                formatDog['maxWeight'] = Number(weight[1]);
                formatDog['lifeSpan'] = dog.life_span;
            }
        }
        return formatDog;
        });
    }

    //devuelve los datos separados en "paginas" de 8 datos
    pagination(data:Array<Object>, dataCount:number, pageId:number):paginationResult{
        let pagination: any = [];
        dataCount = (Number.isNaN(dataCount)) ? 8 : dataCount;
        pageId = (Number.isNaN(pageId)) ? 1 : pageId;
        let pages: number = Math.ceil(data.length/dataCount);
        let page: Array<Object> = [];
        let start:number, finish: number;

        for(let i:number = 0; i < pages; i++){
            start = i*dataCount;
            finish = ((start+dataCount)>data.length) ? data.length : start + dataCount;
            page = [];
            for(start; start < finish; start++){
                page.push(data[start]);
            }
            pagination.push(page);
        }
        return {
            page: pagination[pageId-1],
            pages
        };
    }
}

export default dataAndPagination;