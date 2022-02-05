import React,{
    createContext,
    useState,
} from "react";

import uuid from 'react-native-uuid';

type ItemList = {
    //id?: number | null;
    id?: string | null;
    name: string | null;
    quantity: number | null;
    description?: string | null; 
}

type IListItems = {
    themeUser: string;
    listItems: Array<ItemList> | [];
    SetList: (listI: Array<ItemList> | any) => Promise<void>;
    SetTheme: (theme: string) => Promise<void>;
    RemoveElement: (listI: Array<ItemList> | any) => Promise<void>;
    AlterElement:(listI: Array<ItemList> | any) => Promise<void>;
}

const ListItemContext = createContext<IListItems>({} as IListItems);

export const ListItemProvider: React.FC = ({children}) => {
    const [listItems, SetListItems] = useState<Array<ItemList> | [] >([]);
    const [themeUser, SetThemeApp] = useState<string>('light');

    async function SetList(element: ItemList) {
        //listItems ? (element.id = listItems.length + 1) : (element.id = 0);
        element.id = uuid.v4().toString();
        SetListItems([...listItems, element]);
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