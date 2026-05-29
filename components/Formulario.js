import { View, Text, Pressable, Modal, SafeAreaView,
         ScrollView, TextInput, StyleSheet } from 'react-native'
import { useState } from 'react'

const Formulario = ({ modalVisible, setModalVisible, pacientes, setPacientes }) => {

  // States de la foto
  const [paciente, setPaciente]       = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail]             = useState('')
  const [telefono, setTelefono]       = useState('')
  const [fecha, setFecha]             = useState('')
  const [sintomas, setSintomas]       = useState('')

  const handleGuardar = () => {
    // Validar que no haya campos vacíos
    if ([paciente, propietario, email, telefono, fecha, sintomas].includes('')) {
      console.log('Todos los campos son obligatorios')
      return
    }

    const nuevaCita = { paciente, propietario, email, telefono, fecha, sintomas }
    setPacientes([...pacientes, nuevaCita])

    // Limpiar formulario
    setPaciente('')
    setPropietario('')
    setEmail('')
    setTelefono('')
    setFecha('')
    setSintomas('')

    setModalVisible(false)
  }

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
    >
      <SafeAreaView style={styles.contenido}>
        <ScrollView>

          <Text style={styles.titulo}>Nueva Cita</Text>

          {/* Cancelar */}
          <Pressable
            style={styles.btnCancelar}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>

          {/* Paciente */}
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder='Nombre del paciente'
              placeholderTextColor='#666'
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>

          {/* Propietario */}
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder='Nombre del propietario'
              placeholderTextColor='#666'
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>

          {/* Email */}
          <View style={styles.campo}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder='Email del propietario'
              placeholderTextColor='#666'
              keyboardType='email-address'
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Teléfono */}
          <View style={styles.campo}>
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={styles.input}
              placeholder='Teléfono del propietario'
              placeholderTextColor='#666'
              keyboardType='phone-pad'
              value={telefono}
              onChangeText={setTelefono}
            />
          </View>

          {/* Fecha */}
          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Alta</Text>
            <TextInput
              style={styles.input}
              placeholder='YYYY-MM-DD'
              placeholderTextColor='#666'
              value={fecha}
              onChangeText={setFecha}
            />
          </View>

          {/* Síntomas */}
          <View style={styles.campo}>
            <Text style={styles.label}>Síntomas</Text>
            <TextInput
              style={[styles.input, styles.inputSintomas]}
              placeholder='Describe los síntomas'
              placeholderTextColor='#666'
              multiline
              numberOfLines={4}
              value={sintomas}
              onChangeText={setSintomas}
            />
          </View>

          {/* Guardar */}
          <Pressable style={styles.btnGuardar} onPress={handleGuardar}>
            <Text style={styles.btnGuardarTexto}>Guardar</Text>
          </Pressable>

        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  contenido: {
    flex: 1,
    backgroundColor: '#6D28D9',
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    color: '#FFF',
    marginTop: 20,
  },
  btnCancelar: {
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: '#EF4444',
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    color: '#FFF',
    marginBottom: 8,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  inputSintomas: {
    height: 100,
    textAlignVertical: 'top',
  },
  btnGuardar: {
    backgroundColor: '#F59E0B',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 10,
  },
  btnGuardarTexto: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 18,
    textTransform: 'uppercase',
  },
})

export default Formulario