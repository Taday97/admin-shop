<template>
  <h1 class="text-2xl font-semibold mb-4">Registrieren</h1>
  <form @submit.prevent="onRegister">
    <!-- Error global del servidor -->
    <div v-if="serverError" class="text-red-500 text-sm mb-4">{{ serverError }}</div>

    <!-- Nombre -->
    <div class="mb-4">
      <label for="name" class="block text-gray-600">Benutzername</label>
      <input
        v-model="name"
        type="text"
        id="name"
        placeholder="Benutzernamen eingeben"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
      />
      <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
    </div>

    <!-- Email -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Email</label>
      <input
        v-model="email"
        type="text"
        id="email"
        placeholder="E-Mail-Adresse eingeben"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
      />
      <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
    </div>

    <!-- Password -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Passwort</label>
      <input
        v-model="password"
        type="password"
        id="password"
        placeholder="Passwort eingeben"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
      />
      <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
    </div>

    <!-- Confirm Password -->
    <div class="mb-4">
      <label for="confirmPassword" class="block text-gray-600">Passwort bestätigen</label>
      <input
        v-model="confirmPassword"
        type="password"
        id="confirmPassword"
        placeholder="Passwort erneut eingeben"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
      />
      <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">
        {{ errors.confirmPassword }}
      </p>
    </div>

    <!-- Botón -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Konto erstellen
    </button>
  </form>

  <!-- Login Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'login' }" class="hover:underline">Hier einloggen</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../store/auth.store';
import { ref } from 'vue';

const authStore = useAuthStore();
const toast = useToast();

// Validación del formulario
const schema = yup.object({
  name: yup.string().required('Benutzername ist erforderlich'),
  email: yup.string().required('Email ist erforderlich').email('Ungültige Email'),
  password: yup
    .string()
    .required('Passwort ist erforderlich')
    .min(7, 'Mindestens 7 Zeichen')
    .matches(/[A-Z]/, 'Mindestens eine Großbuchstabe')
    .matches(/[0-9]/, 'Mindestens eine Zahl')
    .matches(/[@$!%*?&]/, 'Mindestens ein Sonderzeichen (@$!%*?&)'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwörter stimmen nicht überein')
    .required('Bitte Passwort bestätigen'),
});

// Formulario
const { handleSubmit, errors, setErrors } = useForm({ validationSchema: schema });

// Campos individuales
const { value: name } = useField('name');
const { value: email } = useField('email');
const { value: password } = useField('password');
const { value: confirmPassword } = useField('confirmPassword');

// Error global (para mostrar mensaje del servidor)
const serverError = ref('');

// Submit
const onRegister = handleSubmit(async (values) => {
  serverError.value = ''; // reset antes de enviar
  try {
    const { ok, message } = await authStore.register(values.name, values.email, values.password);

    if (!ok) {
      serverError.value = message; // mostrar en el formulario
      return;
    }

    toast.success('Registrierung erfolgreich!');
  } catch (err) {
    serverError.value = 'Fehler beim Server. Bitte erneut versuchen.';
  }
});
</script>
