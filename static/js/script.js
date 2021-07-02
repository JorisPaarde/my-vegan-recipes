$(document).ready(function () {
  $('.sidenav').sidenav();
  $('select').formSelect();
  fadeOutFlash();
  $('.modal').modal();
});

function fadeOutFlash() {
  $('.flashes').delay(4000).slideUp('slow');
}

//-----------------------------------------------  Add a line to recipe ingredient input
$('#add-ingredient').click(function () {

  let recipeInputHtml = `
  <div class="row recipe-item ingredient">
                <!-- ingredient -->
                <div class="input-field col s12 m8">
                    <input name="ingredient_name" type="text" maxlength="100" class="validate_me">
                    <label for="ingredient_name">Ingredient</label>
                </div>
                <div class="input-field col s4 m1">
                    <input name="amount" type="text" maxlength="5" class="validate_me">
                    <label for="amount">Amount</label>
                </div>
                <div class="col s6 m2">
                    <label>Unit</label>
                    <select class="browser-default" name="unit_name">
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                        <option value="l">l</option>
                        <option value="ml">ml</option>
                        <option value="pcs">pcs</option>
                    </select>
                </div>
                <div class="col s2 m1 l1">
                    <button type="button" class="delete btn-floating btn-small waves-effect waves-light red">
                        <i class="material-icons">delete</i>
                    </button>
                </div>
            </div>
  `
  // add after the last added ingredient
  $('.ingredient').last().after(recipeInputHtml);
});

//----------------------------------------------- Add a line to recipe preparation input
$('#add-prep-step').click(function () {

  let recipeInputHtml = `
<div class="row prep-step recipe-item valign-wrapper">
  <div class="col s10 m11 l11">
      <div class="input-field preparation_step col s12">
          <textarea name="preparation_step" type="text" maxlength="400" class="validate_me"></textarea>
          <label class="textarea-label" for="preparation_step">Preparation step</label>
      </div>
  </div>
  <div class="col s2 m1 l1">
      <button type="button" class="delete btn-floating btn-small waves-effect waves-light red">
          <i class="material-icons">delete</i>
      </button>
  </div>
</div>
  `
  // add after the last added step
  $('.prep-step').last().after(recipeInputHtml);
});

//----------------------------------------------- remove ingredient line
$('.add-recipe').click(function (event) {
  buttonClass = $(event.target).parent().attr("class");

  if (buttonClass.includes("delete")) {
    item = $(event.target).closest(".recipe-item");

    let ingredientsLeftAfterDelete = $(event.target).closest(".recipe-item").siblings(".ingredient").length
    let prepStepsLeftAfterDelete = $(event.target).closest(".recipe-item").siblings(".prep-step").length

    // only delete if one item is left after deleting
    if ((ingredientsLeftAfterDelete > 0) && (prepStepsLeftAfterDelete > 0)) {
      // show deletion confirmation modal
      $('#item-delete-modal').show();
      // if yes is clicked on the modal
      $('#yes-delete').click(function () {
        item.remove();
        $('#item-delete-modal').hide();
      });
      // if no is clicked on the modal
      $('#no-delete').click(function () {
        $('#item-delete-modal').hide();
      });
    }
    let isPrepstep = $(event.target).closest(".recipe-item").hasClass("prep-step");
    let isIngredient = $(event.target).closest(".recipe-item").hasClass("ingredient");
    // if this is the last ingredient or the last preparation step
    if (((ingredientsLeftAfterDelete == 0) && (isIngredient)) || ((prepStepsLeftAfterDelete == 0) && (isPrepstep))) {
      //show please don't delete modal
      $('#delete-me-not').show();
      $('#ok-no-delete').click(function () {
        $('#delete-me-not').hide();
      });
    }
  }
});

//-----------------------------------------------  Form validation

