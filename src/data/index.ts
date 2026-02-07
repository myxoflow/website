// src/data/index.ts
// Pre-import all language JSON files for instant synchronous access

// ===== ENGLISH =====
import enHome from './en/home.json'
import enCompany from './en/company.json'
import enAbout from './en/about.json'
import enPartners from './en/partners.json'
import enFaq from './en/faq.json'
import enCaseStudies from './en/caseStudies.json'
import enHowItWorks from './en/howItWorks.json'
import enLegal from './en/legal.json'
import enProducts from './en/products/products.json'
import enCheddar from './en/products/cheddar.json'
import enFlowcraft from './en/products/flowcraft.json'
import enKitchenos from './en/products/kitchenos.json'
import enMinerva from './en/products/minerva.json'
import enMyxofill from './en/products/myxofill.json'
import enTimid from './en/products/timid.json'
import enNavigation from './en/navigation.json'

// ===== ITALIAN =====
import itHome from './it/home.json'
import itCompany from './it/company.json'
import itAbout from './it/about.json'
import itPartners from './it/partners.json'
import itFaq from './it/faq.json'
import itCaseStudies from './it/caseStudies.json'
import itHowItWorks from './it/howItWorks.json'
import itLegal from './it/legal.json'
import itProducts from './it/products/products.json'
import itCheddar from './it/products/cheddar.json'
import itFlowcraft from './it/products/flowcraft.json'
import itKitchenos from './it/products/kitchenos.json'
import itMinerva from './it/products/minerva.json'
import itMyxofill from './it/products/myxofill.json'
import itTimid from './it/products/timid.json'
import itNavigation from './it/navigation.json'

// ===== GERMAN =====
import deHome from './de/home.json'
import deCompany from './de/company.json'
import deAbout from './de/about.json'
import dePartners from './de/partners.json'
import deFaq from './de/faq.json'
import deCaseStudies from './de/caseStudies.json'
import deHowItWorks from './de/howItWorks.json'
import deLegal from './de/legal.json'
import deProducts from './de/products/products.json'
import deCheddar from './de/products/cheddar.json'
import deFlowcraft from './de/products/flowcraft.json'
import deKitchenos from './de/products/kitchenos.json'
import deMinerva from './de/products/minerva.json'
import deMyxofill from './de/products/myxofill.json'
import deTimid from './de/products/timid.json'
import deNavigation from './de/navigation.json'

// ===== EXPORT ALL DATA GROUPED BY SECTION =====
export const homeData = { en: enHome, it: itHome, de: deHome }
export const companyData = { en: enCompany, it: itCompany, de: deCompany }
export const aboutData = { en: enAbout, it: itAbout, de: deAbout }
export const partnersData = { en: enPartners, it: itPartners, de: dePartners }
export const faqData = { en: enFaq, it: itFaq, de: deFaq }
export const caseStudiesData = { en: enCaseStudies, it: itCaseStudies, de: deCaseStudies }
export const howItWorksData = { en: enHowItWorks, it: itHowItWorks, de: deHowItWorks }
export const legalData = { en: enLegal, it: itLegal, de: deLegal }
export const navigationData = { en: enNavigation, it: itNavigation, de: deNavigation }

// Products
export const productsData = { en: enProducts, it: itProducts, de: deProducts }
export const productDetails = {
  en: { cheddar: enCheddar, flowcraft: enFlowcraft, kitchenos: enKitchenos, minerva: enMinerva, myxofill: enMyxofill, timid: enTimid },
  it: { cheddar: itCheddar, flowcraft: itFlowcraft, kitchenos: itKitchenos, minerva: itMinerva, myxofill: itMyxofill, timid: itTimid },
  de: { cheddar: deCheddar, flowcraft: deFlowcraft, kitchenos: deKitchenos, minerva: deMinerva, myxofill: deMyxofill, timid: deTimid }
}
