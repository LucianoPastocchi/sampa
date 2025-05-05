// Definición de tipos para las traducciones
export type TranslationKey = keyof typeof es

// Español (idioma por defecto)
export const es = {
  common: {
    appName: "PetConnect",
    contactButton: "Contacto",
    termsLink: "Términos",
    privacyLink: "Privacidad",
    contactLink: "Contacto",
    copyright: "© 2024 PetConnect. Todos los derechos reservados.",
    languageSelector: "Idioma",
  },
  navigation: {
    problem: "Problema",
    solution: "Solución",
    technology: "Tecnología",
    features: "Funcionalidades",
    value: "Valor agregado",
  },
  hero: {
    title: "Conectando dueños de mascotas con cuidadores profesionales",
    description:
      "Plataforma digital que conecta paseadores, cuidadores de perros y particulares con dueños de mascotas en entornos urbanos de Argentina.",
    learnMoreButton: "Conocer más",
    signUpButton: "Registrarse",
  },
  problem: {
    title: "El problema",
    description: "Identificamos desafíos importantes en el cuidado de mascotas en entornos urbanos de Argentina",
    items: [
      {
        title: "Falta de regulación",
        description:
          "El sector de cuidado de mascotas carece de regulaciones claras, generando incertidumbre para dueños y cuidadores.",
      },
      {
        title: "Sobrecarga de hogares de tránsito",
        description: "Los refugios y hogares de tránsito enfrentan una sobrecarga constante de animales.",
      },
      {
        title: "Compatibilidad de rutinas",
        description:
          "La dificultad de compatibilizar rutinas laborales y personales con el cuidado adecuado de las mascotas.",
      },
    ],
  },
  solution: {
    title: "Nuestra solución",
    description:
      "Una plataforma digital que conecta paseadores, cuidadores y dueños de mascotas de forma segura y confiable",
    items: [
      {
        title: "Economía colaborativa",
        description:
          "Basada en principios de economía colaborativa, nuestra plataforma conecta oferta y demanda de servicios para mascotas.",
      },
      {
        title: "Profesionalización del sector",
        description: "Impulsamos la profesionalización del cuidado animal mediante estándares y calificaciones.",
      },
      {
        title: "Tenencia responsable",
        description: "Fomentamos la tenencia responsable de mascotas facilitando el acceso a servicios de calidad.",
      },
    ],
  },
  technology: {
    title: "Arquitectura tecnológica",
    description: "Implementamos una arquitectura moderna y escalable para garantizar la mejor experiencia",
    items: [
      {
        title: "Arquitectura MVC",
        technology: "Spring Boot",
        description: "Implementación de patrón MVC para una estructura clara y mantenible",
      },
      {
        title: "Frontend",
        technology: "ReactJS",
        description: "Interfaces dinámicas y responsivas para una experiencia de usuario óptima",
      },
      {
        title: "Despliegue",
        technology: "Docker",
        description: "Contenerización para facilitar el despliegue y gestión de la aplicación",
      },
      {
        title: "Arquitectura",
        technology: "Microservicios",
        description: "Arquitectura distribuida para mayor escalabilidad y mantenimiento",
      },
      {
        title: "Metodología",
        technology: "DevOps",
        description: "Implementación de principios DevOps para CI/CD y mejora continua",
      },
      {
        title: "Almacenamiento",
        technology: "Base de datos",
        description: "Sistema de persistencia segura y escalable para los datos",
      },
    ],
  },
  features: {
    title: "Funcionalidades principales",
    description: "Nuestra plataforma ofrece herramientas avanzadas para facilitar el cuidado de mascotas",
    items: [
      {
        title: "Geolocalización",
        description: "Encuentra servicios cercanos a tu ubicación con mapeo en tiempo real",
      },
      {
        title: "Reservas",
        description: "Sistema de reservas flexible para programar servicios de cuidado",
      },
      {
        title: "Pagos",
        description: "Pasarela de pagos segura para transacciones sin complicaciones",
      },
      {
        title: "Calificaciones",
        description: "Sistema de valoraciones para garantizar la calidad del servicio",
      },
    ],
  },
  value: {
    title: "Valor agregado",
    description: "Nuestro proyecto va más allá de ser una simple plataforma tecnológica",
    items: [
      {
        title: "Profesionalización del rubro",
        description: "Establecemos estándares profesionales para mejorar la calidad del servicio de cuidado animal.",
      },
      {
        title: "Fomento de la tenencia responsable",
        description: "Promovemos prácticas de tenencia responsable a través de educación y acceso a servicios.",
      },
      {
        title: "Economía colaborativa",
        description: "Creamos un ecosistema que beneficia tanto a proveedores de servicios como a dueños de mascotas.",
      },
    ],
  },
  cta: {
    title: "¿Listo para revolucionar el cuidado de mascotas?",
    description:
      "Únete a nuestra plataforma y forma parte de la comunidad que está transformando el cuidado animal en Argentina",
    signUpButton: "Regístrate ahora",
    contactButton: "Contactar",
  },
  auth: {
    signup: {
      title: "Crear una cuenta",
      description: "Ingresa tus datos para registrarte en la plataforma",
      firstName: "Nombre",
      lastName: "Apellido",
      userName: "Nombre de usuario",
      idCard: "DNI",
      email: "Email",
      password: "Contraseña",
      confirmPassword: "Confirmar contraseña",
      terms: "Acepto los términos y condiciones",
      submitButton: "Registrarse",
      loadingButton: "Registrando...",
      loginLink: "¿Ya tienes una cuenta?",
      loginLinkText: "Iniciar sesión",
      termsFooter: "Al registrarte, aceptas nuestros términos de servicio y política de privacidad.",
    },
    login: {
      title: "Iniciar sesión",
      description: "Ingresa tus credenciales para acceder a la plataforma",
      email: "Email",
      identifier: "Email o nombre de usuario",
      password: "Contraseña",
      forgotPassword: "¿Olvidaste tu contraseña?",
      submitButton: "Iniciar sesión",
      loadingButton: "Iniciando sesión...",
      signupLink: "¿No tienes una cuenta?",
      signupLinkText: "Registrarse",
      termsFooter: "Al iniciar sesión, aceptas nuestros términos de servicio y política de privacidad.",
      successMessage: "¡Registro exitoso! Ahora puedes iniciar sesión con tus credenciales.",
    },
    forgotPassword: {
      title: "Recuperar contraseña",
      description: "Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña",
      email: "Email",
      submitButton: "Enviar instrucciones",
      loadingButton: "Enviando...",
      loginLink: "Volver al inicio de sesión",
      successMessage: "Hemos enviado un correo a {email} con instrucciones para restablecer tu contraseña.",
    },
  },
  languages: {
    es: "Español",
    en: "Inglés",
  },
}

