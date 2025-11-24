var listaPovrsina = [];
var povrsina = [];
var indexOznake = 0;

document.getElementById("unos-bloka").addEventListener("click", unosPovrsine);
document.getElementById("unos-niza").addEventListener("click", zakljuciNiz);
document.getElementById("izracunaj").addEventListener("click", obracunajVremena);
document.getElementById("blok").addEventListener("input", provjeriUnos);


function zakljuciNiz(){
    //odje cemo da napravimo i logiku dodavanja povrsina na DOM
    //OOP princip - pravimo stvarnu kopiju povrsina_copy = povrsina pravi samo kopiju reference, ne novu listu!
    let povrsina_copy = [];
    if(povrsina.length === 0){
        alert("Ne mozete unijeti praznu prostoriju!");
        return;
    }


    if (confirm("Da li ste sigurni da zelite da zakljucite unos blokova prostorije?")){
        
        for (let i = 0; i<povrsina.length; i++){
            povrsina_copy.push(povrsina[i]);
        }
        listaPovrsina.push(povrsina_copy);
        povrsina = [];
        console.log(listaPovrsina);
    }else{
        //ne radi nista
    }
    renderujProstorije(povrsina_copy);
}


function unosPovrsine(){
    let inputElement = document.getElementById("blok");
    let input = inputElement.value;
    //ovdje ne moramo da radimo provjeru jer imamo funkciju koja to uredjuje (provjeriUnos)
    //samo dodajemo u globalnu listu povrsina koje se ciste
    if (input===""){
        alert("Ne mozete unijeti prazan blok, ako zelite prazan blok mozete unijeti X");
        return
    }
    povrsina.push(input);
    console.log(povrsina);

    inputElement.value = "";
    input="";
 
}

//e je objekat dogadjaja
function provjeriUnos(e){
    let dozvoljeni = "KPLRX";
    let unos = e.target.value;

    if(unos.length > 1){
        e.target.value = unos.charAt(0);
        return;
    }


    if(dozvoljeni.indexOf(unos)!==-1){
        //nista zasad
        console.log(e.target.value);
    }else{
        e.target.value = "";
        console.log("Nije");
    }

    
}


function renderujProstorije(prostorija){

    //zelimo ovakav format bullet-a A = {"BLOK", "BLOX" ...}


    let divProstorije = document.getElementById("prostorije");

    //u DOM-u JS moze pristupiti elementu i preko .querySelector metode
    let lista = divProstorije.querySelector("ul");

    //ASCII velikog slova A je 65

    let imeNiza = String.fromCharCode(65+indexOznake);
    //globalna vrijednost
    indexOznake++;

    let kompletnaProstorija = document.createElement("li");

    kompletnaProstorija.textContent = imeNiza + " = { " + prostorija.join(" | ") + " } ";

    lista.appendChild(kompletnaProstorija);

}


function obracunajVremena(){

    let vremena = [];
    if (listaPovrsina.length === 0){
        alert("Nijeste unijeli nijednu prostoriju!");
        return
    }

    for(let i = 0; i<listaPovrsina.length; i++){
        let ukupnoVrijeme = 0;
        let prostorija = listaPovrsina[i];
        //funkcionalni stil prolaska kroz elemente niza, mozete koristiti i obicnu petlju
        // //Anonimna callback funkcija — funkcija proslijeđena kao argument drugoj funkciji.
        // prostorija.forEach(function(element){
        //     ukupnoVrijeme += blokVrijeme(element);
        // });
        for(let indexBloka=0; indexBloka<prostorija.length; indexBloka++){
            //provjera cistog niza
            let indikator = cistNiz(prostorija.slice(indexBloka, prostorija.length))
            if(indikator){
                ukupnoVrijeme+=1;
                break;
            }else{
                ukupnoVrijeme += blokVrijeme(prostorija[indexBloka]);
            }
        }
        vremena.push(ukupnoVrijeme);
    }


    dodajRezultateuHTML(vremena, listaPovrsina);
}

function blokVrijeme(blok){
    if(blok.toUpperCase() === "K"){
        return 2
    }else if(blok.toUpperCase() === "P"){
        return 1
    }else if(blok.toUpperCase() === "L"){
        return 0.5
    }else if(blok.toUpperCase() === "R"){
        return 2
    }else{
        //u pitanju je X blok
        return 1
    }
}

//BONUS ispitivanje cistog niza, niz koji ima sve X ili mu je ostatak X!

function cistNiz(ostatakNiza){

    for(let i=0; i<ostatakNiza.length; i++){
        if(ostatakNiza[i].toUpperCase()!=="X"){
            return false;
        }
    }
    //niz, ili ostatak niza je CIST
    return true;
}

function dodajRezultateuHTML(vremena){
    let divProstorije = document.getElementById("prostorije");
    //u DOM-u JS moze pristupiti elementu i preko .querySelector metode
    let ul = divProstorije.querySelector("ul");
    //zelim da izmijenim i h2 tag
    let h2 = divProstorije.querySelector("h2");

    let listaLiElemenata = ul.getElementsByTagName("li");

    h2.textContent = "Uneseni nizovi i estimacija vremena: ";

    for(let i=0; i<listaLiElemenata.length; i++){
        listaLiElemenata[i].textContent += `-> Estimacija: ${(vremena[i]/60).toFixed(2)} minuta ili ${vremena[i]} sekundi.`;
    }
}

