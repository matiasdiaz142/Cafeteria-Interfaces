document.addEventListener('DOMContentLoaded', function () {
  var filtro = document.getElementById('filtro');
  var btnAgregar = document.getElementById('btnAgregar');
  var btnGuardarNuevo = document.getElementById('btnGuardarNuevo');

  filtro.addEventListener('input', filtrarProductos);
  btnAgregar.addEventListener('click', mostrarFormulario);
  btnGuardarNuevo.addEventListener('click', guardarProducto);

  const contenedor = document.getElementById('recomendaciones');
  contenedor.innerHTML = '<p>Cargando recomendaciones...</p>';

  fetch('data/recomendaciones.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo cargar el archivo JSON');
      }
      return response.json();
    })
    .then(data => {
      contenedor.innerHTML = '<ul>' +
        data.map(item => `<li>${item}</li>`).join('') +
        '</ul>';
    })
    .catch(error => {
      contenedor.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});

function filtrarProductos() {
  var texto = document.getElementById('filtro').value;
  var productos = document.querySelectorAll('#productos li');
  for (var i = 0; i < productos.length; i++) {
    var nombreElem = productos[i].querySelector('.nombre');
    if (nombreElem) {
      var nombre = nombreElem.textContent;
      if (nombre.indexOf(texto) !== -1) {
        productos[i].style.display = '';
      } else {
        productos[i].style.display = 'none';
      }
    }
  }
}

function mostrarFormulario() {
  document.getElementById('seccionAgregar').style.display = 'block';
}

function guardarProducto() {
  var nombreInput = document.getElementById('nuevoNombre');
  var precioInput = document.getElementById('nuevoPrecio');
  var nombre = nombreInput.value;
  var precio = precioInput.value;

  if (nombre === '' || precio === '' || isNaN(precio)) {
    alert('Completa correctamente los campos.');
    return;
  }

  var li = document.createElement('li');
  li.className = 'list-group-item';
  li.innerHTML = '<span class="nombre">' + nombre + '</span> - $<span class="precio">' + precio + '</span> ' +
    '<input type="checkbox" class="producto-check"> ' +
    '<button class="btnQuitar">Quitar</button> ' +
    '<button class="btnModificar">Modificar</button>';

  li.querySelector('.btnQuitar').addEventListener('click', quitarProducto);
  li.querySelector('.btnModificar').addEventListener('click', modificarProducto);
  li.querySelector('.producto-check').addEventListener('change', actualizarContador);

  li.addEventListener('mouseover', function () {
    li.style.backgroundColor = '#f0f0f0';
  });
  li.addEventListener('mouseout', function () {
    li.style.backgroundColor = '';
  });

  document.getElementById('productos').appendChild(li);

  nombreInput.value = '';
  precioInput.value = '';
  document.getElementById('seccionAgregar').style.display = 'none';
}

function quitarProducto(event) {
  var li = event.target.parentElement;
  li.parentElement.removeChild(li);
  actualizarContador();
}

function modificarProducto(event) {
  var li = event.target.parentElement;
  var precioSpan = li.querySelector('.precio');
  var nuevoPrecio = prompt('Ingresá el nuevo precio:', precioSpan.textContent);
  if (nuevoPrecio !== null && !isNaN(nuevoPrecio) && nuevoPrecio !== '') {
    precioSpan.textContent = nuevoPrecio;
  }
}

function actualizarContador() {
  var checks = document.querySelectorAll('.producto-check');
  var total = 0;
  for (var i = 0; i < checks.length; i++) {
    if (checks[i].checked) {
      total++;
    }
  }
  document.getElementById('contadorSeleccionados').textContent = total;
}
