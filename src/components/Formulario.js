import {
  View, Text, Pressable, Modal, SafeAreaView, ScrollView,
  TextInput, StyleSheet, Alert,
} from 'react-native'
import { useState } from 'react'
import DatePicker from 'react-native-modern-datepicker'

const Formulario = ({ cerrarModal, modalVisible, pacientes, setPacientes }) => {
  const [id, setId] = useState('')
  const [paciente, setPaciente] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')
  const [showPicker, setShowPicker] = useState(false)

  const limpiarFormulario = () => {
    setId('')
    setPaciente('')
    setPropietario('')
    setEmail('')
    setTelefono('')
    setFecha('')
    setSintomas('')
    cerrarModal()
  }

  const handleCita = () => {
    if ([paciente, propietario, email, telefono, fecha, sintomas].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios')
      return
    }

    const nuevoPaciente = {
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas,
    }

    if (id) {
      nuevoPaciente.id = id
      const pacientesActualizados = pacientes.map(pacienteState =>
        pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState
      )
      setPacientes(pacientesActualizados)
    } else {
      nuevoPaciente.id = Date.now().toString()
      setPacientes([...pacientes, nuevoPaciente])
    }

    limpiarFormulario()
  }

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      statusBarTranslucent={true}
    >
      <SafeAreaView style={styles.formulario}>
        <ScrollView keyboardShouldPersistTaps="always">
          <Text style={styles.titulo}>Nueva Cita</Text>

          <Pressable style={styles.btnCancelar} onPress={limpiarFormulario}>
            <Text style={styles.btnCancelarTexto}> X Cancelar</Text>
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre del Paciente</Text>
            <TextInput style={styles.input} placeholder="Nombre Paciente"
              placeholderTextColor={"#666"} value={paciente} onChangeText={setPaciente} />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Propietario</Text>
            <TextInput style={styles.input} placeholder="Nombre Dueño"
              placeholderTextColor={"#666"} value={propietario} onChangeText={setPropietario} />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="correo@correo.com"
              placeholderTextColor={"#666"} keyboardType="email-address"
              value={email} onChangeText={setEmail} />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Teléfono</Text>
            <TextInput style={styles.input} placeholder="Teléfono"
              placeholderTextColor={"#666"} keyboardType="phone-pad"
              value={telefono} onChangeText={setTelefono} />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha</Text>
            <Pressable
              style={styles.inputPicker}
              onPress={() => setShowPicker(true)}
            >
              <Text style={[styles.inputText, !fecha && styles.placeholderText]}>
                {fecha ? fecha : "Selecciona Fecha..."}
              </Text>
              <Text style={styles.iconoCalendario}>📅</Text>
            </Pressable>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Comentarios</Text>
            <TextInput style={styles.input} placeholder="Comentarios para el doctor"
              placeholderTextColor={"#666"} multiline={true} numberOfLines={4}
              value={sintomas} onChangeText={setSintomas} />
          </View>

          <Pressable style={styles.btnNuevaCita} onPress={handleCita}>
            <Text style={styles.btnNuevaCitaTexto}>Guardar</Text>
          </Pressable>
        </ScrollView>

        {showPicker && (
          <View style={styles.overlay}>
            <View style={styles.pickerWrapper}>
              <DatePicker
                isGregorian={true}
                options={{
                  backgroundColor: '#FFF',
                  textHeaderColor: '#6D28D9',
                  textDefaultColor: '#000',
                  selectedTextColor: '#FFF',
                  mainColor: '#6D28D9',
                  textSecondaryColor: '#666',
                }}
                onDateChange={date => {
                  setFecha(date)
                  setShowPicker(false)
                }}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
    color: "#FFF",
  },
  tituloBold: {
    fontWeight: "900",
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: "#FFF",
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
  },
  formulario: {
    backgroundColor: "#6D28D9",
    flex: 1,
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: "#5827A4",
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: "#F59E0B",
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNuevaCitaTexto: {
    color: "#5827A4",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
  },
  inputPicker: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
    color: "#000",
  },
  placeholderText: {
    color: "#666",
  },
  iconoCalendario: {
    fontSize: 18,
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '90%',
  },
});

export default Formulario