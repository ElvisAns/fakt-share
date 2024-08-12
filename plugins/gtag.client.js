export default defineNuxtPlugin((nuxtApp) => {
  const { gtagId } = useRuntimeConfig().public;
  
  window.gtag = function () {
    window.dataLayer.push(arguments);
  }
  
  window.dataLayer = window.dataLayer || [];
  
  window.gtag("js", new Date());
  window.gtag("config", gtagId);
  
  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
        async: true,
        'data-cookie-consent' : 'tracking'
      },
    ],
  });
});