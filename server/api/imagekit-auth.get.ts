import ImageKit from 'imagekit';

export default defineEventHandler(() => {
  const config = useRuntimeConfig();

  if (!config.public.imagekitPublicKey || !config.imagekitPrivateKey || !config.public.imagekitUrlEndpoint) {
    throw createError({
      statusCode: 500,
      statusMessage: 'ImageKit credentials are not configured correctly.'
    });
  }

  const imagekit = new ImageKit({
    publicKey: config.public.imagekitPublicKey,
    privateKey: config.imagekitPrivateKey,
    urlEndpoint: config.public.imagekitUrlEndpoint,
  });

  const authParameters = imagekit.getAuthenticationParameters();

  return authParameters;
});
