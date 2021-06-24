import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
	theme: { dark: true, themes: {
    dark: { primary: '#9C27B0'}
  } },
	icons: {
		iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
	},
})
