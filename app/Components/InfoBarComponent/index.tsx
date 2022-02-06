import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import {Switch} from 'react-native';

import ListItemContext from '../../Contexts/ListItems';

import { 
    Container,
    Header,
    TitleApp,
    InfoContainer,
    InfoText,
    ButtomAddItem,
    ContainerInfoList,
    ContainerTitle,
} from './styles';


import { AntDesign } from '@expo/vector-icons'; 

type Props = {
    children?: React.ReactNode;
    qtdCheck:number;
}

import th from '../../../theme.json';
import ItemModal from '../ItemModal';


type ItemList = {
    id: number | null;
    name: string | null;
    quantity?: number | null;
    description?: string | null; 
}


const InfoBarComponent: React.FC<Props> = ({children, qtdCheck}) => {
    
    const {listItems, themeUser, SetTheme} =  useContext(ListItemContext);
    //const [value, SetValue] = useState(false);

    const [openModal, SetOpenModal] = useState(false);

    const [value, SetValue] = useState(true);

    useEffect(()=>{
        let result = themeUser === 'light'?false:true;
        SetValue(result);
    },[themeUser])

    const toggleSwitch = async () => {
        SetValue(!value);
        value === true ? await SetTheme('light') : await SetTheme('dark');
    };

  return(
      <>
        <StatusBar style="auto" backgroundColor={th[themeUser].complement} />
        <Container
            backgroundColorProps={themeUser}
        >
            <Header
                backgroundColorProps={themeUser}
            >

                <ContainerTitle>
                <TitleApp>
                    Lista de Compras
                </TitleApp>
                <Switch
                    trackColor={{
                        true: th.light.brightColor,
                        false: th.dark.brightColor,
                    }}
                    style={{marginLeft: 0}}
                    thumbColor={
                        value ? th.dark.brightColor : th.light.brightColor
                    }
                    onValueChange={toggleSwitch}
                    value={value}
                />
                </ContainerTitle>

                <InfoContainer>
                    <ContainerInfoList>
                        <InfoText>
                            {`Items\nSelecionados:`}
                        </InfoText>
                        <InfoText>
                            {qtdCheck}/{listItems.length}
                        </InfoText>
                    </ContainerInfoList>

                    <ButtomAddItem
                        backgroundColorProps={themeUser}
                        onPress={async()=>{
                            console.log('Openmodal: ', openModal);
                            SetOpenModal(!openModal);
                        }}
                    >
                        <AntDesign name="pluscircle" size={32} color='white' />
                    </ButtomAddItem>

                </InfoContainer>

            </Header>
                {children}
        </Container>
        {openModal && <ItemModal modal={openModal} SetModal={SetOpenModal} />}
      </>
  );
}

export default InfoBarComponent;