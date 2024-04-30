import axios from 'axios';
import {BASE_URL} from '../lib/contants/index'
import { ACCESS_TOKEN} from './auth-api';
import {toast} from 'react-toastify'

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
        console.log("Get district by province Id response",res.results);
    } catch (error) {
        console.log("Error at getAllProvince", error);
    }
    return res.results;
    
}

export const forwardGeocoding=async(address)=>{
    try {
        console.log("Địa chỉ",address)
        const response=await fetch(`https://rsapi.goong.io/geocode?address=${address}&api_key=ka4NS75APZqask5yCroepr7BBc5DU1JirJvp9ZFQ`)
        const data=await  response.json();
        console.log("Forward geocoding return res",response);
        console.log("Forward geocoding return",data);
        console.log("Forward geocoding", data.results[0].geometry.location);
        if(response.status===200) return data.results[0].geometry.location;
        else return null;
    } catch (error) {
        console.error("Forward geocoding exception", error);
        toast(`${error.response.data.error}`)
    }
}


export const getStores=async()=>{
    try {
        const res= await fetch(`${BASE_URL}/stores`);
        const data=await res.json();
        return data;
    } catch (error) {
        console.log("Get all stores error",error);
        return null;
    }
}

export const getStoreById=async(storeId)=>{
    try {
        const res= await fetch(`${BASE_URL}/stores/${storeId}`);
        const data = await res.json();
        console.log("data get store by id",data);
        if(res.status===200) return data;
        else return null;
    } catch (error) {
        console.log("Get store by id error",error);
        return null;
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
        formData.append('Email',storeModel.Email);
        formData.append('ManagerName',storeModel.ManagerName);
        formData.append('DateOfBirth',storeModel.DateOfBirth);
        formData.append('ManagerPhone',storeModel.ManagerPhone);
        //formData.append('StationIds',JSON.stringify(storeModel.StationIds));
        storeModel.StationIds.forEach((item) => formData.append("StationIds", item))
        // console.log("FormData req: ",file[0]);
        // console.log("Current user token",CURRENT_USER.token)
        const res= await axios.post(`${BASE_URL}/stores`,formData,{
            headers:{
                Authorization:`Bearer ${JSON.parse(ACCESS_TOKEN)}`,
            },
        })
        console.log("Create store dâta", res.data);
        if(res.status===201)return res.data;
        else if(res.status===500) return res.status;
        else return null;
        
    } catch (error) {
        console.log("Create store api wrong", error);
        console.log("Error data", error.response.data.error);
        return {
            status:error.response.status,
            message:error.response.data.error
        };
    }
}

export const updateStore = async (storeModel)=>{
    try {
        let formData= new FormData();
        formData.append('Id',storeModel.Id)
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
        formData.append('File',storeModel.file);
        formData.append('ActivationDate',storeModel.ActivationDate);
        formData.append('Email',storeModel.Email);
        formData.append('ManagerName',storeModel.ManagerName);
        formData.append('DateOfBirth',storeModel.DateOfBirth);
        formData.append('ManagerPhone',storeModel.ManagerPhone);
        //formData.append('StationIds',storeModel.StationId);
        storeModel.StationIds.forEach((item) => formData.append("StationIds", item))
        console.log("AccessToken update store", ACCESS_TOKEN)
        const res= await axios.put(`${BASE_URL}/stores/${storeModel.Id}`,formData,{
            headers:{
                Authorization:`Bearer ${JSON.parse(ACCESS_TOKEN)}`,
            },
        })
        console.log("Update store ", res);
        if(res.status===204)return res.status;
        else if (res.status===401) return res.status 
        else return null;
    } catch (error) {
        console.log("Update store exception", error);
        return {
            status:error.response.status,
            message:error.response.data.error
        };
    }
}

export const deleteStore=async (storeId)=>{
    try {
        const res= await axios.delete(`${BASE_URL}/stores/${storeId}`,{
            headers:{
                Authorization:`Bearer ${JSON.parse(ACCESS_TOKEN)}`,
            }
        });
        console.log("delete store status",res.status)
    if(res.status===204) return res.status;
    else return null;
    } catch (error) {
        console.log("Delete store api error",error);
    }
}

export const getProductByStoreId=async (storeId,pageNumber)=>{
    try {
        console.log("Store id", storeId)
        const res= await axios.get(`${BASE_URL}/stores/${storeId}/products?pageNumber=${pageNumber}&pageSize=10`,{
                headers:{
                    Authorization:`Bearer ${JSON.parse(ACCESS_TOKEN)}`,
                }
            });
        if(res.status===200) return res.data;
        else return null;
    } catch (error) {
        console.error("Get product by store id exception",error)
        return null;
    }
}

export const getMenuByStoreId=async (storeId)=>{
    try {
        const res= await fetch(`${BASE_URL}/stores/${storeId}/menus`);
        
        const data= await res.json();
        console.log("get menu by store id resdata", data);
        if(res.status===200) return data;
        else return null;
    } catch (error) {
        console.error("get menu by storeid exception ", error)
    }
}

export const getStoreReport=async(storeId)=> {
    // var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
    // // console.log(JSON.parse(user));
    // let STOREID = CURRENT_USER.user.storeId;
    //var url = BASE_URL + "/stores/" + storeId + "?isReport=true";
    // const response = await axios.get(`${BASE_URL}/stores/${storeId}?isReport=true`, {
    //   headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    // });
    // console.log("GetStoreReport response", response)
    // return response.data;
    try {
        const res= await fetch(`${BASE_URL}/stores/${storeId}?isReport=true`);
        console.log("Get store report api  res", res);
        if(res.status===200) return await res.json();
        else return null;
    } catch (error) {
        console.error("Get store report api exception",error)
    }
  }
