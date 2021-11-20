import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsToMany } from 'sequelize-typescript';
import { Dog } from './Dog';
import { DogTemperament } from './DogTemperament';

@Table
export class Temperament extends Model<Temperament>{

    //* table relation Temperament-Dog many to many 

    @BelongsToMany(() => Dog, () => DogTemperament)
    Dogs!: Array<Dog & {DogTemperament: DogTemperament}>;

    //* table columns
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    name!: String;



}