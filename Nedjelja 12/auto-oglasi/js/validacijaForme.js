document.getElementById("registerForm").addEventListener("submit", validirajFormu) 

function validirajFormu(event){

    const username  = document.getElementById("username").value.trim();
    const email     = document.getElementById("email").value.trim();
    const password  = document.getElementById("password").value.trim();
    const confirm   = document.getElementById("confirm_password").value.trim();
    const contact   = document.getElementById("contact_no").value.trim();
    const errorMsg  = document.getElementById("errorMsg");

    errorMsg.textContent = "";

    if (!username || !email || !password || !confirm || !contact) {
        errorMsg.textContent = "Molimo popunite sva polja.";
        event.preventDefault();
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        errorMsg.textContent = "Unesite ispravan email format.";
        event.preventDefault();
        return;
    }

    if (password.length < 6) {
        errorMsg.textContent = "Lozinka mora imati najmanje 6 karaktera.";
        event.preventDefault();
        return;
    }

    if (password !== confirm) {
        errorMsg.textContent = "Lozinke se ne poklapaju.";
        event.preventDefault();
        return;
    }
    

    const phonePattern = /^[0-9+ ]{6,20}$/;

    if (!phonePattern.test(contact)) {
        errorMsg.textContent = "Broj telefona nije validan.";
        event.preventDefault();
        return;
    }

}