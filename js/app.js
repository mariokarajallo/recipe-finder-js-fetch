function iniciarApp() {
  const selecCategorias = document.querySelector("#categorias");
  const resultado = document.querySelector("#resultado");
  const modal = new bootstrap.Modal("#modal", {});

  if (selecCategorias) {
    selecCategorias.addEventListener("change", seleccionarCategoria);
    obtenerCategorias();
  }

  const favoritosDiv = document.querySelector(".favoritos");
  if (favoritosDiv) {
    obtenerFavoritos();
  }

  function obtenerCategorias() {
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

    fetch(url)
      .then((respuesta) => respuesta.json())
      .then((resultado) => mostrarCategorias(resultado.categories));
  }

  function obtenerFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];

    // si existe algun favoritos, vamos a pasarlos la funcion mostrarRecetas
    if (favoritos.length) {
      mostrarRecetas(favoritos);
      return;
    }

    // si no existe algun favorito
    const noFavoritos = document.createElement("P");
    noFavoritos.classList.add("fs-4", "text-center", "font-bold", "mt-5");
    noFavoritos.textContent = "No hay favoritos guardados";
    favoritosDiv.appendChild(noFavoritos);
  }

  function mostrarCategorias(categories = []) {
    categories.forEach((categoria) => {
      const { strCategory } = categoria;

      //creamos la opciones de nuestro selector de categorias
      const option = document.createElement("OPTION");
      option.value = strCategory;
      option.textContent = strCategory;

      // agregamos las categorias en el HTML
      selecCategorias.appendChild(option);
    });
  }

  function seleccionarCategoria(e) {
    const categoria = e.target.value;
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => mostrarRecetas(result.meals));
  }

  function mostrarRecetas(recetas) {
    limpiarHTML(resultado);

    const header = document.createElement("H2");
    header.classList.add("text-center", "text-black", "my-5", "fw-bold");
    header.textContent = recetas
      ? `${recetas.length} Resultados`
      : "No se encontraron resultados";
    resultado.appendChild(header);

    recetas.forEach((receta) => {
      const { idMeal, strMeal, strMealThumb } = receta;

      const recetaContenedor = document.createElement("DIV");
      recetaContenedor.classList.add("col-md-4");

      const recetaCard = document.createElement("DIV");
      recetaCard.classList.add("card", "mb-4", "border-0", "shadow-sm");

      const recetaCardImagen = document.createElement("IMG");
      recetaCardImagen.classList.add("card-img-top");
      recetaCardImagen.alt = `Imagen de la receta ${strMeal}`;
      recetaCardImagen.src = strMealThumb ?? receta.img;

      const recetaCardBody = document.createElement("DIV");
      recetaCardBody.classList.add("card-body");

      const recetaCardHeading = document.createElement("H3");
      recetaCardHeading.classList.add("card-title", "mb-3", "fw-bold");
      recetaCardHeading.textContent = strMeal ?? receta.title;

      const recetaCardButton = document.createElement("BUTTON");
      recetaCardButton.classList.add("btn", "btn-primary", "w-100", "fw-bold");
      recetaCardButton.textContent = "Ver receta";
      //agregar manualmente el modal sin la instancia de booostrap.Modal
      // recetaCardButton.dataset.bsTarget = "#modal";
      // recetaCardButton.dataset.bsToggle = "modal";
      recetaCardButton.onclick = function () {
        seleccionarReceta(idMeal ?? receta.id);
      };

      // inyectar en el codigo HTML
      recetaCardBody.appendChild(recetaCardHeading);
      recetaCardBody.appendChild(recetaCardButton);

      recetaCard.appendChild(recetaCardImagen);
      recetaCard.appendChild(recetaCardBody);

      recetaContenedor.appendChild(recetaCard);
      resultado.appendChild(recetaContenedor);
    });
  }

  function seleccionarReceta(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => mostrarRecetaModal(result.meals[0]));
  }

  function mostrarRecetaModal(receta) {
    console.log(receta);
    const { idMeal, strInstructions, strMeal, strMealThumb } = receta;

    // anadir contenido al modal
    const modalTitle = document.querySelector(".modal-title");
    modalTitle.textContent = strMeal;

    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = `
      <img src="${strMealThumb}" alt="Receta ${strMeal}" class="img-fluid">    </img>
      <h3 class="my-3">Instruccions</h3>
      <p>${strInstructions}</p>
      <h3 class="my-3">Ingredients - Measure      </h3>
    `;

    const listGroup = document.createElement("UL");
    listGroup.classList.add("list-group");

    //mostrar ingrediente + cantidades
    for (i = 1; i <= 20; i++) {
      if (receta[`strIngredient${i}`]) {
        let ingredient = receta[`strIngredient${i}`];
        let measure = receta[`strMeasure${i}`];
        const list = document.createElement("LI");
        list.classList.add("list-group-item");
        list.textContent = `${ingredient} - ${measure}`;

        listGroup.appendChild(list);
      }
    }

    modalBody.appendChild(listGroup);

    // Boton guardar y cerrar

    const modalFooter = document.querySelector(".modal-footer");
    limpiarHTML(modalFooter);

    //creamos el boton para guardar la receta a favoritos
    const btnGuardar = document.createElement("BUTTON");
    btnGuardar.classList.add("btn", "col", "fw-bold");

    if (existeLocalStorage(idMeal)) {
      btnGuardar.classList.add("btn-outline-primary");
      btnGuardar.textContent = "Eliminar Favorito";
    } else {
      btnGuardar.classList.add("btn-primary");
      btnGuardar.textContent = "Guardar Favorito";
    }

    // accion del boton guardar a locaStorage
    // accion del boton guardar a locaStorage
    btnGuardar.onclick = function () {
      if (existeLocalStorage(idMeal)) {
        eliminarFavorito(idMeal);
        btnGuardar.textContent = "Guardar Favorito";
        btnGuardar.classList.remove("btn-outline-primary");
        btnGuardar.classList.add("btn-primary");
        mostrarToast(`Receta ${strMeal} eliminado correctamente`, "delete");
        return;
      }

      guardarLocalStorage({
        id: idMeal,
        title: strMeal,
        img: strMealThumb,
      });
      btnGuardar.textContent = "Eliminar Favorito";
      btnGuardar.classList.remove("btn-primary");
      btnGuardar.classList.add("btn-outline-primary");
      mostrarToast(`Receta ${strMeal} guardado correctamente`, "save");
    };

    // creamos el boton para cerrar el modal
    const btnCerar = document.createElement("BUTTON");
    btnCerar.classList.add("btn", "btn-secondary", "col", "fw-bold", "ms-2");
    btnCerar.textContent = "Cerrar";
    btnCerar.onclick = function () {
      modal.hide();
      console.log(modal);
    };

    // inyectamos en el HTML
    modalFooter.appendChild(btnGuardar);
    modalFooter.appendChild(btnCerar);

    // muestra el modal
    modal.show();
  }

  function guardarLocalStorage(receta) {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];
    const favoritosJSON = JSON.stringify([...favoritos, receta]);
    localStorage.setItem("favoritos", favoritosJSON);
  }

  function eliminarFavorito(id) {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];
    const nuevosfavoritos = favoritos.filter(
      (favoritos) => favoritos.id !== id
    );
    localStorage.setItem("favoritos", JSON.stringify(nuevosfavoritos));
  }

  function existeLocalStorage(id) {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];
    return favoritos.some((favoritos) => favoritos.id === id);
  }

  function mostrarToast(mensaje, type) {
    // seleccionamos elementos del DOM
    const toastDiv = document.querySelector("#toast");
    const toastHeader = document.querySelector(".toast-header");
    const toastBody = document.querySelector(".toast-body");
    toastBody.textContent = mensaje;

    // actualizamos el contenido segun tipo de mensaje
    if (type === "save") {
      toastHeader.classList.add("bg-success", "text-white");
      toastHeader.classList.remove("bg-danger");
    } else if (type === "delete") {
      toastHeader.classList.add("bg-danger", "text-white");
      toastHeader.classList.remove("bg-success");
    }

    // instanciamos el componente toast de boostrap y mostramos con el metodo show() en el html
    const toast = new bootstrap.Toast(toastDiv);
    toast.show();
  }
  function limpiarHTML(selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  }
}

document.addEventListener("DOMContentLoaded", iniciarApp());
