$(document).ready(function(){
    console.log('¿Que haces aquí, granujilla?')
    cursors();
    blurHeader();
    initEvents();

    $(".navbar .nav-link").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

$(window).on("load", function() {
    // portfolio animation
    var portfolioContainer = $(".portfolio-container");
    portfolioContainer.isotope({
        filter: ".new",
        animationOptions: {
            duration: 750,
            easing: "linear",
            queue: false
        }
    });

    $(".filters a").click(function() {
        $(".filters .active").removeClass("active");
        $(this).addClass("active");
        var filter = $(this).attr("data-filter");
        portfolioContainer.isotope({
            filter: filter,
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: false
            }
        });
        return false;
    });
});

function blurHeader() {
    // Function to blur header
    var blob = document.getElementById("blob");
    var head = document.getElementById("head");
    head.onpointermove = (event) => {
        const { clientX, clientY } = event;

        blob.animate(
            {
                left: `${clientX - 150}px`,
                top: `${clientY - 150}px`
            },
            { duration: 5000, fill: "forwards" }
        );
    };
}

function cursors() {
    // Function to set up custom cursors
    var textTitle = document.getElementById('text-title');
    var textHello = document.getElementById('text-hello');

    textTitle.addEventListener('mouseenter', function () {
        textHello.classList.add('show');
    });

    textTitle.addEventListener('mouseleave', function () {
        textHello.classList.remove('show');
    });

    var cursor = document.querySelector(".cursor");
    var cursor2 = document.querySelector(".cursor2");
    document.addEventListener("mousemove", function (e) {
        cursor.style.cssText = cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
    });
}


function initEvents() {
        document.getElementById("download-cv").addEventListener("click", function() {
            var url = "assets/pdf/JesusTrigueroCV.pdf"; 
            var nombreArchivo = "JesusTrigueroCV.pdf"; 
        
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'blob';
        
            xhr.onload = function() {
                var blob = new Blob([xhr.response], {type: 'application/pdf'});
                var urlBlob = window.URL.createObjectURL(blob);
        
                var a = document.createElement('a');
                a.href = urlBlob;
                a.download = nombreArchivo;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(urlBlob);
            };
        
            xhr.send();
        });
}