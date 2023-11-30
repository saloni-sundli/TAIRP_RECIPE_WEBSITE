document.addEventListener("DOMContentLoaded", function(){
    getAllRecipes();
})

async function getAllRecipes(){
    try {
        const response = await fetch('http://localhost:3000/api/recipe');
        const recipe = await response.json();
        console.log(recipe);
        
        recipe.forEach(element => {
            const { _id, name,
                imageUrl,
                description,
                ingredients,
                author,
                method,} = element;
                
                const recipeCards = document.getElementById("recipe-card");
                const article = document.createElement("article");
                const ul = document.createElement("ul");
                const info = document.createElement("div");
                info.classList.add("info");

                const main = document.getElementById("main");

                ingredients.forEach((ingredient)=>{
                const li = document.createElement("li");
                        li.innerText = ingredient;
                    ul.appendChild(li);
                });

                info.innerHTML = `  <h1>${name}</h1>
                <div class="image-container">
                    <img src="${imageUrl}" alt="${name}">
                    <button onclick="remove('${_id}')">❌</button>
                    <button><a href="./edit.html?id=${_id}">📝</a></button>
                <p>${author}</p>
                </div>
                <p>${description}</p>
                <ul>${ul.innerHTML}</ul>
                <h2>${method}</h2>
    `;

    info.dataset.id = _id;
    info.style.display = "none";

                main.appendChild(info);

                article.innerHTML = `<img src="${imageUrl}" alt="recipe photo" onclick="showRecipe('${_id}')">
                <p>${name}</p>`;


                recipeCards.appendChild(article);

        });
    } catch (error) {
        
    }    
}


function showRecipe(id){
    const infos = document.querySelectorAll(".info");

    infos.forEach((info)=>{
        if(`${info.dataset.id}` == `${id}`){
            info.style.display = "block";
        }else{
            info.style.display = "none";
        }
    })
}

async function remove(id){
    console.log(typeof id)
    const response = await fetch(`http://localhost:3000/api/recipe/${id}`, {
        method: "DELETE"
});
    console.log(response.json());
    location.reload();
}

