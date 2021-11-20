import {Request, Response, Router} from 'express';
import { Dog } from '../models/Dog';
import dataAndPagination from '../modules/dataAndPagination';
import { paginationResult } from '../modules/dataAndPagination';
import  SortAndFilter from '../modules/sortAndFilter';

const router = Router();
var data = new dataAndPagination();
var dataManipulation = new SortAndFilter();

router.get('/', async (req:Request, res:Response) => {
    let dogs: Array<Object> | paginationResult = await data.getData(req.query.name?.toString(), Boolean(req.query?.onlyHenry), Boolean(req.query?.onlyApi) );
    dogs = data.formatData(dogs, Boolean(req.query?.main)); //main se utiliza para saber si se estan solicitando los datos de la pagina principal o de la vista de detalles
    dogs = (req.query.temperament) ? dataManipulation.filterByTemp(dogs, req.query.temperament.toString()) : dogs;
    dogs = (req.query.byName || req.query.byWeight) ? dataManipulation.orderBy(dogs, String(req.query?.byName), String(req.query?.byWeight)) : dogs;
    dogs = data.pagination(dogs, Number(req.query?.dataCount), Number(req.query?.page));
    res.status(200).json(dogs); 
})

router.post('/', async (req:Request, res:Response) => {
    try{
        await Dog.create(req.body.dog)
        res.status(200).json({message: 'Dog created correctly'})
    }catch(error){
        res.status(409).json({message: error});
    }
})

export default router;