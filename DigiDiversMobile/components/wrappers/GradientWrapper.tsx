import React from 'react';
import { THEME } from '../../styles';
import LinearGradient from 'react-native-linear-gradient';

const BACKGROUND_OPACITY = { backgroundColor: 'rgba(0,0,0,0.7)' };

const GradientWrapper: React.FC<any> = ({ children, style }) => (
    <LinearGradient
        colors={THEME.GRADIENT_COLORS}
        start={THEME.GRADIENT_START}
        end={THEME.GRADIENT_END}
        style={[style]}
    >
        {children}
    </LinearGradient >
);

export default GradientWrapper;