import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // Home
      { path: "", name: "home", component: () => import("pages/HomePage.vue") },

      // Products listing + individual
      {
        path: "products",
        name: "products",
        component: () => import("pages/ProductsList.vue"),
      },
      {
        path: "products/:key",
        name: "product",
        component: () => import("pages/ProductPage.vue"),
        props: true,
      },

      // Company + Subpages
      {
        path: "company",
        name: "company",
        component: () => import("pages/CompanyPage.vue"),
      },
      {
        path: "company/about",
        name: "about",
        component: () => import("pages/AboutPage.vue"),
      },
      {
        path: "company/how-it-works",
        name: "how-it-works",
        component: () => import("pages/HowItWorks.vue"),
      },
      {
        path: "company/partners",
        name: "partners",
        component: () => import("pages/PartnersPage.vue"),
      },

      // Case Studies
      {
        path: "case-studies",
        name: "case-studies",
        component: () => import("pages/CaseStudies.vue"),
      },

      // FAQ
      {
        path: "faq",
        name: "faq",
        component: () => import("pages/FAQPage.vue"),
      },

      // Contact
      {
        path: "contact",
        name: "contact",
        component: () => import("pages/ContactPage.vue"),
      },

      // Legal
      {
        path: "legal/privacy",
        name: "privacy",
        component: () => import("pages/LegalPage.vue"),
      },
      {
        path: "legal/cookies",
        name: "cookies",
        component: () => import("pages/LegalPage.vue"),
      },
      {
        path: "legal/terms",
        name: "terms",
        component: () => import("pages/LegalPage.vue"),
      },
      {
        path: "legal/disclaimer",
        name: "disclaimer",
        component: () => import("pages/LegalPage.vue"),
      },
      {
        path: "legal/dpa",
        name: "dpa",
        component: () => import("pages/LegalPage.vue"),
      },
    ],
  },

  // 404
  {
    path: "/:catchAll(.*)*",
    name: "not-found",
    component: () => import("pages/ErrorPage.vue"),
  },
];

export default routes;
