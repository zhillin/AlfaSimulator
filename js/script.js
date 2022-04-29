

/**
 * FLASH LIGHT EFFECTS ===
*/
class FlashLight{

  /**
   * Constructor
  */
  constructor(){
    // default mouse x cord
    this.xcord = innerWidth/2;
    // default mouse y cord
    this.ycord = innerHeight/2;
    // radius light
    this.radius = 0;
    // delta radius
    this.delta = 1.1;
    // background color Flash
    this.bgc = 'rgba(0,0,0)';
    // event mouse move
    this.evefun = {
      mouse: null,
      resize: null,
    };
    // key screen desktop || mobile
    this.keyscreen = '';
    // create element div
    this.cont = document.createElement('div');
    // create element canvas
    this.canvas = document.createElement('canvas');
    // context canvas
    this.context = null;
    // body doom element
    let bodyel = document.querySelector('body');
    // run main function
    if(bodyel.getAttribute('page') == 'main'){
      this.main();
    }
  }

  /**
   * Main function
  */
  main(){
    // size screen width
    this.screen();
    window.addEventListener('resize', this.screen.bind(this));
  }

  /**
   * Screen detected
  */
  screen(){
    // desktop version
    if(innerWidth >= 991 && this.keyscreen != 'desktop'){
      // change key
      this.keyscreen = 'desktop';
      // create DOOM elements
      this.elements();
      // canvas propertirs
      this.prop();
      // events mouse move
      this.events();
    }
    // tablet and mobile version
    if(innerWidth < 991 && this.keyscreen != 'mobile'){
      // save previe key
      let prevkey = this.keyscreen;
      // change key
      this.keyscreen = 'mobile';
      // remove descktop variant
      if(prevkey == 'desktop'){
        // remove event
        document.removeEventListener('mousemove', this.evefun.resize);
        // remove event
        document.removeEventListener('mousemove', this.evefun.mouse);
        // remove node element
        document.querySelector('.overlay').remove();
      }
    }
  }

  /**
   * Create DOOM elements
  */
  elements(){
    // add element cont class
    this.cont.setAttribute('class', 'overlay');
    // add element cont css style
    this.cont.setAttribute(
      `style`,
      `pointer-events: none;
       position: fixed;
       z-index: 9;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       background-color: transparent;
    `);
    // arrange element cont in element body
    document.body.appendChild(this.cont);
    // add attribute canvas ?
    this.canvas.setAttribute('id', 'render-canvas');
    // arrange element canvas in element cont
    this.cont.appendChild(this.canvas);
    // context canvas
    this.context = this.canvas.getContext('2d');
  }

  /**
   * Properties canvas
  */
  prop(){
    // param
    this.evefun.resize = () => {
      let 
      // width screen
      width = window.innerWidth,
      // height screen
      height = window.innerHeight;
      // radius size
      if(width >= height){
        // radius relatively width
        this.radius = width/this.delta
      }else{
         // radius relatively height
        this.radius = height/this.delta
      }
      // width canvas
      this.context.canvas.width = width;
      // height canvas
      this.context.canvas.height = height;
      // background color canvas default
      this.context.fillStyle = this.bgc;
      // clear canvas default
      this.context.clearRect(0, 0, width, height);
      // paint black rect canvas default
      this.context.fillRect(0, 0, width, height);
      // painting canvas light
      this.draw(this.xcord, this.ycord);
    }
    // run size
    this.evefun.resize();
    // change size when resize window
    window.addEventListener('resize', this.evefun.resize);
  }

  /**
   * Events mouse move
  */
  events(){
    // mouse move function
    this.evefun.mouse = (event) => {
      // mouse x
      this.xcord = event.clientX;
      // mouse y
      this.ycord = event.clientY;
      // painting canvas light
      this.draw( this.xcord, this.ycord );
    }
    // add event
    document.addEventListener('mousemove', this.evefun.mouse);
  }

