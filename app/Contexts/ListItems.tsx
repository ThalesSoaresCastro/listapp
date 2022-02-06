import React,{
    createContext,
    useEffect,
    useState,
} from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

import uuid from 'react-native-uuid';

type ItemList = {
    //id?: number | null;
    id?: string | null;
    name: string | null;
    quantity: number | null;
    description?: string | null; 
}

type IListItems = {
    themeUser: string | null;
    listItems: Array<ItemList> | [];
    SetList: (listI: Array<ItemList> | any) => Promise<void>;
    SetTheme: (theme: string) => Promise<void>;
    RemoveElement: (listI: Array<ItemList> | any) => Promise<void>;
    AlterElement:(listI: Array<ItemList> | any) => Promise<void>;
}

const ListItemContext = createContext<IListItems>({} as IListItems);

export const ListItemProvider: React.FC = ({children}) => {
    const [listItems, SetListItems] = useState<Array<ItemList> | [] >([]);
    const [themeUser, SetThemeApp] = useState<string | null>('light');

    useEffect(()=>{
        getStorage()
    },[]);

    useEffect(()=>{
        Storage()
    },[listItems, themeUser])
    
    async function Storage() {
        try{
            await AsyncStorage.setItem('@storage_theme', themeUser);
            if(listItems && listItems.length > 0){
                await AsyncStorage.setItem('@storage_items', JSON.stringify(listItems));
            }
        }catch(e){
            console.log('error: ',e);

        }
    }

    async function getStorage() {
        try{
            
            const th = await AsyncStorage.getItem('@storage_theme');
            const Litm = await AsyncStorage.getItem('@storage_items');

            if(th !== null){
                SetThemeApp(th);
            }

            if(Litm !== null){
                SetListItems(JSON.parse(Litm));
            }
        }catch(e){
            console.log('Get Storage Error: ', e);
        }
    }

    async function mergeStorage(){
        try{
            await AsyncStorage.mergeItem('@storage_items', JSON.stringify(listItems));
            await AsyncStorage.mergeItem('@storage_theme', themeUser);
        }catch(e){
            console.log('Merge Storage Error: ', e);
        }
    }

    async function SetList(element: ItemList) {
        //listItems ? (element.id = listItems.length + 1) : (element.id = 0);
        element.id = uuid.v4().toString();
        SetListItems([...listItems, element]);
        //await Storage();
    }
    
    async function SetTheme(th: string) {
        SetThemeApp(th);
    }

    async function AlterElement(element: ItemList) {
            listItems.map( (item:ItemList) =>{
                if(item.id === element.id){
                    item.name = element.name;
                    item.quantity = element.quantity;
                    item.description = element.description;
                }
            });
            SetListItems(listItems);
            //await Storage();
    }


    async function RemoveElement(element: ItemList){
            if(element.id && listItems){    
                let newArr = listItems.filter( (item:ItemList) => item.id !== element.id);
                //rearranjando os indices...
                //let ind = 0;
                //newArr.forEach((obj:ItemList) =>{
                //    obj.id = ind;
                //    ind+=1;
                //})
                SetListItems(newArr);
                //await Storage();
            }
    }

    return(
        <ListItemContext.Provider
            value={{
                    themeUser:themeUser,
                    listItems: listItems, 
                    SetList, 
                    SetTheme, 
                    RemoveElement,
                    AlterElement
                }}
        >
            {children}
        </ListItemContext.Provider>

    );
};


export default ListItemContext;