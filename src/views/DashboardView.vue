<template>
  <div class="dashboard-wrapper">
      <dashboard-navigation />
      <router-view />
  </div>
</template>

<script>
import DashboardNavigation from '@/components/DashboardNavigation.vue'
import { getUserInfo } from '@/api/userApi'
export default {
  components: { DashboardNavigation },
  mounted() {
    getUserInfo().then((response) => {
      this.$store.commit("setUser", response.data);
    }).catch((err) => {
      alert("로그인이 필요합니다.");
      this.$router.push("/login");
    })
  }
}
</script>

<style lang="scss" scoped>

.dashboard-wrapper{
    min-height: calc(100vh - 84px);
    display: flex;
    align-items: stretch;
}

</style>>