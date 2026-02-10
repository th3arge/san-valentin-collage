// Firebase desde CDN (correcto para HTML simple)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Configuración REAL de tu proyecto
const firebaseConfig = {
  apiKey: "AIzaSyAxwLpjZ76pPyW552AD_yZh_siogjr2EsE",
  authDomain: "subir-fotos-web.firebaseapp.com",
  projectId: "subir-fotos-web",
  storageBucket: "subir-fotos-web.appspot.com",
  messagingSenderId: "499087561438",
  appId: "1:499087561438:web:5ab3fae225467df6c5684f"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Función para subir foto
window.subirFoto = function () {
  const input = document.getElementById("foto");
  const estado = document.getElementById("estado");
  const imagen = document.getElementById("imagen");

  const archivo = input.files[0];

  if (!archivo) {
    estado.textContent = "Selecciona una foto primero ❌";
    return;
  }

  estado.textContent = "Subiendo foto... ⏳";

  const referencia = ref(storage, "fotos/" + Date.now() + "_" + archivo.name);

  uploadBytes(referencia, archivo)
    .then(() => getDownloadURL(referencia))
    .then((url) => {
      imagen.src = url;
      estado.innerHTML = `✅ Foto subida <br>
      <a href="${url}" target="_blank">Ver imagen</a>`;
    })
    .catch((error) => {
      estado.textContent = "Error al subir ❌";
      console.error(error);
    });
};