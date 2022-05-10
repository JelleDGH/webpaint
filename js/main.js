/** VARIABLES **/
let mobile_bo = false; //boolean voor de mobiele navigatie

/** CONSTANTE VARS **/
const main = document.querySelector('main'); // selecteren van de main gedeelte
const mobile_nav = document.querySelector('#m_menu'); // selecteren van de mobiele menu
const submenu = document.querySelector('#submenu'); // selecteren van de mobiele submenu
const services = document.querySelector('#services'); // selecteren van de services section
const service = document.querySelectorAll('.service'); // selecteren van ALLE service articles
const img_containers = document.querySelectorAll('.img_container'); // selecteren van ALLE img_containers
const desktop_width = window.matchMedia("(max-width: 992px)"); // de max-width opslaan voor de desktop view

/* Om "querySelectorAll" te laten werken moet je ze allemaal aanspreken via een for loop.
   * Aangezien "querySelectorAll" wordt ingeladen als een array kunnen we de lengte van de array aanspreken om ze allemaal in de loop aan te passen.
   * Ik gebruik hier "var" inplaats van "let" zodat ik hem meermaals kan gebruiken binnenin een functie.*/

/** FUNCTIES **/

/* DE FILTERS FUNCTIE WORDT GEBRUIKT OP DE BUTTONS IN DE PORTFOLIO */
function filters(y) {
    /* Deze functie weergeeft de images vd aangeklikte button
    * De "y" waarde draagt de id vd aangeklikte button.
    * Met deze waarde kunnen we de classes aanspreken die dezelfde waarde hebben
    *
    * BV;
    * De gebruiker klikt "MOTION", "y" draagt de id "motion" met zich mee.
    * De functie bekijkt welke articles de class "MOTION" met zich dragen en weergeeft dit aan de gebruiker */

    let filter = document.querySelectorAll(`.${y}`); // selecteren van ALLE classes die de zelfde ID dragen.
    let active_button = document.querySelector(`#${y}`); // selecteren van de button ID die aangeklikt is
    let selected_button = document.querySelectorAll(`.selected`); // selecteren van ALLE buttons die actief zijn
    let active_filter = document.querySelectorAll('.active_filter'); // selecteren van ALLE actieve filters

    /** LOOP VOOR HET DELETEN VD CLASS VD GESELECTEERDE BUTTON **/
    for (var x = 0; x < selected_button.length; x++) {
        /* Deze loop bekijkt de buttons die "selected" class bij hen dragen en verwijderd de "selected" class zodat er een nieuwe kan toegevoegd worden verder later in de functie.*/
        selected_button[x].className = selected_button[x].className.replace(" selected", "");

    }
    /** LOOP VOOR HET DELETEN VD CLASS VD GESELECTEERDE FILTER  **/
    /* Deze loop bekijkt de images die "active_filter" en "ease in" class bij hen dragen en verwijderd de "active_class" en "ease in" class zodat er een nieuwe kan toegevoegd worden verder later in de functie.*/
    for (x = 0; x < active_filter.length; x++) {
        active_filter[x].className = active_filter[x].className.replace(" ease_in", ""); // De ease in class in een animatie. Deze moet verwijderd worden zodat hij kan hergebruikt worden.
        active_filter[x].className = active_filter[x].className.replace(" active_filter", "");

    }
    /** LOOP VOOR HET TOEVOEGEN VD NIEUWE CLASSE  **/
    for (x = 0; x < filter.length; x++) {
        /*Deze loop voegt de classes "ease_in" en "active_filter" class toe aan de nieuwe gekozen filter. */
        filter[x].classList.add("ease_in", "active_filter");
    }
    active_button.classList.add("selected"); // Voegt het geselecteerde kleurtje aan de aangeklikte button

}