function validateForm() {

  // remove all previously shown validation text
  $('.validation-text').remove()

  // find all elements to validate
  let formElements = $('.validate_me')
  // iterate over all form elements
  for (let i = 0; i < formElements.length; i++) {

    var thisField = formElements[i]
    var thisFieldName = thisField.attributes.name.value
    var input = thisField.value
    var checkedLength
    var checkedCharacters
    var checkedUrl

    // check this field's name
    switch (thisFieldName) {

      case 'recipe_title':
        // ----------------------------------------------------if this is a title
        checkedCharacters = checkcharacters(input, thisFieldName)
        checkedLength = checklength(input, 3, 100, thisFieldName)

        // input is valid if it passes all checks
        validInput = checkedLength.valid && checkedCharacters.valid

        //stop form from being submitted and display why
        if (!validInput) {
          displayValidationText(checkedLength.validationText, thisField)
          displayValidationText(checkedCharacters.validationText, thisField)
          return false
        }
        break;
      
      case 'category_name':
        // ---------------------------------------------------if this is category name
        if (input == ""){
          displayValidationText("Please select a category" , thisField);
          return false
        } 
        break;

      case 'image_url':
        // -----------------------------------------------------if this is a url
        checkedUrl = checkurl(input, thisFieldName)

        // input is valid if it passes all checks
        validInput = checkedUrl.valid

        //stop form from being submitted and display why
        if (!validInput) {
          displayValidationText(checkedUrl.validationText, thisField)
          return false
        }
        break;

      case 'recipe_description':
        // if this is a recipe_description
        checkedCharacters = checkcharacters(input, thisFieldName)
        checkedLength = checklength(input, 10, 200, thisFieldName)

        // input is valid if it passes all checks
        validInput = checkedLength.valid && checkedCharacters.valid

        //stop form from being submitted and display why
        if (!validInput) {
          displayValidationText(checkedLength.validationText, thisField)
          displayValidationText(checkedCharacters.validationText, thisField)
          return false
        }
        break;

      case 'ingredient_name':
        // -----------------------------------------------if this is an ingredient
        checkedCharacters = checkcharacters(input, thisFieldName)
        checkedLength = checklength(input, 3, 100, thisFieldName)

        // input is valid if it passes all checks
        validInput = checkedLength.valid && checkedCharacters.valid

        //stop form from being submitted and display why
        if (!validInput) {
          displayValidationText(checkedLength.validationText, thisField)
          displayValidationText(checkedCharacters.validationText, thisField)
          return false
        }
        break;

      case 'amount':
        // ------------------------------------------------------if this is an amount
        checkedNumber = checknumbers(input, thisFieldName)
        checkedLength = checklength(input, 1, 5, thisFieldName)

        // input is valid if it passes all checks
        validInput = checkedNumber.valid && checkedCharacters.valid

        //stop form from being submitted and display why
        if (!validInput) {
          displayValidationText(checkedLength.validationText, thisField)
          displayValidationText(checkedNumber.validationText, thisField)
          return false
        }
        break;
        
      case 'preparation_step':
        // -----------------------------------------------if this is a preparation step
        checkedCharacters = checkcharacters(input, thisFieldName)
        checkedLength = checklength(input, 10, 400, thisFieldName)

        // input is valid if it passes all checks
        validInput = checkedLength.valid && checkedCharacters.valid

        //stop form from being submitted and display why
        if (!validInput) {
          displayValidationText(checkedLength.validationText, thisField)
          displayValidationText(checkedCharacters.validationText, thisField)
          return false
        }
        break;

      case 'user_name':
        // -------------------------------------------------------if this is a username
        checkedLength = checklength(input, 5, 20, thisFieldName)

        // input is valid if it passes all checks
        validInput = checkedLength.valid

        //stop form from being submitted and display why
        if (!validInput) {
          displayValidationText(checkedLength.validationText, thisField)
          return false
        }
        break;

      case 'password':
        // -----------------------------------------------------if this is a password
        checkedPassword = checkpassword(input)
        checkedLength = checklength(input, 8, 64, thisFieldName)

        // input is valid if it passes all checks
        validInput = checkedPassword.valid && checkedLength.valid

        //stop form from being submitted and display why
        if (!validInput) {
          displayValidationText(checkedLength.validationText, thisField)
          displayValidationText(checkedPassword.validationText, thisField)
          return false
        }
        break;
    };
  };
  return true
};

