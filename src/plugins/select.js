const getTemplate = () => {
  return `
    <div class="select__input">
      <spam>Text</spam>
      <i class="fa fa-chevron-down" aria-hidden="true"></i>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        <li class="select__item">content 1</li>
        <li class="select__item">content 2</li>
        <li class="select__item">content 3</li>
        <li class="select__item">content 4</li>
        <li class="select__item">content 5</li>
        <li class="select__item">content 6</li>
      </ul>
    </div>
  `
}

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)

    this.#render()
  }

  #render() {
    this.$el.classList.add('select')
    this.$el.innerHTML = getTemplate()
  }

  open() {
    this.$el.classList.add('open')
  }

  close() {
    this.$el.classList.remove('open')
  }
}