// Inglés
export const en = {
  common: {
    appName: "PetConnect",
    contactButton: "Contact",
    termsLink: "Terms",
    privacyLink: "Privacy",
    contactLink: "Contact",
    copyright: "© 2024 PetConnect. All rights reserved.",
    languageSelector: "Language",
  },
  navigation: {
    problem: "Problem",
    solution: "Solution",
    technology: "Technology",
    features: "Features",
    value: "Added Value",
  },
  hero: {
    title: "Connecting pet owners with professional caregivers",
    description:
      "Digital platform that connects dog walkers, dog sitters and individuals with pet owners in urban environments in Argentina.",
    learnMoreButton: "Learn more",
    signUpButton: "Sign up",
  },
  problem: {
    title: "The problem",
    description: "We identified important challenges in pet care in urban environments in Argentina",
    items: [
      {
        title: "Lack of regulation",
        description: "The pet care sector lacks clear regulations, generating uncertainty for owners and caregivers.",
      },
      {
        title: "Overload of transit homes",
        description: "Shelters and transit homes face a constant overload of animals.",
      },
      {
        title: "Routine compatibility",
        description: "The difficulty of reconciling work and personal routines with proper pet care.",
      },
    ],
  },
  solution: {
    title: "Our solution",
    description: "A digital platform that connects dog walkers, caregivers and pet owners safely and reliably",
    items: [
      {
        title: "Collaborative economy",
        description:
          "Based on collaborative economy principles, our platform connects supply and demand for pet services.",
      },
      {
        title: "Professionalization of the sector",
        description: "We promote the professionalization of animal care through standards and ratings.",
      },
      {
        title: "Responsible ownership",
        description: "We promote responsible pet ownership by facilitating access to quality services.",
      },
    ],
  },
  technology: {
    title: "Technological architecture",
    description: "We implement a modern and scalable architecture to ensure the best experience",
    items: [
      {
        title: "MVC Architecture",
        technology: "Spring Boot",
        description: "Implementation of MVC pattern for a clear and maintainable structure",
      },
      {
        title: "Frontend",
        technology: "ReactJS",
        description: "Dynamic and responsive interfaces for an optimal user experience",
      },
      {
        title: "Deployment",
        technology: "Docker",
        description: "Containerization to facilitate application deployment and management",
      },
      {
        title: "Architecture",
        technology: "Microservices",
        description: "Distributed architecture for greater scalability and maintenance",
      },
      {
        title: "Methodology",
        technology: "DevOps",
        description: "Implementation of DevOps principles for CI/CD and continuous improvement",
      },
      {
        title: "Storage",
        technology: "Database",
        description: "Secure and scalable persistence system for data",
      },
    ],
  },
  features: {
    title: "Main features",
    description: "Our platform offers advanced tools to facilitate pet care",
    items: [
      {
        title: "Geolocation",
        description: "Find services near your location with real-time mapping",
      },
      {
        title: "Reservations",
        description: "Flexible reservation system to schedule care services",
      },
      {
        title: "Payments",
        description: "Secure payment gateway for hassle-free transactions",
      },
      {
        title: "Ratings",
        description: "Rating system to guarantee service quality",
      },
    ],
  },
  value: {
    title: "Added value",
    description: "Our project goes beyond being a simple technological platform",
    items: [
      {
        title: "Professionalization of the field",
        description: "We establish professional standards to improve the quality of animal care service.",
      },
      {
        title: "Promotion of responsible ownership",
        description: "We promote responsible ownership practices through education and access to services.",
      },
      {
        title: "Collaborative economy",
        description: "We create an ecosystem that benefits both service providers and pet owners.",
      },
    ],
  },
  cta: {
    title: "Ready to revolutionize pet care?",
    description: "Join our platform and be part of the community that is transforming animal care in Argentina",
    signUpButton: "Register now",
    contactButton: "Contact",
  },
  auth: {
    signup: {
      title: "Create an account",
      description: "Enter your details to register on the platform",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      terms: "I accept the terms and conditions",
      submitButton: "Sign up",
      loadingButton: "Signing up...",
      loginLink: "Already have an account?",
      loginLinkText: "Log in",
      termsFooter: "By registering, you accept our terms of service and privacy policy.",
    },
    login: {
      title: "Log in",
      description: "Enter your credentials to access the platform",
      email: "Email",
      password: "Password",
      forgotPassword: "Forgot your password?",
      submitButton: "Log in",
      loadingButton: "Logging in...",
      signupLink: "Don't have an account?",
      signupLinkText: "Sign up",
      termsFooter: "By logging in, you accept our terms of service and privacy policy.",
      successMessage: "Successful registration! You can now log in with your credentials.",
    },
    forgotPassword: {
      title: "Recover password",
      description: "Enter your email and we will send you a link to reset your password",
      email: "Email",
      submitButton: "Send instructions",
      loadingButton: "Sending...",
      loginLink: "Back to login",
      successMessage: "We have sent an email to {email} with instructions to reset your password.",
    },
  },
  languages: {
    es: "Spanish",
    en: "English",
  },
}

// Tipo para los idiomas soportados
export type SupportedLanguage = "es" | "en"

// Objeto con todas las traducciones
export const translations = {
  es,
  en,
}

// Función para obtener una traducción específica
export function getTranslation(lang: SupportedLanguage, key: string): any {
  const keys = key.split(".")
  let result: any = translations[lang]

  for (const k of keys) {
    if (result && result[k] !== undefined) {
      result = result[k]
    } else {
      // Si no se encuentra la clave, intentar con el idioma por defecto (español)
      if (lang !== "es") {
        return getTranslation("es", key)
      }
      return undefined
    }
  }

  return result
}
