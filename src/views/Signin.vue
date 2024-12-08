<script setup>
import { ref, onBeforeUnmount, onBeforeMount } from "vue";
import { useStore } from "vuex";
import Navbar from "@/examples/PageLayout/Navbar.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { useApi } from '@/composables/use-api';
import { useRouter } from "vue-router";

const body = document.getElementsByTagName("body")[0];
const store = useStore();
const router = useRouter(); // Para redirección sin `this`

// Estado reactivo para email, password, y mensaje de error
const email = ref('');
const password = ref('');
const errorMessage = ref('');

onBeforeMount(() => {
  store.state.hideConfigButton = true;
  store.state.showNavbar = false;
  store.state.showSidenav = false;
  store.state.showFooter = false;
  body.classList.remove("bg-gray-100");
});

onBeforeUnmount(() => {
  store.state.hideConfigButton = false;
  store.state.showNavbar = true;
  store.state.showSidenav = true;
  store.state.showFooter = true;
  body.classList.add("bg-gray-100");
});

async function login() {
  errorMessage.value = ''; 
  try {
    const response = await useApi("auth/login", "POST", {
      email: email.value,
      password: password.value,
    });
    console.log('Login successful', response);
    localStorage.setItem('access_token', response.access_token);
    router.push('/dashboard-default'); // Redirección usando el router directamente
  } catch (error) {
    console.error('Error logging in', error);
    errorMessage.value = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
  }
}
</script>

<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <Navbar
          isBlur="blur border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
          :darkMode="true"
          isBtn="bg-gradient-success"
        />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
            >
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                  <form @submit.prevent="login"> <!-- Manejador de envío de formulario -->
                    <div class="mb-3">
                      <ArgonInput
                        id="email"
                        v-model="email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        size="lg"
                      />
                    </div>
                    <div class="mb-3">
                      <ArgonInput
                        id="password"
                        v-model="password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        size="lg"
                      />
                    </div>
                    <ArgonSwitch id="rememberMe" name="remember-me">
                      Remember me
                    </ArgonSwitch>
                    <div class="text-center">
                      <ArgonButton
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        @click="login"
                      >
                        Sign in
                      </ArgonButton>
                    </div>
                    <!-- Mensaje de error -->
                    <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <a
                      href="javascript:;"
                      class="text-success text-gradient font-weight-bold"
                    >
                    <router-link to="/signup">Regístrate aquí</router-link>  
                    </a>
                    
                  </p>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg'); background-size: cover;"
              >
                <span class="mask bg-gradient-success opacity-6"></span>
                <h4 class="mt-5 text-white font-weight-bolder position-relative">
                  "Attention is the new currency"
                </h4>
                <p class="text-white position-relative">
                  The more effortless the writing looks, the more effort the
                  writer actually put into the process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