  /**
   * Draw light
   * in canvas
  */
  draw(x, y){
    let
    // width draw canvas
    width = this.context.canvas.width,
    // height draw canvas
    height = this.context.canvas.height;
    // first reset the gCO
    this.context.globalCompositeOperation = 'source-over';
    // background color canvas
    this.context.fillStyle = this.bgc;
    // clear canvas
    this.context.clearRect(0, 0, width, height);
    // paint black rect canvas
    this.context.fillRect(0, 0, width, height);
    // ****
    this.context.beginPath();
    let 
    // add gradient
    radgrad = this.context.createRadialGradient(x, y, 1, x, y, this.radius);
    // white color
    radgrad.addColorStop(0.2, 'rgba(255,255,255,1)');
    // black color
    radgrad.addColorStop(0.7, 'rgba(0,0,0,0)');
    // paint block in canvas
    this.context.globalCompositeOperation = 'destination-out';
    // canvas background gradient
    this.context.fillStyle = radgrad;
    // paint circle
    this.context.arc(x, y, this.radius, 0, Math.PI * 2, false);
    // paint fill in circle
    this.context.fill();
    // close the path
    this.context.closePath();
  }
}

new FlashLight();

/**
 * === FLASH LIGHT EFFECTS
*/



/**
 * SCROLL PAGE ===
*/

class Roller{

  /**
   * Constructor
  */
  constructor(){
    // wrapper
    this.wrapp = document.querySelector('.main');
    // run function
    this.roller = document.querySelector('.roller');
    // overlay element
    this.overlay = document.querySelector('.three_over');
    // roller elements
    this.elem = [...document.querySelectorAll('*[roller]')];
    // key screen desktop || mobile
    this.keyscreen = '';
    // wheel indicatir var
    this.idwheel = null;
    // state
    this.state = {
      index: 0,
      work: true,
    };
    // body doom element
    let bodyel = document.querySelector('body');
    // run main function
    if(bodyel.getAttribute('page') == 'main'){
      this.main();
    }
  }

  /**
   * Main
  */
  main(){
    // loop text
    // this.loop();
    // screen detected
    this.screen();
    // reseize event screen
    window.addEventListener('resize', 
      this.screen.bind(this)
    );
  }

  /**
   * Screen detected
  */
  screen(){
    // desktop
    if(innerWidth >= 991 && this.keyscreen != 'desktop'){
      // change key
      this.keyscreen = 'desktop';
      // scroll 0
      window.scrollTo(0, 0);
      // init fun
      this.eventw();
      // add event
      window.addEventListener( 'resize', this.resize.bind(this));
    }
    // mobile
    if(innerWidth < 991 && this.keyscreen != 'mobile'){
      // save previe key
      let prevkey = this.keyscreen;
      // change key
      this.keyscreen = 'mobile';
      // check first run
      if(prevkey == 'desktop'){
        // remove event wheel
        this.idwheel.destroy();
        // add event
        window.removeEventListener('resize', this.resize);
        // remove bg
        this.wrapp.setAttribute('index', '');
        // change state index
        this.state.index = 0;
        // kill animation
        this.resize();
      }
    }
  }

  /**
   * Init
  */
  eventw(){
    this.idwheel = new WheelIndicator({
      // scroll body event
      elem: document.querySelector('.main'),
      // callback event
      callback: (e) => {
        // move function
        this.scrolle(e.direction);
      }
    });
  }

  /**
   * Scroll
   * Event
  */
  scrolle(vektor){
      // scroll down 
      if(vektor == 'down'){
        // check scroll index
        if(this.state.index < this.elem.length - 1){
          // check state animation
          if(this.state.work){
            // change state
            this.state.index++;
            // change index attribute
            this.wrapp.setAttribute('index', this.state.index);
            // move roller
            this.move();
          }
        }
      }
      // scroll up
      if(vektor == 'up'){
        // check scroll index
        if(this.state.index > 0){
          // check state animation
          if(this.state.work){
            // change state
            this.state.index--;
            // change index attribute
            this.wrapp.setAttribute('index', this.state.index);
            // move roller
            this.move();
          }
        }
      }
  }

