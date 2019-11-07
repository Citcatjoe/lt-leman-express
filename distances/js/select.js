'use strict';


$.getJSON( "json/distances.json", function(data) {
  // console.log(data)

  // pour jQuery
  var inputFields = $('.chosen-value');
  var dropdowns = $('.value-list');

  // accès rapide aux li en vanilla js
  var dropdownArray = [].concat(document.querySelectorAll('li'));
  var dropdownItems = dropdownArray[0];

  // valeurs
  var valueArray = [];
  var slugs = [];



  $('.unique-list li').each(function(){
      valueArray.push($(this).text());

      slugs.push($(this).text().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')); // todo: sans accents etc.
  });

  /*
  // debug: pour checker que tout matche entre json et li
  for (var i = 0; i < data.length; i++) {
    if(valueArray.indexOf( data[i]['from'] ) < 0){
      console.log(data[i]['from'])
    }

  }
  for (var i = 0; i < data.length; i++) {
    if(valueArray.indexOf( data[i]['to'] ) < 0){
      console.log(data[i]['to'])
    }
  }
  */

  /*
  Affichage des résultats
  */

  function displaySchedule(){
    var from = $('.chosen-value.from').val();
    var to = $('.chosen-value.to').val();

    if(from && to){

      var found = false;

      for (var i = 0; i < data.length; i++) {
        if( (data[i]['from'] == from) && (data[i]['to'] == to) ){
          found = true;
          console.log(data[i]);

          var minutes = data[i]['distance'];
          var time;
          if (minutes > 60){
            var hours = Math.floor(minutes / 60);
            minutes = minutes % 60;
            if (hours > 1){
              time = hours + ' heures et ' + minutes + ' minutes'
            }else{
              time = 'une heure et ' + minutes + ' minutes'
            }
          }else{
            time = minutes + ' minutes'
          }

          $('#schedule-result div.error').text('');

          $('#schedule-result div.time .prepend').text('Le trajet dure ')
          $('#schedule-result div.time .bigfat').text(time)
          $('#schedule-result div.time .append').text('dans ce sens.')
          $('#schedule-result div.time .reverse').text('Voir le trajet en sens inverse')

          // $('#schedule-result div.price').text(data[i]['price'] + ' CHF pour un billet de 2e classe plein tarif')
        }
      }
      if(!found){
        $('#schedule-result div.time *').text('');

        if(from == to){
          $('#schedule-result div.error').text('Merci de choisir deux stations différentes.')
        }else{
          $('#schedule-result div.error').text('Aucune information trouvée.')
        }
      }
    }
  }

  /*
  Menu déroulant avec filtre
  */

  inputFields.each(function(i, d){
    $(this).on('input', function () {
      var targetValues = $(this).data('values');
      var targetDropdown = $('.value-list.' + targetValues);
      targetDropdown.addClass('open');

      var inputValue = $(this).val().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      var targetDropdownItems = targetDropdown.find('li');

      var valueSubstring = undefined;
      if (inputValue.length > 0) {
        for (var j = 0; j < valueArray.length; j++) {

          if (!(slugs[j].includes(inputValue))) {
            targetDropdownItems[j].classList.add('closed');
          } else {
            targetDropdownItems[j].classList.remove('closed');
          }
        }
      } else {
        for (var i = 0; i < dropdownItems.length; i++) {
          targetDropdownItems[i].classList.remove('closed');
        }
      }


    })
  });

  // Choix d’une valeur
  $('.value-list li').on('click', function(e){
    $(this).parent().prev().val($(this).text())
    $('.value-list li').addClass('closed');

    displaySchedule();

    e.stopPropagation();
  });

  $('.reverse').click(function(e){
    var from = $('.chosen-value.from').val();
    var to = $('.chosen-value.to').val();
    $('.chosen-value.from').val(to);
    $('.chosen-value.to').val(from);

    displaySchedule();
    e.stopPropagation();
  })

  inputFields.each(function(i, d){

    // pour permettre de fermer quand clic dehors
    $(this).on('click', function (e) {
      e.stopPropagation();
    });

    // focus dans l'input
    $(this).on('focus', function (e) {

      // On invite à taper
      // $(this).attr('placeholder', "");
      $(this).select();

      var targetValues = $(this).data('values');
      var targetDropdown = $('.value-list.' + targetValues);
      targetDropdown.addClass('open');


      targetDropdown.find('li').each(function(){
        $(this).removeClass('closed')
      })
    });
  });



  inputFields.each(function(i, d){
    $(this).on('blur', function () {
      var targetValues = $(this).data('values');
      var targetDropdown = $('.value-list.' + targetValues);
      targetDropdown.addClass('closed');
    });
  });
  $('body').click(function() {
    $('.value-list').addClass('closed');
    $('.value-list li').addClass('closed');
  });

})
.fail(function() {
  console.log( "Erreur chargement des arrêts" );
  $('#schedule-result div.error').text('Erreur lors du chargement des données.')
});
