import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import {
  StyleSheet, Text, SafeAreaView, Pressable, FlatList,
  Platform, StatusBar as RNStatusBar, View
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ThemeProvider, useTheme } from './src/context/ThemeContext'
import Formulario from './src/components/Formulario'
import Paciente from './src/components/Paciente'
import InformacionPaciente from './src/components/InformacionPaciente'

function AppContent() {
  const { theme, mode, toggleTheme } = useTheme()
  const [modalVisible, setModalVisible] = useState(false)
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})
  const [modalPaciente, setModalPaciente] = useState(false)

  const cerrarModal = () => {
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />

      <View style={[styles.header, { backgroundColor: theme.headerBg, borderBottomColor: theme.headerBorder }]}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <View style={[styles.headerAccent, { backgroundColor: '#7C3AED' }]} />
            <Text style={[styles.titulo, { color: theme.text }]}>
              Veterinaria
            </Text>
            <Text style={[styles.subtitulo, { color: theme.textMuted }]}>
              Administrador de Citas
            </Text>
          </View>
          <Pressable
            onPress={toggleTheme}
            style={[styles.toggleBtn, { backgroundColor: theme.toggleBg }]}
          >
            <Ionicons
              name={mode === 'dark' ? 'sunny' : 'moon'}
              size={20}
              color={mode === 'dark' ? '#F59E0B' : '#475569'}
            />
          </Pressable>
        </View>
      </View>

      {pacientes.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="calendar-outline" size={56} color={theme.textMuted} />
          <Text style={[styles.emptyTitle, { color: theme.text }]}>No hay pacientes</Text>
          <Text style={[styles.emptyText, { color: theme.textMuted }]}>
            Agrega una nueva cita para comenzar
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.listado}
          contentContainerStyle={styles.listadoContent}
          data={pacientes}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <Paciente
                item={item}
                setModalVisible={setModalVisible}
                setPaciente={setPaciente}
                setModalPaciente={setModalPaciente}
                pacientes={pacientes}
                setPacientes={setPacientes}
              />
            )
          }}
        />
      )}

      <Pressable
        onPress={() => {
          setPaciente({})
          setModalVisible(true)
        }}
        style={[styles.fab, { shadowColor: theme.fabShadow }]}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </Pressable>

      <Formulario
        modalVisible={modalVisible}
        cerrarModal={cerrarModal}
        pacientes={pacientes}
        setPacientes={setPacientes}
        paciente={paciente}
        setPaciente={setPaciente}
      />

      <InformacionPaciente
        modalPaciente={modalPaciente}
        setModalPaciente={setModalPaciente}
        paciente={paciente}
        setPaciente={setPaciente}
      />
    </SafeAreaView>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  header: {
    paddingTop: 24,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerAccent: {
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitulo: {
    fontSize: 15,
    marginTop: 4,
    fontWeight: '500',
  },
  toggleBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 16,
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  listado: {
    flex: 1,
  },
  listadoContent: {
    padding: 16,
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  fabText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '300',
    marginTop: -2,
  },
})
