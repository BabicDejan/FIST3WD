var lista_dogadjaja_in = [];
var lista_dogadjaja_out = [];

//document.getElementById('dodaj-dogadjaj').addEventListener("click", dodaj_dogadjaj);

document.getElementById("proracun").addEventListener("click", obracun);

document.getElementById('dodaj-dogadjaj-novi').addEventListener("click", dodaj_dogadjaj_2);

function obracun(){


    let tablice = prompt("Unesite tablice vozila: ");

    let vrijeme_in = null;
    let vrijeme_out = null;

    let cijena = 0;

    var rezultat = {
        "cijena":0.0,
        "sati":0,
        "dnevni_sati":0,
        "nocni_sati":0
    }

    if(lista_dogadjaja_in.length>0 && lista_dogadjaja_out.length>0){
        //pretrazi vremena za dogadjaje
        for(let i=0; i<lista_dogadjaja_in.length; i++){
            console.log(lista_dogadjaja_in[i].tablice);
            console.log(tablice);
            if(lista_dogadjaja_in[i].tablice.toUpperCase() === tablice.toUpperCase()){
                vrijeme_in = new Date(lista_dogadjaja_in[i].vrijeme)
            }
        }
        for(let i=0; i<lista_dogadjaja_out.length; i++){
            if(lista_dogadjaja_out[i].tablice.toUpperCase() === tablice.toUpperCase()){
                vrijeme_out = new Date(lista_dogadjaja_out[i].vrijeme)
            }
        }
    }

    if (vrijeme_in === null){
        alert("Za dato vozilo nema ulaza");
        return;
    }
    
    if(vrijeme_out === null){
        //izlaz tretiramo kao 23:59 dana iz in dogadjaja
        vrijeme_out = new Date(vrijeme_in);
        vrijeme_out.setHours(23);
        vrijeme_out.setMinutes(59);
    }

    //dan u nedjelji
    let dan_in = vrijeme_in.getDay();
    let dan_out =vrijeme_out.getDay();

    let vrijeme_in_copy = new Date(vrijeme_in);
    vrijeme_in_copy.setMinutes(vrijeme_in_copy.getMinutes()+15);

    let ukupno_sati = Math.ceil((vrijeme_out.getTime() - vrijeme_in_copy.getTime())/(1000*60*60)) //sekunde, minuti, sati
    let dnevni_sati = 0;
    let nocni_sati = 0;

    if(ukupno_sati%24===0){
        nocni_sati = ukupno_sati/2;
        dnevni_sati = ukupno_sati/2;
        cijena = nocni_sati*0.5 + dnevni_sati*1.5;
    }else{
        let pomocni_sati = ukupno_sati;
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

    //**↓↓↓↓↓↓POGLEDATI ZAKOMENTARISANI KOD U NASTAVKU ↓↓↓↓↓**



    // let sat_in = vrijeme_in_copy.getHours() + vrijeme_in_copy.getMinutes()/60;
    // let sat_out = vrijeme_out.getHours()+ vrijeme_out.getMinutes()/60;
    
    //ovo je samo za 24h ciklus
    // if(sat_in<8){
    //     //usao kod nocne tarife
    //     if (sat_out<8){
    //         //sve nocna tarifa
    //         nocni_sati = ukupno_sati
    //     }else if(sat_out>=20){
    //         //ovo znaci da je prosao kroz jedan cijeli interval dnevni znaci 12h + 
    //         nocni_sati = (sat_out-20)+(8-sat_in);
    //         dnevni_sati = 12
    //     }else{
    //         //sat_out<20 i >8
    //         nocni_sati = 8 - sat_in;
    //         dnevni_sati = sat_out - 8;
    //     }
    // }else{
    //     //znaci da je sat_in>8 
    //     if(sat_in<20){
    //         //znaci da je usao u toku dnevne tarife
    //         //kad je izasao?
    //         if(sat_out<8){
    //             //imamo mjesovito
    //             dnevni_sati = 20 - sat_in;
    //             nocni_sati = 4+sat_out

    //         }else if (sat_out<20){
    //             //sat_out dnevna
    //             dnevni_sati = ukupno_sati
    //         }else{
    //             //zona od 20h do 24h
    //             dnevni_sati = 20 - sat_in;
    //             nocni_sati = sat_out - 20;
    //         }
    //     }
    // }

    rezultat.nocni_sati = nocni_sati;
    rezultat.dnevni_sati = dnevni_sati;

    cijena = dnevni_sati*1.5 + nocni_sati*0.5;

    if(cijena>12.0){
        cijena = 12.00;
        
    }
    if(tablice.toUpperCase().startsWith("PG")){
        //ternarni operator : uslov ? ishod : ishod ukoliko uslov nije true
        cijena = (cijena * 0.5 < 1) ? 1 : cijena * 0.5;
    }
    if((dan_in===6 || dan_in===0) && (dan_out===6 || dan_out===0)){
        cijena = cijena*0.5;
    }

    const result = document.getElementById("naplata")
    result.innerHTML = ""

    const naplata = document.createElement("p");
    const sati = document.createElement("p");
    const nocni = document.createElement("p");
    const dnevni = document.createElement("p")
    const vozilo = document.createElement("p");

    rezultat.ukupno_sati = ukupno_sati;
    rezultat.cijena = cijena;

    console.log(rezultat);

    vozilo.textContent = "Vozilo: " + tablice;
    naplata.textContent = "Cijena parkinga je:" + rezultat.cijena + "eura";
    sati.textContent = "Vozilo je bilo: " + rezultat.ukupno_sati + " sati na parkingu";
    nocni.textContent = "Nocni sati: " + rezultat.nocni;
    dnevni.textContent = "Dnevni sati: " + rezultat.dnevni_sati;

    result.appendChild(naplata);
    result.appendChild(sati);
    result.appendChild(nocni_sati);
    result.appendChild(dnevni_sati);


}


//kod ovog pristupa dodavanja dogadjaja, koristimo samo jednu listu objekata
var lista_dogadjaja = []

//ova funkcija realnije obradjuje situacije na parkingu
function dodaj_dogadjaj_2(){

    //objekat mozemo da posmatramo ovako (tablice, vrijeme ulaska (IN), vrijeme izlaska(OUT)) -> ukoliko ima sva tri znaci da je napustio parking
    //ukoliko ima vrijeme_in, onda u slucaju poziva za racunanje naplate, dodajemo out
    //objekat ne smije imati dva IN zaredom, OUT bez prethodnog IN. 

    // var objekat = {
    //     "tablice": document.getElementById("tablice").value,
    //     "IN": null,
    //     "OUT": null
    // }

    let tablice = document.getElementById("tablice").value;
    let tip_dogadjaja = document.getElementById("tip-dogadjaja").value;
    let vrijeme = document.getElementById("vrijeme").value;

    if (!tablice || !tip_dogadjaja || !vrijeme) {
        alert("Sva polja moraju biti popunjena!");
        return;
    }


    if (tip_dogadjaja.toUpperCase() === "IN"){
        //u ovom momentu vrsimo prolaz kroz listu dogadjaja i provjeramo postoji li objekat sa istim tablicama, ukoliko postoji, provjeravamo da li ima IN,
        //  ako ima IN vrsi se provjera postojanja OUT, ukoliko OUT ne postoji, dupli IN unos, ukoliko postoji, onda znaci da mozemo  kreirati novi objekat (dogadjaj)
        for(let i=0; i<lista_dogadjaja.length; i++){
            if(lista_dogadjaja[i].tablice.toUpperCase() === tablice.toUpperCase()){
                //dodatna provjera za IN
                if (lista_dogadjaja[i].IN !== null){
                    //provjera OUT
                    if(lista_dogadjaja[i].OUT !== null){
                        //objekat koji isto ima (in, out), preskacemo ga
                        continue
                    }else{
                        //znaci da samo ima IN
                        alert("Vozilo je vec uslo na parking!")
                        return;
                    }
                }
            }
        }
        //na kraju provjera, dodaje se novi objekat (odnosno objekat sa novim IN)
        objekat = {
            "tablice": tablice,
            "IN": vrijeme,
            "OUT":null // zato sto radimo sa IN dogadjajem
        }
        lista_dogadjaja.push(objekat);
        renderuj_html();
    }else{
        //kada je u pitanju OUT, ne pravimo novi objekat, vec dodajemo izlaze na POSTOJECE OBJEKTE (oni su inicijalizovani prilikom dodavanja IN)
        console.log("usao ovdje");
        //tip dogadjaja OUT
        for(let i=0; i<lista_dogadjaja.length; i++){
            if(lista_dogadjaja[i].tablice.toUpperCase() === tablice.toUpperCase()){
                //dodatna provjera za IN
                if (lista_dogadjaja[i].IN !== null){
                    //provjera OUT
                    if(lista_dogadjaja[i].OUT !== null){
                        console.log("usao ovdje isto u OUT blok")
                        //imamo i IN i OUT, ali OUT dodavanje ne radi na novom objektu
                        //dosli smo do objekta koji ima in,out, idemo dalje da provjerimo ostale objekte
                        continue
                    }else{
                        //znaci da samo ima IN, dodajemo mu OUT
                        console.log("Dodajem OUT u objekat");
                        lista_dogadjaja[i].OUT = vrijeme;
                        renderuj_html();
                        return;
                    }
                }
                // IN === null se nikad nece desiti pri nasoj definisanoj logici dodavanja u listu dogadjaja
            }
        }
        alert("Za dato vozilo ne poostoji zabiljezen ulaz.")
        return;
    }
}


//renderovanje uz dodaj_dogadjaj_2 - prikazuje listu svih objekata sa vremenima dogadjaja

function renderuj_html(){

    const tablice_html = document.getElementById("auto-tablice");
    const vrijeme_in_html = document.getElementById("in");
    const vrijeme_out_html = document.getElementById("out");

    tablice_html.innerHTML = "";
    vrijeme_in_html.innerHTML = "";
    vrijeme_out_html.innerHTML = "";


    //posto radimo sa istim objektima, moramo ponovo renderovati sve objekte ponovo
    for(const objekat of lista_dogadjaja){
        const tabl = document.createElement("h4");
        const vr_in = document.createElement("h4");
        const vr_out = document.createElement("h4");

        tabl.textContent = objekat.tablice;
        vr_in.textContent = objekat.IN;
        vr_out.textContent = objekat.OUT;

        tablice_html.appendChild(tabl);
        vrijeme_in_html.appendChild(vr_in);
        vrijeme_out_html.appendChild(vr_out);
    }


}