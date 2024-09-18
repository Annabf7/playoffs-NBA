export function updatePageContent(league) {
  // Configura els enllaços de les xarxes socials
  document.getElementById("facebookLink").href = `https://www.facebook.com/nba`;
  document.getElementById("twitterLink").href = `https://www.twitter.com/nba`;
  document.getElementById("youtubeLink").href = `https://www.youtube.com/NBA`;

  // Carrega les imatges
  const fanartImages = [
    { id: "fanart1", src: league.strFanart1, alt: "FAN Art: Trofeu de la NBA" },
    { id: "fanart2", src: league.strFanart2, alt: "Fan Art: Logo de la NBA" },
    { id: "fanart3", src: league.strFanart3, alt: "Fan Art: Mapa d'equips de la NBA" },
    { id: "fanart4", src: league.strFanart4, alt: "Fan Art: Simbol del Bàsquet" },
  ];

  fanartImages.forEach((image) => {
    const imgElement = document.getElementById(image.id);
    imgElement.src = image.src;
    imgElement.alt = image.alt;
    imgElement.title = image.alt;
    imgElement.addEventListener("click", function () {
      document.getElementById("largeImage").src = image.src;
      document.getElementById("largeImage").alt = image.alt;
      new bootstrap.Modal(document.getElementById("imageModal")).show();

      // Mostrar el fons enfosquit
      document.getElementById("backdrop").classList.add("show");
      document.getElementById("infoModal").classList.add("blurred");
    });
  });
}

export function showModal(league) {
  document.getElementById("leagueDescription").innerHTML = `
    <p>La <strong>National Basketball Association</strong> o <strong>NBA</strong> (Associació Nacional de Bàsquet) és la principal lliga nord-americana de bàsquet professional.</p>
    <p>La <strong>NBA</strong> es va fundar a <strong>Nova York el 6 de juny de 1946</strong> com a Basketball Association of America. Va adoptar el nom actual el 1949, després de la unió de diversos clubs de la desapareguda <u>National Basketball League</u>.</p>
    <p>El <strong>partit inaugural</strong> va ser New York Knicks vs. Toronto Huskies, l'1 de novembre de 1946 amb el Maple Leaf Gardens de Toronto com a escenari. Va ser vist per 7.090 espectadors.</p>
    <p>La lliga té les seves oficines oficials situades a <u>l'Olympic Tower</u> a la Cinquena Avinguda 645 de Nova York. Els estudis de <strong>NBA Entertainment</strong> i <strong>NBA TV</strong> estan ubicats a Secaucus, Nova Jersey.</p>
  `;
  document.getElementById("leagueDescription").style.textAlign = "justify";

  updatePageContent(league); // Actualitza el contingut de la pàgina

  const infoModal = new bootstrap.Modal(document.getElementById("infoModal"));
  infoModal.show();

  // Listener per esborrar el LocalStorage quan es tanqui el modal
  document.getElementById("infoModal").addEventListener("hidden.bs.modal", function () {
    localStorage.removeItem("modalOpened");
    localStorage.removeItem("leagueData");
    location.reload(); // Refresca la pàgina quan es tanqui el modal de "Descripció de la Lliga"
  });
}

// JavaScript per gestionar l'enfosquiment i refresc de la pàgina
document.getElementById("imageModal").addEventListener("hidden.bs.modal", function () {
  document.getElementById("backdrop").classList.remove("show");
  document.getElementById("infoModal").classList.remove("blurred");
});
