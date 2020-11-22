    class Model{

        constructor() {
            
            this._name = "";
            this._repository = inputUser.value;
            this._url = "";
            this._login = "";
            this._image = "";
            this._repositoriesList = [];
        }

        buscaUser(){

            let request = new XMLHttpRequest();
            
            request.addEventListener( "load", () => {
                if ( request.status == 200 ) {
                    let dados = this._processaResponse( request.responseText );
                    this._atualiza( dados );
                }
                
                try{
                    if (request.status != 200){
                        throw new Error("Nome de usuário inválido")

                        
                    }
                }
                catch(error){
                    alert("Digite um nome de usuário válido.")
                    document.location.reload();
                }
            })

            request.open( "GET", "https://api.github.com/users/"+ this._repository +"/repos", false );
            request.send();
        }

        _processaResponse( responseString ){

            let response = JSON.parse( responseString );
            return response;
        }

        _atualiza( dados ){

            console.log(dados)

            this._login = dados[0].owner.login;
            this._image = dados[0].owner.avatar_url;
            this._repositoriesList = dados

        }

        getLogin () {
            return this._login;
        }
        getImage () {
            return this._image;
        }
        getRepositoriesList () {
            return this._repositoriesList;
        }

    }

    class View{
        constructor() {}

        render( modelo ){
            let userName = document.querySelector(".user");
            let divImg = document.querySelector(".image");
            let divRepos = document.querySelector(".div-repos");

            userName.innerHTML = modelo.getLogin();
            divImg.innerHTML = `<img src=${modelo.getImage()}>`;

            for (let i of modelo.getRepositoriesList()){
                let aJs = document.createElement("a");
                divRepos.appendChild(aJs);
                aJs.innerHTML = `<div><p>Repositório: <a href="${i.html_url}">${i.name}</a><br>Linguagem: ${i.language}</p>`;
            }

            
        }
    }

    class Controller{
        constructor() {}

        adicionaUser(){
            let addUser = new Model();
            addUser.buscaUser();

            let view = new View();
            view.render( addUser );

            let removeForm = inputUser.remove();

            let divJs = document.querySelector(".js");
            divJs.style.background = "white";
            
            busca.textContent = "Pesquisar novamente";
            busca.onclick = function(){
                document.location.reload(true);
            }

        }
    }
    
    let controller = new Controller();
    
    busca.addEventListener( "click", controller.adicionaUser );

    let logoGit = document.querySelector(".img-git");
    logoGit.addEventListener("click", ()=> {
        window.location.href="https://github.com/"
    })
    