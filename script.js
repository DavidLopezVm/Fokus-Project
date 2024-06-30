const html = document.querySelector('html')
const botonCorto = document.querySelector('.app__card-button--corto')
const botonEnfoque = document.querySelector('.app__card-button--enfoque')
const botonLargo = document.querySelector('.app__card-button--largo')/* Aqui el boton realizado aqui apunta a una parte del html*/  
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botones = document.querySelectorAll('.app__card-button')
const inputEnfoqueMusica = document.querySelector('#alternar-musica')
const musica = new Audio('./sonidos/luna-rise-part-one.mp3')
const botonIniciarPausar = document.querySelector('#start-pause')
const reproducir = new Audio('./sonidos/play.wav')
const beep = new Audio('./sonidos/beep.mp3')
const pause = new Audio('./sonidos/pause.mp3')
const textoIniciarPausar=document.querySelector('#start-pause')
const ImagenPlayPause = document.querySelector('.app__card-primary-butto-icon')
const tiempoEnPantalla = document.querySelector('#timer')

let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null


musica.loop = true
/*botonCorto.addEventListener('click',()=> { (Aqui es un evento que pasara al dar "click") 
    html.setAttribute('data-contexto','descanso-corto');
banner.setAttribute('src','./imagenes/descanso-corto.png'); (aqui esta propiedad se utiliza para cambiar el atributo en este caso siento el atributo src)
})*/

inputEnfoqueMusica.addEventListener('change',() =>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

botonCorto.addEventListener('click',()=> {
    tiempoTranscurridoEnSegundos=300
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')
   /* botonEnfoque.classList.remove('active')
    botonLargo.classList.remove('active')*/
})

botonEnfoque.addEventListener('click',()=> {
    tiempoTranscurridoEnSegundos=1500
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')
    /*botonCorto.classList.remove('active')
    botonLargo.classList.remove('active')*/
})

botonLargo.addEventListener('click',()=> {
    tiempoTranscurridoEnSegundos=900
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')
   /* botonEnfoque.classList.remove('active')
    botonCorto.classList.remove('active')*/
})

function cambiarContexto(contexto){
    mostrarTiempo()

    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto',contexto)
    banner.setAttribute('src',`./imagenes/${contexto}.png`)

    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;

        case "descanso-corto":
             titulo.innerHTML = `¿Qué tal tomar un respiro?<br>
             <strong class="app__title-strong">¡Haz una pausa corta!.</strong>`
             break;
        case "descanso-largo":
              titulo.innerHTML = `Hora de volver a la superficie<br>
              <strong class="app__title-strong">Haz una pausa larga.</strong>`
              break;
        
    
        default:
            break;
    }
}

const cuentaRegresiva = () => {
    if(tiempoTranscurridoEnSegundos<=0){
        beep.play()
        alert('Tiempo final')
        reiniciar()
        return;
    }
    tiempoTranscurridoEnSegundos -= 1
    mostrarTiempo();
}

botonIniciarPausar.addEventListener('click',iniciarPausar)

function iniciarPausar(){
    if(idIntervalo){
        reiniciar();
        pause.play()
        
        return;
    }
        reproducir.play()
    idIntervalo = setInterval(cuentaRegresiva, 1000)
    textoIniciarPausar.textContent= "Pausar"
    ImagenPlayPause.setAttribute('src',`./imagenes/pause.png`)
    
}

function reiniciar(){
    clearInterval(idIntervalo)
    textoIniciarPausar.textContent="Comenzar"
    ImagenPlayPause.setAttribute('src',`./imagenes/play_arrow.png`)
    idIntervalo=null;
    
}

function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX',{minute:'2-digit',second:'2-digit'})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}
mostrarTiempo();