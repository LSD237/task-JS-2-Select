import '@styles/scss/styles.scss'
import { SecondSelect } from './copySelect'

const select3 = new SecondSelect('#select3', {
  placeholder: 'Выбери пожалуйста элемент',
  // selectedId: '3', //выбранный эл-т по умолчанию
  data: [
    { id: '1', value: 'Голова' },
    { id: '2', value: 'Туловище' },
    { id: '3', value: 'Левая рука' },
    { id: '4', value: 'Правая рука' },
    { id: '5', value: 'Левая нога' },
    { id: '6', value: 'Правая нога' }
  ],
  onSelect(item) {
    console.log('Selected Item', item)
  }
})

console.log('Thirth page')