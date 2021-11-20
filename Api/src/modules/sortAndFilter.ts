
interface formatDog {
    id: string,
    img: string,
    name: string,
    minHeight: number,
    maxHeight: number,
    minWeight: number,
    maxWeight: number,
    lifeSpan: number,
    temperaments: Array<object>,
}


class SortAndFilter {

    filterByTemp(data:Array<Object>, temperament: String):Array<Object>{
        data = data.filter( (dog:any) => {
            if(dog.temperaments !== undefined){
                if(dog.temperaments.includes(temperament)){
                    return dog;
                }
            }
        })
        return data;
    }

    orderBy( data: Array<Object>, byName: String = 'asc', byWeight: String = 'asc'): Array<Object>{
        let isReverse: String = '';
        if(byName !== 'undefined'){
            data = data.sort( (dogA:any, dogB:any):any => {
                if(dogA.name < dogB.name) return -1;
                if(dogA.name > dogB.name) return 1;
                return 0;
            })
            isReverse = byName;
        }
        if(byWeight !== 'undefined'){
            data = data.sort( (dogA:any, dogB:any) => dogA.maxWeight - dogB.maxWeight);
            isReverse = byWeight;
        }
        data = (isReverse === 'dec') ? data.reverse() : data;
        return data;
    }
}

export default SortAndFilter;