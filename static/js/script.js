
  $(document).ready(function(){
    $('.sidenav').sidenav();
    $('select').formSelect();
    fadeOutFlash();
  });

  function fadeOutFlash(){
    $('.flashes').delay(4000).slideUp('slow');
  }


// Add a line to recipe input
  $('#add-ingredient').click(function addIngredient(){
    console.log('clicked')

  recipeInputHtml = `
  <div class="row ingredient">
                      <!-- ingredient -->
                      <div class="input-field col s12 m8">
                          <input name="ingredient_name" id="ingredient_name" type="text" minlength="3" maxlength="100"
                              class="validate" required>
                          <label for="ingredient_name">Ingredient</label>
                      </div>

                      <div class="input-field col s6 m2">
                          <input name="amount" id="amount" type="text" maxlength="5" class="validate" required>
                          <label for="amount">Amount</label>
                      </div>
                      <div class="input-field col s6 m2">
                          <select id="unit_name" name="unit_name" class="validate" required>
                              {% for unit in units %}
                              <option value="{{ unit.unit_name }}">{{ unit.unit_name }}</option>
                              {% endfor %}
                          </select>
                          <label>Unit</label>
                      </div>
                  </div>
  `
// add after the last added ingredient
  $( ".ingredient" ).last().after(recipeInputHtml)
  })

