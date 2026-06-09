import React from 'react'
import {
  Text, SafeAreaView, View, Pressable, StyleSheet, Modal, ScrollView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../context/ThemeContext'

const InformacionPaciente = ({ paciente, setPaciente, modalPaciente, setModalPaciente }) => {
  const { theme, mode } = useTheme()

  const cerrar = () => {
    setModalPaciente(false)
    setPaciente({})
  }

  return (
    <Modal
      animationType="fade"
      visible={modalPaciente}
      transparent={true}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <Pressable style={[styles.overlayBg, { backgroundColor: theme.overlay }]} onPress={cerrar} />
        <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
          <View style={[styles.handle, { backgroundColor: theme.handleBg }]} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.headerSection}>
              <View style={[styles.avatar, { backgroundColor: theme.avatarBg }]}>
                <Ionicons name="medkit-outline" size={30} color="#7C3AED" />
              </View>
              <Text style={[styles.pacienteName, { color: theme.text }]}>{paciente.paciente}</Text>
              <View style={[styles.headerAccent, { backgroundColor: '#7C3AED' }]} />
            </View>

            <View style={styles.cardsContainer}>
              <View style={[styles.infoCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
                <View style={styles.infoRow}>
                  <View style={[styles.iconBox, { backgroundColor: theme.avatarBg }]}>
                    <Ionicons name="person-outline" size={20} color="#7C3AED" />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={[styles.label, { color: theme.textMuted }]}>Propietario</Text>
                    <Text style={[styles.valor, { color: theme.text }]}>{paciente.propietario}</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.infoCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
                <View style={styles.infoRow}>
                  <View style={[styles.iconBox, { backgroundColor: theme.avatarBg }]}>
                    <Ionicons name="mail-outline" size={20} color="#7C3AED" />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={[styles.label, { color: theme.textMuted }]}>Email</Text>
                    <Text style={[styles.valor, { color: theme.text }]}>{paciente.email}</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.infoCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
                <View style={styles.infoRow}>
                  <View style={[styles.iconBox, { backgroundColor: theme.avatarBg }]}>
                    <Ionicons name="call-outline" size={20} color="#7C3AED" />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={[styles.label, { color: theme.textMuted }]}>Teléfono</Text>
                    <Text style={[styles.valor, { color: theme.text }]}>{paciente.telefono}</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.infoCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
                <View style={styles.infoRow}>
                  <View style={[styles.iconBox, { backgroundColor: theme.avatarBg }]}>
                    <Ionicons name="calendar-outline" size={20} color="#7C3AED" />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={[styles.label, { color: theme.textMuted }]}>Fecha de Cita</Text>
                    <Text style={[styles.valor, { color: theme.text }]}>{paciente.fecha}</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.infoCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
                <View style={styles.infoRow}>
                  <View style={[styles.iconBox, { backgroundColor: theme.avatarBg }]}>
                    <Ionicons name="document-text-outline" size={20} color="#7C3AED" />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={[styles.label, { color: theme.textMuted }]}>Síntomas</Text>
                    <Text style={[styles.valorSintomas, { color: theme.textSecondary }]}>{paciente.sintomas}</Text>
                  </View>
                </View>
              </View>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.btnCerrar,
                pressed && { opacity: 0.95, backgroundColor: '#6D28D9' }
              ]}
              onPress={cerrar}
            >
              <Text style={styles.btnCerrarText}>Cerrar</Text>
            </Pressable>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlayBg: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    elevation: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  pacienteName: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  headerAccent: {
    width: 32,
    height: 3,
    borderRadius: 2,
    marginTop: 10,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  infoCard: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  infoContent: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  valor: {
    fontSize: 17,
    fontWeight: '600',
  },
  valorSintomas: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
  },
  btnCerrar: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#7C3AED',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  btnCerrarText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
})

export default InformacionPaciente
