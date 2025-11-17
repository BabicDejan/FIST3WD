var lista_dogadjaja_in = [];
var lista_dogadjaja_out = [];

document.getElementById('dodaj-dogadjaj').addEventListener("click", dodaj_dogadjaj);

document.getElementById("proracun").addEventListener("click", obracun);

//ova funkcija radi ukoliko zanemarujemo slucaj da jedno vozilo moze imati vise parova (IN,OUT)
//.JS fajl u folderu "misc" obradjuje realnije situacije (jedno vozilo moze imati vise ciklusa IN,OUT)
function dodaj_dogadjaj(){

    var objekat = {
        "tablice" : document.getElementById("tablice").value,
        "vrijeme":document.getElementById("vrijeme").value,
        "dogadjaj":document.getElementById("tip-dogadjaja").value
    }

    for (const kljuc in objekat){
        if (objekat[kljuc] === null || objekat[kljuc]===undefined || objekat[kljuc] === ""){
            alert(`Atribut ${kljuc} je prazan, mora biti unesen.`);
            return;
        }
    }
    // lista_dogadjaja_in.push(objekat);
    // console.log(lista_dogadjaja_in);
    console.log(objekat.dogadjaj);
    if(objekat.dogadjaj === "IN"){
        for(let i=0; i<lista_dogadjaja_in.length; i++){
            lista_objekat = lista_dogadjaja_in[i];
            if(objekat.tablice.toUpperCase() === lista_objekat.tablice.toUpperCase()){
                alert("Vozilo je vec uslo na parking");
                return;
            }
        }
        lista_dogadjaja_in.push(objekat);
        dodaj_u_html(objekat);
    }else{
        //znaci da je dogadjaj OUT, sada provjeravamo da li za vozilo postoji IN, ako ne postoji, ne mozemo dodati OUT
        //ako je IN lista prazna, for petlja se nece pokrenuti, samim tim cemo obavjestiti korisnika da za odredjeno vozilo ne postoji zabiljezen ulazak
        for(let i=0; i<lista_dogadjaja_in.length; i++){
            lista_objekat = lista_dogadjaja_in[i];
            if(objekat.tablice.toUpperCase() === lista_objekat.tablice.toUpperCase()){
                lista_dogadjaja_out.push(objekat);
                dodaj_u_html(objekat)
                return;
            }
        }
        alert("Za vozilo ne postoji zabiljezen dogadjaj ulaska.")
        return;
    }
}

