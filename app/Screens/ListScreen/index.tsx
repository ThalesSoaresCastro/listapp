import React, { useContext, useEffect, useState } from 'react';
import {  FlatList, Alert } from 'react-native';
import InfoBarComponent from '../../Components/InfoBarComponent';
import ListItemContext from '../../Contexts/ListItems';

import Checkbox from 'expo-checkbox';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Audio } from 'expo-av';

import { 
  TextEmptyList,
  AreaList,
  ViewItem,
  TextInfos,
} from './styles';


import theme from '../../../theme.json';
import ItemModal from '../../Components/ItemModal';

type ItemList = {
  //id?: number;
  id?:string;
  name: string;
  quantity: number;
  description?: string | null; 
}



const ListScreen: React.FC = () => {


  const [ listI, SetListItem ] = useState<Array<ItemList> | [] >([]);
  const [openModal, SetOpenModal] = useState(false);
  const [element, SetElement] = useState<ItemList | null>(null);
  const [checked, setChecked] = useState([]);

  const [sound, setSound] = useState(null);

  const {listItems,themeUser, RemoveElement} =  useContext(ListItemContext);

  useEffect(()=>{
    async function SetData() {
      SetListItem(listItems);
    }
    SetData()
  },);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../Sound/clickEfect.mp3')
    );
    setSound(sound);
  await sound.playAsync(); }
  

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);


  //limpa a lista checked's de ids de itens que foram deletados enquanto ainda
  //estavam selecionados...
  useEffect(()=>{
      let value = false;
      listItems.length > 0 ?
      checked.forEach(e =>{
        value = listItems.find( l => l.id == e) === undefined? true:false;
          if(value){
            checked.splice(e,1)
          }    
      }):setChecked([])
      
  },[listItems]);

  const render = (item:ItemList)=>(
    <>
      <ViewItem
        checkedProps={checked.includes(item.id)}
        theme={themeUser}
        onLongPress={async()=>{
          console.log('ID ITEM: ', item.id);
          await SetElement(item);
          await SetOpenModal(!openModal);
        }}
      >

          <Checkbox
            color={theme[themeUser].isChecked}
            value={checked.includes(item.id)}
            //disabled
            onValueChange={async()=>{
              
              await playSound();
              
              const newIds = [...checked];
              const index = newIds.indexOf(item.id);
              index > -1? newIds.splice(index,1):newIds.push(item.id);  
              setChecked(newIds);
            }}
          />
          {/* verifica se id existe: checked.includes(item.id) */}
        <TextInfos
          theme={themeUser}
          checkedProps={checked.includes(item.id)}
        >
          {item.name}
        </TextInfos>
        <TextInfos
          theme={themeUser}
          checkedProps={checked.includes(item.id)}
        >
          {item.quantity}
        </TextInfos>


        <MaterialCommunityIcons 
          name="delete-forever-outline" 
          size={30} 
          color="red" 
          onPress={async()=>{

            Alert.alert('Excluir', 'Deseja realmente excluir o elemento?', [
              {
                text: 'Cancel',
                //onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: async() => {await RemoveElement(item)} },
            ]);

            ;
          }}
        />

      </ViewItem>
    </>
  );
  return(
    <>
    <InfoBarComponent qtdCheck={checked.length} >
        {!listI || listI.length == 0 ?
        <TextEmptyList>
            Nenhum Item na lista
        </TextEmptyList>
        :
          <AreaList>
            <FlatList 
              data={listI}
              extraData={checked}
              renderItem={({item, index}) =>(
                render(item)
              )}
            />
          </AreaList>
        }
    </InfoBarComponent>
    {openModal && <ItemModal element={element} modal={openModal} SetModal={SetOpenModal} />}
    </>
  );
}

export default ListScreen;