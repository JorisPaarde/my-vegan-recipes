
$(document).ready(function(){
  $('.sidenav').sidenav();
  $('select').formSelect();
  fadeOutFlash();
  $('.modal').modal();
});

function fadeOutFlash(){
  $('.flashes').delay(4000).slideUp('slow');
}

//-----------------------------------------------  Add a line to recipe ingredient input
  $('#add-ingredient').click(function(){

  let recipeInputHtml = `
  <div class="row recipe-item ingredient">
                <!-- ingredient -->
                <div class="input-field col s12 m8">
                    <input name="ingredient_name" type="text" class="validate_me">
                    <label for="ingredient_name">Ingredient</label>
                </div>
                <div class="input-field col s4 m1">
                    <input name="amount" type="text" class="validate_me">
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
  $( '.ingredient' ).last().after(recipeInputHtml);
});

//----------------------------------------------- Add a line to recipe preparation input
$('#add-prep-step').click(function(){

let recipeInputHtml = `
<div class="row prep-step recipe-item valign-wrapper">
  <div class="col s10 m11 l11">
      <div class="input-field preparation_step col s12">
          <textarea name="preparation_step" type="text" class="validate_me"></textarea>
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
$( '.prep-step' ).last().after(recipeInputHtml);
});

//----------------------------------------------- remove ingredient line
$('.add-recipe').click(function(event){
  buttonClass = $(event.target).parent().attr("class");
 
  if (buttonClass.includes("delete")){
    item = $(event.target).closest(".recipe-item");
    
    let ingredientsLeftAfterDelete = $(event.target).closest(".recipe-item").siblings(".ingredient").length
    let prepStepsLeftAfterDelete = $(event.target).closest(".recipe-item").siblings(".prep-step").length
    
    // only delete if one item is left after deleting
    if ((ingredientsLeftAfterDelete > 0) && (prepStepsLeftAfterDelete > 0)){
      // show deletion confirmation modal
      $('#item-delete-modal').show();
      // if yes is clicked on the modal
      $('#yes-delete').click(function(){
        item.remove();
        $('#item-delete-modal').hide();
      });
      // if no is clicked on the modal
      $('#no-delete').click(function(){
        $('#item-delete-modal').hide();
      });
    }
    let isPrepstep = $(event.target).closest(".recipe-item").hasClass("prep-step");
    let isIngredient = $(event.target).closest(".recipe-item").hasClass("ingredient");
    // if this is the last ingredient or the last preparation step
    if (((ingredientsLeftAfterDelete == 0)&&(isIngredient)) || ((prepStepsLeftAfterDelete == 0)&&(isPrepstep))){
      //show please don't delete modal
      $('#delete-me-not').show();
      $('#ok-no-delete').click(function(){
        $('#delete-me-not').hide();
      });
    }
  }
});

//-----------------------------------------------  From validation

function validateForm(){
  // find all elements to validate
  let formElements = $('.validate_me')
  // iterate over all form elements
  for (let i = 0; i < formElements.length; i++){

    let thisField = formElements[i]
    let thisFieldName = thisField.attributes.name.value

    console.log(thisField)

    // check this field's name
    switch(thisFieldName) {
      // if this is a title
      case 'recipe_title':
        console.log('title')
        break;
      // if this is a url
      case 'image_url' :
        console.log('url')
         // https?://.+
        break;
      // if this is a recipe_description
      case 'recipe_description' :
        console.log('description')
        //  minlength="10" maxlength="200"
        break;
      // if this is an ingredient
      case 'ingredient_name' :
        console.log('ingredient')
        //  minlength="3" maxlength="100"
        break;
      // if this is an amount
      case 'amount':
        console.log('amount')
        //  maxlength="5"
        break;
      // if this is a preparation step
      case 'preparation_step':
        console.log('preparation step')
        //  minlength="10" maxlength="400"
        break;
      // if this is a username
      case 'user_name':
        console.log('username')
        // ^[a-zA-Z0-9]{4,15}$
        break;
      // if this is a password
      case 'password':
        console.log('password')
        break;
      // if this is a unit name
      case 'unit_name':
        console.log('unit name')
        break;
      };
  };
  return false
};