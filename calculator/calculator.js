var calculator = document.getElementById('calculator'),
  tbody = calculator.getElementsByTagName('tbody')[0],
  display = document.getElementById('display'),
  memoryCurrentNumber = 0,
  memoryNewNumber = false, // отделить числа
  memoryPendingOperation; // убрать значение! 

// СОБЫТИЯ
document.addEventListener('click', function(ev) {
  var target = ev.target;
  if (target.classList.contains('number')) {
    numberPress(target.textContent);
  } else if (target.classList.contains('operation')) {
    operation(target.textContent);
  } else if (target.classList.contains('clear')) {
    clear(target.id);
  } else if (target.id === 'decimal') {
    decimal();
  } else {
    console.log('клик мимо кнопки');
  }
});

/**
 * обработчики событий
 */
function numberPress(number) {
  if (memoryNewNumber) {
    display.value = number;
    memoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function operation(operation) {
  var localOperationMemory = display.value;

  if (memoryNewNumber && memoryPendingOperation !== '=') {
    display.value = memoryCurrentNumber;
  } else {
    memoryNewNumber = true;
    switch (memoryPendingOperation) {
      case '+':
        memoryCurrentNumber += parseFloat(localOperationMemory);
        break;
      case '-':
        memoryCurrentNumber -= parseFloat(localOperationMemory);
        break;
      case '*':
        memoryCurrentNumber *= parseFloat(localOperationMemory);
        break;
      case '/':
        memoryCurrentNumber /= parseFloat(localOperationMemory);
        break;
      default:
        memoryCurrentNumber = parseFloat(localOperationMemory);
        break;
    }

    display.value = memoryCurrentNumber;
    memoryPendingOperation = operation;
  }
}

function decimal() {
  var localDecimalMemory = display.value;
  if (memoryNewNumber) {
    localDecimalMemory = '0.';
    memoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory = localDecimalMemory + '.';
    }
  }

  display.value = localDecimalMemory;
}

function clear(id) {
  if (id === 'ce') {
    display.value = '0';
    memoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    memoryNewNumber = true;
    memoryCurrentNumber = 0;
    memoryPendingOperation = '';
  }
}

/*
document.addEventListener('keypress', function(e) {
  e = e || event;

  if (e.ctrlKey || e.altKey || e.metaKey) return;

  var chr = getChar(e);
  if (chr == null) return;

  if (chr < '0' || chr > '9') {
    return false;
  }
  
  if (chr >= '48' || chr <= '57') {
    numberPress(chr);
  }
});
*/
/*
// event.type должен быть keypress
function getChar(event) {
  if (event.which == null) { // IE
    if (event.keyCode < 32) return null; // спец. символ
    return String.fromCharCode(event.keyCode)
  }

  if (event.which != 0 && event.charCode != 0) { // все кроме IE
    if (event.which < 32) return null; // спец. символ
    return String.fromCharCode(event.which); // остальные
  }

  return null; // спец. символ
}
*/