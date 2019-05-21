<template>
  <div>
    <NavBar
      :toggleSidebar="toggleSidebar"
    />
    <div class="contents">
      <SideBar
        :sideBarOpen="sideBarOpen" 
        :closeSidebar="closeSidebar"
      />
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "./Footer.vue";
import NavBar from "./Navbar.vue";
import SideBar from "./Sidebar.vue";

export default {
  name: "ApplicationLayout",
  description: "Layout for application pages",
  components: {
    Footer,
    NavBar,
    SideBar,
  },
  data() {
    return {
      sideBarOpen: false
    }
  },
  methods: {
    toggleSidebar() {
      this.sideBarOpen = !this.sideBarOpen;
    },
    closeSidebar() {
      this.sideBarOpen = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.contents {
  margin-top: 5px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
