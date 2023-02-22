import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import * as labs from 'vuetify/labs/components';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      ...components,
      ...labs,
    },
    directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#44B78B',
            secondary: '#015393',
            error: '#DC3545',
            info: '#0DCAF0',
            success: '#198754',
            warning: '#FFC107',
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
