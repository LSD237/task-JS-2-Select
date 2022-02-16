import '@styles/scss/styles.scss'

import { Select } from './plugins/select'

const select = new Select('#select', {

})

window.s = select
//В консоле сперва откроет селект, а затем закроет его
// s.open()
// s.close()