import { useState, useMemo } from 'react'
import {
  View, Text, Pressable, Modal, StyleSheet, ScrollView,
} from 'react-native'
import moment from 'moment-jalaali'

const MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
]

const JalaaliDatePicker = ({ visible, onSelect, onClose }) => {
  const today = moment()
  const [year, setYear] = useState(today.jYear())
  const [month, setMonth] = useState(today.jMonth() + 1)
  const [day, setDay] = useState(today.jDate())

  const daysInMonth = useMemo(
    () => moment.jDaysInMonth(year, month - 1),
    [year, month],
  )

  const handleSelect = () => {
    const date = `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`
    onSelect(date)
  }

  if (!visible) return null;

  return (
    <View style={[StyleSheet.absoluteFill, styles.overlay, { zIndex: 999 }]}>
        <View style={styles.container}>
          <Text style={styles.title}>Seleccionar Fecha</Text>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Año</Text>
              <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {Array.from({ length: 150 }, (_, i) => year - 50 + i).map(y => (
                  <Pressable
                    key={y}
                    style={[styles.item, year === y && styles.itemSelected]}
                    onPress={() => { setYear(y); setDay(Math.min(day, moment.jDaysInMonth(y, month - 1))) }}
                  >
                    <Text style={[styles.itemText, year === y && styles.itemTextSelected]}>
                      {y}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Mes</Text>
              <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {MONTHS.map((m, i) => (
                  <Pressable
                    key={i}
                    style={[styles.item, month === i + 1 && styles.itemSelected]}
                    onPress={() => {
                      setMonth(i + 1)
                      setDay(Math.min(day, moment.jDaysInMonth(year, i)))
                    }}
                  >
                    <Text style={[styles.itemText, month === i + 1 && styles.itemTextSelected]}>
                      {m}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Día</Text>
              <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
                  <Pressable
                    key={d}
                    style={[styles.item, day === d && styles.itemSelected]}
                    onPress={() => setDay(d)}
                  >
                    <Text style={[styles.itemText, day === d && styles.itemTextSelected]}>
                      {d}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={styles.buttons}>
            <Pressable style={styles.btnCancel} onPress={onClose}>
              <Text style={styles.btnCancelText}>Cancelar</Text>
            </Pressable>
            <Pressable style={styles.btnOk} onPress={handleSelect}>
              <Text style={styles.btnOkText}>OK</Text>
            </Pressable>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
    color: '#374151',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    color: '#6D28D9',
  },
  scroll: {
    maxHeight: 250,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 2,
  },
  itemSelected: {
    backgroundColor: '#6D28D9',
  },
  itemText: {
    fontSize: 15,
    color: '#374151',
  },
  itemTextSelected: {
    color: '#FFF',
    fontWeight: '700',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    gap: 10,
  },
  btnCancel: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
  },
  btnCancelText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
  },
  btnOk: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#6D28D9',
    alignItems: 'center',
  },
  btnOkText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
})

export default JalaaliDatePicker
