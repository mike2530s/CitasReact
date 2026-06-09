import {
  View, Text, Pressable, Modal, SafeAreaView, ScrollView,
  TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform, StatusBar
} from 'react-native'
import { useState, useEffect } from 'react'
import DatePicker from 'react-native-modern-datepicker'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../context/ThemeContext'

const Formulario = ({ cerrarModal, modalVisible, pacientes, setPacientes, paciente: pacienteObj, setPaciente: setPacienteObj }) => {
  const { theme, mode } = useTheme()
  const [id, setId] = useState('')
  const [paciente, setPaciente] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')
  const [showPicker, setShowPicker] = useState(false)

  useEffect(() => {
    if (pacienteObj?.id) {
      setId(pacienteObj.id)
      setPaciente(pacienteObj.paciente)
      setPropietario(pacienteObj.propietario)
      setEmail(pacienteObj.email)
      setTelefono(pacienteObj.telefono)
      setFecha(pacienteObj.fecha)
      setSintomas(pacienteObj.sintomas)
    }
  }, [pacienteObj])

  const limpiarFormulario = () => {
    setId('')
    setPaciente('')
    setPropietario('')
    setEmail('')
    setTelefono('')
    setFecha('')
    setSintomas('')
    setPacienteObj({})
    cerrarModal()
  }

  const handleCita = () => {
    if ([paciente, propietario, email, telefono, fecha, sintomas].includes('')) {
      Alert.alert('Campos incompletos', 'Todos los campos son obligatorios')
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

  const isEditing = Boolean(id)

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      statusBarTranslucent={true}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <SafeAreaView style={[styles.screen, { backgroundColor: theme.bg }]}>
          <View style={[styles.header, { backgroundColor: theme.headerBg, borderBottomColor: theme.headerBorder }]}>
            <View style={styles.headerTop}>
              <Text style={[styles.headerTitle, { color: theme.text }]}>
                {isEditing ? 'Editar Paciente' : 'Nueva Cita'}
              </Text>
              <Pressable style={[styles.btnClose, { backgroundColor: theme.toggleBg }]} onPress={limpiarFormulario}>
                <Ionicons name="close" size={20} color={theme.textSecondary} />
              </Pressable>
            </View>
            <View style={[styles.headerAccent, { backgroundColor: '#7C3AED' }]} />
          </View>

          <ScrollView
            style={styles.form}
            contentContainerStyle={styles.formContent}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Nombre del Paciente</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text }]}
                placeholder="Ej: Max, Luna, Rocky..."
                placeholderTextColor={theme.textMuted}
                value={paciente}
                onChangeText={setPaciente}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Propietario</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text }]}
                placeholder="Nombre del dueño"
                placeholderTextColor={theme.textMuted}
                value={propietario}
                onChangeText={setPropietario}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Email</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text }]}
                placeholder="correo@correo.com"
                placeholderTextColor={theme.textMuted}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Teléfono</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text }]}
                placeholder="+56 9..."
                placeholderTextColor={theme.textMuted}
                keyboardType="phone-pad"
                value={telefono}
                onChangeText={setTelefono}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Fecha</Text>
              <Pressable
                style={[styles.inputPicker, { backgroundColor: theme.inputBg, borderColor: theme.border }]}
                onPress={() => setShowPicker(true)}
              >
                <Text style={[styles.inputText, !fecha && { color: theme.textMuted }, fecha && { color: theme.text }]}>
                  {fecha || "Seleccionar fecha..."}
                </Text>
                <Ionicons name="calendar-outline" size={20} color={theme.textMuted} />
              </Pressable>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Síntomas</Text>
              <TextInput
                style={[styles.input, styles.inputMultiline, { backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text }]}
                placeholder="Describe los síntomas o comentarios..."
                placeholderTextColor={theme.textMuted}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                value={sintomas}
                onChangeText={setSintomas}
              />
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.btnSubmit,
                pressed && { opacity: 0.95, backgroundColor: '#6D28D9' }
              ]}
              onPress={handleCita}
            >
              <Text style={styles.btnSubmitText}>
                {isEditing ? 'Editar Paciente' : 'Guardar'}
              </Text>
            </Pressable>

            <Pressable style={styles.btnCancel} onPress={limpiarFormulario}>
              <Text style={[styles.btnCancelText, { color: theme.textMuted }]}>Cancelar</Text>
            </Pressable>
          </ScrollView>

          {showPicker && (
            <View style={styles.overlay}>
              <Pressable style={[styles.overlayBg, { backgroundColor: mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(15,23,42,0.5)' }]} onPress={() => setShowPicker(false)} />
              <View style={[styles.pickerWrapper, { shadowColor: mode === 'dark' ? '#000' : '#0F172A' }]}>
                <DatePicker
                  isGregorian={true}
                  minimumDate={new Date().toISOString().split('T')[0]}
                  options={{
                    backgroundColor: mode === 'dark' ? '#1E293B' : '#FFFFFF',
                    textHeaderColor: '#7C3AED',
                    textDefaultColor: mode === 'dark' ? '#F1F5F9' : '#0F172A',
                    selectedTextColor: '#FFFFFF',
                    mainColor: '#7C3AED',
                    textSecondaryColor: mode === 'dark' ? '#64748B' : '#94A3B8',
                    borderColor: mode === 'dark' ? '#334155' : '#F1F5F9',
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
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 16 : 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  headerAccent: {
    width: 36,
    height: 4,
    borderRadius: 2,
    marginTop: 10,
  },
  btnClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 1,
  },
  formContent: {
    padding: 24,
    paddingBottom: 40,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: '500',
  },
  inputMultiline: {
    minHeight: 100,
    paddingTop: 14,
  },
  inputPicker: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
    fontWeight: '500',
  },
  btnSubmit: {
    backgroundColor: '#7C3AED',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    elevation: 2,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  btnSubmitText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  btnCancel: {
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  btnCancelText: {
    fontSize: 15,
    fontWeight: '600',
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayBg: {
    ...StyleSheet.absoluteFillObject,
  },
  pickerWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    width: '88%',
    elevation: 12,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
})

export default Formulario
