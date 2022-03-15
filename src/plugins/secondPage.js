import '@styles/scss/styles.scss'
import { Select } from '../plugins/select'

const select2 = new Select('#select2', {
  placeholder: 'Выбери пожалуйста элемент',
  // selectedId: '3', //выбранный эл-т по умолчанию
  data: [
    { id: '1', value: 'Baract' },
    { id: '2', value: 'Balangular' },
    { id: '3', value: 'Bue' },
    { id: '4', value: 'Beact Bative' },
    { id: '5', value: 'Bext' },
    { id: '6', value: 'Best' }
  ],
  onSelect(item) {
    console.log('Selected Item', item)
  }
})

console.log('Second page')