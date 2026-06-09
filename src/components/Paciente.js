import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../context/ThemeContext'

const Paciente = ({
    item,
    setModalVisible,
    setPaciente,
    setModalPaciente,
    pacientes,
    setPacientes
}) => {
    const { theme } = useTheme()

    return (
        <Pressable
            onLongPress={() => {
                setPaciente(item)
                setModalPaciente(true)
            }}
            style={({ pressed }) => [
                styles.cardWrapper,
                pressed && styles.cardPressed
            ]}
        >
            <View style={[styles.card, {
                backgroundColor: theme.surface,
                borderColor: theme.cardBorder,
                shadowColor: theme.mode === 'dark' ? '#000' : '#0F172A'
            }]}>
                <View style={styles.cardHeader}>
                    <View style={[styles.avatar, { backgroundColor: theme.avatarBg }]}>
                        <Ionicons name="medkit-outline" size={22} color="#7C3AED" />
                    </View>
                    <View style={styles.headerInfo}>
                        <Text style={[styles.pacienteName, { color: theme.text }]}>{item.paciente}</Text>
                        <Text style={[styles.propietarioName, { color: theme.textSecondary }]}>{item.propietario}</Text>
                    </View>
                    <View style={[styles.dateBadge, { backgroundColor: theme.dateBadgeBg }]}>
                        <Text style={[styles.dateText, { color: theme.dateBadgeText }]}>{item.fecha}</Text>
                    </View>
                </View>

                <View style={[styles.cardBody, { borderTopColor: theme.cardBorder }]}>
                    <View style={styles.infoRow}>
                        <Ionicons name="mail-outline" size={16} color={theme.textMuted} />
                        <Text style={[styles.infoValue, { color: theme.textSecondary }]}>{item.email}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="call-outline" size={16} color={theme.textMuted} />
                        <Text style={[styles.infoValue, { color: theme.textSecondary }]}>{item.telefono}</Text>
                    </View>
                </View>

                <View style={styles.cardActions}>
                    <Pressable
                        style={[styles.btn, { backgroundColor: theme.btnEditBg, borderColor: theme.btnEditBorder }]}
                        onPress={() => {
                            setPaciente(item)
                            setModalVisible(true)
                        }}
                    >
                        <Ionicons name="create-outline" size={16} color="#7C3AED" style={{marginRight: 4}} />
                        <Text style={styles.btnEditarTexto}>Editar</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.btn, { backgroundColor: theme.btnDeleteBg, borderColor: theme.btnDeleteBorder }]}
                        onPress={() => {
                            setPacientes(pacientes.filter(p => p.id !== item.id))
                        }}
                    >
                        <Ionicons name="trash-outline" size={16} color="#DC2626" style={{marginRight: 4}} />
                        <Text style={styles.btnEliminarTexto}>Eliminar</Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cardWrapper: {
        marginBottom: 14,
    },
    cardPressed: {
        opacity: 0.92,
    },
    card: {
        borderRadius: 16,
        padding: 16,
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        borderWidth: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerInfo: {
        flex: 1,
    },
    pacienteName: {
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: -0.3,
    },
    propietarioName: {
        fontSize: 13,
        marginTop: 2,
        fontWeight: '500',
    },
    dateBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    dateText: {
        fontSize: 12,
        fontWeight: '600',
    },
    cardBody: {
        paddingTop: 12,
        borderTopWidth: 1,
        marginBottom: 14,
        gap: 6,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '500',
    },
    cardActions: {
        flexDirection: 'row',
        gap: 10,
    },
    btn: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 1,
    },
    btnEditarTexto: {
        fontSize: 14,
        fontWeight: '700',
        color: '#7C3AED',
    },
    btnEliminarTexto: {
        fontSize: 14,
        fontWeight: '700',
        color: '#DC2626',
    },
})

export default Paciente
