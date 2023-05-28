import { FC, ReactNode } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectAllMeta } from "stores/slices/metaSlices";

interface IPage {
  children: ReactNode | ReactNode[];
  id?: string;
  className?: string;
}

const Page: FC<IPage> = ({ children, className = "", id = "" }) => {
  const router = useRouter();

  const {
    title,
    description,
    image,
    ogTitle,
    ogDescription,
    contentType,
    published,
    category,
    updated,
    tags,
    noCrawl,
    themeColor,
    siteName,
    siteUrl,
  } = useSelector(selectAllMeta);

  const global = {
    site_url: siteUrl,
    facebook_app_id: "",
    defaultTitle: siteName,
    defaultDescription: siteName,
    defaultImage: siteUrl,
    defaultTwitter: "@burger",
    defaultSep: " | ",
    gtm: "",
  };

  const theTitle = title
    ? title + global.defaultSep + global.defaultTitle
    : global.defaultTitle;
  const theDescription = description ? description : global.defaultDescription;
  const theImage = image ? image : global.defaultImage;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />

        {/* FONTY */}
        <link rel="stylesheet preload prefetch" href="https://use.typekit.net/vpe5tmu.css" as="style" type="text/css" crossOrigin="anonymous" />

        {/* FAVICON */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content={themeColor} />
        <meta name="theme-color" content={themeColor} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{theTitle}</title>
        {/* {localizations.map((item, idx) => <link
            key={idx}
            rel="alternate"
            hrefLang={item.locale}
            href={DOMAIN + "/" + item.locale + (router.asPath !== "/" ? "/"+item.slug : "")}
          />
        )} */}
        
        <link
          rel="canonical"
          href={global.site_url + (router.asPath !== "/" ? router.asPath : "")}
        />
        <meta itemProp="name" content={theTitle} />
        <meta itemProp="description" content={theDescription} />
        <meta itemProp="image" content={theImage} />
        <meta name="description" content={theDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={siteName.toUpperCase()} />
        <meta name="twitter:title" content={ogTitle || theTitle} />
        <meta
          name="twitter:description"
          content={ogDescription || theDescription}
        />
        <meta name="twitter:image:src" content={theImage} />
        <meta property="og:title" content={ogTitle || theTitle} />
        <meta property="og:type" content={contentType} />
        <meta property="og:url" content={global.site_url + (router.asPath !== "/" ? router.asPath : "")} />
        <meta property="og:image" content={theImage} />
        <meta
          property="og:description"
          content={ogDescription || theDescription}
        />
        <meta property="og:site_name" content={siteName.toUpperCase()} />
        <meta property="fb:app_id" content={global.facebook_app_id} />

        {published && (
          <meta name="article:published_time" content={published} />
        )}
        {category && <meta name="article:section" content={category} />}
        {updated && <meta name="article:modified_time" content={updated} />}
        {noCrawl && <meta name="robots" content="noindex, nofollow" />}
        {tags && <meta name="article:tag" content={tags} />}
      </Head>

      {/* <!-- Google tag (gtag.js) --> */}
      {/* <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-2CMP76GFG2" />
      <Script id="gtag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-2CMP76GFG2');`}
      </Script> */}

      {/* Hotjar Tracking Code for my site */}
      {/* <Script id="hotjar">
        {`(function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3452190,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
      </Script> */}

      {/* <Script type="text/javascript" src="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.8.0/dist/cookieconsent.js" /> */}

      <main id={id} className={className}>{children}</main>
    </>
  );
};

export default Page;
