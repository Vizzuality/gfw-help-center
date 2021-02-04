import cookie from 'cookie';
import { addHours } from 'date-fns';
import has from 'lodash/has';

const PRO_LOGIN_ENDPOINT = 'https://pro.globalforestwatch.org/auth/signinpost';
// const PRO_VERIFICATION_ENDPOINT = 'https://pro.globalforestwatch.org/auth/verifyLogin';

const generateCookie = (name, expires, secure) => {
  const cookieString = [
    name,
    'HttpOnly',
    'Path=/',
    'SameSite=Strict',
    secure,
    `expires=${expires}`,
  ];
  return cookieString.join(';');
};

function setCookie(needsVerify = false) {
  const expires = addHours(new Date(), 4);
  const secure = process.env.NODE_ENV === 'production' ? 'Secure' : '';

  if (needsVerify) {
    return generateCookie('pro-x-verification-required=true', expires, secure);
  }

  return generateCookie('pro-x=true', expires, secure);
}

const authenticatePro = async (body) => {
  try {
    const req = await fetch(PRO_LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: body.username,
        password: body.password,
      }),
    });

    const response = await req.text();
    return response.toLowerCase() === 'authenticated';
  } catch (e) {
    console.error('Pro login error', e); // eslint-disable-line
  }
  return false;
};

// const verifyProToken = async (body) => {
//   try {
//     const req = await fetch(PRO_VERIFICATION_ENDPOINT, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         tokenID: body.verify
//       }),
//     });
//
//     const response = await req.text();
//     return response.toLowerCase() === 'authenticated';
//   } catch (e) {
//     console.error('Pro login error', e); // eslint-disable-line
//   }
//   return false;
// }

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);
    // if (has(body, 'verify')) {
    //   const verifyToken = await verifyProToken(JSON.parse(req.body));
    //   res.status(401).json({ pro: false });
    //   return;
    // }
    const proAuth = await authenticatePro(body);
    if (proAuth) {
      res.setHeader('Set-Cookie', setCookie());
      res.status(200).json({ pro: true });
    } else {
      res.status(401).json({ pro: false });
    }

    return;
  }

  if (req.method === 'GET') {
    const cookies = cookie.parse(req.headers.cookie || '');
    if (cookies && has(cookies, 'pro-x-verification-required')) {
      res.status(200).json({ proVerificationRequired: true });
      return;
    }
    if (cookies && has(cookies, 'pro-x')) {
      res.status(200).json({ pro: true });
      return;
    }

    res.status(401).json({ pro: false });
    return;
  }

  res.status(401).json({ pro: false });
}
