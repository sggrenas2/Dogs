import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsToMany } from 'sequelize-typescript';
import { Temperament } from './Temperament';
import { DogTemperament } from './DogTemperament';

@Table
export class Dog extends Model<Dog>{

    //* table relation Temperament-Dog many to many 
    @BelongsToMany(() => Temperament, () => DogTemperament)
    Temperaments!: Array<Temperament & {DogTemperament: DogTemperament}>;

    //* table columns
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    minHeight!: number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    maxHeight!: number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    minWeight!: number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    maxWeight!: number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    lifeSpan!: number;
    
    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null
    })
    img!: string;
    
    @Column(DataType.VIRTUAL)
    get hId(){
        return this.getDataValue('id')+'H';
    }

    @CreatedAt
    @Column
    createdAt!:Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}