// Subir foto a Cloudinary
function subirFoto() {
  const input = document.getElementById("foto");
  const estado = document.getElementById("estado");
  const collage = document.getElementById("collage");

  const archivo = input.files[0];

  if (!archivo) {
    estado.textContent = "Selecciona una foto 💔";
    return;
  }

  estado.textContent = "Subiendo tu foto... 💘";

  const formData = new FormData();
  formData.append("file", archivo);
  formData.append("upload_preset", "public_upload");

  fetch("https://api.cloudinary.com/v1_1/du4n5yo04/image/upload", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      const img = document.createElement("img");
      img.src = data.secure_url;
      collage.prepend(img);
      estado.textContent = "💖 Foto agregada al collage";
      input.value = "";
    })
    .catch(() => {
      estado.textContent = "Error al subir ❌";
    });
}

// CORAZONES FLOTANDO ❤️
const hearts = document.querySelector(".hearts");

setInterval(() => {
  const heart = document.createElement("span");
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 3 + Math.random() * 3 + "s";
  hearts.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}, 400);