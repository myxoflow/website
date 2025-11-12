<template>
  <div class="contact-page">
    <section class="hero">
      <h1>Contact {{ company.name }}</h1>
      <p>{{ company.tagline }}</p>
    </section>

    <section class="contact-details">
      <ul>
        <li>Email: <a :href="`mailto:${company.email}`">{{ company.email }}</a></li>
        <li>Phone: <a :href="`tel:${company.phone}`">{{ company.phone }}</a></li>
        <li>WhatsApp: 
          <a 
            :href="`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello ' + company.name + '!')}`" 
            target="_blank"
          >
            {{ company.phone }}
          </a>
        </li>
        <li>Address: {{ company.address.street }}, {{ company.address.city }}, {{ company.address.state }}, {{ company.address.zip }}, {{ company.address.country }}</li>
      </ul>
    </section>

    <section class="form-section">
      <h2>Send Us a Message</h2>
      <form @submit.prevent="submitForm">
        <div class="field">
          <label for="name">Name</label>
          <input id="name" v-model="form.name" required />
        </div>

        <div class="field">
          <label for="email">Email</label>
          <input id="email" type="email" v-model="form.email" required />
        </div>

        <div class="field">
          <label for="phone">Phone</label>
          <input id="phone" v-model="form.phone" />
        </div>

        <div class="field">
          <label for="message">Message</label>
          <textarea id="message" v-model="form.message" required></textarea>
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Sending...' : 'Send Message' }}
        </button>

        <p v-if="success" class="success">Thank you! We'll contact you shortly.</p>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
}

interface Address {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

interface CompanyInfo {
  name: string
  tagline: string
  description: string
  email: string
  phone: string
  address: Address
  social: { platform: string; url: string; handle: string }[]
}

// Company details
const company: CompanyInfo = {
  name: "MyxoFlow",
  tagline: "Decentralized Building, Real Results",
  description: "Inspired by nature's most efficient problem-solver, the slime mold, MyxoFlow operates as a decentralized, adaptive, profit-driven network. We optimize workflows, deployment, and resources — without unnecessary corporate layers.",
  email: "info@myxoflow.com",
  phone: "(+39) 3758327534",
  address: {
    street: "Innovation Hub",
    city: "Naples",
    state: "Campania",
    zip: "80100",
    country: "Italy"
  },
  social: [
    { platform: "github", url: "https://github.com/myxoflow", handle: "myxoflow" },
    { platform: "linkedin", url: "https://linkedin.com/company/myxoflow", handle: "MyxoFlow" }
  ]
}

const whatsappNumber = company.phone.replace(/\D/g, '') // numeric only

// Form state
const form = reactive<ContactForm>({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const loading = ref(false)
const success = ref(false)
const error = ref('')

// Form submission idea:
// 1. Call a serverless endpoint (/api/contact) that triggers:
//    - Email to company
//    - Optional storage in database for follow-up
// 2. Could also integrate with a CRM or SendGrid API
async function submitForm(): Promise<void> {
  loading.value = true
  success.value = false
  error.value = ''

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (!response.ok) throw new Error('Failed to send message')

    success.value = true
    Object.assign(form, { name: '', email: '', phone: '', message: '' })
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Something went wrong'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.contact-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 20px;

  .hero {
    text-align: center;
    margin-bottom: 40px;
    h1 { font-size: 38px; margin-bottom: 8px; }
    p { font-size: 18px; opacity: 0.9; }
  }

  .contact-details {
    margin-bottom: 60px;
    ul {
      list-style: none;
      padding: 0;
      li {
        font-size: 16px;
        margin-bottom: 12px;
        a { text-decoration: underline; }
      }
    }
  }

  .form-section {
    h2 { font-size: 28px; margin-bottom: 20px; }

    form {
      display: flex;
      flex-direction: column;

      .field {
        margin-bottom: 16px;
        label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
        }
        input, textarea {
          width: 100%;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid var(--q-grey-4);
          font-size: 16px;
          resize: vertical;
        }
        textarea { min-height: 120px; }
      }

      button {
        padding: 12px 20px;
        font-size: 16px;
        border: none;
        border-radius: 6px;
        background-color: var(--q-primary);
        color: white;
        cursor: pointer;
        &:disabled { opacity: 0.6; cursor: not-allowed; }
      }

      .success { color: green; margin-top: 12px; }
      .error { color: red; margin-top: 12px; }
    }
  }
}

@media (max-width: 768px) {
  .contact-page { padding: 60px 15px; }
  .form-section h2 { font-size: 24px; }
}
</style>