/* DE MEDIAQUERY FUCNTIE WORDT GEBRUIKT WANNEER DE VENSTER BREEDTE DE "dekstop_width" HEEFT BEREIKT */
function mediaquery() {
    /* Deze functie wordt op 2 manieren gebruikt;
    *   - Bij het laden van de pagina
    *   - Bij het veranderen van de window breedte
    *
    * De desktop_width heeft een vaste max-waarde van 992px die gelinkt is aan de media-querys van css.
    *
    * ALS de venster breedte de waarde van <=992px heeft bereikt zal hij de mobiele versie weergeven.
    * ALS de venster breedte de waarde van >=992px heeft bereikt zal hij de desktop versie weergeven.
    *
    *  desktop_width.matches bekijkt of de venster gelijk is of lager is dan de max-width die 992px is.*/
    if (desktop_width.matches) {
        /** MOBIELE RESOLUTIE **/
        /* LOOP OM DE SERVICE ARTICLES OP WARE GROOTTE TE BRENGEN */
        for (var x = 0; x < service.length; x++) {
            service[x].className = service[x].className.replace(" w-25", "");
        }
        /* LOOP OM DE PORTFOLIO ARTICLES TE VERKLEINEN (EN ZO BLIJVEN ZE PER 2 NAAST ELKAAR) */
        for (x = 0; x < img_containers.length; x++) {
            img_containers[x].classList.add("w-50");
        }

        services.classList.add("flex-wrap"); //DE FLEX-WRAP WORDT TOEGEVOEGD ZODAT DE ARTICLES OP HUN POSITIE BLIJVEN
        services.className = services.className.replace(" justify-content-between", " justify-content-center");
    } else {
        /** DESKTOP RESOLUTIE **/
        /* Hier wordt alles terug op zen default settings geplaatst.*/
        for (x = 0; x < service.length; x++) {
            service[x].classList.add("w-25");
        }
        for (x = 0; x < img_containers.length; x++) {
            img_containers[x].className = img_containers[x].className.replace(" w-50", "");
        }
        services.className = services.className.replace(" flex-wrap", "");
        services.className = services.className.replace(" justify-content-center", " justify-content-between");
        submenu.style.display = "none";
        mobile_bo = false;
    }
}

/** EVENT LISTENERS */
mobile_nav.addEventListener('click', (e) => {
    /* Deze luisteraar luistert tot het burger icoontje wordt aangeklikt.
    * Ik heb een boolean gebruikt om te kijken of de submenu open staat of niet.
    *
    * BV;
    * "mobile_bo = false" is de default setting. De submenu is niet open.
    * Wanneer de gebruiker op het burger icoontje klikt.
    * Zal de submenu zichtbaar komen door middel van de "ease_in" animatie.
    * Ook wordt de padding-top van de "main" verhoogt zodat deze nog zichtbaar is als de submenu actief is.
    * De setTimeout laat de animatie op zen gemak uit spelen tot de boolean op true wordt gezet.
    *
    * Wanneer de gebruiker weer op het burger icoontje klikt zal hij de submenu terug sluiten met een ease_out animatie.
    * En wordt de padding-top van de "main" terug naar zen default gebracht van 60px.
    */
    e.preventDefault(); // dit wordt gebruikt zodat de pagina niet wordt refreshed
    if (mobile_bo === false) {
        submenu.style.display = "block";
        main.style.paddingTop = "290px";
        submenu.classList.add("ease_in");
        setTimeout(() => {
            submenu.className = submenu.className.replace(" ease_in", "");
            mobile_bo = true;
        }, 800);
    } else {
        main.style.paddingTop = "60px";
        submenu.classList.add("ease_out");
        setTimeout(() => {
            submenu.style.display = "none";
            submenu.className = submenu.className.replace(" ease_out", "");
            mobile_bo = false;
        }, 800);
    }
}) // wanneer het burger icoontje wordt aangeklikt
desktop_width.addEventListener('change', mediaquery) // wanneer de scherm breedte live wordt aangepast
window.addEventListener('load', mediaquery) // wanneer de scherm breedte wordt ingeladen