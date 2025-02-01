// Importamos las dependencias
import { createRouter, createWebHistory } from 'vue-router'      //Librería para poder manejar la navegación entre diferentes páginas de la aplicación

// Importamos los componentes de las deistintas páginas que vamos a utilizar
import UserProducts from '../UserProducts.vue'
import UrList from '../UrList.vue'
import AddProduct from '../AddProduct.vue'
import AboutUs from '../AboutUs.vue'
import SignUp from '../SignUp.vue'
import UserConfig from '../UserConfig.vue'
import ContactUs from '../ContactUs.vue'
import Home from '../home.vue'


const routes = [

  //Definimos la página principal de la aplicación
  {
    path: '/',
    redirect: '/home', // Redirige automáticamente a /products
  },

  //Definimos las rutas de las distintas páginas de la aplicación
  {
    path: '/products',
    name: 'UserProducts',
    component: UserProducts
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/contact',
    name: 'ContactUs',
    component: ContactUs
  },
  {
    path: '/urlist',
    name: 'UrList',
    component: UrList
  },
  {
    path: '/add',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/about',
    name: 'AboutUs',
    component: AboutUs
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/userconfig',
    name: 'UserConfig',
    component: UserConfig
  },
]

// Creamos el router que nos permitirá navegar entre las distintas páginas de la aplicación
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router