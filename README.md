<p align="center">

# Shopify Push Notifications

[![Dimension Software][html5-image]][ds-link]
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/DimensionSoftware/shopify-push-notifications/issues)
[![HitCount](http://hits.dwyl.io/DimensionSoftware/shopify-push-notifications.svg)](http://hits.dwyl.io/DimensionSoftware/shopify-push-notifications)
[![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)][ds-link]

</p>

## Web + Native iOS + Android Support

[Push Notifications to Shopify and your native app, through our Passwordless Login App][pw-link] using this example React Native codebase, no native modules to link & [Expo friendly!][expo-link]
<br />

[![Shopify Push Notifications for Web and React Native Apps][ss-image]][pw-link]


## Quick Start

```
$ yarn add shopify-push-notifications
```

<br />

#### *Step 1* &nbsp; // &nbsp; Save Token

```
  const { token, message } = push('YOUR-STORE.myshopify.com, 'YOUR-SECRET')
  let res = await token('exponentpushtoken[xxxxxxxxxxxxxxxxxxxxxx]')
  if (!res.success) console.warn(res.error)
  // web or expo token saved
```

#### *Step 2* &nbsp; // &nbsp; Push Message

```
  res = await message('TITLE', 'Message body...', {withJSON: 'Optional data'})
  if (!res.success) console.warn(res.error)
  // message broadcasted!
```

<br />
<br />
<br />
<p align="center">

[![Fresh Software by Dimension][ds-image]][ds-link]

</p>

[pw-link]: https://login.dimensionsoftware.com
[ds-link]: https://dimensionsoftware.com
[expo-link]: https://expo.io
[ss-image]: ./examples/react-native/assets/screenshot.png
[html5-image]: http://img.shields.io/badge/HTML-5-blue.svg?style=flat
[ds-image]: https://dimensionsoftware.com/static/images/github/software_by.png
