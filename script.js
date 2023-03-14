//poner aqui la api key
const API_KEY = '${{ secrets.API_KEY }}';

async function obtenerTexto(tema) {
    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `"${tema}"`,
        max_tokens: 300,
        temperature: 0.6
      })
    });
    const data = await response.json();
    return data.choices[0].text;
  }

  document.addEventListener('DOMContentLoaded', function() {
    const boton = document.querySelector('.btn');
    boton.addEventListener('click', function() {
      const nameInput = document.querySelector('#name');
      const nameValue = nameInput.value;
      const nameCard = document.querySelector('.paragraph');
      if(nameValue == ''){
        nameCard.innerHTML = 'Completa el campo';
      }
      else{
        nameCard.innerHTML = 'Generando';
        const intervalId = mostrarGenerando(nameCard);
        obtenerTexto(nameValue).then(function(result) {
        detenerGenerando(intervalId, nameCard, result.trim());
        });
      }  
    });
  });
  
  function mostrarGenerando(nameCard) {
    let dots = 0;
    return setInterval(function() {
      dots++;
      if (dots % 4 === 0) {
        nameCard.innerHTML = 'Generando';
        dots = 0;
      } else {
        nameCard.innerHTML += '.';
      }
    }, 600);
  }

  function detenerGenerando(intervalId, nameCard, result) {
    // Detener el intervalo
    clearInterval(intervalId); 
    nameCard.innerHTML = result;
  }
  
  
