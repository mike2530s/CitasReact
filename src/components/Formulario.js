import { View, Text, Pressable, Modal, SafeAreaView, ScrollView, 
         TextInput, StyleSheet, Alert } from 'react-native'
import { useState } from 'react'

const Formulario = ({ cerrarModal, modalVisible, pacientes, setPacientes }) => {

  const [id, setId]                   = useState('')
  const [paciente, setPaciente]       = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail]             = useState('')
  const [telefono, setTelefono]       = useState('')
  const [fecha, setFecha]             = useState('')
  const [sintomas, setSintomas]       = useState('')

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
      const pacientesActualizados = pacientes.map( pacienteState => 
        pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState 
      )
      setPacientes(pacientesActualizados)
    } else {
      nuevoPaciente.id = Date.now().toString()
      setPacientes([...pacientes, nuevoPaciente])
    }

    setId('')
    setPaciente('')
    setPropietario('')
    setEmail('')
    setTelefono('')
    setFecha('')
    setSintomas('')

    cerrarModal()
  }

  return (
    <Modal 
      visible={modalVisible} 
      animationType="slide"
      statusBarTranslucent={true}
    >
      <SafeAreaView style={styles.formulario}>
        <ScrollView>

          <Text style={styles.titulo}>Nueva Cita</Text>

          <Pressable style={styles.btnCancelar} onPress={cerrarModal}>
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
            <TextInput style={styles.input} placeholder="Fecha"
              placeholderTextColor={"#666"} value={fecha} onChangeText={setFecha} />
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
});

export default Formulario