// Loading
function inItLoading() {
  let loadedCount = 0,
    imgs = document.querySelectorAll("img").length,
    container = document.querySelector("body");

  function handleLoading(percent) {
    const progress = document.querySelector(".loading__inner-progress"),
      textPercent = document.querySelector(".loading__precent");
    progress.style.width = `${percent}%`;
    textPercent.textContent = `${percent}%`;
  }

  function hideLoading() {
    const body = document.querySelector("body");
    body.classList.add("--is-loaded");
  }
  new imagesLoaded(container)

    .on("progress", (instance) => {
      loadedCount++;
      percent = Math.floor((loadedCount / imgs) * 100);
      handleLoading(percent);
    })
    .on("always", (instance) => {
      console.log("always");
    })
    .on("fail", (instance) => {
      console.log("fail");
    })
    .on("done", (instance) => {
      console.log("done");
      hideLoading();
    });
}
inItLoading();

// Change Background Color
function changeBgHeader() {
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    let scrolly = window.scrollY;
    if (scrolly > header.clientHeight) return header.classList.add("--bgblack");
    if (scrolly < header.clientHeight)
      return header.classList.remove("--bgblack");
  });
}
changeBgHeader();

// Back to top
function clickBackToTop() {
  const btn = document.querySelector(".backtotop");
  let bodyHeight = document.querySelector(".homepage").offsetHeight;

  function showBackToTop() {
    window.addEventListener("scroll", function () {
      let scrollY = window.scrollY;
      if (scrollY > bodyHeight / 3) {
        btn.classList.add("--show");
      } else {
        btn.classList.remove("--show");
      }
    });
  }
  showBackToTop();

  btn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
}
clickBackToTop();

//Handle lang
function handleLang() {
  const lang = document.querySelector(".header .header__cta .header__cta-lang"),
    langItems = document.querySelectorAll(
      ".header__cta .header__cta-lang .dropdown li"
    ),
    langCurrent = document.querySelector(
      ".header__cta .header__cta-lang .current span "
    );

  lang.addEventListener("click", function (e) {
    lang.classList.toggle("--active");
    e.stopPropagation();
  });

  langItems.forEach(function (item) {
    item.addEventListener("click", function () {
      let textSelect = item.innerText;
      let tempText = langCurrent.innerText;
      langCurrent.innerText = textSelect;
      item.innerText = tempText;
    });
  });

  function hideLang() {
    lang.classList.remove("--active");
  }
  document.addEventListener("click", function () {
    hideLang();
  });
}
handleLang();

// Show nav menu
/*1. bắt sự kiện click btnMenu
  2. Toggle class cho menumob và btnmenu và header
  3. remove class khi resize 
 */
function menuMobile() {
  const btnMenu = document.querySelector(
      ".header .header__cta .header__cta-btnmenu"
    ),
    menuMobile = document.querySelector(".menumobile "),
    header = document.querySelector(".header"),
    progressbar = document.querySelector(".progressbar");
  body = document.querySelector("body");

  // hide nav
  function hideMenuMob() {
    btnMenu.classList.remove("--active");
    menuMobile.classList.remove("--show");
    header.classList.remove("--hide");
    body.classList.remove("--disable-scroll");
  }
  btnMenu.addEventListener("click", function () {
    this.classList.toggle("--active");
    menuMobile.classList.toggle("--show");
    body.classList.toggle("--disable-scroll");
    header.classList.toggle("--hide");
    progressbar.classList.toggle("--hide");
  });
  menuMobile.addEventListener("click", () => {
    hideMenuMob();
  });
  //   Srcoll
  function scrollMenuMob() {
    let headerHeight = header.offsetHeight;
    const menuItems = document.querySelectorAll(
      ".menumobile .header__menu li a"
    );

    function removeActive() {
      menuItems.forEach(function (item) {
        item.classList.remove("--show");
      });
    }

    menuItems.forEach(function (item) {
      item.addEventListener("click", function (e) {
        hideMenuMob();
        e.preventDefault();

        const atrHref = item.getAttribute("href");

        window.scrollTo({
          top: document.querySelector(atrHref).offsetTop - headerHeight,
          behavior: "smooth",
        });
        removeActive();
        item.classList.add("--show");
      });
    });
  }
  scrollMenuMob();
  // resize window
  window.addEventListener("resize", function () {
    let wwindow = window.innerWidth;
    if (wwindow > 992) {
      hideMenuMob();
    }
  });
}
menuMobile();

