(function (DOM, win, doc) {
  "use strict";

  /*
    Vamos estruturar um pequeno app utilizando módulos.
    Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
    A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
    seguinte forma:
    - No início do arquivo, deverá ter as informações da sua empresa - nome e
    telefone (já vamos ver como isso vai ser feito)
    - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
    um formulário para cadastro do carro, com os seguintes campos:
      - Imagem do carro (deverá aceitar uma URL)
      - Marca / Modelo
      - Ano
      - Placa
      - Cor
      - e um botão "Cadastrar"
    Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
    carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
    aparecer no final da tabela.
    Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
    empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
    Dê um nome para a empresa e um telefone fictício, preechendo essas informações
    no arquivo company.json que já está criado.
    Essas informações devem ser adicionadas no HTML via Ajax.
    Parte técnica:
    Separe o nosso módulo de DOM criado nas últimas aulas em
    um arquivo DOM.js.
    E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
    que será nomeado de "app".
    */

  var app = (function () {
    return {
      init: function () {
        this.getCompanyData();
        this.initEvents();
        this.getCarDataFromServer();
      },

      getCompanyData: function getCompanyData() {
        var ajax = new XMLHttpRequest();

        ajax.open("GET", "company.json");
        ajax.send();
        ajax.addEventListener("readystatechange", this.setCompanyData, false);
      },

      setCompanyData: function setCompanyData() {
        if (app.isRequestOk.call(this)) {
          var $companyName = DOM("[data-js=companyName]");
          var $companyPhone = DOM("[data-js=companyPhone]");
          var parsedData = JSON.parse(this.responseText);
          $companyName.get().textContent = parsedData.name;
          $companyPhone.get().textContent = parsedData.phone;
        }
      },

      isRequestOk: function isRequestOk() {
        return this.readyState === 4 && this.status === 200;
      },

      getCarDataFromServer: function getCarDataFromServer() {
        var ajaxGetCar = new XMLHttpRequest();
  
        ajaxGetCar.open("GET", "http://localhost:3000/car");
        ajaxGetCar.send();
        ajaxGetCar.addEventListener("readystatechange", this.fetchCarData,false);
      },

      fetchCarData: function fetchCarData() {
        if (app.isRequestOk.call(this)) {
          var allCars = JSON.parse(this.responseText);
          
          allCars.forEach((car) => {
            app.addCarToTable(
              car.image,
              car.brandModel,
              car.year,
              car.plate,
              car.color
            );
          });
        }
      },

      saveCarData: function saveCarData() {
        var $inputValues = this.getInputValues();
        var ajaxPostCar = new XMLHttpRequest();
        ajaxPostCar.open("POST", "http://localhost:3000/car");
        ajaxPostCar.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        var image = $inputValues.imagem;
        var brandModel = $inputValues.modelo;        
        var year = $inputValues.ano;
        var plate = $inputValues.placa;
        var color = $inputValues.cor;
        
        ajaxPostCar.send(`image=${image}&brandModel=${brandModel}&year=${year}&plate=${plate}&color=${color}`);
      },

      removeCarData: function removeCarData(plate){
        var ajaxDeleteCar = new XMLHttpRequest()
        ajaxDeleteCar.open("DELETE", "http://localhost:3000/car");
        ajaxDeleteCar.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        ajaxDeleteCar.send(`plate=${plate}`)
      },

      initEvents: function initEvents() {
        var $carForm = DOM("[data-js=carForm]");
        $carForm.on("submit", this.handleSubmit);
      },

      handleSubmit: function handleSubmit(event) {
        event.preventDefault();
        app.saveCarData()
        app.newCar();
      },

      handleDelete: function handleDelete(event) {
        event.preventDefault();
        var $deletedRow = this.parentNode.parentNode;
        var $deletedPlate = $deletedRow.children[3].textContent
        var $table = $deletedRow.parentNode;
        app.removeCarData($deletedPlate)
        $table.removeChild($deletedRow);
      },

      newCar: function newCar() {
        var $inputValues = this.getInputValues();
        this.addCarToTable(
          $inputValues.imagem,
          $inputValues.modelo,
          $inputValues.ano,
          $inputValues.placa,
          $inputValues.cor
        );
      },

      addCarToTable: function addCarToTable(imagem, modelo, ano, placa, cor) {
        var $carTable = DOM("[data-js=carTable]");

        var $fragment = doc.createDocumentFragment();
        var $newRow = doc.createElement("tr");
        var $imagemCell = doc.createElement("td");
        var $imagem = doc.createElement("img");
        var $modeloCell = doc.createElement("td");
        var $anoCell = doc.createElement("td");
        var $placaCell = doc.createElement("td");
        var $corCell = doc.createElement("td");
        var $deleteCell = doc.createElement("td");

        var $deleteButton = doc.createElement("button");
        $deleteButton.innerHTML = "Deletar";
        $deleteButton.addEventListener("click", this.handleDelete, false);
        $deleteCell.appendChild($deleteButton);

        $imagem.src = imagem;
        $imagemCell.appendChild($imagem);
        $modeloCell.textContent = modelo;
        $anoCell.textContent = ano;
        $placaCell.textContent = placa;
        $corCell.textContent = cor;

        $newRow.appendChild($imagemCell);
        $newRow.appendChild($modeloCell);
        $newRow.appendChild($anoCell);
        $newRow.appendChild($placaCell);
        $newRow.appendChild($corCell);
        $newRow.appendChild($deleteCell);

        $fragment.appendChild($newRow);
        $carTable.get().appendChild($fragment);
      },

      getInputValues: function getInputValues() {
        var $inputImagem = DOM("[data-js=imagem]").get().value;
        var $inputModelo = DOM("[data-js=modelo]").get().value;
        var $inputAno = DOM("[data-js=ano]").get().value;
        var $inputPlaca = DOM("[data-js=placa]").get().value;
        var $inputCor = DOM("[data-js=cor]").get().value;

        return {
          imagem: $inputImagem,
          modelo: $inputModelo,
          ano: $inputAno,
          placa: $inputPlaca,
          cor: $inputCor,
        };
      },
    };
  })();

  app.init();
})(window.DOM, window, document);
