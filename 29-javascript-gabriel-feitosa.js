(function (DOM,win,doc) {
    'use strict';
  
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

    var ajax = new XMLHttpRequest()
    var $companyName=  DOM('[data-js=companyName]')
    var $companyPhone=  DOM('[data-js=companyPhone]')
    var $carForm =  DOM('[data-js=carForm]')

    $carForm.on('submit', handleSubmit)

    function handleSubmit(event){
        event.preventDefault()
        var $carTable = DOM('[data-js=carTable]')
        console.log($carTable)
        $carTable.get().appendChild(newCar())
    }

    function newCar(){
        var $fragment = doc.createDocumentFragment()
        var $newRow = doc.createElement('tr')
        var $imagemCell = doc.createElement('td')
        var $modeloCell = doc.createElement('td')
        var $anoCell = doc.createElement('td')
        var $placaCell = doc.createElement('td')
        var $corCell = doc.createElement('td')

        $imagemCell.textContent =  DOM('[data-js=imagem]').get().value
        $modeloCell.textContent =  DOM('[data-js=modelo]').get().value
        $anoCell.textContent =  DOM('[data-js=ano]').get().value
        $placaCell.textContent =  DOM('[data-js=placa]').get().value
        $corCell.textContent = DOM('[data-js=cor]').get().value

        $newRow.appendChild($imagemCell)
        $newRow.appendChild($modeloCell)
        $newRow.appendChild($anoCell)
        $newRow.appendChild($placaCell)
        $newRow.appendChild($corCell)
        
        return $fragment.appendChild($newRow)
    }

    function getCompanyData(){
        ajax.open('GET','company.json')
        ajax.send()
        ajax.addEventListener('readystatechange', handleReadyEventChange,false)
    }

    function setCompanyData(){
        var parsedData = JSON.parse(ajax.responseText)
        $companyName.get().textContent = parsedData.name
        $companyPhone.get().textContent = parsedData.phone 
    }

    getCompanyData()

    function handleReadyEventChange(){
        if(isRequestOk() ) {
          setCompanyData()
        }
        
      }

      function isRequestOk(){
        return ajax.readyState === 4 && ajax.status === 200
      }

  
  })(window.DOM, window, document);
  