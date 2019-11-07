'use strict';



var inputFields = $('.chosen-value');
var dropdowns = $('.value-list');
var dropdownArray = [].concat(document.querySelectorAll('li'));
var dropdownItems = dropdownArray[0];

var valueArray = [];
var slugs = [];
$('.unique-list li').each(function(){
    valueArray.push($(this).text());
    slugs.push($(this).text().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')); // todo: sans accents etc.
});

var closeDropdown = function closeDropdown() {
  dropdown.classList.remove('open');
};

const dropdown = document.querySelector('.value-list');
// dropdown.classList.add('open');
// inputField.focus();

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

$('.value-list li').on('click', function(e){
  $(this).parent().prev().val($(this).text())
  $('.value-list li').addClass('closed');
  e.stopPropagation();
});

inputFields.each(function(i, d){
  $(this).on('focus', function () {
    $(this).attr('placeholder', $(this).data('placeholder'));

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
$('.interactive-container').click(function() {
  console.log('x')
  $('.value-list').addClass('closed');
  // $('.value-list li').addClass('closed');
});