  /**
   * Move dom element
  */
  move(){
    // main move function
    let moveMain = (ele, cord, st) => {
      gsap.to(ele, {
        // value transform translate y
        y: cord,
        // speed animation
        duration: 1,
        // ease animatiom
        ease: "Power0.easeNone",
        // event compliat animation
        onComplete: (e) => {
          // change state
          // compliat animation
          if(st) this.state.work = true;
        }
      });
    }
    // change state
    // start animation
    this.state.work = false;
    // size top select element
    let size = this.state.index * innerHeight;
    // move role
    moveMain(this.roller, size*-1, true);
    // move overlay
    if(this.state.index >= 3){
      moveMain(this.overlay, innerHeight, false);
    }else{
      moveMain(this.overlay, 0, false);
    }
  }

  /**
   * Resize
  */
  resize(){
    // main function
    let resizeMain = (ele, cord) =>{
      // hard move role
      gsap.to(ele, {
        y: cord,
        duration: 0.03,
      });
    }
    // size top select element
    let size = this.state.index * innerHeight;
    // kill animation
    gsap.killTweensOf(this.roller);
    gsap.killTweensOf(this.overlay);
    // change state
    this.state.work = true;
    // position roller
    resizeMain(this.roller, size*-1);
    // position overlay
    if(this.state.index >= 3){
      resizeMain(this.overlay, innerHeight);
    }else{
      resizeMain(this.overlay, 0);
    }
  }

  loop(){
    // infinity loop slider
    // new Swiper(".three_slide", {
    //   wrapperClass: "three_slide_cont",
    //   slideClass: "three_slide_txt",
    //   speed: 4000,
    //   slidesPerView: "auto",
    //   loop: true,
    //   autoplay: {
    //     delay: 0,
    //     disableOnInteraction: false,
    //   },
    // });
  }
}

new Roller();

/**
 * === SCROLL PAGE
*/



/**
 * INDISSOLUBLE SPACE ===
 */

 class StringSpace {

  /**
   * Data
   */
  constructor() {
      // ===
      this._ru = ['а', 'без', 'это', 'безо', 'в', 'во', 'вне', 'да', 'для', 'до', 'ее', 'еще', 'и', 'или', 'из', 'изо', 'или', 'их', 'за', 'к', 'как', 'ко', 'меж', 'на', 'над', 'не', 'ни', 'но', 'о', 'об', 'обо', 'от', 'ото', 'по', 'под', 'при', 'про', 'с', 'со', 'то', 'там', 'у', 'уж', 'что', 'я'];
      // ===
      // this._en = ['and', 'at', 'by', 'for', 'from', 'in', 'on', 'past', 'since', 'till', 'down', 'from', 'into', 'off', 'onto', 'of', 'over', 'past', 'under', 'up', 'close', 'over', 'past', 'above', 'at', 'also', 'below', 'the', 'a', 'by', 'near', 'under', 'at', 'in', ];
      // ===
      this._elem = [...document.querySelectorAll('H2, H1, H3, H4, H5, H6, p')];
      // main function
      this.run()
  }

  /**
   * Init
   */
  run() {
      // p dom element
      this._elem.map(obj => {
          this.translate(obj);
      });
  }

  /**
   * Translate
   */
  translate(obj) {
      // ru lang
      this._ru.map(dat => {
          let string = new RegExp(' ' + dat + ' ', 'g');
          obj.innerHTML = obj.innerHTML.replace(string, ` ${dat}&nbsp;`);
      });
      // en lang
      // this._en.map(dat => {
      //     let string = new RegExp(' ' + dat + ' ', 'ig');
      //     obj.innerHTML = obj.innerHTML.replace(string, ` ${dat}&nbsp;`);
      // });
  }
}

