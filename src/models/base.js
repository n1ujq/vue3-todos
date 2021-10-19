// eslint-disable-next-line import/no-absolute-path
import { Model as ModelFactory, Collection as CollectionFactory } from 'ar-front'

const Model = ModelFactory.config({
  defineAttributesIn: 'object',
  setter (key, value) {
    this[key] = value
  },
  deleter (key) {
    delete this[key]
  }
})

const Collection = CollectionFactory.config({
  deleter (index) {
    delete this[index]
  }
})

export { Model, Collection }
