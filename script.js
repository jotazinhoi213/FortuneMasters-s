window.addEventListener('DOMContentLoaded', function() {
    var numJogadasElement = document.getElementById('numJogadas');
    var pegarSinalButton = document.getElementById('pegarSinalButton');
  
    var cooldownTime = 180; // 3 minutos em segundos
    var cooldownInterval;
    
    // Verifica se o número de jogadas e o cooldown estão armazenados no localStorage
    if (localStorage.getItem('numJogadas') && localStorage.getItem('cooldownEnd')) {
      var numJogadas = localStorage.getItem('numJogadas');
      var cooldownEnd = localStorage.getItem('cooldownEnd');
      var remainingTime = cooldownEnd - Date.now() / 1000; // Tempo restante em segundos
  
      if (remainingTime > 0) {
        pegarSinalButton.disabled = true;
        iniciarCooldown(remainingTime);
      } else {
        numJogadasElement.textContent = numJogadas;
        pegarSinalButton.disabled = false;
      }
    }
  
    function iniciarCooldown(remainingTime) {
      var cooldownSeconds = Math.floor(remainingTime);
      pegarSinalButton.disabled = true;
      pegarSinalButton.textContent = 'Aguarde ' + cooldownSeconds + 's';
  
      cooldownInterval = setInterval(function() {
        cooldownSeconds--;
        pegarSinalButton.textContent = 'Aguarde ' + cooldownSeconds + 's';
  
        if (cooldownSeconds <= 0) {
          clearInterval(cooldownInterval);
          pegarSinalButton.disabled = false;
          pegarSinalButton.textContent = 'Pegar Sinal';
          localStorage.removeItem('cooldownEnd');
        }
      }, 1000);
    }
  
    function pegarSinal() {
      var numJogadas = Math.floor(Math.random() * 10) + 1; // Gera um número aleatório de 1 a 10
      numJogadasElement.textContent = numJogadas;
  
      var cooldownEnd = Math.floor(Date.now() / 1000) + cooldownTime; // Calcula o momento de término do cooldown
      localStorage.setItem('numJogadas', numJogadas);
      localStorage.setItem('cooldownEnd', cooldownEnd);
  
      pegarSinalButton.disabled = true;
      iniciarCooldown(cooldownTime);
    }
  
    pegarSinalButton.addEventListener('click', pegarSinal);
  });
  