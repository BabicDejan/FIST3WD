document.addEventListener("DOMContentLoaded", function () {

    const counters = document.querySelectorAll(".counter");
    let started = false;

    function animateCounters() {
        counters.forEach(counter => {
            let target = +counter.getAttribute("data-target");
            let count = 0;
            let step = target / 200;

            let interval = setInterval(() => {
                count += step;
                if (count >= target) {
                    counter.textContent = target + "+";
                    clearInterval(interval);
                } else {
                    counter.textContent = Math.floor(count);
                }
            }, 10);
        });
    }

    // Kada se sekcija pojavi u viewportu, pokrece se animacija
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            animateCounters();
            started = true;
        }
    }, { threshold: 0.4 });

    observer.observe(document.querySelector("#statistika"));
});
