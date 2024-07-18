const { createApp, ref, onMounted, computed, watch } = Vue;
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
    const isAttendFrame = ref(false);
    const isNotAttend = ref(false);
    const twzipcode = ref({});
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
      city: null,
      town: null,
      zipcode: "",
      addressInfo: "",
    });
    const isAttend = ref(null);
    const onSubmit = () => {
      rsvp.value.address = `${rsvp.value.zipcode}${rsvp.value.city}${rsvp.value.town}${rsvp.value.addressInfo}`;
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
          isAttendFrame.value = false;
          isNotAttend.value = false;
          islevel1.value = true;
          islevel2.value = true;
          isLoading.value = true;
          console.log(isLoading).value;
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
        isAttendFrame.value = true;
      } else if (rsvp.value.isAttend === "否") {
        islevel1.value = false;
        isNotAttend.value = true;
      } else {
        isChecked(rsvp.value.isAttend);
      }
    };

    const citys = ref([]);
    const cityApi = () => {
      axios({
        method: "get",
        url: "./api/city.json",
      })
        .then((res) => {
          citys.value = res.data.data;
          console.log(citys.value);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    };
    const twzipcodeApi = () => {
      axios({
        method: "get",
        url: "./api/zipcode.json",
      })
        .then((res) => {
          twzipcode.value = res.data.data;
          console.log(twzipcode.value);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    };

    watch(
      () => rsvp.value.city,
      (newCity) => {
        onTown(newCity);
      }
    );

    const town = ref([]);
    const onTown = (townName) => {
      let newtown = [];
      twzipcode.value.forEach((el) => {
        if (el.city === townName) {
          newtown.push(el);
          town.value = newtown;
        }
      });
      //rsvp.value.town = null;
    };
    const inputTown = (townName) => {
      let newtown = [];
      twzipcode.value.forEach((el) => {
        if (el.city === townName) {
          newtown.push(el);
          town.value = newtown;
        }
      });
      rsvp.value.town = "";
    };

    watch(
      () => rsvp.value.zipcode,
      (newZipcode) => {
        if (newZipcode.length >= 3) {
          let str = newZipcode.substring(0, 3);
          let currentArea = twzipcode.value.find(
            (item) => item.zip_code === str
          );
          if (currentArea) {
            rsvp.value.city = currentArea.city;
            onTown(currentArea.city); // 更新城鎮選項
            console.log(currentArea.district);
            rsvp.value.town = currentArea.district;
            console.log(rsvp.value.town);
          } else {
            rsvp.value.city = null;
            rsvp.value.town = null;
          }
        }
      }
    );

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
      cityApi();
      twzipcodeApi();

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
      isNotAttend,
      isAttendFrame,
      citys,
      onTown,
      town,
      inputTown,
    };
  },
}).mount("#app");
