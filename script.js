'use strict';

(function () {
  'use strict';

  // =========================================================================
  // DEBUG FLAG — Set to true to enable console output
  // =========================================================================
  var DEBUG = false;

  function log() {
    if (DEBUG) {
      console.log.apply(console, arguments);
    }
  }

  // =========================================================================
  // SECTION 1: CONFIGURATION
  // =========================================================================

  var CONFIG = {
    // ===== PRICE API =====
    API: {
      URL: 'https://apiv2.nobitex.ir/market/stats?srcCurrency=usdt&dstCurrency=rls',
      RETRY_DELAY: 5000,
      FETCH_INTERVAL: 30000,
      MAX_RETRIES: 3,
      TIMEOUT: 10000,
    },

    // ===== SUBSCRIPTION PLANS (USD) =====
    PLANS: [
      { months: 3, price: 15, originalPrice: 21 },
      { months: 6, price: 18, originalPrice: 30 },
      { months: 12, price: 33, originalPrice: 60 },
    ],

    // ===== TELEGRAM =====
    TELEGRAM: {
      ORDER_USERNAME: 'Reza10men',
      CHANNEL_USERNAME: 'Delivaan',
    },

    // ===== CHART =====
    CHART: {
      MAX_POINTS: 60,
      ANIMATION_DURATION: 500,
      LINE_COLOR: '#00D4AA',
      FILL_COLOR_START: 'rgba(0,212,170,0.3)',
      FILL_COLOR_END: 'rgba(0,212,170,0.0)',
      POINT_RADIUS: 4,
      PULSE_RADIUS: 12,
    },

    // ===== STORAGE KEYS =====
    STORAGE: {
      LANG: 'tg-premium-lang',
      THEME: 'tg-premium-theme',
      PRICE: 'tg-premium-last-price',
      PRICE_DATA: 'tg-premium-price-data',
      PROMO_DISMISSED: 'tg-premium-promo-dismissed',
      CALC_TOMAN: 'tg-premium-calc-toman',
      COOKIE_CONSENT: 'tg-premium-cookie-consent',
    },

    // ===== SCROLL =====
    SCROLL: {
      ANIMATED_COUNTER_THRESHOLD: 0.3,
      SCROLL_REVEAL_THRESHOLD: 0.1,
      BACK_TO_TOP_THRESHOLD: 400,
    },
  };

  // =========================================================================
  // SECTION 2: TRANSLATIONS (i18n) — ALL DIGITS MUST BE ENGLISH
  // =========================================================================

  var TRANSLATIONS = {
    fa: {
      // PAGE
      pageTitle: 'خرید تلگرام پریمیوم | Telegram Premium',
      loading: 'در حال بارگذاري...',
      brandName: 'پریمیوم تلگرام',

      // NAV
      navPrice: 'قیمت لحظه‌اي',
      navPlans: 'پلن‌ها',
      navFeatures: 'ويژگي‌ها',
      navTestimonials: 'نظرات مشتريان',
      navFaq: 'سوالات متداول',

      // HERO
      heroBadge: 'Telegram Premium Official',
      heroTitle: 'اشتراک تلگرام پریمیوم',
      heroSubtitle: 'خرید اشتراک تلگرام پریمیوم با بهترین قیمت | پشتیباني 24 ساعته',
      heroCtaBtn: 'مشاهده پلن‌ها',
      heroContactBtn: 'تماس با ما',

      // STATS
      statSupport: 'پشتيباني',
      statDelivery: 'دقيقه فعال‌سازي',
      statGuarantee: 'تضمين',

      // LIVE PRICE
      livePriceTitle: 'قیمت لحظه‌اي دلار',
      livePriceSubtitle: 'نرخ ارز از بازار آزاد | بروزرساني خودکار هر 30 ثانيه',
      currentUsdPrice: 'نرخ ارز',
      priceCurrencyRLS: 'ريال',
      priceLoading: '---',
      priceUpdated: 'آخرين بروزرساني:',
      priceFetching: 'در حال دريافت قیمت...',
      priceError: 'خطا در دريافت قیمت',
      priceRetry: 'تلاش مجدد...',
      priceConnected: 'متصل',
      priceDisconnected: 'قطع ارتباط',
      priceStatAvg: 'میانگين',
      priceStatLow: 'کمترين',
      priceStatChange: 'تغيير',

      // PLANS
      plansTitle: 'پلن‌هاي اشتراک',
      plansSubtitle: 'بهترين پلن را بر اساس نياز خود انتخاب کنيد',
      plan3Duration: '3 ماهه',
      plan3Name: 'پلن 3 ماهه',
      plan3Original: '$21',
      plan3Feat1: '3 ماه اشتراک پریمیوم',
      plan3Feat2: 'فعال‌سازي سريع',
      plan3Feat3: 'پشتيباني کامل',
      plan3Btn: 'سفارش 3 ماهه',
      plan6Duration: '6 ماهه',
      plan6Name: 'پلن 6 ماهه',
      plan6Original: '$30',
      plan6Feat1: '6 ماه اشتراک پریمیوم',
      plan6Feat2: 'فعال‌سازي سريع',
      plan6Feat3: 'پشتيباني کامل',
      plan6Feat4: 'بهترين ارزش',
      plan6Btn: 'سفارش 6 ماهه',
      plan12Duration: '12 ماهه',
      plan12Name: 'پلن 12 ماهه',
      plan12Original: '$60',
      plan12Feat1: '12 ماه اشتراک پریمیوم',
      plan12Feat2: 'فعال‌سازي سريع',
      plan12Feat3: 'پشتيباني کامل',
      plan12Feat4: 'صرفه‌جويي بيشتر',
      plan12Btn: 'سفارش 12 ماهه',
      planPriceUSD: 'دلار',
      recommended: 'پيشنهادي',

      // FEATURES
      featuresTitle: 'امکانات پریمیوم',
      featuresSubtitle: 'از تمام امکانات ويژه تلگرام پریمیوم بهره‌مند شويد',
      feat1Title: 'محدوديت دوبرابر',
      feat1Desc: 'ارسال فايل‌هاي بزرگ‌تر، استوري و استيکر بيشتر',
      feat2Title: 'دانلود سريع‌تر',
      feat2Desc: 'حداکثر سرعت دانلود بدون محدوديت',
      feat3Title: 'تبديل صوت به متن',
      feat3Desc: 'پيام‌هاي صوتي به صورت خودکار به متن تبديل مي‌شوند',
      feat4Title: 'نشان پریمیوم',
      feat4Desc: 'نشان ويژه کنار نام و پروفايل شما',
      feat5Title: 'بدون تبليغات',
      feat5Desc: 'تجربه تلگرام بدون هيچ تبليغي',
      feat6Title: 'آيکون‌هاي اختصاصي',
      feat6Desc: 'آيکون‌هاي منحصر به فرد براي اپليکيشن',
      feat7Title: 'مديريت پيشرفته',
      feat7Desc: 'دسته‌بندي چت‌ها و مديريت حرفه‌اي',
      feat8Title: 'نشان پروفايل',
      feat8Desc: 'پروفايل متفاوت و لوگوي اختصاصي',

      // TELEGRAM STARS
      starsTitle: 'تلگرام استارز',
      starsDesc: 'تلگرام استارز اعتبار رسمي داخل تلگرام براي خريد محتواي ديجيتال، سرویس‌ها و پرداخت در ربات‌ها و Mini Appها است. استارز ارز ديجيتال يا رمزارز نيست و نمي‌توان آن را استخراج، معامله يا به کیف پول خارجي منتقل کرد.',
      starFeat1: 'پرداخت سريع و مستقيم داخل تلگرام',
      starFeat2: 'بدون نياز به کارت بانکي بين‌المللي',
      starFeat3: 'قابل استفاده در ربات‌ها و Mini Appها',
      starFeat4: 'مناسب براي خريد سرويس‌ها و محتوای دیجیتال',

      // NOTES
      notesTitle: 'نکات مهم',
      notesSubtitle: 'پيش از خريد به اين موارد توجه کنيد',
      note1: 'فعال‌سازي اشتراک در کمتر از 30 دقيقه انجام مي‌شود',
      note2: 'پشتيباني 24 ساعته از طريق تلگرام',
      note3: 'اشتراک روي اکانت فعلي شما فعال مي‌شود',
      note4: 'قیمت دلار لحظه‌اي از بازار آزاد دريافت مي‌شود',
      note5: 'تضمين بازگشت وجه در صورت بروز مشکل',
      note6: 'پرداخت به تومان با نرخ لحظه‌اي دلار',

      // TESTIMONIALS (NEW)
      testimonialsTitle: 'نظرات مشتريان',
      testimonialsSubtitle: 'تجربه مشتريان ما از خدمات تلگرام پریمیوم',
      testimonial1Text: 'عالي! اشتراک در کمتر از 10 دقيقه فعال شد. پشتيباني هم بسيار سريع و دقيق بود. حتما دوباره سفارش مي‌دهم.',
      testimonial1Name: 'محمد رضائي',
      testimonial1Date: 'خرداد 1405',
      testimonial2Text: 'پلن 12 ماهه خريدم و قيمت خيلي مناسبي داشت. نسبت به ساير سايت‌ها به مراتب ارزان‌تر بود. خدمت عالي!',
      testimonial2Name: 'سارا احمدي',
      testimonial2Date: 'تير 1405',
      testimonial3Text: 'سومين بار است که از اين سرويس استفاده مي‌کنم. هميشه رضايت کامل داشتم. خريد امن و سريع.',
      testimonial3Name: 'علي کريمي',
      testimonial3Date: 'مرداد 1405',

      // FAQ
      faqTitle: 'سوالات متداول',
      faqSubtitle: 'پاسخ به سوالات رايج درباره تلگرام پریمیوم',
      faqQ1: 'پریمیوم تلگرام چيست؟',
      faqA1: 'تلگرام پریمیوم اشتراک ويژه تلگرام است که امکانات پيشرفته‌اي مانند محدوديت دوبرابر، دانلود سريع‌تر، نشان پریمیوم و بسياري امکانات ديگر را ارائه مي‌دهد. اين اشتراک روي اکانت فعلي شما فعال مي‌شود.',
      faqQ2: 'نحوه فعال‌سازي اشتراک چگونه است؟',
      faqA2: 'پس از ثبت سفارش و پرداخت، شماره اکانت تلگرام خود را ارسال کنيد. اشتراک پریمیوم در کمتر از 30 دقيقه روي اکانت شما فعال خواهد شد. شما از طريق تلگرام مراحل را پيگيري مي‌کنيد.',
      faqQ3: 'آيا اشتراک روي اکانت فعلي من فعال مي‌شود؟',
      faqA3: 'بله، اشتراک پریمیوم مستقيماً روي اکانت فعلي تلگرام شما فعال مي‌شود. هيچ نيازي به ساخت اکانت جديد نيست و تمام چت‌ها و داده‌هاي شما بدون تغيير باقي مي‌مانند.',
      faqQ4: 'قیمت بر اساس چه نرسي محاسبه مي‌شود؟',
      faqA4: 'قیمت اشتراک بر اساس نرخ لحظه‌اي دلار از بازار آزاد محاسبه مي‌شود. نرخ ارز هر 30 ثانيه بروزرساني شده و شما مي‌توانيد مبلغ نهايي را با ضرب قیمت دلار در تعداد ماه‌هاي پلن انتخابي محاسبه کنيد.',
      faqQ5: 'آيا تضمين بازگشت وجه وجود دارد؟',
      faqA5: 'بله، در صورت بروز هرگونه مشکل در فعال‌سازي اشتراک، وجه شما به طور کامل بازگردانده خواهد شد. ما تضمين کيفيت سرويس خود را مي‌دهيم.',
      faqQ6: 'تفاوت پلن‌هاي 3، 6 و 12 ماهه چيست؟',
      faqA6: 'تمام پلن‌ها همان امکانات پریمیوم را ارائه مي‌دهند. تفاوت فقط در مدت زمان و تخفيف است. پلن 6 ماهه و 12 ماهه تخفيف ويژه‌اي دارند و به صرفه‌تر هستند.',

      // ORDER / CTA
      orderTitle: 'همين الان سفارش دهيد',
      orderDesc: 'براي سفارش اشتراک تلگرام پریمیوم از طريق تلگرام با ما در ارتباط باشيد',
      orderBtn: 'سفارش از تلگرام',
      channelBtn: 'کانال ما',

      // FOOTER
      footerText: 'تمامي حقوق محفوظ است | تلگرام پریمیوم',

      // BACK TO TOP
      backToTop: 'بازگشت به بالا',

      // LANGUAGE TOGGLE
      langFa: 'فارسی',
      langEn: 'English',

      // PLAN TOMAN PRICES
      planTomanLabel: 'حدود',
      planTomanCurrency: 'تومان',
      planSavingLabel: 'صرفه‌جویی حدود',
      planVsTelegramLabel: 'نسبت به خرید مستقیم از تلگرام',

      // QUICK CONVERTER
      converterTitle: 'تبديل سريع',
      faqSearchPlaceholder: 'جستجو در سوالات...',

      // COMPARISON TABLE
      comparisonTitle: 'مقايسه Free و Premium',
      comparisonSubtitle: 'تفاوت امکانات تلگرام رايگان و پریمیوم',
      compFeature: 'ويژگي',
      compFree: 'Free',
      compPremium: 'Premium',
      compUploadLimit: 'محدوديت آپلود فايل',
      comp2GB: '2 GB',
      comp4GB: '4 GB',
      compDownloadSpeed: 'سرعت دانلود',
      compLimited: 'محدود',
      compMaximum: 'حداکثر',
      compVoiceToText: 'تبديل صوت به متن',
      compPremiumBadge: 'نشان پریمیوم',
      compAds: 'تبليغات',
      compYes: 'بله',
      compNo: 'بدون تبليغ',
      compCustomApp: 'آيکون اختصاصي',
      compChatFolders: 'پوشه‌بندي چت',
      comp3Folders: '3 پوشه',
      comp10Folders: '10 پوشه',
      compProfileBadge: 'نشان پروفايل',

      // TRUST BADGES
      trustSupport: '24/7 پشتيباني',
      trustActivation: 'فعال‌سازي فوري',
      trustRefund: 'بازگشت وجه',
      trustCustomers: '500+ مشتري',

      // COOKIE
      cookieAccept: 'Accept',
      cookieDecline: 'Decline',
      cookieText: 'This website uses cookies to enhance your experience.',

      // COPY
      priceCopied: 'Copied!',

      // SKIP TO CONTENT
      skipToContent: 'Skip to content',

      // TOAST
      toastOrderSuccess: 'سفارش با موفقيت ثبت شد',

      // HOW TO ORDER
      howToOrderTitle: 'نحوه سفارش',
      howToOrderSubtitle: 'در 4 قدم ساده اشتراک پریمیوم خود را فعال کنيد',
      step1Title: 'انتخاب پلن',
      step1Desc: 'از بين 3 پلن موجود، پلن مناسب خود را انتخاب کنيد',
      step2Title: 'تماس با ما',
      step2Desc: 'از طريق تلگرام به @Reza10men پيام بدهيد',
      step3Title: 'پرداخت',
      step3Desc: 'از طريق روش‌هاي پشتيباني شده پرداخت کنيد',
      step4Title: 'فعال‌سازي',
      step4Desc: 'اشتراک پریمیوم در کمتر از 30 دقيقه فعال مي‌شود',

      // SHARE
      shareBtn: 'اشتراك‌گذاري',
      shareCopied: 'لينک کپي شد!',

      // PLAN SAVE BADGES
      plan3Save: 'تخفيف 29%',
      plan6Save: 'تخفيف 40%',
      plan12Save: 'تخفيف 45%',

      // FAQ TOGGLE
      faqToggleAll: 'باز/بستن همه',
      faqToggleAllText: 'باز کردن همه',
      faqCollapseAllText: 'بستن همه',

      // ORDER STATUS
      orderStatusTitle: 'پيگيري سفارش',
      orderStatusPlaceholder: 'شماره تلفن يا شماره سفارش',
      orderStatusBtn: 'پيگيري',
      orderStatusPending: 'سفارش شما در حال بررسي است. نتايج از طريق تلگرام ارسال خواهد شد.',
      orderStatusActive: 'اشتراک پریمیوم شما فعال است!',
      orderStatusNotFound: 'سفارشي با اين مشخصات يافت نشد. لطفاً از طريق تلگرام با ما تماس بگيريد.',

      // PROMO CODE
      promoTitle: 'کد تخفيف داريد؟',
      promoPlaceholder: 'کد تخفيف را وارد کنيد',
      promoApplyBtn: 'اعمال',
      promoSuccess: 'کد تخفيف با موفقيت اعمال شد! 10% تخفيف.',
      promoError: 'کد تخفيف نامعتبر است.',
    },

    en: {
      // PAGE
      pageTitle: 'Buy Telegram Premium | Telegram Premium Subscription',
      loading: 'Loading...',
      brandName: 'Telegram Premium',

      // NAV
      navPrice: 'Live Price',
      navPlans: 'Plans',
      navFeatures: 'Features',
      navTestimonials: 'Reviews',
      navFaq: 'FAQ',

      // HERO
      heroBadge: 'Telegram Premium Official',
      heroTitle: 'Telegram Premium Subscription',
      heroSubtitle: 'Buy Telegram Premium at the best price | 24/7 Support',
      heroCtaBtn: 'View Plans',
      heroContactBtn: 'Contact Us',

      // STATS
      statSupport: 'Support',
      statDelivery: 'min delivery',
      statGuarantee: 'Guarantee',

      // LIVE PRICE
      livePriceTitle: 'Live Dollar Price',
      livePriceSubtitle: 'Free market exchange rate | Auto-refresh every 30 seconds',
      currentUsdPrice: 'Exchange Rate',
      priceCurrencyRLS: 'RLS',
      priceLoading: '---',
      priceUpdated: 'Last Updated:',
      priceFetching: 'Fetching price...',
      priceError: 'Error fetching price',
      priceRetry: 'Retrying...',
      priceConnected: 'Connected',
      priceDisconnected: 'Disconnected',
      priceStatAvg: 'Average',
      priceStatLow: 'Lowest',
      priceStatChange: 'Change',

      // PLANS
      plansTitle: 'Subscription Plans',
      plansSubtitle: 'Choose the best plan based on your needs',
      plan3Duration: '3 Months',
      plan3Name: '3-Month Plan',
      plan3Original: '$21',
      plan3Feat1: '3 months Premium subscription',
      plan3Feat2: 'Fast activation',
      plan3Feat3: 'Full support',
      plan3Btn: 'Order 3-Month',
      plan6Duration: '6 Months',
      plan6Name: '6-Month Plan',
      plan6Original: '$30',
      plan6Feat1: '6 months Premium subscription',
      plan6Feat2: 'Fast activation',
      plan6Feat3: 'Full support',
      plan6Feat4: 'Best value',
      plan6Btn: 'Order 6-Month',
      plan12Duration: '12 Months',
      plan12Name: '12-Month Plan',
      plan12Original: '$60',
      plan12Feat1: '12 months Premium subscription',
      plan12Feat2: 'Fast activation',
      plan12Feat3: 'Full support',
      plan12Feat4: 'Maximum savings',
      plan12Btn: 'Order 12-Month',
      planPriceUSD: 'USD',
      recommended: 'Recommended',

      // FEATURES
      featuresTitle: 'Premium Features',
      featuresSubtitle: 'Enjoy all exclusive Telegram Premium features',
      feat1Title: 'Double Limits',
      feat1Desc: 'Send larger files, more stories and stickers',
      feat2Title: 'Faster Downloads',
      feat2Desc: 'Maximum download speed with no limits',
      feat3Title: 'Voice to Text',
      feat3Desc: 'Voice messages are automatically transcribed to text',
      feat4Title: 'Premium Badge',
      feat4Desc: 'Special badge next to your name and profile',
      feat5Title: 'Ad-Free',
      feat5Desc: 'Experience Telegram without any advertisements',
      feat6Title: 'Custom Icons',
      feat6Desc: 'Unique custom icons for the application',
      feat7Title: 'Advanced Management',
      feat7Desc: 'Chat folders and professional management tools',
      feat8Title: 'Profile Badge',
      feat8Desc: 'Distinctive profile and custom logo',

      // TELEGRAM STARS
      starsTitle: 'Telegram Stars',
      starsDesc: 'Telegram Stars is Telegram\'s official in-app credit for purchasing digital content, services, and payments within bots and Mini Apps. Stars is NOT a cryptocurrency — it cannot be mined, traded, or transferred to external wallets.',
      starFeat1: 'Fast and direct payments inside Telegram',
      starFeat2: 'No international bank card required',
      starFeat3: 'Usable in bots and Mini Apps',
      starFeat4: 'Ideal for buying services and digital content',

      // NOTES
      notesTitle: 'Important Notes',
      notesSubtitle: 'Please note these items before purchasing',
      note1: 'Subscription activated in less than 30 minutes',
      note2: '24/7 support via Telegram',
      note3: 'Subscription activates on your current account',
      note4: 'Real-time dollar price from free market',
      note5: 'Money-back guarantee if issues arise',
      note6: 'Payment in Toman at real-time exchange rate',

      // TESTIMONIALS (NEW)
      testimonialsTitle: 'Customer Reviews',
      testimonialsSubtitle: 'What our customers say about Telegram Premium service',
      testimonial1Text: 'Excellent! Subscription activated in less than 10 minutes. Support was very fast and precise. Will definitely order again.',
      testimonial1Name: 'Mohammad Rezaei',
      testimonial1Date: 'June 2026',
      testimonial2Text: 'Bought the 12-month plan and the price was very reasonable. Much cheaper compared to other sites. Great service!',
      testimonial2Name: 'Sara Ahmadi',
      testimonial2Date: 'July 2026',
      testimonial3Text: 'This is the third time I\'ve used this service. Always completely satisfied. Safe and fast purchase.',
      testimonial3Name: 'Ali Karimi',
      testimonial3Date: 'August 2026',

      // FAQ
      faqTitle: 'Frequently Asked Questions',
      faqSubtitle: 'Answers to common questions about Telegram Premium',
      faqQ1: 'What is Telegram Premium?',
      faqA1: 'Telegram Premium is Telegram\'s special subscription service that offers advanced features like double limits, faster downloads, Premium badge, and many more. The subscription activates on your current account.',
      faqQ2: 'How does subscription activation work?',
      faqA2: 'After placing your order and making payment, send your Telegram account number. Your Premium subscription will be activated on your account in less than 30 minutes. You can track the process via Telegram.',
      faqQ3: 'Will the subscription activate on my current account?',
      faqA3: 'Yes, the Premium subscription activates directly on your current Telegram account. There is no need to create a new account and all your chats and data remain unchanged.',
      faqQ4: 'How is the price calculated?',
      faqA4: 'The subscription price is calculated based on the real-time dollar rate from the free market. The exchange rate refreshes every 30 seconds and you can calculate the final amount by multiplying the dollar price by the number of months in your chosen plan.',
      faqQ5: 'Is there a money-back guarantee?',
      faqA5: 'Yes, if any issues arise during subscription activation, your payment will be fully refunded. We guarantee the quality of our service.',
      faqQ6: 'What is the difference between 3, 6, and 12-month plans?',
      faqA6: 'All plans offer the same Premium features. The difference is only in duration and discount. The 6-month and 12-month plans have special discounts and offer better value.',

      // ORDER / CTA
      orderTitle: 'Order Now',
      orderDesc: 'To order Telegram Premium subscription, contact us via Telegram',
      orderBtn: 'Order via Telegram',
      channelBtn: 'Our Channel',

      // FOOTER
      footerText: 'All rights reserved | Telegram Premium',

      // BACK TO TOP
      backToTop: 'Back to top',

      // LANGUAGE TOGGLE
      langFa: 'فارسی',
      langEn: 'English',

      // PLAN TOMAN PRICES
      planTomanLabel: 'About',
      planTomanCurrency: 'Toman',
      planSavingLabel: 'Save about',
      planVsTelegramLabel: 'vs buying directly from Telegram',

      // QUICK CONVERTER
      converterTitle: 'Quick Convert',
      faqSearchPlaceholder: 'Search questions...',

      // COMPARISON TABLE
      comparisonTitle: 'Free vs Premium Comparison',
      comparisonSubtitle: 'Compare features between free and Premium Telegram',
      compFeature: 'Feature',
      compFree: 'Free',
      compPremium: 'Premium',
      compUploadLimit: 'File Upload Limit',
      comp2GB: '2 GB',
      comp4GB: '4 GB',
      compDownloadSpeed: 'Download Speed',
      compLimited: 'Limited',
      compMaximum: 'Maximum',
      compVoiceToText: 'Voice to Text',
      compPremiumBadge: 'Premium Badge',
      compAds: 'Advertisements',
      compYes: 'Yes',
      compNo: 'Ad-free',
      compCustomApp: 'Custom App Icon',
      compChatFolders: 'Chat Folders',
      comp3Folders: '3 folders',
      comp10Folders: '10 folders',
      compProfileBadge: 'Profile Badge',

      // COOKIE
      cookieAccept: 'Accept',
      cookieDecline: 'Decline',
      cookieText: 'This website uses cookies to enhance your experience.',

      // COPY
      priceCopied: 'Copied!',

      // SKIP TO CONTENT
      skipToContent: 'Skip to content',

      // TRUST BADGES
      trustSupport: '24/7 Support',
      trustActivation: 'Instant Activation',
      trustRefund: 'Money Back',
      trustCustomers: '500+ Customers',

      // TOAST
      toastOrderSuccess: 'Order placed successfully',

      // HOW TO ORDER
      howToOrderTitle: 'How to Order',
      howToOrderSubtitle: 'Activate your Premium subscription in 4 simple steps',
      step1Title: 'Choose Plan',
      step1Desc: 'Select from 3 available plans that suits your needs',
      step2Title: 'Contact Us',
      step2Desc: 'Send a message to @Reza10men via Telegram',
      step3Title: 'Payment',
      step3Desc: 'Pay using one of our supported payment methods',
      step4Title: 'Activation',
      step4Desc: 'Premium activates within 30 minutes',

      // SHARE
      shareBtn: 'Share',
      shareCopied: 'Link copied!',

      // PLAN SAVE BADGES
      plan3Save: 'Save 29%',
      plan6Save: 'Save 40%',
      plan12Save: 'Save 45%',

      // FAQ TOGGLE
      faqToggleAll: 'Expand/Collapse All',
      faqToggleAllText: 'Expand All',
      faqCollapseAllText: 'Collapse All',

      // ORDER STATUS
      orderStatusTitle: 'Check Order Status',
      orderStatusPlaceholder: 'Phone number or order ID',
      orderStatusBtn: 'Track',
      orderStatusPending: 'Your order is being processed. Results will be sent via Telegram.',
      orderStatusActive: 'Your Telegram Premium is active!',
      orderStatusNotFound: 'No order found with this info. Please contact us via Telegram.',

      // PROMO CODE
      promoTitle: 'Have a promo code?',
      promoPlaceholder: 'Enter promo code',
      promoApplyBtn: 'Apply',
      promoSuccess: 'Promo code applied! 10% discount.',
      promoError: 'Invalid promo code.',
    },
  };

  // =========================================================================
  // SECTION 3: STATE MANAGEMENT
  // =========================================================================

  var state = {
    lang: 'fa',
    theme: 'dark',
    currentPrice: null,
    lastPrice: null,
    priceHistory: [],
    isConnected: false,
    retryCount: 0,
    fetchTimer: null,
    telegram: null,
    isInTelegram: false,
    chartAnimationId: null,
    pulseAnimationId: null,
    isPulsing: false,
    countersAnimated: false,
    showTomanCalc: false,
  };

  // =========================================================================
  // SECTION 4: DOM HELPERS
  // =========================================================================

  function $(selector) {
    return document.querySelector(selector);
  }

  function $$(selector) {
    return Array.from(document.querySelectorAll(selector));
  }

  function createEl(tag, attrs, text) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        el.setAttribute(key, attrs[key]);
      });
    }
    if (text !== undefined && text !== null) {
      el.textContent = text;
    }
    return el;
  }

  function addClass(el) {
    var classes = Array.prototype.slice.call(arguments, 1);
    classes.forEach(function (cls) {
      if (cls && el) el.classList.add(cls);
    });
  }

  function removeClass(el) {
    var classes = Array.prototype.slice.call(arguments, 1);
    classes.forEach(function (cls) {
      if (cls && el) el.classList.remove(cls);
    });
  }

  function toggleClass(el, cls) {
    if (el && cls) el.classList.toggle(cls);
  }

  function storageGet(key, fallback) {
    try {
      var val = localStorage.getItem(key);
      return val !== null ? val : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function storageSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // Silently fail
    }
  }

  // =========================================================================
  // SECTION 5: LANGUAGE SYSTEM — MUST SET data-lang ON BODY!
  // =========================================================================

  function initLanguage() {
    var savedLang = storageGet(CONFIG.STORAGE.LANG, 'fa');
    state.lang = savedLang === 'en' ? 'en' : 'fa';
    setLanguage(state.lang, false);
  }

  function setLanguage(lang, notify) {
    if (notify === undefined) notify = true;

    if (lang !== 'fa' && lang !== 'en') {
      lang = 'fa';
    }

    state.lang = lang;
    updateDirection();
    applyTranslations();
    storageSet(CONFIG.STORAGE.LANG, lang);

    // Restore live price after i18n overwrites it
    if (state.currentPrice) {
      updatePriceDisplay(state.currentPrice);
    }
    if (state.priceHistory.length > 0) {
      updatePriceStats();
    }

    // Update the language toggle button flags
    var langToggle = $('#langToggle');
    if (langToggle) {
      var flagActive = langToggle.querySelector('.flag-active');
      var flagInactive = langToggle.querySelector('.flag-inactive');
      if (flagActive && flagInactive) {
        flagActive.classList.remove('flag-active');
        flagActive.classList.add('flag-inactive');
        flagInactive.classList.remove('flag-inactive');
        flagInactive.classList.add('flag-active');
      }
    }

    if (notify) {
      haptic('light');
    }

    log('[TG Premium] Language set to:', lang);
  }

  /**
   * CRITICAL: Sets dir and lang on <html> AND data-lang on <body>.
   */
  function updateDirection() {
    var dir = state.lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', state.lang);
    document.body.setAttribute('dir', dir);
    document.body.setAttribute('data-lang', state.lang);
    document.body.dataset.lang = state.lang;
  }

  function applyTranslations() {
    var t = TRANSLATIONS[state.lang];

    $$('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        if (t[key].indexOf('<') !== -1) {
          // Allow HTML in translations for promoText etc.
          el.innerHTML = t[key];
        } else if (t[key].indexOf('\n') !== -1) {
          el.innerHTML = '';
          var lines = t[key].split('\n');
          lines.forEach(function (line, i) {
            if (i > 0) {
              el.appendChild(createEl('br'));
            }
            el.appendChild(document.createTextNode(line));
          });
        } else {
          el.textContent = t[key];
        }
      }
    });

    // Update plan Toman prices on language change
    updatePlanTomanPrices();
  }

  // =========================================================================
  // SECTION 6: THEME SYSTEM — DEFAULTS TO DARK
  // =========================================================================

  function initTheme() {
    var savedTheme = storageGet(CONFIG.STORAGE.THEME, 'dark');
    state.theme = savedTheme === 'light' ? 'light' : 'dark';
    applyTheme(state.theme);
  }

  function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    applyTheme(state.theme);
    storageSet(CONFIG.STORAGE.THEME, state.theme);
    updateThemeIcon();
    haptic('light');
    log('[TG Premium] Theme toggled to:', state.theme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    updateThemeIcon();
  }

  function updateThemeIcon() {
    var themeToggle = $('#themeToggle');
    if (!themeToggle) return;

    if (state.theme === 'light') {
      themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
      themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    } else {
      themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
      themeToggle.setAttribute('aria-label', 'Switch to light theme');
    }
  }

  // =========================================================================
  // SECTION 7: TELEGRAM MINI APP
  // =========================================================================

  function initTelegram() {
    try {
      if (window.Telegram && window.Telegram.WebApp) {
        state.isInTelegram = true;
        state.telegram = window.Telegram.WebApp;

        state.telegram.ready();
        state.telegram.expand();

        applyTelegramThemeColor();

        var tg = state.telegram;
        if (tg.MainButton) {
          tg.MainButton.text = state.lang === 'fa' ? 'سفارش دهید' : 'Order Now';
          tg.MainButton.show();
          tg.MainButton.onClick(function () {
            openTelegramOrder();
          });
        }

        log('[TG Premium] Telegram Mini App initialized');
      } else {
        state.isInTelegram = false;
        log('[TG Premium] Running outside Telegram (standalone mode)');
      }
    } catch (e) {
      log('[TG Premium] Telegram init error:', e);
      state.isInTelegram = false;
    }
  }

  function applyTelegramThemeColor() {
    var tg = state.telegram;
    if (!tg) return;

    try {
      var color = tg.themeParams && tg.themeParams.bg_color;
      if (color) {
        document.documentElement.style.setProperty('--tg-bg', color);
      }

      var textColor = tg.themeParams && tg.themeParams.text_color;
      if (textColor) {
        document.documentElement.style.setProperty('--tg-text', textColor);
      }

      var buttonColor = tg.themeParams && tg.themeParams.button_color;
      if (buttonColor) {
        document.documentElement.style.setProperty('--tg-button', buttonColor);
      }
    } catch (e) {
      // Silently fail
    }
  }

  function haptic(type) {
    try {
      if (state.telegram && state.telegram.HapticFeedback) {
        switch (type) {
          case 'light':
            state.telegram.HapticFeedback.impactOccurred('light');
            break;
          case 'medium':
            state.telegram.HapticFeedback.impactOccurred('medium');
            break;
          case 'heavy':
            state.telegram.HapticFeedback.impactOccurred('heavy');
            break;
          case 'error':
            state.telegram.HapticFeedback.notificationOccurred('error');
            break;
          case 'success':
            state.telegram.HapticFeedback.notificationOccurred('success');
            break;
        }
      }
    } catch (e) {
      // Silently fail
    }
  }

  function openTelegramOrder() {
    var url = 'https://t.me/' + CONFIG.TELEGRAM.ORDER_USERNAME;
    window.open(url, '_blank', 'noopener,noreferrer');
    haptic('success');
  }

  function openTelegramChannel() {
    var url = 'https://t.me/' + CONFIG.TELEGRAM.CHANNEL_USERNAME;
    window.open(url, '_blank', 'noopener,noreferrer');
    haptic('light');
  }

  // =========================================================================
  // SECTION 8: PRICE API — Shows USD/RLS rate
  // =========================================================================

  function initPriceAPI() {
    // Restore last known price
    var savedPrice = storageGet(CONFIG.STORAGE.PRICE, null);
    if (savedPrice) {
      state.currentPrice = parseFloat(savedPrice);
      state.lastPrice = state.currentPrice;
      updatePriceDisplay(state.currentPrice);
    }

    // Restore price history for the chart
    var savedData = storageGet(CONFIG.STORAGE.PRICE_DATA, null);
    if (savedData) {
      try {
        var parsed = JSON.parse(savedData);
        if (Array.isArray(parsed)) {
          state.priceHistory = parsed;
        }
      } catch (e) {
        // Ignore corrupted data
      }
    }

    // Fetch immediately, then start interval
    fetchPrice();

    state.fetchTimer = setInterval(function () {
      fetchPrice();
    }, CONFIG.API.FETCH_INTERVAL);
  }

  function fetchPrice() {
    var t = TRANSLATIONS[state.lang];

    var statusContainer = $('.price-status');
    var statusTextEl = statusContainer ? statusContainer.querySelector('span:last-child') : null;

    if (statusTextEl) {
      statusTextEl.textContent = t.priceFetching;
    }

    var controller = new AbortController();
    var timeoutId = setTimeout(function () {
      controller.abort();
    }, CONFIG.API.TIMEOUT);

    fetch(CONFIG.API.URL, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(function (response) {
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }

        return response.json();
      })
      .then(function (data) {
        var priceRaw = null;

        try {
          if (data && data.stats && data.stats['usdt-rls']) {
            priceRaw = data.stats['usdt-rls'].latest;
          } else if (data && data.stats && data.stats['usdt-rls'] && data.stats['usdt-rls'].priceLatest) {
            priceRaw = data.stats['usdt-rls'].priceLatest;
          }
        } catch (parseErr) {
          throw new Error('Unexpected API response format');
        }

        if (!priceRaw) {
          throw new Error('Price data not found in response');
        }

        var price = parseFloat(priceRaw);

        if (isNaN(price) || price <= 0) {
          throw new Error('Invalid price value: ' + priceRaw);
        }

        state.lastPrice = state.currentPrice;
        state.currentPrice = price;
        state.isConnected = true;
        state.retryCount = 0;

        updatePriceDisplay(price);
        updateConnectionStatus(true);
        updatePriceStats();
        addPricePoint(price);
        glowPriceCard();

        storageSet(CONFIG.STORAGE.PRICE, String(price));

        haptic('success');
        log('[TG Premium] Price fetched:', price);
      })
      .catch(function (err) {
        clearTimeout(timeoutId);

        var isAborted = err.name === 'AbortError';
        state.retryCount++;
        state.isConnected = false;

        updateConnectionStatus(false);

        if (statusTextEl) {
          if (state.retryCount <= CONFIG.API.MAX_RETRIES) {
            statusTextEl.textContent = t.priceRetry;
          } else {
            statusTextEl.textContent = t.priceError;
          }
        }

        if (state.retryCount <= CONFIG.API.MAX_RETRIES) {
          setTimeout(function () {
            fetchPrice();
          }, CONFIG.API.RETRY_DELAY);
        }

        if (state.currentPrice) {
          updatePriceDisplay(state.currentPrice);
        }

        log('[TG Premium] Price fetch error:', err.message || err);
      });
  }

  /**
   * FIX: Double currency display bug — only set number, don't append currency.
   * The HTML has a separate <span class="price-currency" data-i18n="priceCurrencyRLS">
   * element that already shows the currency text.
   */
  function updatePriceDisplay(price) {
    var priceEl = $('#priceValue');

    if (priceEl) {
      priceEl.textContent = formatNumber(price);
      // Trigger pulse animation
      addClass(priceEl, 'pulse');
      setTimeout(function () {
        if (priceEl) removeClass(priceEl, 'pulse');
      }, 400);
    }

    var timestampEl = $('#priceTimestamp');
    if (timestampEl) {
      timestampEl.textContent = formatTime(new Date());
    }

    // Update calculator if Toman is visible
    if (state.showTomanCalc) {
      updateCalculator();
    }
  }

  function updatePriceStats() {
    var avgEl = $('#priceAvg');
    var lowEl = $('#priceLow');
    var changeEl = $('#priceChange');

    if (!state.priceHistory || state.priceHistory.length === 0) return;

    var prices = state.priceHistory.map(function (d) { return d.price; });
    var sum = prices.reduce(function (a, b) { return a + b; }, 0);
    var avg = sum / prices.length;
    var low = Math.min.apply(null, prices);

    if (avgEl) {
      avgEl.textContent = formatNumber(Math.round(avg)) + ' RLS';
    }
    if (lowEl) {
      lowEl.textContent = formatNumber(Math.round(low)) + ' RLS';
    }
    if (changeEl) {
      if (prices.length >= 2 && state.lastPrice) {
        var diff = state.currentPrice - state.lastPrice;
        var pct = ((diff / state.lastPrice) * 100).toFixed(2);
        var sign = diff >= 0 ? '+' : '';
        changeEl.textContent = sign + pct + '%';
        if (diff > 0) {
          changeEl.className = 'price-stat-value num price-up';
        } else if (diff < 0) {
          changeEl.className = 'price-stat-value num price-down';
        } else {
          changeEl.className = 'price-stat-value num';
        }
      } else {
        changeEl.textContent = '0%';
        changeEl.className = 'price-stat-value num';
      }
    }
  }

  function updateConnectionStatus(connected) {
    var statusContainer = $('.price-status');
    var statusTextEl = statusContainer ? statusContainer.querySelector('span:last-child') : null;
    var t = TRANSLATIONS[state.lang];

    if (statusTextEl && connected) {
      statusTextEl.textContent = t.priceConnected;
    }
  }

  function formatNumber(num) {
    if (num === null || num === undefined || isNaN(num)) {
      return '0';
    }
    return Math.round(num).toLocaleString('en-US');
  }

  function formatTime(date) {
    if (!date) date = new Date();
    var h = String(date.getHours()).padStart(2, '0');
    var m = String(date.getMinutes()).padStart(2, '0');
    var s = String(date.getSeconds()).padStart(2, '0');
    return h + ':' + m + ':' + s;
  }

  // =========================================================================
  // SECTION 9: PRICE CHART (Canvas 2D)
  // =========================================================================

  var chartCanvas = null;
  var chartCtx = null;
  var chartAnimProgress = 1;
  var chartResizeTimeout = null;
  var chartHover = { active: false, x: 0, y: 0, index: -1 };

  function initChart() {
    chartCanvas = $('#priceChart');
    if (!chartCanvas) {
      log('[TG Premium] Chart canvas element not found');
      return;
    }

    chartCtx = chartCanvas.getContext('2d');
    if (!chartCtx) {
      log('[TG Premium] Could not get 2D context for chart');
      return;
    }

    resizeChart();

    window.addEventListener('resize', function () {
      if (chartResizeTimeout) clearTimeout(chartResizeTimeout);
      chartResizeTimeout = setTimeout(function () {
        resizeChart();
        drawChart();
      }, 200);
    });

    chartCanvas.addEventListener('mousemove', handleChartHover);
    chartCanvas.addEventListener('mouseleave', function () {
      chartHover.active = false;
      chartCanvas.style.cursor = 'default';
      drawChart();
    });

    chartCanvas.addEventListener('touchmove', function (e) {
      e.preventDefault();
      var touch = e.touches[0];
      var rect = chartCanvas.getBoundingClientRect();
      handleChartHoverEvent(touch.clientX - rect.left, touch.clientY - rect.top);
      drawChart();
    }, { passive: false });

    chartCanvas.addEventListener('touchend', function () {
      chartHover.active = false;
      drawChart();
    });

    drawChart();
    log('[TG Premium] Chart initialized');
  }

  function resizeChart() {
    if (!chartCanvas || !chartCtx) return;
    var wrapper = chartCanvas.parentElement;
    if (!wrapper) return;

    var rect = wrapper.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    var width = rect.width - 24; // padding
    var height = 200;

    chartCanvas.width = width * dpr;
    chartCanvas.height = height * dpr;
    chartCanvas.style.width = width + 'px';
    chartCanvas.style.height = height + 'px';

    chartCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function handleChartHover(e) {
    var rect = chartCanvas.getBoundingClientRect();
    handleChartHoverEvent(e.clientX - rect.left, e.clientY - rect.top);
    drawChart();
  }

  function handleChartHoverEvent(mouseX, mouseY) {
    var data = state.priceHistory;
    if (!data || data.length < 2) {
      chartHover.active = false;
      return;
    }

    var displayWidth = parseFloat(chartCanvas.style.width);
    var displayHeight = parseFloat(chartCanvas.style.height);
    var padding = { top: 20, right: 20, bottom: 30, left: 20 };
    var chartW = displayWidth - padding.left - padding.right;
    var chartH = displayHeight - padding.top - padding.bottom;

    chartHover.x = mouseX;
    chartHover.y = mouseY;

    var relativeX = mouseX - padding.left;
    var step = chartW / (data.length - 1);
    var idx = Math.round(relativeX / step);

    if (idx < 0) idx = 0;
    if (idx >= data.length) idx = data.length - 1;

    chartHover.index = idx;
    chartHover.active = true;
    chartCanvas.style.cursor = 'crosshair';
  }

  function addPricePoint(price) {
    var now = Date.now();
    state.priceHistory.push({ price: price, time: now });

    if (state.priceHistory.length > CONFIG.CHART.MAX_POINTS) {
      state.priceHistory.shift();
    }

    // Save to localStorage (keep last 60 points)
    storageSet(CONFIG.STORAGE.PRICE_DATA, JSON.stringify(state.priceHistory));

    drawChart();
  }

  function drawChart() {
    if (!chartCtx || !chartCanvas) return;

    var data = state.priceHistory;
    var displayWidth = parseFloat(chartCanvas.style.width) || chartCanvas.width;
    var displayHeight = parseFloat(chartCanvas.style.height) || chartCanvas.height;

    // Clear
    chartCtx.clearRect(0, 0, displayWidth, displayHeight);

    if (!data || data.length < 2) {
      // Draw placeholder text
      chartCtx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#5A6A7E';
      chartCtx.font = '14px Inter, system-ui, sans-serif';
      chartCtx.textAlign = 'center';
      chartCtx.fillText(state.lang === 'fa' ? 'در انتظار داده...' : 'Waiting for data...', displayWidth / 2, displayHeight / 2);
      return;
    }

    var padding = { top: 20, right: 20, bottom: 30, left: 20 };
    var chartW = displayWidth - padding.left - padding.right;
    var chartH = displayHeight - padding.top - padding.bottom;

    var prices = data.map(function (d) { return d.price; });
    var minP = Math.min.apply(null, prices);
    var maxP = Math.max.apply(null, prices);
    var range = maxP - minP;
    if (range === 0) range = 1;

    var textMuted = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#5A6A7E';
    var textSecondary = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim() || '#8B9DB5';
    var glassBorder = getComputedStyle(document.documentElement).getPropertyValue('--glass-border').trim() || 'rgba(255,255,255,0.08)';

    // Draw grid lines
    chartCtx.strokeStyle = glassBorder;
    chartCtx.lineWidth = 1;
    chartCtx.setLineDash([4, 4]);

    for (var g = 0; g <= 3; g++) {
      var gy = padding.top + (chartH / 3) * g;
      chartCtx.beginPath();
      chartCtx.moveTo(padding.left, gy);
      chartCtx.lineTo(displayWidth - padding.right, gy);
      chartCtx.stroke();

      // Grid label
      var gridVal = maxP - ((range / 3) * g);
      chartCtx.fillStyle = textMuted;
      chartCtx.font = '11px Inter, system-ui, sans-serif';
      chartCtx.textAlign = 'right';
      chartCtx.fillText(formatNumber(Math.round(gridVal)), displayWidth - 4, gy - 4);
    }
    chartCtx.setLineDash([]);

    // Calculate points
    var points = [];
    var step = chartW / (data.length - 1);

    for (var i = 0; i < data.length; i++) {
      var x = padding.left + step * i;
      var y = padding.top + chartH - ((data[i].price - minP) / range) * chartH;
      points.push({ x: x, y: y });
    }

    // Draw fill gradient
    var gradient = chartCtx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
    gradient.addColorStop(0, CONFIG.CHART.FILL_COLOR_START);
    gradient.addColorStop(1, CONFIG.CHART.FILL_COLOR_END);

    chartCtx.beginPath();
    chartCtx.moveTo(points[0].x, points[0].y);

    // Smooth bezier curve
    for (var j = 1; j < points.length; j++) {
      var prev = points[j - 1];
      var curr = points[j];
      var cpx = (prev.x + curr.x) / 2;
      chartCtx.bezierCurveTo(cpx, prev.y, cpx, curr.y, curr.x, curr.y);
    }

    chartCtx.lineTo(points[points.length - 1].x, padding.top + chartH);
    chartCtx.lineTo(points[0].x, padding.top + chartH);
    chartCtx.closePath();
    chartCtx.fillStyle = gradient;
    chartCtx.fill();

    // Draw line
    chartCtx.beginPath();
    chartCtx.moveTo(points[0].x, points[0].y);

    for (var k = 1; k < points.length; k++) {
      var p = points[k - 1];
      var c = points[k];
      var cx = (p.x + c.x) / 2;
      chartCtx.bezierCurveTo(cx, p.y, cx, c.y, c.x, c.y);
    }

    chartCtx.strokeStyle = CONFIG.CHART.LINE_COLOR;
    chartCtx.lineWidth = 2.5;
    chartCtx.stroke();

    // Draw last point with pulse
    var lastPt = points[points.length - 1];
    chartCtx.beginPath();
    chartCtx.arc(lastPt.x, lastPt.y, CONFIG.CHART.POINT_RADIUS, 0, Math.PI * 2);
    chartCtx.fillStyle = CONFIG.CHART.LINE_COLOR;
    chartCtx.fill();

    // Pulse ring on last point
    chartCtx.beginPath();
    chartCtx.arc(lastPt.x, lastPt.y, CONFIG.CHART.PULSE_RADIUS, 0, Math.PI * 2);
    chartCtx.strokeStyle = CONFIG.CHART.LINE_COLOR;
    chartCtx.lineWidth = 1.5;
    chartCtx.globalAlpha = 0.4;
    chartCtx.stroke();
    chartCtx.globalAlpha = 1;

    // Hover tooltip
    if (chartHover.active && chartHover.index >= 0 && chartHover.index < points.length) {
      var hp = points[chartHover.index];
      var hpData = data[chartHover.index];

      // Vertical line
      chartCtx.beginPath();
      chartCtx.moveTo(hp.x, padding.top);
      chartCtx.lineTo(hp.x, padding.top + chartH);
      chartCtx.strokeStyle = 'rgba(0, 212, 170, 0.3)';
      chartCtx.lineWidth = 1;
      chartCtx.setLineDash([3, 3]);
      chartCtx.stroke();
      chartCtx.setLineDash([]);

      // Hover dot
      chartCtx.beginPath();
      chartCtx.arc(hp.x, hp.y, 6, 0, Math.PI * 2);
      chartCtx.fillStyle = CONFIG.CHART.LINE_COLOR;
      chartCtx.fill();
      chartCtx.beginPath();
      chartCtx.arc(hp.x, hp.y, 3, 0, Math.PI * 2);
      chartCtx.fillStyle = '#ffffff';
      chartCtx.fill();

      // Tooltip box
      var tooltipText = formatNumber(hpData.price) + ' RLS';
      chartCtx.font = '600 12px Inter, system-ui, sans-serif';
      var tooltipW = chartCtx.measureText(tooltipText).width + 16;
      var tooltipH = 28;
      var tooltipX = hp.x - tooltipW / 2;
      var tooltipY = hp.y - tooltipH - 10;

      // Keep tooltip in bounds
      if (tooltipX < padding.left) tooltipX = padding.left;
      if (tooltipX + tooltipW > displayWidth - padding.right) tooltipX = displayWidth - padding.right - tooltipW;
      if (tooltipY < 0) tooltipY = hp.y + 10;

      chartCtx.fillStyle = 'rgba(21, 27, 38, 0.9)';
      chartCtx.beginPath();
      if (chartCtx.roundRect) {
        chartCtx.roundRect(tooltipX, tooltipY, tooltipW, tooltipH, 6);
      } else {
        // Polyfill for older browsers without roundRect
        var r = 6;
        chartCtx.moveTo(tooltipX + r, tooltipY);
        chartCtx.arcTo(tooltipX + tooltipW, tooltipY, tooltipX + tooltipW, tooltipY + tooltipH, r);
        chartCtx.arcTo(tooltipX + tooltipW, tooltipY + tooltipH, tooltipX, tooltipY + tooltipH, r);
        chartCtx.arcTo(tooltipX, tooltipY + tooltipH, tooltipX, tooltipY, r);
        chartCtx.arcTo(tooltipX, tooltipY, tooltipX + tooltipW, tooltipY, r);
        chartCtx.closePath();
      }
      chartCtx.fill();
      chartCtx.strokeStyle = 'rgba(0, 212, 170, 0.3)';
      chartCtx.lineWidth = 1;
      chartCtx.stroke();

      chartCtx.fillStyle = '#E8ECF0';
      chartCtx.textAlign = 'center';
      chartCtx.fillText(tooltipText, tooltipX + tooltipW / 2, tooltipY + 18);
    }
  }

  // =========================================================================
  // SECTION 10: SCROLL ANIMATIONS (IntersectionObserver)
  // =========================================================================

  function initScrollAnimations() {
    var elements = $$('.scroll-animate');
    if (!elements.length) return;

    // Check for reduced motion preference
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      elements.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: CONFIG.SCROLL.SCROLL_REVEAL_THRESHOLD,
      rootMargin: '0px 0px -40px 0px',
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // =========================================================================
  // SECTION 11: FAQ ACCORDION
  // =========================================================================

  function initFAQ() {
    var faqItems = $$('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      var questionBtn = item.querySelector('.faq-question');
      if (!questionBtn) return;

      questionBtn.addEventListener('click', function () {
        var isActive = item.classList.contains('active');

        // Close all others
        faqItems.forEach(function (otherItem) {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            var otherBtn = otherItem.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        item.classList.toggle('active', !isActive);
        questionBtn.setAttribute('aria-expanded', String(!isActive));

        haptic('light');
      });
    });
  }

  // =========================================================================
  // SECTION 12: SMOOTH SCROLL NAVIGATION
  // =========================================================================

  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var target = link.getAttribute('href');
        if (!target || target === '#') return;

        var el = $(target);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });

          // Close mobile nav if open
          closeMobileNav();

          // Update active nav link
          $$('.header-nav a').forEach(function (navLink) {
            navLink.classList.remove('active');
          });
          link.classList.add('active');
        }
      });
    });
  }

  // =========================================================================
  // SECTION 13: MOBILE NAVIGATION
  // =========================================================================

  function initMobileNav() {
    var hamburger = $('#hamburgerBtn');
    var overlay = $('#mobileNavOverlay');
    var drawer = $('#mobileNavDrawer');
    var closeBtn = $('#mobileNavClose');

    if (hamburger) {
      hamburger.addEventListener('click', function () {
        openMobileNav();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        closeMobileNav();
      });
    }

    if (overlay) {
      overlay.addEventListener('click', function () {
        closeMobileNav();
      });
    }

    // Close on nav link click
    if (drawer) {
      $$('#mobileNavDrawer a').forEach(function (link) {
        link.addEventListener('click', function () {
          closeMobileNav();
        });
      });
    }
  }

  function openMobileNav() {
    var overlay = $('#mobileNavOverlay');
    var drawer = $('#mobileNavDrawer');
    var hamburger = $('#hamburgerBtn');

    if (overlay) addClass(overlay, 'active');
    if (drawer) addClass(drawer, 'active');
    if (hamburger) addClass(hamburger, 'active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    var overlay = $('#mobileNavOverlay');
    var drawer = $('#mobileNavDrawer');
    var hamburger = $('#hamburgerBtn');

    if (overlay) removeClass(overlay, 'active');
    if (drawer) removeClass(drawer, 'active');
    if (hamburger) removeClass(hamburger, 'active');
    document.body.style.overflow = '';
  }

  // =========================================================================
  // SECTION 14: ANIMATED COUNTERS (IntersectionObserver)
  // =========================================================================

  function initAnimatedCounters() {
    var counters = $$('[data-counter]');
    if (!counters.length) return;

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !state.countersAnimated) {
          state.countersAnimated = true;
          animateCounters(counters, prefersReducedMotion);
          observer.disconnect();
        }
      });
    }, {
      threshold: CONFIG.SCROLL.ANIMATED_COUNTER_THRESHOLD,
    });

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  function animateCounters(counters, skipAnimation) {
    counters.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1500;
      var startTime = null;

      if (skipAnimation || !target) {
        el.textContent = target + suffix;
        return;
      }

      function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      }

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var easedProgress = easeOutExpo(progress);
        var current = Math.round(easedProgress * target);
        el.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    });
  }

  // =========================================================================
  // SECTION 15: SCROLL PROGRESS BAR
  // =========================================================================

  function initScrollProgress() {
    var progressBar = $('#scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = Math.min(progress, 100) + '%';
    }, { passive: true });
  }

  // =========================================================================
  // SECTION 16: BACK TO TOP BUTTON
  // =========================================================================

  function initBackToTop() {
    var btn = $('#backToTop');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > CONFIG.SCROLL.BACK_TO_TOP_THRESHOLD) {
        addClass(btn, 'visible');
      } else {
        removeClass(btn, 'visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      haptic('light');
    });
  }

  // =========================================================================
  // SECTION 18: SCROLL HEADER (adds .scrolled class)
  // =========================================================================

  function initScrollHeader() {
    var header = $('#header');
    if (!header) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        addClass(header, 'scrolled');
      } else {
        removeClass(header, 'scrolled');
      }
    }, { passive: true });
  }

  // =========================================================================
  // SECTION 19: TOAST NOTIFICATION SYSTEM
  // =========================================================================

  function showToast(message, type) {
    if (!type) type = 'success';
    var container = $('#toastContainer');
    if (!container) return;

    var iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
    } else {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.innerHTML = iconSvg + '<span>' + message + '</span>';
    container.appendChild(toast);

    // Auto-dismiss after 3 seconds
    setTimeout(function () {
      addClass(toast, 'toast-exit');
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // =========================================================================
  // SECTION 20: BUTTON RIPPLE EFFECT
  // =========================================================================

  function initButtonRipple() {
    $$('.btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var size = Math.max(rect.width, rect.height);

        var ripple = document.createElement('span');
        ripple.className = 'btn-ripple';
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = (x - size / 2) + 'px';
        ripple.style.top = (y - size / 2) + 'px';

        btn.appendChild(ripple);

        setTimeout(function () {
          if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
        }, 600);
      });
    });
  }

  // =========================================================================
  // SECTION 21: PLAN TOMAN PRICES (Nobitex USDT API)
  // =========================================================================

  function initPlanTomanPrices() {
    updatePlanTomanPrices();

    // Re-update on price change
    var origUpdatePriceDisplay = updatePriceDisplay;
    updatePriceDisplay = function (price) {
      origUpdatePriceDisplay(price);
      updatePlanTomanPrices();
    };
  }

  function updatePlanTomanPrices() {
    var t = TRANSLATIONS[state.lang];
    var price = state.currentPrice;

    CONFIG.PLANS.forEach(function (plan, idx) {
      var el = document.getElementById('planToman' + plan.months);
      if (!el) return;

      if (price && price > 0) {
        // price is in RLS per 1 USD, multiply by plan USD price, divide by 10 for Toman
        var tomanAmount = Math.round((price * plan.price) / 10);
        var html = '<div class=\"plan-toman-row\">💰 ' + t.planTomanLabel + ' <span class=\"num\">' + formatNumber(tomanAmount) + '</span> ' + t.planTomanCurrency + '</div>';

        // Calculate savings vs Telegram direct (originalPrice)
        var ourToman = tomanAmount;
        var telegramToman = Math.round((price * plan.originalPrice) / 10);
        var saving = telegramToman - ourToman;
        var savingPercent = Math.round(((telegramToman - ourToman) / telegramToman) * 100);

        if (saving > 0 && savingPercent > 0) {
          html += '<div class=\"plan-saving-row\">🎉 ' + t.planSavingLabel + ' <span class=\"num\">' + formatNumber(saving) + '</span> ' + t.planTomanCurrency + ' (' + savingPercent + '%)</div>';
        }

        el.innerHTML = html;
      } else {
        el.innerHTML = '<div class=\"plan-toman-row\">💰 --- ' + t.planTomanCurrency + '</div>';
      }
    });
  }

  // =========================================================================
  // SECTION 21c: QUICK CONVERTER
  // =========================================================================

  function initQuickConverter() {
    var input = $('#converterInput');
    var result = $('#converterResult');
    if (!input || !result) return;

    function convert() {
      var usd = parseFloat(input.value);
      if (isNaN(usd) || usd <= 0) {
        result.textContent = '---';
        return;
      }
      if (state.currentPrice && state.currentPrice > 0) {
        var toman = Math.round((state.currentPrice * usd) / 10);
        result.textContent = formatNumber(toman) + ' T';
      } else {
        result.textContent = '---';
      }
    }

    input.addEventListener('input', convert);
    input.addEventListener('change', convert);

    // Also update on price fetch
    var origUpdate = updatePriceDisplay;
    updatePriceDisplay = function (price) {
      origUpdate(price);
      convert();
    };
  }

  // =========================================================================
  // SECTION 21d: FAQ SEARCH FILTER
  // =========================================================================

  function initFaqSearch() {
    var searchInput = $('#faqSearch');
    if (!searchInput) return;

    var faqItems = $$('.faq-item');

    searchInput.addEventListener('input', function () {
      var query = searchInput.value.trim().toLowerCase();
      var t = TRANSLATIONS[state.lang];

      faqItems.forEach(function (item) {
        if (!query) {
          item.classList.remove('faq-hidden', 'faq-highlight');
          return;
        }

        var questionBtn = item.querySelector('.faq-question');
        var answerInner = item.querySelector('.faq-answer-inner');
        var questionText = questionBtn ? questionBtn.textContent.toLowerCase() : '';
        var answerText = answerInner ? answerInner.textContent.toLowerCase() : '';

        if (questionText.indexOf(query) !== -1 || answerText.indexOf(query) !== -1) {
          item.classList.remove('faq-hidden');
          item.classList.add('faq-highlight');
        } else {
          item.classList.add('faq-hidden');
          item.classList.remove('faq-highlight');
        }
      });
    });
  }

  // =========================================================================
  // SECTION 21e: PROMO BANNER
  // =========================================================================

  function initPromoBanner() {
    var banner = $('#promoBanner');
    var closeBtn = $('#promoBannerClose');
    if (!banner || !closeBtn) return;

    // Check if previously dismissed
    var dismissed = storageGet(CONFIG.STORAGE.PROMO_DISMISSED, null);
    if (dismissed) {
      banner.style.display = 'none';
      return;
    }

    closeBtn.addEventListener('click', function () {
      banner.style.display = 'none';
      storageSet(CONFIG.STORAGE.PROMO_DISMISSED, '1');
      haptic('light');
    });
  }

  // =========================================================================
  // SECTION 22: PRICE CALCULATOR
  // =========================================================================

  function initCalculator() {
    var toggleBtn = $('#calcToggleBtn');
    if (!toggleBtn) return;

    // Restore Toman toggle state
    state.showTomanCalc = storageGet(CONFIG.STORAGE.CALC_TOMAN, 'false') === 'true';
    if (state.showTomanCalc) {
      showTomanPrices();
    }

    toggleBtn.addEventListener('click', function () {
      state.showTomanCalc = !state.showTomanCalc;
      storageSet(CONFIG.STORAGE.CALC_TOMAN, String(state.showTomanCalc));
      updateCalculator();
      haptic('light');
    });
  }

  function updateCalculator() {
    var t = TRANSLATIONS[state.lang];
    var tomanEls = $$('.calc-row-toman');

    if (state.showTomanCalc) {
      showTomanPrices();
      // Update toggle button text
      var calcToggleBtn = $('#calcToggleBtn');
      if (calcToggleBtn) {
        calcToggleBtn.textContent = t.calcHideToman;
      }
    } else {
      tomanEls.forEach(function (el) { el.classList.remove('visible'); });
      var calcToggleBtn = $('#calcToggleBtn');
      if (calcToggleBtn) {
        calcToggleBtn.textContent = t.calcToggleToman;
      }
    }
  }

  function showTomanPrices() {
    var tomanEls = $$('.calc-row-toman');
    tomanEls.forEach(function (el) {
      var usdPrice = parseInt(el.getAttribute('data-calc-toman'), 10);
      if (state.currentPrice && usdPrice) {
        // price is in RLS per 1 USD, so multiply by USD price and divide by 10 for Toman
        var tomanAmount = Math.round((state.currentPrice * usdPrice) / 10);
        el.textContent = formatNumber(tomanAmount) + ' ' + (TRANSLATIONS[state.lang].calcTomanLabel || 'Toman');
        el.classList.add('visible');
      } else {
        el.textContent = '---';
        el.classList.add('visible');
      }
    });
  }

  // =========================================================================
  // SECTION 23: HERO PARTICLE SYSTEM
  // =========================================================================

  var particleCanvas = null;
  var particleCtx = null;
  var particles = [];
  var particleAnimId = null;

  function initParticles() {
    particleCanvas = $('#heroParticles');
    if (!particleCanvas) return;

    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    particleCtx = particleCanvas.getContext('2d');
    if (!particleCtx) return;

    resizeParticleCanvas();

    // Create particles
    var count = Math.min(40, Math.floor(window.innerWidth / 30));
    for (var i = 0; i < count; i++) {
      particles.push(createParticle());
    }

    animateParticles();

    // Cleanup on page hide
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        if (particleAnimId) {
          cancelAnimationFrame(particleAnimId);
          particleAnimId = null;
        }
      } else {
        if (!particleAnimId) {
          animateParticles();
        }
      }
    });

    window.addEventListener('resize', function () {
      resizeParticleCanvas();
    });

    log('[TG Premium] Particle system initialized with ' + count + ' particles');
  }

  function resizeParticleCanvas() {
    if (!particleCanvas) return;
    var hero = $('#hero');
    if (!hero) return;
    var rect = hero.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    particleCanvas.width = rect.width * dpr;
    particleCanvas.height = rect.height * dpr;
    particleCanvas.style.width = rect.width + 'px';
    particleCanvas.style.height = rect.height + 'px';
    if (particleCtx) {
      particleCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  function createParticle() {
    var colors = [
      'rgba(0, 212, 170, ', // primary
      'rgba(255, 176, 32, ', // secondary
      'rgba(0, 136, 204, ',  // accent
    ];
    var colorBase = colors[Math.floor(Math.random() * colors.length)];
    var opacity = 0.15 + Math.random() * 0.35;

    return {
      x: Math.random() * (particleCanvas ? parseFloat(particleCanvas.style.width) || window.innerWidth : window.innerWidth),
      y: Math.random() * (particleCanvas ? parseFloat(particleCanvas.style.height) || window.innerHeight : window.innerHeight),
      size: 1.5 + Math.random() * 3,
      speedY: -(0.2 + Math.random() * 0.6),
      speedX: (Math.random() - 0.5) * 0.3,
      color: colorBase + opacity + ')',
      life: 0,
      maxLife: 300 + Math.random() * 400,
    };
  }

  function animateParticles() {
    if (!particleCtx || !particleCanvas) return;

    var w = parseFloat(particleCanvas.style.width) || window.innerWidth;
    var h = parseFloat(particleCanvas.style.height) || window.innerHeight;

    particleCtx.clearRect(0, 0, w, h);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      p.x += p.speedX;
      p.y += p.speedY;
      p.life++;

      // Reset particle if out of bounds or life expired
      if (p.y < -10 || p.life > p.maxLife) {
        particles[i] = createParticle();
        particles[i].y = h + 10;
        particles[i].life = 0;
        continue;
      }

      particleCtx.beginPath();
      particleCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      particleCtx.fillStyle = p.color;
      particleCtx.fill();
    }

    particleAnimId = requestAnimationFrame(animateParticles);
  }

  // =========================================================================
  // SECTION 24: COOKIE CONSENT BANNER
  // =========================================================================

  function initCookieConsent() {
    var banner = $('#cookieConsent');
    var acceptBtn = $('#cookieAccept');
    var declineBtn = $('#cookieDecline');
    if (!banner) return;

    // Check if already decided
    var consent = storageGet(CONFIG.STORAGE.COOKIE_CONSENT, null);
    if (consent) {
      banner.style.display = 'none';
      return;
    }

    // Show after a delay
    setTimeout(function () {
      banner.classList.add('visible');
    }, 2000);

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        storageSet(CONFIG.STORAGE.COOKIE_CONSENT, 'accepted');
        banner.classList.remove('visible');
        setTimeout(function () { banner.style.display = 'none'; }, 500);
        haptic('light');
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', function () {
        storageSet(CONFIG.STORAGE.COOKIE_CONSENT, 'declined');
        banner.classList.remove('visible');
        setTimeout(function () { banner.style.display = 'none'; }, 500);
        haptic('light');
      });
    }
  }

  // =========================================================================
  // SECTION 25: TESTIMONIALS CAROUSEL (Mobile)
  // =========================================================================

  // =========================================================================
  // SECTION 26: SHARE BUTTON
  // =========================================================================

  function initShareButton() {
    var shareBtn = $('#shareBtn');
    if (!shareBtn) return;

    if (navigator.share) {
      shareBtn.style.display = '';
      shareBtn.addEventListener('click', function () {
        navigator.share({
          title: state.lang === 'fa' ? 'خرید تلگرام پریمیوم' : 'Telegram Premium',
          text: state.lang === 'fa' ? 'اشتراک تلگرام پریمیوم با بهترین قیمت' : 'Get Telegram Premium at the best price',
          url: window.location.href,
        }).catch(function () {});
      });
    } else {
      shareBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(window.location.href).then(function () {
          showToast(TRANSLATIONS[state.lang].shareCopied || 'Link copied!', 'success');
        });
      });
    }
  }

  // =========================================================================
  // SECTION 27: TESTIMONIALS CAROUSEL (Mobile)
  // =========================================================================

  var carouselAutoPlayTimer = null;

  function initTestimonialsCarousel() {
    var grid = $('#testimonialsGrid');
    var dotsContainer = $('#carouselDots');
    if (!grid || !dotsContainer) return;

    var dots = dotsContainer.querySelectorAll('.carousel-dot');
    var cards = grid.querySelectorAll('[data-slide]');

    // Scroll snap event → update active dot
    var scrollTimeout = null;
    grid.addEventListener('scroll', function () {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        var scrollLeft = grid.scrollLeft;
        var cardWidth = cards[0] ? cards[0].offsetWidth : 0;
        var activeIdx = Math.round(scrollLeft / (cardWidth + 12));
        if (activeIdx < 0) activeIdx = 0;
        if (activeIdx >= dots.length) activeIdx = dots.length - 1;

        dots.forEach(function (d, di) {
          if (di === activeIdx) {
            d.classList.add('active');
          } else {
            d.classList.remove('active');
          }
        });
      }, 100);
    }, { passive: true });

    // Dot click → scroll to card
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var slideIdx = parseInt(dot.getAttribute('data-slide'), 10);
        if (cards[slideIdx]) {
          var cardWidth = cards[0] ? cards[0].offsetWidth : 0;
          grid.scrollTo({
            left: slideIdx * (cardWidth + 12),
            behavior: 'smooth',
          });
        }
      });
    });

    // Auto-play on mobile
    function startAutoPlay() {
      if (carouselAutoPlayTimer) clearInterval(carouselAutoPlayTimer);
      carouselAutoPlayTimer = setInterval(function () {
        var scrollLeft = grid.scrollLeft;
        var cardWidth = cards[0] ? cards[0].offsetWidth : 0;
        var currentIdx = Math.round(scrollLeft / (cardWidth + 12));
        var nextIdx = (currentIdx + 1) % cards.length;
        if (cards[nextIdx]) {
          grid.scrollTo({
            left: nextIdx * (cardWidth + 12),
            behavior: 'smooth',
          });
        }
      }, 5000);
    }

    function stopAutoPlay() {
      if (carouselAutoPlayTimer) {
        clearInterval(carouselAutoPlayTimer);
        carouselAutoPlayTimer = null;
      }
    }

    // Only auto-play on mobile
    if (window.innerWidth < 768) {
      startAutoPlay();

      // Pause on touch
      grid.addEventListener('touchstart', stopAutoPlay, { passive: true });
      grid.addEventListener('touchend', function () {
        setTimeout(startAutoPlay, 3000);
      }, { passive: true });
    }
  }

  // =========================================================================
  // SECTION 26: SCROLL SPY (Active Nav Highlight)
  // =========================================================================

  function initScrollSpy() {
    var sections = $$('#hero, #livePrice, #plans, #features, #faq');
    var navLinks = $$('.header-nav a[href^="#"]');
    var mobileLinks = $$('#mobileNavDrawer a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          var href = '#' + id;

          navLinks.forEach(function (link) {
            if (link.getAttribute('href') === href) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });

          mobileLinks.forEach(function (link) {
            if (link.getAttribute('href') === href) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // =========================================================================
  // SECTION 27: COPY PRICE TO CLIPBOARD
  // =========================================================================

  function initCopyPrice() {
    var copyBtn = $('#priceCopyBtn');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', function () {
      var priceEl = $('#priceValue');
      if (!priceEl || !priceEl.textContent || priceEl.textContent === '---') return;

      var priceText = priceEl.textContent.trim();

      // Try clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(priceText).then(function () {
          onCopySuccess(copyBtn);
        }).catch(function () {
          fallbackCopy(copyBtn, priceText);
        });
      } else {
        fallbackCopy(copyBtn, priceText);
      }
    });
  }

  function fallbackCopy(btn, text) {
    try {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      onCopySuccess(btn);
    } catch (e) {
      log('[TG Premium] Copy failed:', e);
    }
  }

  function onCopySuccess(btn) {
    var t = TRANSLATIONS[state.lang];
    addClass(btn, 'copied');
    showToast(t.priceCopied, 'success');

    setTimeout(function () {
      removeClass(btn, 'copied');
    }, 2000);

    haptic('light');
  }

  // =========================================================================
  // SECTION 28: KEYBOARD NAVIGATION ENHANCEMENT
  // =========================================================================

  function initKeyboardNav() {
    // Escape key closes mobile nav and promo banner
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        closeMobileNav();

        var promoBanner = $('#promoBanner');
        if (promoBanner && promoBanner.style.display !== 'none') {
          promoBanner.style.display = 'none';
          storageSet(CONFIG.STORAGE.PROMO_DISMISSED, '1');
        }
      }
    });
  }

  // =========================================================================
  // SECTION 29: TYPING EFFECT (Hero Title)
  // =========================================================================

  function initTypingEffect() {
    var titleEl = $('#heroTitle');
    if (!titleEl) return;

    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var cursor = titleEl.querySelector('.typing-cursor');
      if (cursor) cursor.remove();
      return;
    }

    var fullText = TRANSLATIONS[state.lang].heroTitle || titleEl.textContent;
    var cursorEl = titleEl.querySelector('.typing-cursor');

    // Clear and type out
    var charIndex = 0;
    var typingTimer = null;

    // Reset title
    if (cursorEl) cursorEl.remove();

    function typeNextChar() {
      if (charIndex <= fullText.length) {
        // Rebuild title text progressively
        var visibleText = fullText.substring(0, charIndex);
        titleEl.innerHTML = visibleText;

        // Add cursor after visible text
        var span = document.createElement('span');
        span.className = 'typing-cursor';
        span.setAttribute('aria-hidden', 'true');
        titleEl.appendChild(span);

        charIndex++;
        var delay = 30 + Math.random() * 40;
        typingTimer = setTimeout(typeNextChar, delay);
      } else {
        // Typing complete - keep cursor blinking for 2s then remove
        setTimeout(function () {
          var c = titleEl.querySelector('.typing-cursor');
          if (c) {
            c.style.transition = 'opacity 0.5s ease';
            c.style.opacity = '0';
            setTimeout(function () {
              if (c && c.parentNode) c.parentNode.removeChild(c);
            }, 500);
          }
        }, 2000);
      }
    }

    // Start typing after a brief delay
    setTimeout(typeNextChar, 1000);

    // Cleanup on page hide
    document.addEventListener('visibilitychange', function () {
      if (document.hidden && typingTimer) {
        clearTimeout(typingTimer);
        // Show full text immediately
        titleEl.textContent = fullText;
        var cursor = titleEl.querySelector('.typing-cursor');
        if (cursor) cursor.remove();
      }
    });

    log('[TG Premium] Typing effect initialized');
  }

  // =========================================================================
  // SECTION 30: ENHANCED PRICE CARD GLOW
  // =========================================================================

  function glowPriceCard() {
    var priceCard = $('.price-card');
    if (!priceCard) return;

    addClass(priceCard, 'glow-pulse');
    setTimeout(function () {
      if (priceCard) removeClass(priceCard, 'glow-pulse');
    }, 800);
  }

  // =========================================================================
  // SECTION 31: PWA SERVICE WORKER REGISTRATION
  // =========================================================================

  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        navigator.serviceWorker.register('sw.js').then(function (reg) {
          log('[TG Premium] Service Worker registered, scope:', reg.scope);
        }).catch(function (err) {
          log('[TG Premium] SW registration failed:', err.message);
        });
      } catch (e) {
        // Silently fail - SW is a progressive enhancement
      }
    }
  }

  // =========================================================================
  // SECTION 17: INITIALIZATION
  // =========================================================================

  function init() {
    log('[TG Premium] Initializing...');

    // 1. Initialize theme (defaults to dark)
    initTheme();

    // 2. Initialize language
    initLanguage();

    // 3. Initialize Telegram Mini App (if inside Telegram)
    initTelegram();

    // 4. Setup event listeners
    var themeToggle = $('#themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }

    var langToggle = $('#langToggle');
    if (langToggle) {
      langToggle.addEventListener('click', function () {
        var newLang = state.lang === 'fa' ? 'en' : 'fa';
        setLanguage(newLang, true);
      });
    }

    // 5. Initialize price API
    initPriceAPI();

    // 6. Initialize chart
    initChart();

    // 7. Hide loader, show app
    var loader = $('#loader');
    var app = $('#app');

    // Small delay for smooth transition
    setTimeout(function () {
      if (loader) addClass(loader, 'loaded');
      if (app) addClass(app, 'visible');

      // Remove loader from DOM after transition
      setTimeout(function () {
        if (loader && loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 600);
    }, 800);

    // 8. Initialize scroll animations (after app is visible)
    setTimeout(function () {
      initScrollAnimations();
      initFAQ();
      initSmoothScroll();
      initMobileNav();
      initAnimatedCounters();
      initScrollProgress();
      initBackToTop();
      initScrollHeader();
      initButtonRipple();
      initPromoBanner();
      initPlanTomanPrices();
      initQuickConverter();
      initParticles();
      initCookieConsent();
      initScrollSpy();
      initCopyPrice();
      initKeyboardNav();
      initTypingEffect();
      initShareButton();
      initFaqToggleAll();
      initFaqSearch();
      registerServiceWorker();
    }, 100);

    log('[TG Premium] Initialization complete');
  }

  // =========================================================================
  // SECTION 30: FAQ TOGGLE ALL
  // =========================================================================

  function initFaqToggleAll() {
    var toggleBtn = $('#faqToggleAll');
    if (!toggleBtn) return;

    var faqItems = $$('.faq-item');
    var allExpanded = false;

    toggleBtn.addEventListener('click', function () {
      allExpanded = !allExpanded;

      faqItems.forEach(function (item) {
        var question = item.querySelector('.faq-question');
        var answer = item.querySelector('.faq-answer');
        var icon = item.querySelector('.faq-icon');
        if (!question || !answer) return;

        if (allExpanded) {
          question.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          if (icon) icon.textContent = '-';
          addClass(item, 'open');
        } else {
          question.setAttribute('aria-expanded', 'false');
          answer.style.maxHeight = '0';
          if (icon) icon.textContent = '+';
          removeClass(item, 'open');
        }
      });

      var textSpan = toggleBtn.querySelector('[data-i18n="faqToggleAllText"]');
      if (textSpan) {
        textSpan.textContent = allExpanded
          ? TRANSLATIONS[state.lang].faqCollapseAllText
          : TRANSLATIONS[state.lang].faqToggleAllText;
      }

      if (allExpanded) {
        addClass(toggleBtn, 'expanded');
      } else {
        removeClass(toggleBtn, 'expanded');
      }

      haptic('light');
    });
  }

  // =========================================================================
  // SECTION 31: ORDER STATUS TRACKING
  // =========================================================================

  function initOrderStatus() {
    var input = $('#orderStatusInput');
    var btn = $('#orderStatusBtn');
    var result = $('#orderStatusResult');
    if (!input || !btn || !result) return;

    btn.addEventListener('click', function () {
      var query = input.value.trim();
      if (!query) {
        showToast(state.lang === 'fa' ? 'لطفاً شماره تلفن يا شماره سفارش را وارد کنيد' : 'Please enter a phone number or order ID', 'error');
        return;
      }

      // Simulate order lookup (demo)
      var t = TRANSLATIONS[state.lang];
      result.className = 'order-status-result visible';

      // Simple demo logic based on input
      if (query.length >= 8) {
        result.classList.add('status-active');
        result.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' + t.orderStatusActive;
      } else if (query.length >= 3) {
        result.classList.add('status-pending');
        result.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' + t.orderStatusPending;
      } else {
        result.classList.add('status-notfound');
        result.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>' + t.orderStatusNotFound;
      }

      haptic('light');
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') btn.click();
    });
  }

  // =========================================================================
  // SECTION 32: PROMO CODE
  // =========================================================================

  function initPromoCode() {
    var input = $('#promoInput');
    var btn = $('#promoApplyBtn');
    var result = $('#promoResult');
    if (!input || !btn || !result) return;

    var validCodes = {'PREMIUM10': true, 'TELEGRAM2025': true, 'WELCOME': true};

    btn.addEventListener('click', function () {
      var code = input.value.trim().toUpperCase();
      if (!code) {
        showToast(state.lang === 'fa' ? 'لطفاً کد تخفيف را وارد کنيد' : 'Please enter a promo code', 'error');
        return;
      }

      var t = TRANSLATIONS[state.lang];
      result.className = 'promo-result visible';

      if (validCodes[code]) {
        result.classList.add('success');
        result.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' + t.promoSuccess;
        showToast(t.promoSuccess, 'success');
        haptic('success');
      } else {
        result.classList.add('error');
        result.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>' + t.promoError;
        haptic('error');
      }
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') btn.click();
    });
  }

  // =========================================================================
  // SECTION 18: GLOBAL API (window.TGPremium)
  // =========================================================================

  window.TGPremium = {
    getState: function () { return state; },
    setLanguage: function (lang) { setLanguage(lang); },
    toggleTheme: function () { toggleTheme(); },
    openTelegramOrder: function () { openTelegramOrder(); },
    openTelegramChannel: function () { openTelegramChannel(); },
    orderPlan: function (months) {
      var plan = CONFIG.PLANS.find(function (p) { return p.months === months; });
      var msg = '';
      if (state.lang === 'fa') {
        msg = 'سلام، مي‌خواهم اشتراک پریمیوم تلگرام ' + months + ' ماهه سفارش دهم.';
      } else {
        msg = 'Hi, I would like to order a ' + months + '-month Telegram Premium subscription.';
      }
      if (plan) {
        msg += ' (Plan: $' + plan.price + ' USD)';
      }
      var url = 'https://t.me/' + CONFIG.TELEGRAM.ORDER_USERNAME + '?text=' + encodeURIComponent(msg);
      window.open(url, '_blank', 'noopener,noreferrer');
      haptic('success');
      showToast(TRANSLATIONS[state.lang].toastOrderSuccess, 'success');
    },
  };

  // =========================================================================
  // BOOT
  // =========================================================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
