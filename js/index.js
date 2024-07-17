const { createApp, ref, onMounted } = Vue;
const { Field, Form, ErrorMessage } = VeeValidate;

createApp({
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  setup() {
    const islevel1 = ref(true);
    const islevel2 = ref(false);
    const isOpen = ref(false);
    const isLoading = ref(true);
    const rsvp = ref({
      name: "",
      telphone: "",
      isAttend: null,
      gender: null,
      relation: "",
      quantity: null,
      chairQty: null,
      vegetarianDietQty: null,
      address: "",
      ps: "",
    });
    const isAttend = ref(null);
    const onSubmit = () => {
      console.log(rsvp.value);
      isLoading.value = false;
      const nowTime = new Date();
      const data = {
        source: "WEB",
        ...rsvp.value,
        // 'time': `${nowTime.getMonth() + 1}/${nowTime.getDate()}${nowTime.getHours()}:${nowTime.getMinutes()}`,
      };
      var search = new URLSearchParams(data);
      console.log(rsvp.value);
      var url =
        "https://script.google.com/macros/s/AKfycbxZC4ZGX-vp5cvOpcBJDrgMbH_oSJ7QGbNeuPfXyv-TJEPgXokFeGuxVGZkhw_9LkY80A/exec";
      // $.ajax({
      //   type: "get",
      //   url: url,
      //   data: rsvp.value,
      //   dataType: "JSON",
      //   success: function (response) {
      //     console.log(response);
      //     if (response == "成功") {
      //       alert("成功");
      //     }
      //   },
      // });
      axios({
        method: "get",
        url: url,
        params: rsvp.value,
      })
        .then((res) => {
          islevel1.value = true;
          islevel2.value = true;
          isLoading.value = true;
        })
        .catch((error) => {});
      //this.$refs.form.resetForm();
    };
    const onAttend = () => {
      console.log(isAttend.value);
      if (isAttend.value) {
        return (rsvp.value.isAttend = "是");
      } else {
        return (rsvp.value.isAttend = "否");
      }
    };
    const onContinue = () => {
      console.log(rsvp.value.isAttend);
      //return;

      if (rsvp.value.isAttend === "是") {
        islevel1.value = false;
      } else if (rsvp.value.isAttend === "否") {
        onSubmit();
      } else {
        isChecked(rsvp.value.isAttend);
      }
    };
    const isRequired = (value) => {
      if (!value) {
        return "此欄位必填";
      }

      return true;
    };
    const isPhone = (value) => {
      console.log(323);
      const regex = /^09\d{8}$/;
      if (!value) {
        console.log(3233);
        return "此欄位必填";
      } else if (!regex.test(value)) {
        return "電話必須為09開頭，ex：0912345678";
      } else {
        return true;
      }
    };
    const isChecked = (value) => {
      if (!value) {
        return "此欄位必填";
      }

      return true;
    };
    onMounted(() => {
      var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: ".swiper-pagination",
        },

        on: {
          slideChange: function () {
            let activeIndex = this.activeIndex;
            swiper2.slideToLoop(activeIndex);
          },
        },
      });
      var swiper2 = new Swiper(".mySwiper2", {
        loop: true,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        thumbs: {
          swiper: swiper,
        },
      });
      function slideToIndex(index) {
        swiper.slideTo(index);
      }
    });

    return {
      rsvp,
      onSubmit,
      islevel1,
      islevel2,
      isAttend,
      onAttend,
      onContinue,
      isOpen,
      isRequired,
      isPhone,
      isChecked,
      isLoading,
    };
  },
}).mount("#app");
