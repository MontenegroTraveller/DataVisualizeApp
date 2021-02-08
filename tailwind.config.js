module.exports = {
  important: true,
  theme: {
    extend: {
      colors: {
        'blue-1000-tallround': '#152037'
      },
      height: () => ({
        'screen-90': '90vh'
      }),
      width: () => ({
        52: '13rem'
      }),
      fontSize: {
        '7xl': '5rem'
      },
      inset: {
        '1/2': '50%'
      }
    }
  },
  variants: {
    backgroundColor: ['even', 'hover', 'focus']
  },
  plugins: [
    require('tailwindcss-animatecss')({
      settings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDelaySpeed: 1000
      },
      variants: ['responsive']
    })
  ]
}
