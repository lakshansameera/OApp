import React,{ useEffect, useState } from 'react';
import { StyleSheet, View, Text,Button } from 'react-native';
import { NetworkProvider, NetworkConsumer } from 'react-native-offline';
import NetInfo,{useNetInfo} from '@react-native-community/netinfo';
const App = () => {
  
  const net = useNetInfo();

  const checkNow = async () => {
    const state = await NetInfo.fetch();
    console.log('One-off check:', state);
  };

  const [netState, setNetState] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('NetInfo state:', state);
      setNetState(state);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
  {/* react-native-offline */}
  <NetworkProvider shouldPing={true} pingInterval={100}>
    <NetworkConsumer>
      {({ isConnected }) =>
        isConnected ? (
          <Text style={styles.text}>Hello World!</Text>
        ) : (
          <Text style={styles.text}>No Network</Text>
        )
      }
    </NetworkConsumer>
  </NetworkProvider>

  {/* NetInfo listener state */}
  <Text style={styles.text}>
    {netState?.isConnected ? 'Connected' : 'Loading...'}
  </Text>

  {/* NetInfo hook state */}
  {net.isConnected === false && (
    <Text>You are offline</Text>
  )}

  <Text style={styles.text}>
    {net.isConnected ? 'Hello World!' : 'No Network'}
  </Text>

  <Text style={styles.info}>Type: {net.type}</Text>
  <Text style={styles.info}>
    Internet reachable: {String(net.isInternetReachable)}
  </Text>

  <Button title="Check now" onPress={checkNow} />
</View>
    
  );
};
const styles = StyleSheet.create({
container: {
  flex: 1,
  marginTop: 60,
  padding: 20,
  paddingBottom: 60,
  alignItems: 'center',
},
text: {
  fontSize: 22,
  color: 'black',
  textAlign: 'center',
  marginVertical: 10,
},
info: {
  fontSize: 16,
  color: 'black',
  marginVertical: 4,
},
});
export default App;