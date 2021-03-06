import '@styles/scss/styles.scss'
import { Select } from './plugins/select'

const select = new Select('#select', {
  placeholder: 'Выбери пожалуйста элемент',
  // selectedId: '3', //выбранный эл-т по умолчанию
  data: [
    { id: '1', value: 'React' },
    { id: '2', value: 'Angular' },
    { id: '3', value: 'Vue' },
    { id: '4', value: 'React Native' },
    { id: '5', value: 'Next' },
    { id: '6', value: 'Nest' }
  ],
  onSelect(item) {
    console.log('Selected Item', item)
  }
})

console.log('First page')