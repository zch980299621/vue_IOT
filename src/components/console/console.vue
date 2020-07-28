<template>
    <div>
      <HeadNav></HeadNav>
      <NavMenu></NavMenu>
    </div>
</template>

<script>
  import HeadNav from './HeadNav'
  import NavMenu from './NavMenu'
    export default {
        name: "console",
      data() {
        return {

        }
      },
      components:{
        HeadNav,
        NavMenu
      }
    }
</script>

<style scoped>

</style>