new StringSpace();

/**
* === INDISSOLUBLE SPACE
*/



/**
 * Quiz ===
 */

class Quiz {

  /**
   * Constructor
  */
  constructor(){
    // state quiz
    this.st = {
      // state index
      index: 0,
      // result answer
      result: [],
      // options for questions
      itm: [],
      // wrapper dom element
      wrapper: null,
      // click function itm
      clickf: null,
      // count down value
      val: {
        one: 0,
        two: 0,
      },
      // var setinterval
      interval: {
        one: null,
        two: null,
      },
      // dom element count down
      count: {
        one: null,
        two: null,
      }
    }
    // wrapp
    this.wrapp = document.querySelector('.quest');
    // stage
    this.stelem = [...document.querySelectorAll('.qstage')];
    // body doom element
    let bodyel = document.querySelector('body');
    // run main function
    if(bodyel.getAttribute('page') == 'quest'){
      this.part();
    }
  }

  /**
   * Part work
  */
  part(){
    let box = () => {
      // remove state wrapper
      this.wrapp.setAttribute('state', '');
      // choice wrapper element
      this.st.wrapper = this.stelem[this.st.index],
      // dom count down element one
      this.st.count.one = this.st.wrapper.querySelector('.qtime_num_count'),
      // dom count down element two
      this.st.count.two = this.st.wrapper.querySelector('.qtime_txt_count');
      // options for questions
      this.st.itm = [...this.st.wrapper.querySelectorAll('.qitm')];
      // count down value one 8
      this.st.val.one = 15;
      // count down value two 5
      this.st.val.two = 10;
      // add status stage wrapper element
      this.st.wrapper.setAttribute('stage', 'view');
      // run one stage
      this.one();
    }

    if(this.st.index < this.stelem.length){
      // stage type box
      box();
    }else{
      // stage type result
      this.reslut();
    }
    
  }

  /**
   * Part one
  */
  one(){
    this.st.clickf = (event) => {
      this.two(event);
    }
    // add event click itm
    this.st.itm.map( obj => {
      obj.addEventListener('click', this.st.clickf);
    });
    // count down timer
    this.st.interval.one = setInterval(() =>{
      // count down dom element
      this.st.val.one--;
      // add number
      if(this.st.val.one < 10){
        // add number count in dom element
        this.st.count.one.textContent = '0' + this.st.val.one;
      }else{
        // add number count in dom element
        this.st.count.one.textContent = this.st.val.one;
      }
      // when count == 3
      // change color red in dom element
      if(this.st.val.one == 3){
        this.st.count.one.parentNode.setAttribute('state', 'red');
      }
      // when count == 0
      // view result
      if(this.st.val.one == 0){
        // run two stage
        this.two(null);
      }
    },1000);
  }

  /**
   * Part two
  */
  two(ev){
    // element click
    let element = ev !== null ? ev.currentTarget : null;
    // remove event click in itm
    this.st.itm.map( obj => {
      obj.removeEventListener('click', this.st.clickf);
    });
    // stop count down
    clearInterval(this.st.interval.one);
    // change state stage dom element
    this.st.wrapper.setAttribute('state', 'choice');
    // check click itm
    if(element != null) element.setAttribute('choice', '');
    // main function two stage
    setTimeout( () => {
      // change state stage dom element
      this.st.wrapper.setAttribute('state', 'result');
      // change background color of the wrapper
      if(element !== null && element.getAttribute('result') === '1'){
        // change wrapper state success
        this.wrapp.setAttribute('state', 'success');
        // add array result stage 
        this.st.result.push(1);
      }
      // error choice
      else{
        // change wrapper state error
        this.wrapp.setAttribute('state', 'error');
        // add array result stage 
        this.st.result.push(0);
      }
      // run three stage
      this.three();
    },1000);
  }

