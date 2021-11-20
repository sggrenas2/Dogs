import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { Dog } from './Dog';
import { Temperament } from './Temperament';

@Table
export class DogTemperament extends Model<DogTemperament>{
    
    @ForeignKey(() => Dog)
    @Column
    dogId!: number;

    @ForeignKey(() => Temperament)
    @Column
    temperamentId!: number;
}