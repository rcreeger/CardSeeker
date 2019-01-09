<template>
  <div class="navbar">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-content">
        <router-link :to="{ name: 'Index' }">
          <span class="nav-title">Card Seeker </span>
        </router-link>
        <a href="" class="btn-floating btn-large halfway-fab pink add">
          <router-link :to="{ name: 'AddCard' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <router-link :to="{ name: 'Login' }">
              <span class="nav-title">Login </span>
            </router-link>
          </li>
        </ul>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <router-link :to="{ name: 'Signup' }">
              <span class="nav-title">Sign Up </span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>

<style>
.navbar nav {
  padding: 0 20px;
}

.add {
  right: 50% !important;
}
</style>