  /**
   * Part three
  */
  three(){
    // count down three
    this.st.interval.two = setInterval(() =>{
      // count down
      this.st.val.two--;
      // add number
      if(this.st.val.two < 10){
        // add number count in dom element
        this.st.count.two.textContent = '0' + this.st.val.two;
      }else{
        // add number count in dom element
        this.st.count.two.textContent = this.st.val.two;
      }
      
      // when value == 0
      if(this.st.val.two == 0){
        // remove timer
        clearInterval(this.st.interval.two);
        // index +1
        this.st.index++;
        // change stage
        this.st.wrapper.setAttribute('stage', 'final');
        // run new part
        this.part();
      }
    },1000);
  }

  /**
   * Result block
  */
  reslut(){
    // remove state wrapper
    this.wrapp.setAttribute('state', 'success');
    // change stage wrapper element
    this.st.wrapper.setAttribute('stage', '');
    // change state result
    document.querySelector('.qresult').setAttribute('stage', 'view');
    // number of correct answers
    let successp = 0;
    // count correct answer
    this.st.result.map( obj => {
      successp += obj;
    });
    // dom element count answer
    let elem = document.querySelector('.qresult_num_vl');
    // render count answer
    elem.textContent = successp;
  }

}

new Quiz();

/**
 * === Quiz
 */



/**
 * Popup === 
 */

class Popup{

  /**
   * Constructor
  */
  constructor(){
    // up button
    this.up = document.querySelector('*[popup="up"]');
    // close button desktop
    this.cl = document.querySelector('*[popup="close"]');
    // close button desktop
    this.cllg = document.querySelector('*[popup="closelg"]');
    // close mobile
    this.clmob = document.querySelector('*[popup="closemb"]');
    // popup element
    this.el = document.querySelector('.popup');
    // body
    this.body = document.querySelector('body');
    // click function
    this.itmclick = '';
    // item slide
    this.itms = [...document.querySelectorAll('.popup_gr_mb .popup_gr_itm')];
    // speed
    this.speed = 0.3;
    // key screen
    this.keyscreen = '';
    // var slide
    this.slideobj = null;
    // body doom element
    let bodyel = document.querySelector('body');
    // run main function
    if(bodyel.getAttribute('page') == 'main'){
      this.main();
    }
  }

  /**
   * Main function
  */
  main(){
    // check width screen
    this.resize();
    // add event resize screen
    window.addEventListener('resize', this.resize.bind(this));
    // click up popup button
    this.up.addEventListener('click', this.open.bind(this));
    // click close popup button
    this.cl.addEventListener('click', this.close.bind(this));
    // 
    this.cllg.addEventListener('click', this.close.bind(this));
    // click close popup button
    this.clmob.addEventListener('click', this.close.bind(this));
  }

  /**
   * Popup open
  */
  open(){
    this.body.style.overflow = 'hidden';
    // display block popup
    this.el.style.display = 'block';
    // dicspkay block button popup open
    this.cl.style.display = 'block';
    // opacity popup
    this.el.style.opacity = '0';
    // if
    if(this.slideobj !== null){
      // update slider
      this.slideobj.update();
    }
    // open animation
    gsap.to([this.el, this.cl], {
      // value transform translate y
      opacity: 1,
      // speed animation
      duration: this.speed,
      // ease animatiom
      ease: "Power0.easeNone",
    });
  }

  /**
   * Popup close
  */
  close(){
    // body style overflow default
    this.body.style.overflow = '';
    // open animation
    gsap.to([this.el, this.cl], {
      // value transform translate y
      opacity: 0,
      // speed animation
      duration: 0.5,
      // ease animatiom
      ease: "Power0.easeNone",
      // event compliat animation
      onComplete: (e) => {
        // display none popup
        this.el.style.display = 'none';
        // dicspkay none button popup open
        this.cl.style.display = 'none';
      }
    });
  }

