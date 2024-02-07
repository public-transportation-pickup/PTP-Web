export const getAllCategories=async ()=>{
    try {
        const res=  await fetch('/api/categories',{
        });
        const data= await res.json();
        console.log("Data: ",data);
        return data;
    } catch (error) {
        console.log("Get all category error: ",error);
    }
}
export const CreateCategory=async (formData)=>{
    try {
        const res=  await fetch('/api/categories',formData,{

        });
        const data= await res.json();
        console.log("Data: ",data);
        return data;
    } catch (error) {
        console.log("Get all category error: ",error);
    }
}