
function mostrarContactos() {
    // Hacer petición GET a la API de contactos
    fetch("http://localhost:3000/contactos")
        .then((response) => response.json())
        .then((data) => {
            const tbody = document.getElementById("tablaContactos");
            tbody.innerHTML = "";
            if (Array.isArray(data.data)) {
                data.data.forEach((contacto) => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${contacto.id}</td>
                        <td>${contacto.nombre}</td>
                        <td>${contacto.telefono}</td>
                        <td>
                            <button class="btn btn-sm btn-danger delete-btn">Eliminar</button>
                        </td>
                    `;
                    // Confirmar antes de eliminar
                    tr.querySelector(".delete-btn").addEventListener("click", () => {
                        if (confirm("¿Seguro que deseas eliminar este contacto?")) {
                            eliminarContacto(contacto.id);
                        }
                    });
                    tbody.appendChild(tr);
                });
            }
        });
}

function eliminarContacto(id) {
    fetch(`http://localhost:3000/contactos/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        mostrarContactos();
    });
}

// Llamar a mostrarContactos al cargar la página
mostrarContactos();

// Manejar el envío del formulario para crear un nuevo contacto
const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    if (!nombre || !telefono) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    fetch("http://localhost:3000/contactos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, telefono })
    })
    .then((response) => response.json())
    .then(() => {
        mostrarContactos();
        form.reset();
        alert("Contacto agregado exitosamente.");
    });
});

// Botón Refrescar para recargar la tabla de contactos
const btnRefrescar = document.getElementById("btnRefrescar");
if (btnRefrescar) {
    btnRefrescar.addEventListener("click", mostrarContactos);
}