const { createApp, ref } = Vue;

createApp({
  setup() {
    const islevel1 = ref(true);
    const islevel2 = ref(false);
    const isOpen = ref(false);
    const rsvp = ref({
      name: "",
      telphone: "",
      isAttend: "",
      isManOrWoman: "",
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

      const nowTime = new Date();
      const data = {
        source: "WEB",
        ...rsvp.value,
        // 'time': `${nowTime.getMonth() + 1}/${nowTime.getDate()}${nowTime.getHours()}:${nowTime.getMinutes()}`,
      };
      var search = new URLSearchParams(data);
      console.log(rsvp.value);
      var url =
        "https://script.google.com/macros/s/AKfycbw91tp9KXulAR1q_6ornr7JMQQ-S034OdmTp3SrxDQEtTienyVfSoQ1uXV55I4kIW5x/exec";
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
      if (isAttend.value) {
        islevel1.value = false;
      } else {
        onSubmit();
      }
    };
    return {
      rsvp,
      onSubmit,
      islevel1,
      islevel2,
      isAttend,
      onAttend,
      onContinue,
      isOpen,
    };
  },
}).mount("#app");
