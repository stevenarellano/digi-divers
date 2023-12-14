import React from 'react';
import {
  Platform,
  StyleSheet,
  StatusBar,
  View,
  SafeAreaView,
  ActivityIndicator,
  Text,
} from 'react-native';
import { AppContainer } from './navigation';
import { Suspense } from 'react';
import { RecoilEnv, RecoilRoot } from 'recoil';
import { ConnectionProvider } from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';

import 'react-native-get-random-values';
import { THEME } from './styles';
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false; // check README.md for why
global.Buffer = global.Buffer || require('buffer').Buffer; // why do we need this?

const statusBarStyle: StatusBar['props']['barStyle'] = 'dark-content';


const Loading = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" />
    <Text style={{ marginTop: 8 }}>Loading DataDivers...</Text>
  </View>
);

const DEVNET_ENDPOINT = clusterApiUrl('devnet');

export default function App() {
  return (
    <RecoilRoot>
      <ConnectionProvider
        config={{ commitment: 'processed' }}
        endpoint={DEVNET_ENDPOINT}>

        <SafeAreaView style={styles.shell}>
          <StatusBar
            backgroundColor={THEME.BG_PRIMARY}
            barStyle={statusBarStyle}
            hidden
          />
          <Suspense fallback={<Loading />}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppContainer />
          </Suspense>
        </SafeAreaView>
      </ConnectionProvider>
    </RecoilRoot>
  );
}
const styles = StyleSheet.create({
  shell: {
    height: '100%',
    flex: 1,
  },
});
