import styled from 'styled-components/native';

import th from '../../../theme.json';


type ITheme = {
  backgroundColorProps:string;
}

export const Container = styled.View<ITheme>`
  flex-direction: column;
  flex: 1;
  width: 100%;
  align-items: center;
  background:${props => th[props.backgroundColorProps].primary};
`;

export const Header = styled.View<ITheme>`
    background: ${props => th[props.backgroundColorProps].complement};
    width:100%;
    height:20%;
    align-items: center;
    justify-content:center;
    padding-top: 7%;
`;

export const TitleApp = styled.Text`
    font-size: ${th.fonts.sizes.title};
    text-align: center;
    font-family:${th.fonts.name};
    font-weight: bold;
    color: white;
    width:70%;
    margin-left:10%;
    background:transparent;
`;

export const ContainerTitle = styled.View`
  flex:1;
  flex-direction:row;
  align-items:center;
`;

export const InfoContainer = styled.View`
    flex-direction: row;
    background: transparent;
    width:100%;
    height: 50%;
    margin-bottom:0.5%;
    align-items:center;
    padding-left:2%;
    padding-right:2%;
    justify-content:space-between;
`;

export const ContainerInfoList = styled.View`
  height: 100%;
  width:50%;
  background: transparent;
  align-items:center;
  flex-direction:row;
  justify-content: space-evenly;
`;

export const InfoText = styled.Text`
  font-size: ${th.fonts.sizes.lg};
  color:white;
  font-family:${th.fonts.name};
  text-align: center;
  margin:1%;
`;

export const ButtomAddItem = styled.TouchableOpacity<ITheme>`
  background-color:transparent;
  height: 70%;
  width: 15%;
  border-radius: 4px;
  align-items:center;
  justify-content:center;
`;