function obracun(){

    //**IDEJA OBRACUNA**:
    //Da bismo mogli da sastavimo cijenu parkinga za odredjeno vozilo moramo znati koliko je to 
    //vozilo provelo vremena u nocnoj i dnevnoj tarifi (CIJENA = NOCNI SATI*0.5 + DNEVNI_SATI*1.5)
    //Ideja se oslanja na poznavanje ukupnog broja sati koje je vozilo provelo na parkingu 
    //Koristicemo odgovarajucu klasu Date i njene metode za realizaciju obracuna



    //od korisnika se trazi da unese tablice
    let tablice = prompt("Unesite tablice vozila: ");

    //ove varijable su nam potrebne da bi napravili objekte tipa Date 
    let vrijeme_in = null;
    let vrijeme_out = null;

    let cijena = 0;

    //ovaj objekat cemo da koristimo da vratimo odgovarajuci prikaz
    var rezultat = {
        "cijena":0.0,
        "sati":0,
        "dnevni_sati":0,
        "nocni_sati":0
    }

    //za unesene tablice radimo pretragu objekata u listi (trebaju nam Datumi ulaska (IN) i (OUT))

    if(lista_dogadjaja_in.length>0 && lista_dogadjaja_out.length>0){
        //pretrazi vremena za dogadjaje
        for(let i=0; i<lista_dogadjaja_in.length; i++){
            console.log(lista_dogadjaja_in[i].tablice);
            console.log(tablice);
            if(lista_dogadjaja_in[i].tablice.toUpperCase() === tablice.toUpperCase()){
                //vrijeme in varijabla ce da bude objekat DATE od atributa objekta
                vrijeme_in = new Date(lista_dogadjaja_in[i].vrijeme)
            }
        }
        for(let i=0; i<lista_dogadjaja_out.length; i++){
            if(lista_dogadjaja_out[i].tablice.toUpperCase() === tablice.toUpperCase()){
                //isto vazi za OUT
                vrijeme_out = new Date(lista_dogadjaja_out[i].vrijeme)
            }
        }
    }

    //ako je vrijeme_in null znaci da nijesmo pronasli vozilo za zadate tablice, vracemo odgovarajucu poruku
    //ovo se moze desiti u slucaju da je korisnik unio nepostojece vozilo
    if (vrijeme_in === null){
        alert("Za dato vozilo nema ulaza");
        return;
    }

    //ako vrijeme_in za odredjeno vozilo postoji, ali ne i OUT, onda se OUT tretira kao IN istog dana, a vrijeme se podesava na 23:59h
    if(vrijeme_out === null){
        //izlaz tretiramo kao 23:59 dana iz in dogadjaja
        vrijeme_out = new Date(vrijeme_in);
        vrijeme_out.setHours(23);
        vrijeme_out.setMinutes(59);
    }

    //dan u nedjelji - ove varijable ce nam biti potrebne za provjeru VIKEND TARIFE
    let dan_in = vrijeme_in.getDay();
    let dan_out =vrijeme_out.getDay();



    //OOP principi - pravimo kopiju objekta kako bismo mogli da manipulisemo pravim vremenom ulaska
    //pritom ne zelimo da mijenjamo objekat koji nosi pravo vrijeme ulaska!
    let vrijeme_in_copy = new Date(vrijeme_in);

    //prvih 15 minuta je besplatno, sto znaci da realno odbrojavanje sati krece nakon tog intervala, i zbog toga dodajemo 15 minuta 
    //na postojeci objekat
    vrijeme_in_copy.setMinutes(vrijeme_in_copy.getMinutes()+15);


    //OUT - IN -> dobijamo koliko je vremena proslo izmedju ulaska i izlaska vozila sa parkinga
    //.getTime na objektu DATE vrace vrijeme u milisekundama (tacnije, br. milisekundi od datuma 01.01.1970 00:00)
    //kako razliku ovih datuma pretvoriti u sate? 1 sekunda -> 1000 milisekundi - 60 sekundi -> 1 minut 60 minuta -> 1 sat
    //Math.ceil koristimo da zaokruzimo broj sati na cijeli broj (gornji interval, u zahtjevu zadatka stoji da se svaki zapoceti sat racuna)
    let ukupno_sati = Math.ceil((vrijeme_out.getTime() - vrijeme_in_copy.getTime())/(1000*60*60)) //sekunde, minuti, sati
    
    //varijable u koje cemo da smjestamo broj sati po dnevnoj i broj sati po nocnoj tarifi
    let dnevni_sati = 0;
    let nocni_sati = 0;

    //ako je vozilo bilo tacno dan, ili vise cijelih dana, onda znamo ovo:
    if(ukupno_sati%24===0){
        nocni_sati = ukupno_sati/2;
        dnevni_sati = ukupno_sati/2;
        cijena = nocni_sati*0.5 + dnevni_sati*1.5;
    }//ako nije, onda obracun vrsimo na ovaj nacin:
    else{
        let pomocni_sati = ukupno_sati;
        //IDEJA: posto znamo koliko sati moramo da obradimo (tj. provjerimo da li pripadaju dnevnom ili nocnom tarifniku) 
        //onda to mozemo realizovati pomocu while petlje (Posmatrajte ovo kao da sa IN datuma dolazimo do OUT datuma
        //inkrementirajuci br.sati u IN datumu za 1sat nakon svake provjere)
        while(pomocni_sati>0){
            if(vrijeme_in_copy.getHours()>=8 && vrijeme_in_copy.getHours()<20){
                dnevni_sati+=1;
            }else{
                nocni_sati+=1;
            }
            pomocni_sati-=1;
            vrijeme_in_copy.setHours(vrijeme_in_copy.getHours()+1);
        }
    }

    

    rezultat.nocni_sati = nocni_sati;
    rezultat.dnevni_sati = dnevni_sati;

    //po zavrsetku while petlje, znamo koliko imamo nocnih, a koliko dnevnih sati
    cijena = dnevni_sati*1.5 + nocni_sati*0.5;

    //ako je cijena veca od 12 -> cijena postaje 12 (maksimalna)
    if(cijena>12.0){
        cijena = 12.00;
    }
    //ako su tablice PG, onda obracunavamo popust
    if(tablice.toUpperCase().startsWith("PG")){
        //ternarni operator -> uslov ? ishod : ishod ukoliko uslov nije true
        cijena = (cijena * 0.5 < 1) ? 1 : cijena * 0.5;
    }
    //ako su dani boravka vozila u okviru vikenda, cijena se smanjuje za 50%, odnosno, ako je vozilo uslo i izaslo u toku vikenda - 
    // ZADATAK: 
    // **razmisliti kako bi obracunali vikend tarifu
    //samo na sate koji pripadaju vikend tarifi?** 
    if((dan_in===6 || dan_in===0) && (dan_out===6 || dan_out===0)){
        cijena = cijena*0.5;
    }


    //dio koda u nastavku obradjuje prikazivanje vrijednosti naplate i ostalih pratecih vrijednosti u HTML-u
    const result = document.getElementById("naplata")
    result.innerHTML = ""

    const naplata = document.createElement("p");
    const sati = document.createElement("p");
    const nocni = document.createElement("p");
    const dnevni = document.createElement("p")
    const vozilo = document.createElement("p");

    rezultat.sati = ukupno_sati;
    rezultat.cijena = cijena;

    console.log(rezultat);

    vozilo.textContent = "Vozilo: " + tablice;
    naplata.textContent = "Cijena parkinga je:" + rezultat.cijena + "eura";
    sati.textContent = "Vozilo je bilo: " + rezultat.sati + " sati na parkingu";
    nocni.textContent = "Nocni sati: " + rezultat.nocni_sati;
    dnevni.textContent = "Dnevni sati: " + rezultat.dnevni_sati;

    result.appendChild(vozilo);
    result.appendChild(naplata);
    result.appendChild(sati);
    result.appendChild(nocni);
    result.appendChild(dnevni);


}


//ova funkcija dodaje objekte (dogadjaje) u HTML dokument, sto se prikazuje korisniku nakon dodavanja. Poziva se u funkciji "dodaj_dogadjaj"
function dodaj_u_html(objekat){
    const roditelj = (objekat.dogadjaj.toUpperCase() === "IN") ? document.getElementById("in") : document.getElementById("out");

    const div = document.createElement("div");

    div.textContent = `${objekat.tablice} | ${objekat.vrijeme}`

    roditelj.appendChild(div);

}

