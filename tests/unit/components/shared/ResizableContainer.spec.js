import Vue from 'vue'
import Vuetify from 'vuetify'
import ResizableContainer from '@/components/shared/ResizableContainer'
import { createLocalVue, mount } from '@vue/test-utils'
import '../../mocks/resizableContainerMocks'

describe('components/shared/ResizableContainer.vue', () => {
  let localVue
  let vuetify

  beforeEach(() => {
    localVue = createLocalVue()
    vuetify = new Vuetify()
    Vue.use(Vuetify)
  })

  it('should render correct default contents', () => {
    const wrapper = mount(ResizableContainer, { localVue, vuetify })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render correct initialHeight', () => {
    const wrapper = mount(ResizableContainer, {
      localVue,
      vuetify,
      propsData: {
        initialHeight: 500
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should increase the height on drag', () => {
    const wrapper = mount(ResizableContainer, {
      localVue,
      vuetify,
      attachToDocument: true
    })
    const handler = wrapper.find('div.resizable-container__vertical-handler')

    const startY = 0
    const endY = 100

    handler.trigger('mousedown', { pageY: startY })
    handler.trigger('mousemove', { pageY: endY })
    handler.trigger('mouseup')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should increase the height on drag and scroll if needed', () => {
    const wrapper = mount(ResizableContainer, {
      localVue,
      vuetify,
      attachToDocument: true
    })
    const handler = wrapper.find('div.resizable-container__vertical-handler')

    const startY = 0
    const endY = 1000

    handler.trigger('mousedown', { pageY: startY, clientY: startY })
    handler.trigger('mousemove', { pageY: endY, clientY: endY })
    handler.trigger('mouseup')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should not decrease the height lower then intialHeight', () => {
    const wrapper = mount(ResizableContainer, {
      localVue,
      vuetify,
      attachToDocument: true
    })
    const handler = wrapper.find('div.resizable-container__vertical-handler')

    const startY = 100
    const endY = 0

    handler.trigger('mousedown', { pageY: startY })
    handler.trigger('mousemove', { pageY: endY })
    handler.trigger('mouseup')
    expect(wrapper.element).toMatchSnapshot()
  })
})
