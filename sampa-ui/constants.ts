export const TEXTS = {
  common: {
    appName: "PetConnect",
    contactButton: "Contacto",
    termsLink: "Términos",
    privacyLink: "Privacidad",
    contactLink: "Contacto",
    copyright: "© 2024 PetConnect. Todos los derechos reservados.",
  },
  navigation: {
    problem: "Problema",
    solution: "Solución",
    technology: "Tecnología",
    features: "Funcionalidades",
    value: "Valor agregado",
    search: "Buscar"
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
}
