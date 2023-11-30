async function editRecipe(){
    const form = document.getElementById("recipeForm");

    const formData = new FormData(form);
    const recipeValues = {};
    formData.forEach((value, key) => {
        recipeValues[key] = value;
    })

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const response = await fetch("http://localhost:3000/api/recipe/"+id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipeValues),
    });


    if (response.status === 200){
        window.location.href = './index.html';
    }


}
