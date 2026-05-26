import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { 
  StyleSheet, Text, SafeAreaView, Pressable, 
  Platform, StatusBar as RNStatusBar, Modal, View
} from 'react-native';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Administrador de citas</Text>
      <Text style={styles.tituloBold}>Veterinaria</Text>

      <Pressable 
        style={styles.btnNuevaCita}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.btnTextoNuevaCita}>
          Nueva cita
        </Text>
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="slide"
      >
        <View style={styles.modalContenido}>
          <Text>Este es un modal</Text>

          <Pressable 
            style={styles.btnNuevaCita}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.btnTextoNuevaCita}>
              Cerrar
            </Text>
          </Pressable>

        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600'
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9',
    textAlign: 'center',
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  modalContenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30
  }
});