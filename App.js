import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import {
  StyleSheet, Text, SafeAreaView, Pressable, ScrollView,
  Platform, StatusBar as RNStatusBar
} from 'react-native'
import Formulario from './src/components/Formulario'

export default function App() {
  const [modalVisible, setModalVisible] = useState(false)
  const [pacientes, setPacientes]       = useState([])

  const cerrarModal = () => {
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.titulo}>
          Administrador de Citas {''}
          <Text style={styles.tituloBold}>Veterinaria</Text>
        </Text>

        <Pressable
          onLongPress={() => setModalVisible(true)}
          delayLongPress={1000}
          style={styles.btnNuevaCita}
        >
          <Text style={styles.btnTextoNuevaCita}>Nueva cita</Text>
        </Pressable>

        <Formulario
          modalVisible={modalVisible}
          cerrarModal={cerrarModal}
          pacientes={pacientes}
          setPacientes={setPacientes}
        />
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
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
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
})