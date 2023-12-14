import React, { FC } from "react";
import { Text } from 'react-native';
import { THEME } from '../../styles';



const GradientText: FC<any> = (props: any) => {
    return (
        <Text {...props} style={{ ...props.style, color: THEME.PRIMARY_BLUE }}>{props.children} </Text>
    );
};

export default GradientText;
