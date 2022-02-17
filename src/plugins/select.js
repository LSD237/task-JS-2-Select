//классы предназначены для стилистики, а data-значения для функционала
const getTemplate = (data = [], placeholder) => {
  const text = placeholder ?? 'Текст по умолчанию'

  const items = data.map(item => {
    return `
      <li class="select__item" data-type="item" data-id="${item.id}">${item.value}</li>
    `
  })

  return `
    <div class="select__input" data-type="input">
      <spam data-type="value">${text}</spam>
      <i class="fa fa-chevron-down" aria-hidden="true" data-type="arrow"></i>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${items.join('')}
      </ul>
    </div>
  `
}

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.options = options
    //id течущего выбраннного элемента
    this.selectedId = null

    this.#render()
    this.#setup()
  }
  //работа с шаблоном
  #render() {
    const { data, placeholder } = this.options
    this.$el.classList.add('select')
    this.$el.innerHTML = getTemplate(data, placeholder)
  }
  //работа с настройкой
  #setup() {
    //привязка метода clickHandler/слушатель к контексту this.
    //Это позволит работать с контекстом в методе clickHandler и удалять этот метод/слушатель в destroy
    this.clickHandler = this.clickHandler.bind(this)
    this.$el.addEventListener('click', this.clickHandler)
    this.$arrow = this.$el.querySelector('[data-type="arrow"]')
    this.$value = this.$el.querySelector('[data-type="value"]')
  }

  clickHandler(event) {
    const { type } = event.target.dataset

    if (type === 'input') {
      this.toggle()
    } else if (type === 'item') {
      const id = event.target.dataset.id
      this.select(id)
    }
  }

  get isOpen() {
    return this.$el.classList.contains('open')
  }

  get current() {
    return this.options.data.find(i => i.id === this.selectedId)
  }

  select(id) {
    this.selectedId = id
    this.$value.textContent = this.current.value
    this.close()
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  open() {
    this.$el.classList.add('open')
    this.$arrow.classList.remove('fa-chevron-down')
    this.$arrow.classList.add('fa-chevron-up')
  }

  close() {
    this.$el.classList.remove('open')
    this.$arrow.classList.remove('fa-chevron-up')
    this.$arrow.classList.add('fa-chevron-down')
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler)
  }
}