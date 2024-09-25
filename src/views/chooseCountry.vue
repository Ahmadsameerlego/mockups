<template>
  <section class="choose">
    <div class="container">
      <h1 class="text-center mb-5">
        Choose the location to use the Mockup tool content
      </h1>

      <section class="countries">
        <div
          class="single mb-4 d-flex justify-content-between align-items-center"
          v-for="(item, index) in countries"
          :key="index"
          :class="{ 'checked': selectedCountries.includes(item.name) }">

        
          <h5 class="fw-bod">
            {{ item.name }}
          </h5>

          <div class="country_image">
            <img :src="item.flag" alt="" />
          </div>

          <input type="checkbox" class="checkbox" name="check" :value="item.name" v-model="selectedCountries">

        </div>
      </section>


      <div class="d-flex justify-content-center " v-if="selectedCountries.length>0">
            <router-link class="btn btn-primary w-50 pt-3 pb-3 text-white" style="color:inherit;text-decoration: none" to="/view">
                Continue
            </router-link>
      </div>
    </div>
  </section>
</template>
  <script>
import denemark from "@/assets/denemark.jpeg";
import suid from "@/assets/suid.jpeg";
import ner from "@/assets/ner.jpeg";
import fen from "@/assets/fen.jpeg";

export default {
  data() {
    return {
        selectedCountries: [] , // To track selected (checked) items

      countries: [
        {
          id: 1,
          name: "Denmark",
          code: "DK",
          flag: denemark,
        },
        {
          id: 2,
          name: "Sweden",
          code: "SE",
          flag: suid,
        },
        {
          id: 3,
          name: "Norway",
          code: "NO",
          flag: ner,
        },
        {
          id: 4,
          name: "Finland",
          code: "FI",
          flag: fen,
        },
      ],
    };
  },
};
</script>
  

  <style scoped>
.countries {
}
.single {
  background-color: #ccc;
  border-radius: 10px;
  padding: 10px 40px;
  position: relative;
}
.single .country_image img {
  width: 150px;
  height: 100px;
  object-fit: contain;
  mix-blend-mode: color-burn;
}
.checkbox {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  opacity: 0;
  z-index: 9;
  cursor: pointer;
}
.single.checked{
    background: #c2b3b3 !important;
    border: 2px solid #000;}
.choose {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
</style>
