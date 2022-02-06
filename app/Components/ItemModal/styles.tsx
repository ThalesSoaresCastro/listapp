/* eslint-disable dot-notation */
import styled from 'styled-components/native';
import theme from '../../../theme.json';


type ITheme = {
    backgroundColorProps:string;
}


export const ModalOpacity = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
  flex-direction: column;
  align-items:center;
  justify-content:center;
`;

export const TitleModal = styled.Text<ITheme>`
    font-size: ${theme.fonts.sizes.title};
    text-align: center;
    font-family:${theme.fonts.name};
    font-weight: bold;
    color: ${props => theme[props.backgroundColorProps].primary};
    margin-bottom:3%;
`;

export const ViewModal = styled.View<ITheme>`
    height: 350px;
    width:  80%;
    background:${props => theme[props.backgroundColorProps].primary};
    align-items: center;
    justify-content: center;
    border-radius:8px;
    flex-direction:column;
    padding:4%;
    border-color: ${props => theme[props.backgroundColorProps].complement};
    border-width:2px;
`;

export const InputView = styled.View`
    width:100%;
    height: 40px;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    background:transparent;
    padding-left: 4%;
    padding-right: 4%;
    margin-bottom:5%;
`;

export const TitleInput = styled.Text<ITheme>`
    font-size:${theme.fonts.sizes.md};
    color:${props => theme[props.backgroundColorProps].primary};
`;

export const InputText = styled.TextInput<ITheme>`
    width:60%;
    height:98%;
    text-align:center;
    border-color: ${props => theme[props.backgroundColorProps].brightColor};
    border-width:2px;
    border-radius:6px;
    color: ${props => theme[props.backgroundColorProps].brightColor};
    background: ${props => theme[props.backgroundColorProps].secundary};
`;


export const InputAreaView = styled.View`
    width:100%;
    height: 100px;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    background:transparent;
    padding-left: 4%;
    padding-right: 4%;
    margin-bottom:5%;
`;


export const InputArea = styled.TextInput.attrs({
    multiline: true,
    numberOfLines:7,
})<ITheme>`
    height: 98%;
    width: 70%;
    border-color: ${props => theme[props.backgroundColorProps].brightColor};
    border-width:2px;
    border-radius:6px;
    text-align-vertical:top;
    padding:3%;
    color: ${props => theme[props.backgroundColorProps].brightColor};
    background: ${props => theme[props.backgroundColorProps].secundary};
`;


export const TextButton = styled.Text`
    font-size: ${theme.fonts.sizes.lg};
    font-weight:bold;
    color: white;
    text-align:center;
`;

export const ButtonConfirm = styled.TouchableOpacity<ITheme>`
    background-color:${props => theme[props.backgroundColorProps].complement};
    height: 12%;
    width: 75%;
    border-radius: 4px;
    align-items:center;
    justify-content:center;
`;