const CoolParam = (props) => {
  return createElement(
    'p',
    {
      className: 'grey lighten-2',
      onClick: () => {
        window.alert('Thank you for clicking me!');
      }
    },
    'cool'
  );
};
const el = createElement(
  'div',
  {
    style: {
      color: 'white'
    },
    className: 'row purple'
  },
  'Hello',
  createElement(
    'div',
    {
      style: 'color: red;',
      className: 'z-depth-2'
    },
    createElement(CoolParam, null)
  )
);

const app = document.querySelector('#app');
app.appendChild(el);
