const { createApp, ref } = Vue;

createApp({
  setup() {
    const rsvp = ref({
      name: "",
      tel: "",
      email: "",
    });
    const onSubmit = () => {
      const nowTime = new Date();
      const data = {
        source: "WEB",
        ...rsvp.value,
        // 'time': `${nowTime.getMonth() + 1}/${nowTime.getDate()}${nowTime.getHours()}:${nowTime.getMinutes()}`,
      };
      var search = new URLSearchParams(data);
      var url =
        "https://script.google.com/macros/library/d/1roXtgaDaoJzsuR3RURsO5p3Dz-LEwXK3q7DjjWF4p97R8Fbuy4NQUy2Q/2" +
        search;
      axios
        .get(url)
        .then(function (res) {
          console.log(res);
          // Swal.fire({
          //     title: '銵典鱓��𣂼�罸���枂!',
          //     confirmButtonText:'��𣈯��',
          //     confirmButtonColor: '#00745A',
          // })
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      //this.$refs.form.resetForm();
    };
    return {
      rsvp,
      onSubmit,
    };
  },
}).mount("#app");
