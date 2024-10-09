//
// import { parse } from 'cookie';
//
// export async function handle({ event, resolve }) {
//   const cookies = parse(event.request.headers.get('cookie') || '');
//
//   if (cookies.token) {
//     // Предположим, что токен валиден
//     event.locals.user = { name: 'John Doe' }; // Можно извлечь информацию из токена
//   } else {
//     event.locals.user = undefined;
//   }
//
//   return resolve(event);
// }
