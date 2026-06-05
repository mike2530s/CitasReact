import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const Paciente = ({
    item,
    setModalVisible,
    setPaciente,
    setModalPaciente
}) => {
    return (
        <Pressable>
            <View style={styles.contenedor}>
                <Text style={styles.label}>Paciente:</Text>
                <Text style={styles.texto}>{item.paciente}</Text>
                <Text style={styles.fecha}>{item.fecha}</Text>

                <View style={styles.contenedorBotonoes}>
                    <Pressable style={[styles.btn, styles.btnEditar]}>
                        <Text style={styles.btnTexto}>Editar</Text>
                    </Pressable>
                    <Pressable style={[styles.btn, styles.btnEliminar]}>
                        <Text style={styles.btnTexto}>Eliminar</Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderBottomColor: '#94a3B8',
        borderBottomWidth: 1,
    },
    label: {
        color: '#374151',
        textTransform: 'uppercase',
        fontWeight: '700',
        marginBottom: 10
    },
    texto: {
        color: '#6D28D9',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10
    },
    fecha: {
        color: '#374151'
    },
    contenedorBotonoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    btn: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    btnEditar: {
        backgroundColor: '#F59E0B',
    },
    btnEliminar: {
        backgroundColor: '#EF4444', // Corregido de #EF444 a #EF4444
    },
    btnTexto: {
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: 12,
        color: '#FFF'
    }
})

export default Paciente