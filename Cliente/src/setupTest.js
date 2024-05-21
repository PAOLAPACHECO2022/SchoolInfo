import '@testing-library/jest-dom';


// Configurar Mocks globales
jest.mock('axios'); // Si necesitas simular axios u otra biblioteca

// Configuración adicional antes de cada prueba
beforeEach(() => {
  // Por ejemplo, restablecer mocks, establecer variables globales, etc.
});



//import '@testing-library/jest-dom/extend-expect';

// Desactivar advertencias innecesarias para las pruebas
console.warn = () => {};

// Mockear valores globales
global.someGlobalValue = 'mockedValue';
jest.mock('axios');

// Mockear `localStorage`
const localStorageMock = (function () {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => store[key] = value,
      clear: () => store = {},
    };
  })();
  
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
  