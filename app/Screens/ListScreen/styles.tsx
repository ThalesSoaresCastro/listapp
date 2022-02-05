import styled from 'styled-components/native';

import th from '../../../theme.json';


type IValidate = {
    checkedProps?:boolean;
    theme?:boolean;
}


export const TextEmptyList = styled.Text`
    font-size: ${th.fonts.sizes.md};
    color: ${th.light.infoColor};
    margin-top: 4%;
`;

export const AreaList = styled.SafeAreaView`
    flex:1;
    background:transparent;
    width:100%;
`;


export const ViewItem = styled.TouchableOpacity<IValidate>`
    flex-direction:row;
    justify-content: space-around;
    height: 60px;
    background:${ props => props.checkedProps? th[props.theme].isCheckedRGBA:"transparent"};
    border-color:${ props => props.checkedProps?th[props.theme].isChecked:th[props.theme].infoColor};
    border-width:0.5px;
    border-radius: 4px;
    align-items: center;
    margin:1%;
`;

export const TextInfos = styled.Text<IValidate>`
    font-size: ${props => props.checkedProps? th.fonts.sizes.md : th.fonts.sizes.sm};
    color: ${ props => props.checkedProps?th[props.theme].isChecked:th[props.theme].infoColor};
    text-align: center;
    font-weight:${props => props.checkedProps? 'bold':'normal'};
    text-decoration:${props => props.checkedProps? 'line-through':'none'};
    text-decoration-color:${props => th[props.theme].isChecked};
`;