  /**
   * Popup close
  */
  slider(){
    // init slider
    this.slideobj = new Swiper(".popup_gr_mb", {
      wrapperClass: "popup_gr_slide",
      slideClass: "popup_gr_itm",
      slidesPerView: "auto",
      threshold: 5,
      pagination: {
        el: '.popup_nav',
        type: 'bullets',
        bulletElement: 'div',
        clickable: true,
        bulletActiveClass: 'sactive',
        bulletClass: 'popup_nav_itm'
      },
    });
    // click itm slide
    this.itmclick = (event) => {
      // attribute slide
      let attr = event.currentTarget.getAttribute('redirect');
      // redirect
      if(attr != null){
        window.location.href = attr;
      }
      // next slide
      else{
        this.slideobj.slideNext();
      }
    }
    // add event slide
    this.itms.map( obj => {
      // check event
      if(obj.getAttribute('evm') == null){
        obj.addEventListener('click', this.itmclick.bind(this));
      }
      // add event
      obj.setAttribute('evm', '');
    });
  }

  /**
   * Resize screen
  */
  resize(){
    // desktop
    if(innerWidth >= 767 && this.keyscreen != 'desktop'){
      // save previe key
      let prevkey = this.keyscreen;
      // change key
      this.keyscreen = 'desktop';
      // check first run
      if(prevkey == 'mobile'){
        // destroy slider
        this.slideobj.destroy();
      }
    }
    // mobile
    if(innerWidth < 767 && this.keyscreen != 'mobile'){
      // change key
      this.keyscreen = 'mobile';
      // ini slider
      this.slider();
    }
  }
}

new Popup();

/**
 * === Popup
 */



/**
 * Change background 
 * color of scroll === 
 */

class Bagroll{
  /**
   * Consturctor
  */
  constructor(){
    // adaptive point
    this.spoint = 767;
    // observer element
    this.selem = document.querySelector('.three_box_two');
    // change bag element
    this.roll = document.querySelector('.roller');
    // body doom element
    let bodyel = document.querySelector('body');
    // run main function
    if(bodyel.getAttribute('page') == 'main'){
      this.main();
    }
  }
  
  /**
   * Main function
  */
  main(){
    // scroll
    window.addEventListener('scroll', this.scroll.bind(this));
    // resize
    window.addEventListener('resize', this.resize.bind(this));
  }

  /**
   * Adaptive screen
  */
  resize(){
    if(innerWidth < this.spoint){
      // true
      return true;
    }else{
      // bgc reset
      this.roll.style.backgroundColor = '';
      // false
      return false;
    }
  }

  /**
   * Change background color
  */
  scroll(){
    if(!this.resize()) return;
    // calc size
    let cords = this.cord();
    // cord < 50
    if( cords <= 50) cords *= 2;
    // cord > 50
    else cords = (100 - cords)*2;
    // change size cord
    cords /= 100;
    // background color
    let bgc = `rgba(104, 80, 241, ${cords})`;
    // enable backgorund color in roll
    this.roll.style.backgroundColor = bgc;
  }

  /**
   * Calc cord
  */
  cord(){
    let val = {
      // top cord element
      top: this.selem.getBoundingClientRect().top,
      // bottom cord element
      bot: this.selem.getBoundingClientRect().bottom,
      // height element
      height: this.selem.getBoundingClientRect().height,
      // screen height
      hsreen: innerHeight,
      // result
      result: 0
    }
    // calc cord
    if (val.top-val.hsreen <= 0 && val.bot >= 0) {
        // main formula
        val.result = 100 - (val.bot * 100) / (val.height + val.hsreen);
        // return round number
        return Math.round( val.result);
    }
    // additional verification
    else if(val.bot < 0){
        return 100;
    }
  }
}

new Bagroll();

/**
 *  === Change background 
 * color of scroll
 */