// scroll to section
function scrollToSection() {
  const menuItems = document.querySelectorAll(".header .header__menu li a"),
    heightHeader = document.querySelector(".header").offsetHeight;

  function removeActive() {
    menuItems.forEach(function (item) {
      item.classList.remove("--show");
    });
  }

  menuItems.forEach(function (item) {
    item.addEventListener("click", function (e) {
      // ngăn chặn sự chuyển trang
      e.preventDefault();
      // lấy #....
      const atrHref = item.getAttribute("href");
      window.scrollTo({
        top: document.querySelector(atrHref).offsetTop - heightHeader,
        behavior: "smooth",
      });
      //  Xóa class active hiện tại
      removeActive();
      // thêm class active vào item đã chọn
      item.classList.add("--show");
    });
  });

  // Active menu when scrolling
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", function () {
    sections.forEach(function (section, index) {
      let scrolly = window.scrollY,
        sectionTop = section.offsetTop - heightHeader,
        sectionHeight = section.offsetHeight;
      // scrolly >= sectionTop : scroll đến section
      // scrolly < sectionTop + sectionHeight : chưa scroll ra khỏi section
      if (scrolly >= sectionTop && scrolly < sectionTop + sectionHeight) {
        removeActive();
        menuItems[index].classList.add("--show");
      }
    });
  });
}
scrollToSection();

//  Modal Video
/* 1 Css html
   2 bắt sự kiện click
   3 close popupvideo
   4 set dataID, data iframe để khi click mở dataID tự động điền vào data iframe
 */
function handleModalVideo() {
  let videos = document.querySelectorAll("[data-btn-video]"),
    modalVideo = document.querySelector(".popupvideo"),
    iframeModalVideo = document.querySelector(
      ".popupvideo .popupvideo__inner .popupvideo__inner-iframe iframe "
    ),
    btnClose = document.querySelector(".popupvideo__inner-close");
  // show modal
  videos.forEach(function (video) {
    video.addEventListener("click", function () {
      modalVideo.classList.add("active");
      // check
      // set dataID
      let dataID = video.getAttribute("data-video-src");
      // set ID iframe
      iframeModalVideo.setAttribute(
        "src",
        `https://www.youtube.com/embed/${dataID}?autoplay=1`
      );
    });
  });
  function closeModal() {
    modalVideo.classList.remove("active");
    iframeModalVideo.setAttribute("src", "");
  }
  // close modal clicked
  btnClose.addEventListener("click", function () {
    closeModal();
  });
  modalVideo.addEventListener("click", function () {
    closeModal();
  });
}
handleModalVideo();

// Progressbar
/*1 css html
  2 bắt sự kiện
  3 Tính % khi scroll trên tổng chiều dài body 
  4. document load xong progressbar mới bắt đầu chạy
 */
const progressbarBody = () => {
  let progress = document.querySelector(".progressbar");
  window.addEventListener("scroll", function () {
    let scrolly = window.scrollY;
    let percent =
      (scrolly / (document.body.offsetHeight - window.innerHeight)) * 100;
    progress.style.width = `${percent}%`;
  });
};

// News Tab
/*1 css html
  2 bắt sự kiện
  3 xóa class active khỏi các tab
  4.thêm class active vào tab clicked
  5.ẩn các list
  6.get dât-tab
  7.thêm class active vào list đã chọn
 */
function handleTabsNew() {
  let tabs = document.querySelectorAll(".news__tabs-item"),
    listNews = document.querySelectorAll(".new__list");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      // remove all class active of tabs
      tabs.forEach(function (tab) {
        tab.classList.remove("active");
      });

      // addclass active to tab
      this.classList.add("active");

      // hide all news list
      listNews.forEach(function (newlist) {
        newlist.classList.remove("active");
      });
      
      // get data-tab
      let id = this.dataset.tab; // cách 2: let id = this.getAttribute('data-tab')
      // addclass active to news list
      document.querySelector(".new__list-" + id).classList.add("active");
    });
  });
}
handleTabsNew();

