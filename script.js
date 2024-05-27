window.addEventListener('DOMContentLoaded', function() {
  let participants = {}
  fetch('http://localhost:3000/poll')
    .then(response => response.json())
    .then(response => {
      participants = response
      const { first_participant, second_participant } = response;
      document.getElementById('first-participant-name').innerHTML = first_participant.name;
      document.getElementById('second-participant-name').innerHTML = second_participant.name;
      document.getElementById("first-participant-picture").src = first_participant.picture;
      document.getElementById("second-participant-picture").src = second_participant.picture;
    })

  const buttons = this.document.querySelectorAll('button');

  buttons.forEach(button => {
    button.addEventListener('click', function(){
      const participant = this.getAttribute('data-id');

      const data = {
        vote: {
          participant_id: participants[participant].id
        }
      }

      fetch(`http://localhost:3000/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .catch(error => console.log(error));
    })
  })

})