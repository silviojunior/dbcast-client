function saveCharacter() {
    let fdata = new FormData();
    let nome = iptName.value;
    let tipo = iptCharacterTypes;
    let descricao = iptDescription;
    let imagem = iptCustomFileChar.files[0];
  
    let character = {
      name: nome,
      type: tipo.options[tipo.selectedIndex].text,
      description: descricao
    };
  
    let characterBody = JSON.stringify(character);
  
    fdata.append("character", characterBody);
    fdata.append("image", imagem);
  
    axios
      .post(`http://localhost:8080/character`, fdata)
      .then(function (response) {
        clearCharacterForm();
        let closeModal = document.getElementById("closeModal");
        closeModal.click();
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  
  function clearCharacterForm() {
    iptName.value = "";
    iptCharacterTypes.value = 0;
    iptDescription.value = "";
    iptCustomFileChar.files[0] = "";
  }