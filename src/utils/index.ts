interface IObj{
    [index: string]: any;
}

export const removeNullAndUndefinedFromObject = (obj: IObj)=>{
    const newObj: IObj = {}
    for (const key in obj){
        if( 
            (typeof obj[key] !== 'object' && !!obj[key])
            || (typeof obj[key] === 'object' && Object.keys(obj[key]).length)
        ){
            newObj[key] = obj[key]
        }
    }
    return newObj;
}