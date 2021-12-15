module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        'jost': ['Jost', 'sans-serif']
      },
      colors: {
        template: {
          purple: '#AD1FEA',
          navy: '#3A4374',
          orange: '#F49F85',
          blue: {
            light: '#62BCFA',
            dark: '#4661E6'
          },
          gray: {
            extraLight: '#F7F8FD',
            light: '#F2F4FF',
            medium: '#647196',
            dark : '#4661E6'
          }
        }
      }
    },
  },
}
