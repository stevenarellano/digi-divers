import { ImageBackground } from 'react-native';

const BackdropWrapper: React.FC<any> = ({ children, style }) => (
    <ImageBackground source={require('../../assets/imgs/bg.png')} style={style}>
        {children}
    </ImageBackground>
);


export default BackdropWrapper;