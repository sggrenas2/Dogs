import {Request, Response, Router} from 'express';
import { Dog } from '../models/Dog';

const router = Router();

router.get('/', async (req:Request, res:Response) => {
    let dogs: Object = await Dog.findAll();
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