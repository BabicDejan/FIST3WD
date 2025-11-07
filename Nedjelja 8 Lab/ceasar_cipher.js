function decipher_ceasar(code, sub){
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var deciphered = ""
    code = code.toUpperCase()

    deciphered = ""

    for(let i=0; i < code.length; i++){

        const letter = code[i];

        if (alphabet.includes(letter)){
            //(-sub+26)%26 osigurava da uvijek pronadjete index desifrovanog karaktera (sifrovani karakter na poziciji 0 je desifrovani karakter na poziciji 23)
            const newIndex = (alphabet.indexOf(letter) - sub +26)%26;
            deciphered += alphabet[newIndex];
        }else{
            deciphered +=letter;
        }
    }

    if (deciphered.includes("LOVE")){
        return true
    }else{
        return false
    }
}

document.getElementById("provjeriBtn").addEventListener("click", function(){
    const cipheredText = document.getElementById("sifrovaniTekst").value;
    const sub = parseInt(document.getElementById("pomjeraj").value);

    if (!cipheredText){
        alert("Unesite sifrovani tekst!");
        return;
    }
    
    //mozemo ispitati i sub<0, sto sustinski znaci da poruka nije sifrovana
    if (isNaN(sub) || sub<0 || sub>25){
        alert("Unesi pomjeraj izmedju 0 i 25");
    }

    const rezultat = decipher_ceasar(cipheredText, sub);

    //pristupamo div sekciji u koju cemo da dodavamo nove HTML elemente putem JS-a.
    const container = document.getElementById("rezultatContainer");

    //ovaj html u koji ce da se upisuju izlazne vrijednosti algoritma, vazno je postaviti na "", kako bi se pri svakom pozivu fje, mogao upisati novi rezultat
    //ukoliko ga ne postavite na "" to bi znacilo da ce se prilikom svakog testiranja dodavati novi p i img elementi
    container.innerHTML = "";
    
    const p = document.createElement("p");
    const img = document.createElement("img");
    if (rezultat){
        p.textContent = "Poruka sadrzi rijec LOVE. Duel.";
        p.style.color = "green";
        img.src="duel.gif";
    }else{
        p.textContent = "Poruka ne sadrzi rijec LOVE. Nema duela.";
        p.style.color = "red";
        img.src="no_duel.jpg";
    }

    container.appendChild(p);
    container.appendChild(img);

})  

//console.log(decipher_ceasar("ORYH",3))