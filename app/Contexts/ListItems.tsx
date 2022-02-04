import React,{
    createContext,
    useState,
} from "react";

type ItemList = {
    id: number | null;
    name: string | null;
    quantity: number | null;
    description: string | null; 
}


type IListItems = {
    listItems: Array<ItemList> | [];
    SetList: (listI: Array<ItemList> | any) => Promise<void>;
}

const ListItemContext = createContext<IListItems>({} as IListItems);

export const ListItemProvider: React.FC = ({children}) => {
    const [listItems, SetListItems] = useState<Array<ItemList> | [] >([]);

    async function SetList(element: ItemList) {
        listItems ? (element.id = listItems.length + 1) : (element.id = 0);
        SetListItems([...listItems, element]);
    }

    return(
        <ListItemContext.Provider
            value={{listItems: listItems, SetList}}
        >
            {children}
        </ListItemContext.Provider>

    );

};