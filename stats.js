window.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/stats')
    .then(response => response.json())
    .then(response => {
      const { participants, total_votes, votes_by_hour } = response;
      const { first_participant, second_participant } = participants
      console.log(response)

      document.getElementById("first-participant-name").innerHTML = first_participant.participant.name;
      document.getElementById("second-participant-name").innerHTML = second_participant.participant.name;

      document.getElementById("first-participant-count").innerHTML = first_participant.votes;
      document.getElementById("second-participant-count").innerHTML = second_participant.votes;

      const firstParticipantPercent = Math.round((first_participant.votes * 100) / total_votes);
      const secondParticipantPercent = Math.round((second_participant.votes * 100) / total_votes);

      document.getElementById("first-participant-graph").style.width = `${firstParticipantPercent*4}px`;
      document.getElementById("second-participant-graph").style.width = `${secondParticipantPercent*4}px`;

      document.getElementById("first-participant-percent").innerHTML = `${firstParticipantPercent}%`;
      document.getElementById("second-participant-percent").innerHTML = `${secondParticipantPercent}%`;

      const list = document.getElementById("data-list");

      Object.keys(votes_by_hour).forEach(key => {
          const textoItem = `${formatedDate(key)}: ${votes_by_hour[key]}`

          const newItem = document.createElement("p");
          newItem.textContent = textoItem;

          list.appendChild(newItem);
      })


    });
})

function formatedDate(dataString) {
    // Cria um objeto Date a partir da string no formato ISO
    let data = new Date(dataString);

    // Obtém os componentes da data e hora
    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    let ano = data.getFullYear();
    let horas = String(data.getHours()).padStart(2, '0');
    let minutos = String(data.getMinutes()).padStart(2, '0');

    // Formata a data e hora no formato desejado
    let dataFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    return dataFormatada;
}