// Open Accordion
function handleAccordion() {
  const accordions = document.querySelectorAll(".accordion__list-item");

  accordions.forEach((item, index) =>
    item.addEventListener("click", () => {
      item.classList.toggle("active");
      let answer = item.querySelector(".answer");
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
      // let answer = item.querySelector(".answer");
      // if (answer.style.display === "block") {
      //   answer.style.display = "none";
      // } else {
      //   answer.style.display = "block";
      // }
      removeActive(index);
    })
  );
  function removeActive(index1) {
    accordions.forEach((item2, index2) => {
      if (index1 != index2) {
        item2.classList.remove("active");
        let answer = item2.querySelector(".answer");
        answer.style.maxHeight = null;
      }
    });
  }
}
handleAccordion();

// Register Form
function registerForm() {
  const btnSignUp = document.querySelector(".header .header__cta .btnyellow"),
    btnmob = document.querySelector(".menumobile .header__menu .btnmob"),
    register = document.querySelector(".register"),
    btnClose = document.querySelector(
      ".register .register__inner .register__inner-items .iconclose"
    ),
    overlay = document.querySelector(".register__overlay"),
    body = document.querySelector("body");
  // show
  function showRegisterForm() {
    register.classList.add("active");
    body.classList.add("--disable-scroll");
  }

  btnSignUp.addEventListener("click", function () {
    showRegisterForm();
  });
  btnmob.addEventListener("click", function () {
    showRegisterForm();
  });
  // remove
  function hideRegisterForm() {
    register.classList.remove("active");
    body.classList.remove("--disable-scroll");
  }
  btnClose.addEventListener("click", function () {
    hideRegisterForm();
  });
  overlay.addEventListener("click", function () {
    hideRegisterForm();
  });
}
registerForm();

// Handle Icon Password
function handleShowPassword() {
  const togglePassword = document.querySelectorAll(".eye");
  togglePassword.forEach((item) => {
    item.addEventListener("click", handleTogglePassword);
  });

  function handleTogglePassword() {
    const eyeOpen = this.previousElementSibling,
      input = eyeOpen.previousElementSibling;
    if (eyeOpen) {
      eyeOpen.classList.add("is-active");
    }
    if (input) {
      input.setAttribute("type", "text");
    } else {
      const input = this.previousElementSibling;
      this.classList.remove("is-active");
      if (input) {
        input.setAttribute("type", "password");
      }
    }
  }
}
handleShowPassword();

// Validate Form
function validateForm() {
  const form = document.querySelector(".formwrap"),
    fullName = document.querySelector("#fullname"),
    email = document.querySelector("#email"),
    userName = document.querySelector("#username"),
    password = document.querySelector("#password"),
    cfPassword = document.querySelector("#cfpassword"),
    confirm = document.querySelector("#confirm");

  //  Get parent
  function getParentInput(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }
  //  Handle Error
  function handleError(input, texterr = "") {
    const parentInput = getParentInput(input, ".formgroup");
    let error = parentInput.querySelector(".error");

    // Nếu texterr khác rỗng
    if (texterr != "") {
      // hiện lỗi
      error.innerText = texterr;
      input.classList.add("--invalid");
    } else {
      // xóa lỗi
      error.innerText = texterr;
      input.classList.remove("--invalid");
    }
  }

  // is username
  function isUserName(value) {
    const regUsername = /^[0-9A-Za-z]{6,16}$/;
    return regUsername.test(value);
  }

  // is password
  function isPassword(value) {
    const regPassword =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return regPassword.test(value);
  }

  // is email
  function isEmail(value) {
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regEmail.test(value);
  }

  // Check inputs
  function checkInputs() {
    let arrData = [];
    // FULLNAME
    const valueFullname = fullName.value.trim();
    if (valueFullname == "") {
      // Hiện lỗi
      handleError(fullName, "Please fill out this field");
    } else {
      // xóa lỗi
      arrData.push(valueFullname);
      handleError(fullName);
    }

    //  USER NAME
    const valueUserName = userName.value.trim();
    if (valueUserName == "") {
      // Hiện lỗi
      handleError(userName, "Please fill out this field");
    } else if (!isUserName(valueUserName)) {
      handleError(userName, "6 - 16 characters, alphanumeric only");
      return false;
    } else {
      arrData.push(valueUserName);
      handleError(userName);
    }

    //  PASSWORD
    const valuePassWord = password.value.trim();
    if (valuePassWord == "") {
      handleError(password, "Please fill out this field");
    } else if (!isPassword(valuePassWord)) {
      handleError(
        password,
        " 6 - 16 characters,has at least a number, a special character"
      );
    } else {
      arrData.push(valuePassWord);
      handleError(password);
    }

    //  CONFIRM PASS
    const valuecfPassword = cfPassword.value.trim();
    if (valuecfPassword == "") {
      handleError(cfPassword, "Please fill out this field");
    } else if (valuecfPassword != valuePassWord) {
      handleError(cfPassword, " Incorrect password");
    } else {
      handleError(cfPassword);
    }

    //  EMAIL
    const valueEmail = email.value.trim();
    if (valueEmail == "") {
      handleError(email, "Please fill out this field");
    } else if (!isEmail(valueEmail)) {
      handleError(email, "Invail email");
    } else {
      arrData.push(valueEmail);
      handleError(email);
    }

    // CONFIRM
    if (!confirm.checked) {
      handleError(confirm, "Please select confirm");
    } else {
      handleError(confirm);
    }
    // return arrData;
  }

  // submit form
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    checkInputs();
    // const result = checkInputs();
    // if (result != false) {
    //   console.log("isChecked");
    // } else {
    //   console.log("Error");
    // }
  });
}
validateForm();

