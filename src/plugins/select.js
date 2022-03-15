//классы предназначены для стилистики, а data-значения для функционала

const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? 'Текст по умолчанию'

  const items = data.map(item => {
    let cls = ''
    if (item.id === selectedId) {
      text = item.value
      cls = 'selected'
    }
    return `
      <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
    `
  })

  return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
      <span data-type="value">${text}</span>
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
    this.selectedId = options.selectedId

    this.#render()
    this.#setup()
  }
  //работа с шаблоном
  #render() {
    const { data, placeholder } = this.options
    this.$el.classList.add('select')
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId)
  }
  //работа с настройкой
  #setup() {
    //привязка метода clickHandler/слушатель к контексту this.
    //Это позволит работать с контекстом в методе clickHandler и удалять этот метод/слушатель в destroy
    this.clickHandler = this.clickHandler.bind(this) // это привязка контекста у clickHandler
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
    } else if (type === 'backdrop') {
      this.close()
    }
  }

  get isOpen() {
    return this.$el.classList.contains('open')
  }
  // ищет и возвращает нужный элемент в data(списке элементов)
  get current() {
    return this.options.data.find(item => item.id === this.selectedId)
  }

  select(id) {
    this.selectedId = id
    this.$value.textContent = this.current.value //меняет текст выбранного эл-та в селекте

    //удаление класса с подсветкой у выбранного эл-та в списке
    this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
      el.classList.remove('selected')
    });
    this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected') //подсветка выбранного эл-та в списке

    //колбек - возвращает в консоль выбранный эл-т
    this.options.onSelect ? this.options.onSelect(this.current) : null

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
    this.$el.innerHTML = ''
  }
}