//-----------------------------------------------  Validation helper functions
//-----------------------------------------------  Validation text display
function displayValidationText(text, thisField) {
  // set html if a text needs to be displayed
  let html;
  if (text.length > 1) {
    html = `
    <p class="validation-text red-text text-lighten-1 center-align">${text}</p>
  `
    // scroll to the error message
    setTimeout(function () {
      console.log('scrollen maar')
      thisField.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 0);

  };
  // display this text after this validated item
  if (html) {
    $(thisField).closest('.row').after(html)
  };
};

//-----------------------------------------------  Length validation
function checklength(input, min, max, thisFieldName) {
  console.log('checklength')
  // remove spaces from input
  input = input.replace(/\s/g, '');
  // modify name by replacing _ for a space
  thisFieldName = thisFieldName.replace(/_/g, ' ');
  // check the input to the parameters
  valid = (min <= input.length) && (input.length <= max);
  var validationText = ""
  // set validation text
  if (!valid) {
    validationText = `Please use between ${min} and ${max} characters for ${thisFieldName}`
  }
  // return results
  return {
    valid: valid,
    validationText: validationText
  };
};

//-----------------------------------------------  Letter validation
function checkcharacters(input, thisFieldName) {
  console.log('checkletters')
  // check for pairs of at least 2 letters
  regex = /[a-z]|[A-Z]{2,3}/g
  valid = regex.test(input);
  // modify name by replacing _ for a space
  thisFieldName = thisFieldName.replace(/_/g, ' ');
  // set validation text
  validationText = ""
  if (!valid) {
    validationText = `Please use letters for ${thisFieldName}`
  }
  // return results
  return {
    valid: valid,
    validationText: validationText
  };
}

//-----------------------------------------------  Password validation
function checkpassword(input) {
  console.log('checkpassw')
  // check for capital letter, normal letter, special character, digit
  regexs = [/[a-z]/g, /[A-Z]/g, /[0-9]/g, /[^A-Za-z0-9\s]/g];
  
  testItems = [' a lowercase letter', ' a capital letter', ' a digit', ' a special character']

  var testsPassed = 0;
  for (let i = 0; i < regexs.length; i++) {

    valid = regexs[i].test(input);
    if (valid) {
      testsPassed++;
      // remove this testitem from the validation text
      testItems[i] = ''
    };
  };
  //reset valid value to prevent that last check passes all checks
  valid = false;

  // set validation text
  validationText = ""
  if (testsPassed < 4) {
    validationText = `Password should include:${testItems[0]}${testItems[1]}${testItems[2]}${testItems[3]}.`
  } else {
    valid = true;
  }

  // return results
  return {
    valid: valid,
    validationText: validationText
  };
}

//-----------------------------------------------  Number validation

function checknumbers(input, thisFieldName) {
  console.log('checknumbers')
  // check for numbers
  regex = /[0-9]/g
  valid = regex.test(input);
  // modify name by replacing _ for a space
  thisFieldName = thisFieldName.replace(/_/g, ' ');
  // set validation text
  validationText = ""
  if (!valid) {
    validationText = `Please use numbers for ${thisFieldName}`
  }
  // return results
  return {
    valid: valid,
    validationText: validationText
  };
}

//-----------------------------------------------  Url validation

function checkurl(input, thisFieldName) {
  console.log('checkurl')
  // check for https://
  regex = /https?:\/{2,}/g
  valid = regex.test(input);
  // modify name by replacing _ for a space
  thisFieldName = thisFieldName.replace(/_/g, ' ');
  // set validation text
  validationText = ""
  if (!valid) {
    validationText = `Please use https:// in your ${thisFieldName}`
  }
  // return results
  return {
    valid: valid,
    validationText: validationText
  };
}