// SLIDER HERO
function handleSliderHero() {
  // Khởi tạo slider
  var slider = document.querySelector(".hero__slider");
  var flktySlider = new Flickity(slider, {
    // options
    cellAlign: "left",
    contain: true,
    prevNextButtons: false,
    wrapAround: true,
    pauseAutoPlayOnHover: true,
    selectedAttraction: 0.06,
    friction: 1,
    // fade: true,
    on: {
      ready: function () {
        // console.log("Flickity is ready");
        handleDotsSlider();
        handleNumberSlider();
      },
      change: function (index) {
        // console.log("Slide changed to" + index);
        handleNumberSlider(index);
      },
    },
  });

  // control
  let btnPre = document.querySelector(".hero__bottom-control .--btnprev "),
    btnNext = document.querySelector(".hero__bottom-control .--btnnext ");

  btnPre.addEventListener("click", function () {
    flktySlider.previous(true);
  });
  btnNext.addEventListener("click", function () {
    flktySlider.next(true);
  });

  // Dots
  function handleDotsSlider() {
    let dotsSlider = document.querySelector(".flickity-page-dots"),
      dotsSliderBottom = document.querySelector(".hero__bottom-pagging");
    dotsSliderBottom.appendChild(dotsSlider);
  }

  function handleNumberSlider(index = 0) {
    let number = document.querySelector(
      ".hero__bottom-pagging .number .number__current"
    );
    number.innerHTML = (index + 1).toString().padStart(2, "0");
  }
}

// Carousel
function handleCarousel() {
  var slider = document.querySelector(".carousel__img");
  var flktyCarousel = new Flickity(slider, {
    // options
    cellAlign: "left",
    contain: true,
    draggable: ">1",
    prevNextButtons: false,
    wrapAround: false,
    pageDots: false,
    freeScroll: true,
    // lazyLoad: 5,
    // imagesLoaded: true,
    on: {
      ready: function () {
        // console.log("Flickity ready");
      },
    },
  });
  // Progress Carousel
  const progressBar = document.querySelector(
    ".carousel .carousel__process-bar"
  );
  flktyCarousel.on("scroll", function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + "%";
  });
}

// Gallary
function fancyBoxGallary() {
  Fancybox.bind("[data-fancybox]", {
    Thumbs: {
      type: "classic",
    },
    on: {
      ready: (fancybox) => {
        // console.log(1);
      },
    },
    infinite: false,
    keyboard: {
      Escape: "close",
      Delete: "close",
      Backspace: "close",
      PageUp: "next",
      PageDown: "prev",
      ArrowUp: "prev",
      ArrowDown: "next",
      ArrowRight: "next",
      ArrowLeft: "prev",
    },
    Toolbar: {
      display: {
        left: ["infobar"],
        middle: [
          "zoomIn",
          "zoomOut",
          "toggle1to1",
          "rotateCCW",
          "rotateCW",
          "flipX",
          "flipY",
        ],
        right: ["slideshow", "thumbs", "close"],
      },
    },
  });
}
window.addEventListener("load", function () {
  progressbarBody();
  handleSliderHero();
  handleCarousel();
  fancyBoxGallary();
});
