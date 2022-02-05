import React, { useContext, useState } from 'react';
import { Modal, Alert } from 'react-native';
import ListItemContext from '../../Contexts/ListItems';

import { 
    ModalOpacity,
    ViewModal,
    TitleInput,
    InputText,
    InputView,
    InputArea,
    InputAreaView,
    TitleModal,
    ButtonConfirm,
    TextButton,
} from './styles';

type ItemList = {
    id: number | null;
    name: string | null;
    quantity?: number | null;
    description?: string | null; 
}

type IElement = {
    //id?: number;
    id?: string;
    name: string;
    quantity: number;
    description?: string | null; 
}

type Props = {
    modal:boolean;
    SetModal: any;
    element?: IElement;
}




const ItemModal: React.FC<Props> = ({element, modal, SetModal}) => {
  
    const { listItems, AlterElement, SetList, themeUser } = useContext(ListItemContext);
    
    let obj = element ? element:
        {name:'', quantity:'', description:''};
    

    const [name, SetName] = useState(obj.name);
    const [qtt, SetQtt] = useState(obj.quantity);
    const [desc, SetDesc] = useState(obj.description);
  

    return(

    <Modal
        visible={modal}
        animationType='slide'
        onRequestClose={()=>{SetModal(!modal)}}
        transparent
    >

        <ModalOpacity>
            <ViewModal
                backgroundColorProps={themeUser}
            >
                <TitleModal
                    backgroundColorProps={themeUser == 'light'? 'dark': 'light'}
                >
                    ITEM
                </TitleModal>

                <InputView>
                    <TitleInput
                    backgroundColorProps={themeUser == 'light'? 'dark': 'light'}
                    >
                        Nome:
                    </TitleInput>
                    <InputText
                        backgroundColorProps={themeUser} 
                        value={name}
                        onChangeText={e => SetName(e)}
                    />
                </InputView>

                <InputView>
                    <TitleInput
                        backgroundColorProps={themeUser == 'light'? 'dark': 'light'}
                    >
                        Quantidade:
                    </TitleInput>
                    <InputText
                        backgroundColorProps={themeUser} 
                        value={qtt}
                        keyboardType="numeric"
                        onChangeText={e => SetQtt(e)}
                    />
                </InputView>

                <InputAreaView>
                    <TitleInput
                        backgroundColorProps={themeUser == 'light'? 'dark': 'light'}
                    >
                        {`Descrição:\n(Opcional)`}
                    </TitleInput>
                    <InputArea
                        backgroundColorProps={themeUser} 
                        value={desc}
                        onChangeText={e => SetDesc(e)}
                    />
                </InputAreaView>

                <ButtonConfirm
                        backgroundColorProps={themeUser}
                        onPress={async()=>{
                                if(!name.trim() || !qtt.toString().trim()){
                                    return Alert.alert(
                                        "Error",
                                        "O nome e a quantidade devem ser preenchidos!"
                                    );
                                }
                                element?
                                    await AlterElement({
                                            id:element.id,
                                            name:name,
                                            quantity:qtt,
                                            description: desc.trim()?desc:''
                                        })
                                :
                                await SetList({
                                    name:name,
                                    quantity:qtt,
                                    description: desc.trim()?desc:''
                                });
                                SetModal(!modal);
                        }}
                >
                    <TextButton>
                        Confirmar
                    </TextButton>
                </ButtonConfirm>
            </ViewModal>
        </ModalOpacity>

    </Modal>

  );
}

export default ItemModal;