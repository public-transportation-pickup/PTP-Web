import axios from 'axios';
import {BASE_URL} from '../lib/contants/index'
import { CURRENT_USER } from './auth-api';

export const getAllProvince= async ()=>{
    let res;
    try {
        const data= await fetch('https://vapi.vnappmob.com/api/province/');
        res=await data.json();
        //console.log("Get all province response",res.results);
    } catch (error) {
        console.log("Error at getAllProvince", error);
    }
    return res.results;
}

export const getDistrictByProvinceId= async (provinceId)=>{
    let res;
    try {
        const data= await fetch(`https://vapi.vnappmob.com/api/province/district/${provinceId}`);
        res=await data.json();
        //console.log("Get district by province Id response",res.results);
    } catch (error) {
        console.log("Error at getAllProvince", error);
    }
    return res.results;
}
export const getWardByDistrictId= async (districtId)=>{
    let res;
    try {
        const data= await fetch(`https://vapi.vnappmob.com/api/province/ward/${districtId}`);
        res=await data.json();
        //console.log("Get district by province Id response",res.results);
    } catch (error) {
        console.log("Error at getAllProvince", error);
    }
    return res.results;
}


export const getStores=async()=>{
    try {
        const res= await fetch(`${BASE_URL}/stores`);
        const data=await res.json();
        return data;
    } catch (error) {
        console.log("Get all stores error",error);
    }
}

export const getStoreById=async(storeId)=>{
    try {
        const res= await fetch(`/api/store/${storeId}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Get store by id error",error);
    }
}

export const createStore = async (storeModel,file)=>{
    try {
        let formData= new FormData();
        formData.append('Name',storeModel.Name);
        formData.append('Description',storeModel.Description);
        formData.append('PhoneNumber',storeModel.PhoneNumber);
        formData.append('OpenedTime',storeModel.OpenedTime);
        formData.append('ClosedTime',storeModel.ClosedTime);
        formData.append('Latitude',storeModel.Latitude);
        formData.append('Longitude',storeModel.Longitude);
        formData.append('Zone',storeModel.Zone);
        formData.append('Ward',storeModel.Ward);
        formData.append('AddressNo',storeModel.AddressNo);
        formData.append('Street',storeModel.Street);
        formData.append('File',file[0]);
        formData.append('ActivationDate',storeModel.ActivationDate);
        formData.append('StationIds',"81c5dfcd-9b2d-4374-bb2e-d47517997f23");
        // formData.forEach(element => {
        //     console.log("element form data req", element);
        // });
        console.log("FormData req: ",file[0]);
        // console.log("Current user token",CURRENT_USER.token)
        const res= await axios.post(`${BASE_URL}/stores`,formData,{
            headers:{
                Authorization:`Bearer ${CURRENT_USER.token}`,
            },
        })
        //const data= await res.json();
        console.log("Create store dâta", res.data);
        if(res.status===201)return res.data;
        else return null;
        
    } catch (error) {
        console.log("Create store api wrong", error);
        return null;
    }
}

export const updateStore = async (storeModel,file)=>{
    try {
        let formData= new FormData();
        formData.append('Name',storeModel.Name);
        formData.append('Description',storeModel.Description);
        formData.append('PhoneNumber',storeModel.PhoneNumber);
        formData.append('OpenedTime',storeModel.OpenedTime);
        formData.append('ClosedTime',storeModel.ClosedTime);
        formData.append('Latitude',storeModel.Latitude);
        formData.append('Longitude',storeModel.Longitude);
        formData.append('Zone',storeModel.Zone);
        formData.append('Ward',storeModel.Ward);
        formData.append('AddressNo',storeModel.AddressNo);
        formData.append('Street',storeModel.Street);
        formData.append('File',file);
        formData.append('ActivationDate',storeModel.ActivationDate);
        formData.append('StationIds',storeModel.StationId);
        const res= await fetch(`/api/store/${storeModel.Id}`,{
            headers:{
                'method':'PUT'
            },
            body:formData
        });
        const data= await res.json();
        return data;
    } catch (error) {
        console.log("Update store api wrong", error);
    }
}

export const deleteStore=async (storeId)=>{
    try {
        const res=await fetch(`/api/store/${storeId}`,{
            headers:{
                'method':'DELETE'
            }
        });
        const data=res.json();
        return data;
    } catch (error) {
        console.log("Delete store api error",error);
    }
}