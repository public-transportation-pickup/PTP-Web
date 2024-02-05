export const getAllProvince= async ()=>{
    let res;
    try {
        const data= await fetch('https://vapi.vnappmob.com/api/province/');
        res=await data.json();
        console.log("Get all province response",res.results);
    } catch (error) {
        console.log("Error at getAllProvince", error);
    }
    return res.results;
}

export const getDistrictByProvinceId= async ()=>{
    let res;
    try {
        const data= await fetch('https://vapi.vnappmob.com/api/province/district/79');
        res=await data.json();
        console.log("Get district by province Id response",res.results);
    } catch (error) {
        console.log("Error at getAllProvince", error);
    }
    return res.results;
}